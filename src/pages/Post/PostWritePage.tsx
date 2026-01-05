import { useState, useEffect, useRef, useMemo } from "react";
import Plus from "../../assets/icons/Plus.svg?react";
import BasicImage from "../../assets/icons/BasicImage.svg?react";
import UpArrow from "../../assets/icons/UpArrow.svg?react";
import DownArrow from "../../assets/icons/DownArrow.svg?react";

// 각섹션에 해당하는 기능/상태관리는 번호를 부여함
// 예) 1번 섹션은 1, 2번섹션은 2 ... / 번호를 보고 각 섹션에 해당하는 기능을 이해하면 좋을듯

const PostWrite = () => {
  // 1. 제목, 본문 내용 상태관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 2. 버튼 공통 스타일, 클릭 시 색 바뀌는 상태 적용
  const [active, setActive] = useState<"OOPS" | "OVERCOMING" | "OVERCOME">(
    "OOPS"
  );

  const buttonClass =
    "flex justify-center items-center rounded-[40px] py-[11px] px-[53px] transition-colors";

  const getButtonClass = (type: typeof active) =>
    `${buttonClass} ${active === type ? "bg-[#b3e378]" : "bg-[#e6f3d7]"}`;

  // 3. 이미지 업로드 (최대 5장) 관리
  const MAX_IMAGES = 5;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState<{ file: File; previewUrl: string }[]>(
    []
  );

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const currentCount = images.length;
    const remain = MAX_IMAGES - currentCount;
    if (remain <= 0) return;

    const selected = Array.from(files);

    // jpg/png만 + 최대 remain개만
    const filtered = selected
      .filter((f) => ["image/jpeg", "image/png"].includes(f.type))
      .slice(0, remain);

    const next = filtered.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...next]);

    // 같은 파일 다시 선택 가능하게 초기화
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 이미지 삭제
  const removeImage = (idx: number) => {
    setImages((prev) => {
      const target = prev[idx];
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  };

  // 컴포넌트 언마운트 시 미리보기 URL 정리
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, []);

  // 4. 카테고리 목록선언 / 드롭다운 Ui 구현
  // 선택된 카테고리, 드롭다운 상태관리와 정규화 선언
  /** 랜덤주제(topic도 들어가야하며 카테고리와 똑같이 id매핑 필요) */
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const normalize = (str: string) => str.trim().toLowerCase();

  // 드롭다운 ref
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 카테고리 목록과 id매핑
  const [categories] = useState<string[]>([
    "일상",
    "연애",
    "인간관계",
    "주식/투자",
    "학교생활",
    "진로",
    "창업",
    "대입/입시",
    "취업/자격증",
    "결혼",
    "여행",
    "부동산",
    "정신 건강",
    "자유",
  ]);
  const categoryMap = useMemo(() => {
    const m = new Map<string, number>();
    categories.forEach((name, idx) => {
      m.set(normalize(name), idx + 1); // 1-based
    });
    return m;
  }, [categories]);

  const applySelection = (category: string) => {
    setSelectedCategory(category);
    const id = categoryMap.get(normalize(category));
    console.log("선택된 카테고리:", category, "ID:", id);
  };

  // 외부 클릭시 드롭다운 닫힘 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 4-2 checkbox 상태관리
  const [commentTypes, setCommentTypes] = useState<{
    ADVICE: boolean;
    EMPATHY: boolean;
  }>({ ADVICE: true, EMPATHY: false });

  const toggleCommentType = (type: "ADVICE" | "EMPATHY") => {
    setCommentTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="w-full flex flex-col gap-20">
      {/* 첫번째 섹션 글 제목, 본문 입력 */}
      <section className="w-full flex flex-col gap-10">
        <div>글 작성하기</div>
        <input
          placeholder="제목을 입력해주세요. (필수)"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="w-full flex items-center self-stretch bg-[#FAF6E9] placeholder-[#b3b3b3]
          xl:h-22.5 xl:p-7.5
          border-[3px] border-solid border-[#F5E9D6] rounded-xl"
        />
        <textarea
          placeholder="실패담의 내용을 입력해주세요. (필수)"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className="w-full resize-none flex items-start self-stretch bg-[#faf6e9] placeholder:-[#b3b3b3]
          xl:h-84 xl:p-7.5
          border-[3px] border-solid border-[#f5e9d6] rounded-xl"
        />
      </section>
      {/* 두번째 섹션 진행상황 선택 */}
      <section className="w-full flex flex-col gap-10">
        <div>진행상황 선택</div>
        <div className="flex gap-4 justify-start items-center">
          <button
            className={getButtonClass("OOPS")}
            onClick={() => setActive("OOPS")}
          >
            웁스 중
          </button>

          <button
            className={getButtonClass("OVERCOMING")}
            onClick={() => setActive("OVERCOMING")}
          >
            극복 중
          </button>

          <button
            className={getButtonClass("OVERCOME")}
            onClick={() => setActive("OVERCOME")}
          >
            극복 완료
          </button>
        </div>
      </section>
      {/* 세번째 섹션 사진 업로드 */}
      <section className="w-full flex flex-col">
        <div className="mb-3">사진 추가</div>
        <p className="mb-10">
          jpg, png, 각 10MB 이하만 최대 5장 업로드 가능합니다.
        </p>

        {/* 파일 인풋 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex gap-10">
          {/* 이미지 미리보기 */}
          {images.map((img, idx) => (
            <div
              key={img.previewUrl}
              className="relative w-[268px] h-[268px] rounded-xl border-[3px] border-[#F5E9D6] border-solid bg-[#FAF6E9] overflow-hidden"
            >
              <img
                src={img.previewUrl}
                className="w-full h-full object-cover"
              />

              {/* 삭제 버튼 */}
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white text-sm flex items-center justify-center"
                aria-label="remove image"
              >
                X
              </button>
            </div>
          ))}

          {/* 추가 버튼 (5장 미만일 때만 보이게) */}
          {images.length < MAX_IMAGES && (
            <button
              type="button"
              onClick={openFilePicker}
              className="flex gap-10 justify-center items-center"
            >
              {/* 이미지가 있을 때만 img 렌더 */}
              {images.length == 0 && (
                <div>
                  <BasicImage />
                </div>
              )}
              <div>
                <Plus />
              </div>
            </button>
          )}
        </div>
      </section>
      {/* 네번째 섹션 카테고리 선택, 댓글 종류 선택 */}
      <section className="w-full flex gap-6">
        <div className="flex flex-col gap-10">
          <a className="flex items-center self-stretch xl:w-[16rem]">
            카테고리 선택
          </a>
          <div
            className="relative xl:w-56 bg-[#e6e6e6] flex py-2 px-4 rounded-t-xl h-12"
            ref={dropdownRef}
          >
            {/* 드롭다운 버튼 */}
            <button
              type="button"
              disabled={false}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="w-full flex justify-between items-center text-start gap-[0.62rem]"
            >
              <span>{selectedCategory ?? "카테고리"}</span>
              <span className="text-sm">
                {isDropdownOpen ? <UpArrow /> : <DownArrow />}
              </span>
            </button>
            {/* 드롭다운 리스트 */}
            {isDropdownOpen && (
              <ul className="absolute pt-5 top-12 right-[0.4px] bg-[#f3f3f3] w-full h-[180px] rounded-b-[1.25rem] overflow-y-scroll z-20 custom-scroll">
                {categories.map((label, idx) => {
                  const isSelected =
                    selectedCategory &&
                    normalize(selectedCategory) === normalize(label);
                  return (
                    <li
                      key={`${label}-${idx}`}
                      onClick={() => {
                        applySelection(label);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-5 pb-7 cursor-pointer text-[1.125rem]
                  ${isSelected ? "text-black" : "text-[#999999]"}
                  ${idx !== categories.length - 1 ? "" : ""}
                `}
                    >
                      {label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {/* 댓글 종류 선택 */}
          <a className="flex items-center self-stretch xl:w-[16rem]">
            댓글 종류 선택
          </a>
          <div className="w-full flex items-center gap-[3.12rem]">
            {/* 조언 */}
            <button
              type="button"
              onClick={() => toggleCommentType("ADVICE")}
              className="flex items-center gap-4"
            >
              <span
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors
        ${commentTypes.ADVICE ? "bg-[#b3e378] border-[#b3e378]" : "bg-[#e6e6e6] border-[#e6e6e6]"}
      `}
                aria-hidden
              >
                {commentTypes.ADVICE && (
                  <span className="text-2xl font-bold leading-none">✓</span>
                )}
              </span>
              <span className="">조언</span>
            </button>

            {/* 공감 */}
            <button
              type="button"
              onClick={() => toggleCommentType("EMPATHY")}
              className="flex items-center gap-4"
            >
              <span
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors
        ${commentTypes.EMPATHY ? "bg-[#b3e378] border-[#b3e378]" : "bg-[#e6e6e6] border-[#e6e6e6]"}
      `}
                aria-hidden
              >
                {commentTypes.EMPATHY && (
                  <span className="text-2xl font-bold leading-none">✓</span>
                )}
              </span>
              <span className="text-[1.125rem]">공감</span>
            </button>
          </div>
        </div>
      </section>

      {/* 다섯번째 섹션 submit (작성하기) 버튼 */}
      <section className="w-full xl:mt-35">
        <button className="w-full h-27 rounded-xl cursor-pointer items-center bg-[#B3E378]">
          작성하기
        </button>
      </section>
    </div>
  );
};

export default PostWrite;

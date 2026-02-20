import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../../apis/Post/useCreatePost";
// 타입 및 상수 임포트
import { CategoryIdMap, type CategoryName } from "../../types/Common";
import { wantedCommentType, wantedCommentTypeMap } from "../../types/Common";
// 컴포넌트들 임포트
import ProgressSection from "../../components/PostPage/section/PostWriteSection/ProgressSecion";
import CommentSection from "../../components/PostPage/section/PostWriteSection/CommetSection";
import ImageSection, {
  UploadImage,
} from "../../components/PostPage/section/PostWriteSection/ImageSection";
import TitleContentSection from "../../components/PostPage/section/PostWriteSection/TitleContentSection";
import CategorySection from "../../components/PostPage/section/PostWriteSection/CategorySection";
import SubmitSection from "../../components/PostPage/section/PostWriteSection/SubmitSection";

// 각섹션에 해당하는 기능/상태관리는 번호를 부여함

const PostWrite = () => {
  // 네비게이션
  const navigate = useNavigate();
  // api 훅
  const { createPost, isLoading } = useCreatePost();

  // 1. 제목, 본문 내용 상태관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 2. 버튼 공통 스타일, 클릭 시 색 바뀌는 상태 적용
  const [active, setActive] = useState<"OOPS" | "OVERCOMING" | "OVERCOME">(
    "OOPS",
  );

  // 3. 이미지 업로드 (최대 5장) 관리
  const MAX_IMAGES = 5;

  const [images, setImages] = useState<UploadImage[]>([]);

  // 4. 카테고리 목록선언 / 드롭다운 Ui 구현
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | null>(
    null,
  );

  // 4-2 checkbox 상태관리
  const [commentTypes, setCommentTypes] = useState<wantedCommentTypeMap>({
    ADVICE: true,
    EMPATHY: false,
  });

  const toggleCommentType = (type: wantedCommentType) => {
    setCommentTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSubmit = async () => {
    if (!title.trim()) return alert("제목을 입력해주세요!");
    if (!content.trim()) return alert("내용을 입력해주세요!");
    if (!selectedCategory) return alert("카테고리를 선택해주세요!");
    if (active !== "OOPS" && !previousPostId)
      return alert("이전 게시물을 선택해주세요!");

    const categoryId = CategoryIdMap.get(selectedCategory);
    if (!categoryId) return;

    const payload = {
      title,
      content,
      situation: active,
      categoryId,
      topicId: null,
      previousPostId: active === "OOPS" ? null : previousPostId,
      wantedCommentTypes: (
        Object.keys(commentTypes) as wantedCommentType[]
      ).filter((k) => commentTypes[k]),
    };

    try {
      const res = await createPost(
        payload,
        images.map((img) => img.file),
      );

      alert("작성 완료!");
      localStorage.setItem("postId",String(res.result.postId));
      navigate("/post/success");
    } catch {
      alert("작성 실패!");
    }
  };

  // 부모 postId 넘겨주기
  const [previousPostId, setPreviousPostId] = useState<number | null>(null);
  // 이전 진행상황 글 카테고리 고정
  const [lockedCategory, setLockedCategory] = useState<CategoryName | null>(
    null,
  );

  const handleSelectPrev = (postId: number, category: CategoryName) => {
    setPreviousPostId(postId);
    setLockedCategory(category);
    setSelectedCategory(category);
  };

  // 진행상황 탭 변경 시 이전 게시물 초기화
  useEffect(() => {
    setPreviousPostId(null);
    setLockedCategory(null);
  }, [active]);

  return (
    <div className="w-full flex flex-col gap-[5rem]">
      {/* 첫번째 섹션 글 제목, 본문 입력 */}
      <TitleContentSection
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
      />

      {/* 두번째 섹션 진행상황 선택 */}
      <ProgressSection
        active={active}
        setActive={setActive}
        selectedPreviousPostId={previousPostId}
        onSelectPreviousPostId={handleSelectPrev}
      />

      {/* 세번째 섹션 사진 업로드 */}
      <ImageSection
        images={images}
        setImages={setImages}
        maxImages={MAX_IMAGES}
      />

      {/* 네번째 섹션 카테고리 선택, 댓글 종류 선택 */}
      <section className="select-none w-full flex flex-col gap-[5rem]">
        <CategorySection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          locked={active !== "OOPS" && !!lockedCategory}
        />
        <CommentSection
          commentTypes={commentTypes}
          toggleCommentType={toggleCommentType}
        />
      </section>
      <SubmitSection
        disabled={isLoading}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default PostWrite;

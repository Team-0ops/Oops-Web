import { useState } from "react";
// 타입 및 상수 임포트
import { type CategoryName } from "../../types/Common";
import { wantedCommentType, wantedCommentTypeMap } from "../../types/Common";
// 컴포넌트들 임포트
import ProgressSercion from "../../components/PostPage/ProgressSecion";
import CommentSection from "../../components/PostPage/CommetSection";
import ImageSection, {
  UploadImage,
} from "../../components/PostPage/ImageSection";
import TitleContentSection from "../../components/PostPage/TitleContentSection";
import CategorySection from "../../components/PostPage/CategorySection";
import SubmitSection from "../../components/PostPage/SubmitSection";

// 각섹션에 해당하는 기능/상태관리는 번호를 부여함

const PostWrite = () => {
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
      <ProgressSercion active={active} setActive={setActive} />

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
        />
        <CommentSection
          commentTypes={commentTypes}
          toggleCommentType={toggleCommentType}
        />
      </section>
      <SubmitSection />
    </div>
  );
};

export default PostWrite;

import { useState } from "react";
import TitleContentSection from "../section/PostWriteSection/TitleContentSection";
import ImageSection, {
  UploadImage,
} from "../section/PostWriteSection/ImageSection";
import { useEditPost } from "../../../hooks/post/useEditPost";
import SubmitSection from "../section/PostWriteSection/SubmitSection";

type Props = {
  postId: number;
  categoryId: number;
  initialTitle: string;
  initialContent: string;
  initialImageUrls: string[];
  onCancel: () => void;
  onSuccess: () => void;
};

export default function PostEditForm({
  postId,
  categoryId,
  initialTitle,
  initialContent,
  initialImageUrls,
  onCancel,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  // write와 동일한 이미지 상태를 사용
  const [images, setImages] = useState<UploadImage[]>([]);
  // 기존 이미지 URL은 별도 상태로 들고 있다가, 새 파일 선택 시 비우기
  const [remainInitialUrls, setRemainInitialUrls] =
    useState<string[]>(initialImageUrls);

  const { mutateAsync, isPending } = useEditPost(postId);

  const handleSubmit = async () => {
    if (!title.trim()) return alert("제목을 입력해주세요!");
    if (!content.trim()) return alert("내용을 입력해주세요!");

    try {
      await mutateAsync({
        data: { title, content, categoryId },
        // 새로 선택한 이미지가 있을 때만 전송 (없으면 유지)
        images: images.length > 0 ? images.map((img) => img.file) : undefined,
      });
      console.log("이미지들", images)
      alert("수정 완료!");
      onSuccess();
    } catch (e) {
      console.error(e);
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-[5rem]">
      <TitleContentSection
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        headerText="글 수정하기"
        showDraftButton={false}
      />

      <ImageSection
        images={images}
        setImages={setImages}
        maxImages={5}
        initialImageUrls={remainInitialUrls}
        setInitialImageUrls={setRemainInitialUrls}
      />

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className=" w-[13rem] h-[3.75rem] rounded-[0.5rem] px-[4.31rem] py-[1.13rem] items-center bg-gray-100"
        >
          취소
        </button>

        <SubmitSection
          disabled={isPending}
          isLoading={isPending}
          onSubmit={handleSubmit}
          label="수정 완료"
          loadingLabel="수정 중..."
        />
      </div>
    </div>
  );
}

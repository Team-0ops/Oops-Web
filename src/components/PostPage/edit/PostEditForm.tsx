import { useMemo, useState } from "react";
import { useEditPost } from "../../../hooks/post/useEditPost";

type Props = {
    postId: number;
    categoryId: number;
  
    initialTitle: string;
    initialContent: string;
    initialImageUrls: string[]; // post.images ?? []
  
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
  
    // null이면 "기존 이미지 유지", File[]이면 "새 이미지로 전체 교체"
    const [imageFiles, setImageFiles] = useState<File[] | null>(null);
  
    const previewUrls = useMemo(() => {
      if (imageFiles === null) return initialImageUrls;
      return imageFiles.map((f) => URL.createObjectURL(f));
    }, [imageFiles, initialImageUrls]);
  
    const { mutateAsync, isPending } = useEditPost(postId);
  
    const onPickImages = (files: FileList | null) => {
      if (!files) return;
      setImageFiles(Array.from(files)); // 선택하면 전체 교체로 간주
    };
  
    const onKeepImages = () => setImageFiles(null);
  
    const onSubmit = async () => {
      try {
        await mutateAsync({
          data: { title, content, categoryId },
          images: imageFiles ?? undefined, // null이면 미전송(유지)
        });
        onSuccess();
      } catch (e) {
        console.error(e);
        alert("수정에 실패했습니다.");
      }
    };
  
    return (
      <section className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[1.05rem] font-semibold text-[#111]">게시글 수정</h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-[0.9rem] text-[#777]"
            disabled={isPending}
          >
            취소
          </button>
        </div>
  
        <div className="mb-3">
          <label className="block text-[0.9rem] text-[#333] mb-2">제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-[3rem] px-4 rounded-[0.6rem] border border-[#e4e4e4] outline-none"
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-[0.9rem] text-[#333] mb-2">본문</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[10rem] p-4 rounded-[0.6rem] border border-[#e4e4e4] outline-none resize-none"
          />
        </div>
  
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-[0.9rem] text-[#333]">이미지</label>
            <button
              type="button"
              onClick={onKeepImages}
              className="text-[0.85rem] text-[#666] underline"
              disabled={isPending}
            >
              기존 이미지 유지
            </button>
          </div>
  
          {previewUrls.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 mb-3">
              {previewUrls.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="w-full aspect-square rounded-[0.5rem] overflow-hidden bg-[#f3f3f3]"
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[0.85rem] text-[#999] mb-3">
              첨부된 이미지가 없습니다.
            </div>
          )}
  
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => onPickImages(e.target.files)}
            disabled={isPending}
          />
  
          <div className="text-[0.8rem] text-[#888] mt-2">
            ※ 새 이미지를 선택하면 기존 이미지는 전체 교체됩니다.
          </div>
        </div>
  
        <button
          type="button"
          onClick={onSubmit}
          disabled={isPending}
          className="w-full h-[3.25rem] rounded-[0.8rem] bg-[#111] text-white font-semibold disabled:opacity-50"
        >
          {isPending ? "수정 중..." : "작성(수정 완료)"}
        </button>
      </section>
    );
  }
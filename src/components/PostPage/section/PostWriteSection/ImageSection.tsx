import React, { useEffect, useRef } from "react";
import Plus from "../../../../assets/icons/Plus.svg?react";
import ImageUpload from "../../../../assets/icons/ImageUpload.svg?react";
import X from "../../../../assets/icons/X.svg?react";

export type UploadImage = { file: File; previewUrl: string }; // 업로드된 이미지 1개를 표현하는 타입

// 컴포넌트가 부모로부터 받아야 하는 props 타입 정의
type Props = {
  images: UploadImage[] | null; // 업로드된 이미지들의 목록
  setImages: React.Dispatch<React.SetStateAction<UploadImage[]>>; // React 상태 업데이트 함수
  maxImages: number;
};

const ImageSection = ({ images, setImages, maxImages }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const currentCount = images.length;
    const remain = maxImages - currentCount;
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

  const removeImage = (idx: number) => {
    setImages((prev) => {
      const target = prev[idx];
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  };

  // 컴포넌트 언마운트 시 미리보기 URL 정리
  const imagesRef = useRef<UploadImage[]>(images);
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, []);

  return (
    <section className="w-full flex flex-col gap-[1.25rem]">
      <div className="">이미지 추가</div>

      {/* 파일 인풋 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="flex gap-[1.25rem]">
        {/* 이미지 미리보기 */}
        {images.map((img, idx) => (
          <div
            key={img.previewUrl}
            className="relative w-[12.5rem] h-[12.5rem] rounded-[0.5rem] border-[0.06rem] border-[#e4e4e4] border-solid bg-[#fafafa] overflow-hidden"
          >
            <img src={img.previewUrl} className="w-full h-full object-cover" />

            {/* 삭제 버튼 */}
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#e4e4e4] flex items-center justify-center cursor-pointer"
              aria-label="remove image"
            >
              <X />
            </button>
          </div>
        ))}

        {/* 추가 버튼 (5장 미만일 때만 보이게) */}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={openFilePicker}
            className="flex gap-[1.88rem] justify-center items-center"
          >
            {/* 이미지가 있을 때만 img 렌더 */}
            {images.length == 0 && (
              <div className="cursor-pointer">
                <ImageUpload />
              </div>
            )}

            {images.length > 0 && (
              <div className="cursor-pointer">
                <Plus />
              </div>
            )}
          </button>
        )}
      </div>
      <div className="flex flex-col gap-[0.75rem]">
        <span className="text-[#8f8f8f]">10MB 이하의 jpg, png 파일만 업로드 가능합니다.</span>
        <span className="text-[#8f8f8f]">이미지는 최대 {maxImages}장까지 업로드할 수 있습니다.</span>
      </div>
    </section>
  );
};

export default React.memo(ImageSection);

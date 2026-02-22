import React, { useEffect, useRef } from "react";
import Plus from "../../../../assets/icons/Plus.svg?react";
import ImageUpload from "../../../../assets/icons/ImageUpload.svg?react";
import X from "../../../../assets/icons/X.svg?react";

export type UploadImage = { file: File; previewUrl: string };

type Props = {
  images: UploadImage[];
  setImages: React.Dispatch<React.SetStateAction<UploadImage[]>>;
  maxImages: number;

  initialImageUrls?: string[];
  setInitialImageUrls?: React.Dispatch<React.SetStateAction<string[]>>; // ✅ 추가
};

const ImageSection = ({
  images,
  setImages,
  maxImages,
  initialImageUrls = [],
  setInitialImageUrls,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => fileInputRef.current?.click();

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    // 남은 자리 계산: (기존URL + 새파일) 총합 기준으로 제한
    const currentCount = images.length + initialImageUrls.length;
    const remain = maxImages - currentCount;
    if (remain <= 0) return;

    const selected = Array.from(files);

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

  const removeUploadedImage = (idx: number) => {
    setImages((prev) => {
      const target = prev[idx];
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const removeInitialUrl = (idx: number) => {
    if (!setInitialImageUrls) {
      return;
    } // edit에서만 쓰는 삭제 기능
    setInitialImageUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  // 언마운트 시 objectURL 정리
  const imagesRef = useRef<UploadImage[]>(images);
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, []);

  const totalCount = images.length + initialImageUrls.length;

  return (
    <section className="w-full flex flex-col gap-[1.25rem]">
      <div>이미지 추가</div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="flex gap-[1.25rem] flex-wrap">
        {/* 1) 기존 URL 프리뷰 */}
        {initialImageUrls.map((url, idx) => (
          <div
            key={`${url}-${idx}`}
            className="relative w-[12.5rem] h-[12.5rem] rounded-[0.5rem] border-[0.06rem] border-[#e4e4e4] border-solid bg-[#fafafa] overflow-hidden"
          >
            <img src={url} alt="" className="w-full h-full object-cover" />

            <button
              type="button"
              onClick={() => removeInitialUrl(idx)}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#e4e4e4] flex items-center justify-center cursor-pointer"
              aria-label="remove image"
            >
              <X />
            </button>
          </div>
        ))}

        {/* 2) 새로 업로드한 파일 프리뷰 */}
        {images.map((img, idx) => (
          <div
            key={img.previewUrl}
            className="relative w-[12.5rem] h-[12.5rem] rounded-[0.5rem] border-[0.06rem] border-[#e4e4e4] border-solid bg-[#fafafa] overflow-hidden"
          >
            <img
              src={img.previewUrl}
              alt=""
              className="w-full h-full object-cover"
            />

            <button
              type="button"
              onClick={() => removeUploadedImage(idx)}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#e4e4e4] flex items-center justify-center cursor-pointer"
              aria-label="remove image"
            >
              <X />
            </button>
          </div>
        ))}

        {/* 3) 추가 버튼 */}
        {totalCount < maxImages && (
          <button
            type="button"
            onClick={openFilePicker}
            className="flex gap-[1.88rem] justify-center items-center"
          >
            {totalCount === 0 ? (
              <div className="cursor-pointer">
                <ImageUpload />
              </div>
            ) : (
              <div className="cursor-pointer">
                <Plus />
              </div>
            )}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-[0.75rem]">
        <span className="text-[#8f8f8f]">
          10MB 이하의 jpg, png 파일만 업로드 가능합니다.
        </span>
        <span className="text-[#8f8f8f]">
          이미지는 최대 {maxImages}장까지 업로드할 수 있습니다.
        </span>
      </div>
    </section>
  );
};

export default React.memo(ImageSection);

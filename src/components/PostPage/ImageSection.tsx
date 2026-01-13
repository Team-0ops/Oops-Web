import React, { useEffect, useRef } from "react";
import Plus from "../../assets/icons/Plus.svg?react";
import BasicImage from "../../assets/icons/BasicImage.svg?react";

export type UploadImage = { file: File; previewUrl: string }; // 업로드된 이미지 1개를 표현하는 타입 

// 컴포넌트가 부모로부터 받아야 하는 props 타입 정의
type Props = {
  images: UploadImage[]; // 업로드된 이미지들의 목록
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
          {images.length < maxImages && (
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
  );
};

export default React.memo(ImageSection);

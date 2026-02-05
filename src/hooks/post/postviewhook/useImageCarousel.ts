import { useEffect, useMemo, useState } from "react";

type Params = {
  images: string[];
  resetKey?: string | number;
};

export function useImageCarousel({ images, resetKey }: Params) {
  const normalizedImages = useMemo(() => images ?? [], [images]);
  const hasImages = normalizedImages.length > 0;

  const [imgIdx, setImgIdx] = useState(0);

  // 탭/게시글 변경 시 인덱스 초기화
  useEffect(() => {
    setImgIdx(0);
  }, [resetKey]);

  const prev = () => {
    if (!hasImages) return;
    setImgIdx((p) => (p === 0 ? normalizedImages.length - 1 : p - 1));
  };

  const next = () => {
    if (!hasImages) return;
    setImgIdx((p) => (p + 1) % normalizedImages.length);
  };

  return {
    images: normalizedImages,
    hasImages,
    imgIdx,
    prev,
    next,
    isMulti: normalizedImages.length > 1,
  };
}

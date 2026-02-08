import { useEffect, useMemo, useState } from "react";

type Params = {
  images: string[];
  resetKey?: string | number;
};

export function useImageCarousel({ images, resetKey }: Params) {
  const imgs = useMemo(() => images ?? [], [images]);
  const hasImages = imgs.length > 0;
  const isMulti = imgs.length > 1;

  const [imgIdx, setImgIdx] = useState(0);

  // 탭/게시글 변경 시 인덱스 초기화
  useEffect(() => {
    setImgIdx(0);
  }, [resetKey]);

  const prev = () => {
    if (!hasImages) return;
    setImgIdx((p) => (p === 0 ? imgs.length - 1 : p - 1)); //  무한 순환
  };

  const next = () => {
    if (!hasImages) return;
    setImgIdx((p) => (p + 1) % imgs.length); //  무한 순환
  };

  return {
    images: imgs,
    hasImages,
    imgIdx,
    prev,
    next,
    isMulti,
  };
}

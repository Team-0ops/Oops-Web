import { useImageCarousel } from "../../../../hooks/post/postviewhook/useImageCarousel";
import LeftIcon from "../../../../assets/icons/LeftIcon.svg?react";
import RightIcon from "../../../../assets/icons/RightIcon.svg?react";


type Props = {
  postId: number | string;
  images: string[];
};

export default function PostImagesSection({ postId, images }: Props) {
  const { images: imgs, hasImages, imgIdx, prev, next, isMulti } =
    useImageCarousel({
      images,
      resetKey: postId,
    });

  if (!hasImages) return null;

  return (
    <section>
      {/* w-full + h 고정 */}
      <div className="w-full h-[38.25rem] rounded-[0.5rem] overflow-hidden bg-[#f3f3f3]">
        <div className="relative w-full h-full">
          <img
            src={imgs[imgIdx]}
            alt=""
            className="w-full h-full object-contain"
          />

          {/* 이미지가 2장 이상일 때만 버튼 노출 */}
          {isMulti && (
            <div className="absolute bottom-3 right-3 flex gap-[1.88rem]">
              <button
                type="button"
                onClick={prev}
                className="cursor-pointer"
                aria-label="prev image"
              >
                <LeftIcon />
              </button>
              <button
                type="button"
                onClick={next}
                className="cursor-pointer"
                aria-label="next image"
              >
                <RightIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { useImageCarousel } from "../../../../hooks/post/postviewhook/useImageCarousel";

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
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 bottom-3 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center"
                aria-label="prev image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 bottom-3 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center"
                aria-label="next image"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

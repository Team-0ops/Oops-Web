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

  return (
    <section>
      <div className="w-full max-h-[53.8125rem] rounded-[0.5rem] overflow-hidden">
        {hasImages ? (
          <div className="relative">
            <img src={imgs[imgIdx]} alt="" className="w-full h-full" />

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
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

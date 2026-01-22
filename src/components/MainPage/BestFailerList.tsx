import { PostCard } from "../common/PostCard";
import NextArrow from "../../assets/icons/NextArrow.svg?react";
import BestFailer from "../../assets/icons/BestFailer.svg?react";
import {useGetHomeBestPost} from "../../hooks/post/useGetHomeBestPost.ts";

export const BestFailerList = () => {
  const { data , error, isLoading } = useGetHomeBestPost();

  if (isLoading) { return <>Loading...</>; }
  if (error) return <>Error</>;

  console.log(data);
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-end pb-6 border-b border-b-[#D2D2D2]">
          <div className="flex flex-col gap-4">
            <BestFailer/>
            <div className="flex flex-col gap-2">
              <div className="h1">베스트 Failer</div>
              <div className="body2 text-[#464646]">가장 웁스스러운 글들이 모여있는 명예의 전당</div>
            </div>
          </div>
          <button className="body3 flex items-center gap-2 hover:underline text-[#6F6F6F]">
            전체 보기
            <NextArrow/>
          </button>
        </div>
        <div className="flex flex-col gap-7.5">
          {data?.result.posts?.map((post) => (
              <PostCard
                  key={post.postId}
                  postId={post.postId}
                  title={post.title}
                  content={post.content}
                  imageUrl={post.image ?? "null"} // null이면 기본 이미지
                  likes={post.likes}
                  comments={post.comments}
                  views={post.views}
                  category={post.categoryOrTopicName}
              />
          ))}
        </div>
      </div>
    </>
  );
};

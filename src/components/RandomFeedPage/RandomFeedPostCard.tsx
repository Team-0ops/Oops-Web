import { memo } from "react";
import { useNavigate } from "react-router-dom";
import Like from "../../assets/icons/Like.svg?react";
import Comment from "../../assets/icons/Comment.svg?react";
import View from "../../assets/icons/View.svg?react";

interface RandomFeedPostCardProps {
  postId: number | undefined;
  title: string;
  content: string;
  image?: string | null;
  likes: number;
  comments: number;
  views: number;
  category: string;
  author?: {
    id: string | number;
    name: string;
    avatar?: string | null;
  };
  date?: string;
}

export const RandomFeedPostCard = memo((postData: RandomFeedPostCardProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-[30px]">
        <div
          className="flex gap-[50px] items-center cursor-pointer"
          onClick={() => postData.postId !== undefined && navigate(`/posts/${postData.postId}`)}
        >
          <div className="flex flex-col gap-[30px] flex-1">
            <div className="flex flex-col gap-[15px] text-[#262627]">
              <h3 className="text-[24px] font-bold leading-[100%]">
                {postData.title}
              </h3>
              <p className="text-[18px] font-normal leading-[30px]">
                {postData.content}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-[30px] items-center flex-1">
                <div className="flex gap-[10px] items-center">
                  <div className="w-8 h-8 bg-[#D2D2D2] rounded-[50px]" />
                  <span className="text-[14px] font-normal text-[#6F6F6F]">
                    {postData.author?.name || "닉네임최대"}
                  </span>
                </div>
                <div className="flex gap-[20px] items-center">
                  <div className="flex gap-[10px] items-center">
                    <Like className="w-6 h-6" />
                    <span className="text-[14px] font-normal text-[#6F6F6F]">
                      {postData.likes}
                    </span>
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <Comment className="w-6 h-6" />
                    <span className="text-[14px] font-normal text-[#6F6F6F]">
                      {postData.comments}
                    </span>
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <View className="w-6 h-6" />
                    <span className="text-[14px] font-normal text-[#6F6F6F]">
                      {postData.views}
                    </span>
                  </div>
                </div>
                <span className="text-[14px] font-normal text-[#6F6F6F]">
                  {postData.date || "2일 전"}
                </span>
              </div>
              <button className="caption1 h-9 px-[13px] py-[9px] flex justify-center items-center rounded-[30px] border border-[#B3E378] bg-[#E6F3D7] text-[#262627]">
                {postData.category}
              </button>
            </div>
          </div>
          {postData.image ? (
            <img
              src={postData.image}
              alt={postData.title}
              className="w-[170px] h-[170px] rounded-[4px] object-cover shrink-0"
            />
          ) : (
            <div className="w-[170px] h-[170px] rounded-[4px] bg-[#D2D2D2] shrink-0" />
          )}
        </div>
        <hr className="h-px border border-[#D2D2D2]" />
      </div>
    </>
  );
});

RandomFeedPostCard.displayName = "RandomFeedPostCard";

export default RandomFeedPostCard;

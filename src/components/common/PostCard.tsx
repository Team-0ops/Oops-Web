import Like from "../../assets/icons/Like.svg?react";
import Comment from "../../assets/icons/Comment.svg?react";
import View from "../../assets/icons/View.svg?react";

interface PostCardProps {
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
}

export const PostCard = (postData: PostCardProps) => {
  return (
      <>
          <div className="flex flex-col gap-7.5">
              <div className="flex items-center self-stretch gap-12.5">
                  <div className="flex flex-col gap-7.5 flex-1">
                      <div className="flex flex-col gap-3.75 text-[#262627]">
                          <div className="h3 ">
                              {postData.title}
                          </div>
                          <div className="body3">
                              {postData.content}
                          </div>
                      </div>
                      <div className="caption3 flex justify-between items-center self-stretch">
                          <div className="flex gap-7.5 items-center">
                              <div className="flex gap-2.5 items-center">
                                  <div className="w-8 h-8 bg-[#D2D2D2] rounded-[3.125rem]" />
                                  <span>닉네임최대</span>
                              </div>
                              <div className="flex gap-5">
                                  <div className="flex items-center gap-2.5">
                                      <Like />
                                      <span>{postData.likes}</span>
                                  </div>
                                  <div className="flex items-center gap-2.5">
                                      <Comment />
                                      <span>{postData.comments}</span>
                                  </div>
                                  <div className="flex items-center gap-2.5">
                                      <View />
                                      <span>{postData.views}</span>
                                  </div>
                              </div>
                              <div>
                                  2일 전
                              </div>
                          </div>
                          <button className="caption1 w-25 h-9 flex justify-center items-center rounded-[1.875rem] border-[#B3E378] bg-[#E6F3D7]">
                              {postData.category}
                          </button>
                      </div>
                  </div>
                  {/*post image 같은 경우 api에 사진이 안나와서 테스트 진행 불가능 이후 백엔드한테 부탁해서 사진 있는 경우 넣을 예정*/}
                  {postData.image ? <></>: <div className="w-42.5 h-42.5 shrink-0 overflow-hidden rounded-sm bg-gray-100" />}
              </div>
              <hr className="h-px border border-[#D2D2D2]" />
          </div>
      </>
  );
};

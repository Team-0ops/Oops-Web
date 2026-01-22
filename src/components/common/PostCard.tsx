import Like from "../../assets/icons/Like.svg?react";
import Comment from "../../assets/icons/Comment.svg?react";
import View from "../../assets/icons/View.svg?react";

export const PostCard = () => {
  return (
      <>
          <div className="flex flex-col gap-7.5">
              <div className="flex items-center self-stretch gap-12.5">
                  <div className="flex flex-col gap-7.5 flex-1">
                      <div className="flex flex-col gap-3.75 text-[#262627]">
                          <div className="h3 ">
                              나 오늘 부장님한테 어쩌고
                          </div>
                          <div className="body3">
                              어쩜 이렇게 하늘은 더 파란 건지 오늘따라 왜 바람은 또 완벽한지 그냥 모르는 척 하나 못들은 척 지워버린 척 딴 얘길 시작할까 아무 말 못하게 입맞출까 눈물이 차올라서 고갤 들어 흐르지 못하게 또 살짝 웃어 내가 왜이러
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
                                      <span>좋아요</span>
                                  </div>
                                  <div className="flex items-center gap-2.5">
                                      <Comment />
                                      <span>댓글</span>
                                  </div>
                                  <div className="flex items-center gap-2.5">
                                      <View />
                                      <span>조회수</span>
                                  </div>
                              </div>
                              <div>
                                  2일 전
                              </div>
                          </div>
                          <button className="caption1 w-25 h-9 flex justify-center items-center rounded-[1.875rem] border-[#B3E378] bg-[#E6F3D7]">
                              카테고리
                          </button>
                      </div>
                  </div>
                  <div className="w-42.5 h-42.5 flex-shrink-0 overflow-hidden rounded-sm bg-gray-100" />
              </div>
              <hr className="h-px border border-[#D2D2D2]" />
          </div>
      </>
  );
};

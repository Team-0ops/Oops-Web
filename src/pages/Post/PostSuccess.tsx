import OopsIcon from "../../assets/icons/OopsIcon.svg?react";
import OopsTypo from "../../assets/icons/OopsTypo.svg?react";
import MainButton from "../../assets/icons/MainBackButton.svg?react";
import PostButton from "../../assets/icons/PostBackButton.svg?react";

import { useNavigate } from "react-router-dom";

const PostSuccess = () => {
  const navigate = useNavigate();

  const postId = localStorage.getItem("postId");

  const handleSuccess = () => {
    navigate(`/posts/${postId}`);
    localStorage.removeItem("postId");
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="text-center flex flex-col gap-[6.25rem]">
        <div className="flex flex-col items-center gap-[1.25rem]">
          <OopsIcon />
          <OopsTypo />
        </div>
        <div className="flex flex-col gap-[0.81rem]">
          <h1 className="text-2xl font-bold">작성 완료!</h1>
          <p>10포인트 제공 완료</p>
        </div>
        <div className="flex gap-[1.25rem]">
          <button className="cursor-pointer" onClick={() => navigate("/")}>
            <MainButton />
          </button>
          <button className="cursor-pointer" onClick={handleSuccess}>
            <PostButton />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostSuccess;

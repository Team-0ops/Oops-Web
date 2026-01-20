import React from "react";

const SubmitSection = () => {
  return (
    <section className="flex justify-end items-center mt-[-1.88rem]">
      <button className="w-[13rem] h-[3.75rem] rounded-[0.5rem] px-[4.31rem] py-[1.13rem] cursor-pointer items-center bg-[#B3E378]">
        작성하기
      </button>
    </section>
  );
};

export default React.memo(SubmitSection);

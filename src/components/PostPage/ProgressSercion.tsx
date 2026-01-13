import React from "react";

type ActiveStatus = "OOPS" | "OVERCOMING" | "OVERCOME";

type Props = {
  active: ActiveStatus;
  setActive: React.Dispatch<React.SetStateAction<ActiveStatus>>;
};

const ProgressSection = ({ active, setActive }: Props) => {
  const buttonClass =
    "flex justify-center items-center rounded-[2.5rem] py-[0.6875rem] px-[3.3125rem] transition-colors";

  const getButtonClass = (type: ActiveStatus) =>
    `${buttonClass} ${active === type ? "bg-[#b3e378]" : "bg-[#e6f3d7]"}`;

  return (
    <section className="w-full flex flex-col gap-[2.5rem]">
      <div>진행상황 선택</div>
      <div className="flex gap-4 justify-start items-center">
        <button className={getButtonClass("OOPS")} onClick={() => setActive("OOPS")}>
          웁스 중
        </button>

        <button
          className={getButtonClass("OVERCOMING")}
          onClick={() => setActive("OVERCOMING")}
        >
          극복 중
        </button>

        <button
          className={getButtonClass("OVERCOME")}
          onClick={() => setActive("OVERCOME")}
        >
          극복 완료
        </button>
      </div>
    </section>
  );
};

export default React.memo(ProgressSection);

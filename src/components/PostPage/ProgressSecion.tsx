import React from "react";

type ActiveStatus = "OOPS" | "OVERCOMING" | "OVERCOME";

type Props = {
  active: ActiveStatus;
  setActive: React.Dispatch<React.SetStateAction<ActiveStatus>>;
};

const ProgressSection = ({ active, setActive }: Props) => {
  const buttonClass =
    "flex w-full cursor-pointer items-center justify-center rounded-[1.88rem] py-[0.69rem] px-[7.75rem] transition-colors";

  const getButtonClass = (type: ActiveStatus) =>
    `${buttonClass} ${active === type ? "bg-[#b3e378]" : "bg-[#faf6e9]"}`;

  return (
    <section className="select-none w-full flex flex-col gap-[1.25rem]">
      <div>진행상황</div>
      <div className="flex gap-[2.12rem] rounded-[1.88rem] border-[0.06rem] border-solid border-[#e4e4e4] justify-between items-center bg-[#FAF6E9]">
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

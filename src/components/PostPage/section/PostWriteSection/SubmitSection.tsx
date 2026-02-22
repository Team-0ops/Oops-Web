import React from "react";

type Props = {
  onSubmit: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  label?: string;
  loadingLabel?: string;
};

const SubmitSection = ({
  onSubmit,
  disabled = false,
  isLoading = false,
  label,
  loadingLabel,
}: Props) => {
  const isDisabled = disabled || isLoading;

  return (
    <section className="flex justify-end items-center mt-[-1.88rem]">
      <button
        type="button"
        onClick={onSubmit}
        disabled={isDisabled}
        className={`w-[13rem] h-[3.75rem] rounded-[0.5rem] px-[4.31rem] py-[1.13rem] items-center
${isDisabled ? "bg-[#d9d9d9] cursor-not-allowed" : "bg-[#B3E378] cursor-pointer"}
`}
      >
        {isLoading ? (loadingLabel ?? "작성 중...") : (label ?? "작성하기")}
      </button>
    </section>
  );
};

export default React.memo(SubmitSection);

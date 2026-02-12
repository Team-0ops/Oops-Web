type Props = {
  onSave: () => void;
  disabled: boolean;
  isSaving: boolean;
  point: number;
};

export default function ProfileSaveSection({
  onSave,
  disabled,
  isSaving,
  point,
}: Props) {
  return (
    <>
      <button
        type="button"
        onClick={onSave}
        disabled={disabled}
        className="w-full h-[3rem] rounded-[0.5rem]
                   bg-[#B3E378] text-[#111] font-semibold
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSaving ? "저장 중..." : "저장"}
      </button>

      <div className="mt-[1.25rem] flex items-center gap-[1.5rem] text-[0.9rem] text-[#111]">
        <span className="text-[#444]">내 포인트</span>
        <span className="font-semibold">{point} P</span>
      </div>
    </>
  );
}

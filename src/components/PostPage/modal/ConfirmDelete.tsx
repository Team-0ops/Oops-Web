type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export default function ConfirmDelete({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 "
      onMouseDown={(e) => {
        // 바깥 클릭 닫기
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-[40.125rem] rounded-[0.5rem] bg-[#fff]
                   shadow-[0_0_9px_rgba(0,0,0,0.25)] px-[0.63rem] py-[2.5rem]
                   flex flex-col justify-center items-center gap-[6.25rem]"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col text-center gap-[1.25rem]">
          <div className="text-[1.05rem] font-semibold text-[#111]">
            삭제하시겠습니까?
          </div>
          <div className="text-[0.85rem] text-[#8a8a8a]">
            삭제된 경우, 복구할 수 없습니다.
          </div> 
        </div>

        <div className="flex justify-center items-center gap-[1.35rem]">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-[15.625rem] h-[3.125rem] rounded-[0.5rem] border-[0.06rem] border-[#b3e378]
                       bg-[#fff] text-center"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="w-[15.625rem] h-[2.5rem] rounded-[0.5rem] bg-[#b3e378]
                       text-center"
          >
            {isLoading ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </div>
    </div>
  );
}

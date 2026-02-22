interface ActionButtonsProps {
  warningButtonText: string;
  deleteButtonText: string;
  onWarningClick: () => void;
  onDeleteClick: () => void;
}

export const ActionButtons = ({
  warningButtonText,
  deleteButtonText,
  onWarningClick,
  onDeleteClick,
}: ActionButtonsProps) => {
  return (
    <div className="flex gap-3">
      {warningButtonText && (
        <button
          onClick={onWarningClick}
          className="w-full py-3 rounded-lg body1 font-semibold bg-[#B3E378] text-[#262627] hover:bg-[#A3D368] transition-colors"
        >
          {warningButtonText}
        </button>
      )}
      <button
        onClick={onDeleteClick}
        className="w-full py-3 rounded-lg body1 font-semibold bg-[#B3E378] text-[#262627] hover:bg-[#A3D368] transition-colors"
      >
        {deleteButtonText}
      </button>
    </div>
  );
};

export default ActionButtons;


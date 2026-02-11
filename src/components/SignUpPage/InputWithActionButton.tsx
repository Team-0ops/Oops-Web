import XIcon from "../../assets/icons/X.svg?react";
import Button from "../common/Button";

type InputWithActionButtonProps = {
  label: string;
  type?: "text" | "email";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  buttonText: string;
  onButtonClick: () => void;
  buttonVariant?: "default" | "confirm";
  disabled?: boolean;
  message?: string;
  messageType?: "success" | "error";
};

export const InputWithActionButton = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onClear,
  buttonText,
  onButtonClick,
  buttonVariant = "default",
  disabled = false,
  message,
  messageType,
}: InputWithActionButtonProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-start gap-8">
        <label className="font-pretendard font-bold text-[#262627] w-24">{label}</label>
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1">
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="body3 w-full h-11 items-center bg-[#FAFAFA] border-1 border-[#E4E4E4] rounded-lg px-4 pr-10 focus:border-[#6F6F6F] focus:outline-none"
            />
            {onClear && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <button
                  type="button"
                  onClick={onClear}
                  className="flex items-center justify-center"
                >
                  <XIcon className="w-5 h-5 text-[#6F6F6F] bg-[#E4E4E4] rounded-full p-1" />
                </button>
              </div>
            )}
          </div>
          <Button
            onClick={onButtonClick}
            variant={buttonVariant}
            disabled={disabled}
          >
            {buttonText}
          </Button>
        </div>
      </div>
      {message && (
        <div className={`text-xs ${messageType === "error" ? "text-[#FF6D6D]" : "text-[#65B900]"} ml-32`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default InputWithActionButton;


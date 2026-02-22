import XIcon from "../../assets/icons/X.svg?react";

type InputFieldProps = {
  label: string;
  type?: "text" | "email";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
};

export const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onClear,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-start gap-8">
        <label className="font-pretendard font-semibold text-[#262627] whitespace-nowrap w-24">{label}</label>
        <div className="relative flex-1">
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="body3 w-full h-12 items-center bg-[#FAFAFA] border-1 border-[#E4E4E4] rounded-lg px-4 pr-10 focus:border-[#6F6F6F] focus:outline-none"
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
      </div>
    </div>
  );
};

export default InputField;


import { useState } from "react";
import XIcon from "../../assets/icons/X.svg?react";
import InvisibleIcon from "../../assets/icons/Invisible.svg?react";

type PasswordFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  message?: string;
  messageType?: "success" | "error";
};

export const PasswordField = ({
  label,
  placeholder,
  value,
  onChange,
  onClear,
  message,
  messageType,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-start gap-8">
        <label className="font-pretendard font-semibold text-[#262627] whitespace-nowrap w-24">
          {label}
        </label>
        <div className="relative flex-1">
          <input
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="body3 w-full h-12 items-center bg-[#FAFAFA] border-1 border-[#E4E4E4] rounded-lg px-4 pr-20 focus:border-[#6F6F6F] focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              type="button"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
              onTouchStart={() => setShowPassword(true)}
              onTouchEnd={() => setShowPassword(false)}
              className="flex items-center justify-center"
            >
              <InvisibleIcon className="w-5 h-5" />
            </button>
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="flex items-center justify-center"
              >
                <XIcon className="w-5 h-5 text-[#6F6F6F] bg-[#E4E4E4] rounded-full p-1" />
              </button>
            )}
          </div>
        </div>
      </div>
      {message ? (
        <p
          className={`text-xs ${
            messageType === "success" ? "text-[#65b900]" : "text-[#ff6d6d]"
          } ml-32`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
};

export default PasswordField;

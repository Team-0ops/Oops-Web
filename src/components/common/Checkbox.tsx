import CheckIcon from "../../assets/icons/Check.svg?react";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
}

export const Checkbox = ({ checked, onChange, className = "" }: CheckboxProps) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
        checked
          ? "bg-[#B3E378]"
          : "bg-white border border-[#B3E378]"
      } ${className}`}
      aria-checked={checked}
      role="checkbox"
    >
      {checked && <CheckIcon className="w-4 h-4" />}
    </button>
  );
};

export default Checkbox;



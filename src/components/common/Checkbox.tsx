import React from "react";

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
      className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
        checked
          ? "bg-[#B3E378]"
          : "bg-white border border-[#B3E378]"
      } ${className}`}
      aria-checked={checked}
      role="checkbox"
    >
      {checked && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="#262627"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

export default Checkbox;



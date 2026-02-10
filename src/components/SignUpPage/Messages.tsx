import X from "../../assets/icons/ErrorXicon.svg?react";
import Check from "../../assets/icons/SuccessCheckIcon.svg?react";


export function ErrorMessage({ text }: { text: string }) {
  return (
    <>
      <X />
      <span className="text-[#ff6d6d]">{text}</span>
    </>
  );
}

export function SuccessMessage({ text }: { text: string }) {
  return (
    <>
      <Check />
      <span className="text-[#65b900]">{text}</span>
    </>
  );
}

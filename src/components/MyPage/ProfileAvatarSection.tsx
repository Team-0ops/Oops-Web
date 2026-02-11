import type { RefObject } from "react";
import CameraIcon from "../../assets/icons/CamearIcon.svg?react";

type Props = {
  currentImageSrc: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onPickImage: () => void;
  onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProfileAvatarSection({
  currentImageSrc,
  fileInputRef,
  onPickImage,
  onChangeFile,
}: Props) {
  return (
    <div className="flex ml-[7.5rem] mb-[2.5rem]">
      <div className="relative w-[17.1875rem] h-[17.1875rem] rounded-full ">
        {currentImageSrc ? (
          <img src={currentImageSrc} alt="" className="w-full h-full rounded-full object-cover object-center" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#8b8b8b] text-sm">
            No Image
          </div>
        )}

        <button
          type="button"
          onClick={onPickImage}
          className="absolute right-[0.5rem] bottom-[0.5rem] z-[100]"
          aria-label="프로필 이미지 변경"
        >
         <CameraIcon />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChangeFile}
        />
      </div>
    </div>
  );
}

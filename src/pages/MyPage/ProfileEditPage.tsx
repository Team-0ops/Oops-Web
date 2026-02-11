import { useEditMyProfile } from "../../hooks/mypage/useEditProfile";
import { useProfile } from "../../hooks/mypage/useProfile";
import { useEffect, useMemo, useRef, useState } from "react";
import type { GetMyProfileResponse } from "../../types/MyPage";

import ProfileAvatarSection from "../../components/MyPage/ProfileAvatarSection";
import NicknameField from "../../components/MyPage/NicknameField";
import EmailField from "../../components/MyPage/EmailField";
import ProfileSaveSection from "../../components/MyPage/ProfileSaveSection";

const ProfileEditPage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const profileQuery = useProfile();
  const editProfile = useEditMyProfile();

  // API 응답에서 profile 추출 (data.result)
  const profile = (profileQuery.data?.result ??
    null) as GetMyProfileResponse | null;

  // 폼 상태
  const [userName, setUserName] = useState("");
  const [emailDraft, setEmailDraft] = useState(""); // 아직 저장 로직 없음
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 조회 성공 시 초기값 세팅
  useEffect(() => {
    if (!profile) return;
    setUserName(profile.userName ?? "");
    setEmailDraft(profile.email ?? "");
    // 이미지 preview는 "선택한 파일"이 우선이라, 여기서 previewUrl은 건드리지 않음
  }, [profile?.userName, profile?.email]); // profile 전체 의존성 걸면 불필요 렌더 가능

  // 파일 미리보기 URL 생성/정리
  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const currentImageSrc = useMemo(() => {
    if (previewUrl) return previewUrl;
    if (profile?.profileImageUrl) return profile.profileImageUrl;
    return null;
  }, [previewUrl, profile?.profileImageUrl]);

  const isDirty = useMemo(() => {
    if (!profile) return false;
    const nameChanged = userName.trim() !== (profile.userName ?? "");
    const imageChanged = !!file;
    return nameChanged || imageChanged;
  }, [profile, userName, file]);

  const onPickImage = () => {
    fileInputRef.current?.click();
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
  };

  const onSave = () => {
    const trimmed = userName.trim();

    if (!trimmed) return;

    editProfile.mutate({
      userName: trimmed,
      profileImage: file ?? undefined,
    });
  };

  if (profileQuery.isLoading) {
    return (
      <div className="py-10 text-center text-[#b2b2b2]">
        프로필 불러오는 중...
      </div>
    );
  }

  if (profileQuery.isError || !profile) {
    return (
      <div className="py-10 text-center text-[#b2b2b2]">
        프로필 불러오기 실패
      </div>
    );
  }

 return (
  <section className="w-full">
    <h2 className="text-[1rem] font-semibold text-[#111] mb-[2rem]">프로필 수정</h2>

    <ProfileAvatarSection
      currentImageSrc={currentImageSrc}
      fileInputRef={fileInputRef}
      onPickImage={onPickImage}
      onChangeFile={onChangeFile}
    />

    <NicknameField value={userName} onChange={setUserName} />

    <EmailField value={emailDraft} onChange={setEmailDraft} />

    <ProfileSaveSection
      onSave={onSave}
      disabled={!isDirty || editProfile.isPending}
      isSaving={editProfile.isPending}
      point={profile.point}
    />
  </section>
);
};

export default ProfileEditPage;

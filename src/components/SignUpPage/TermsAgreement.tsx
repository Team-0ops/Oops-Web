import { useState } from "react";
import Checkbox from "../common/Checkbox";
import NextArrow from "../../assets/icons/NextArrow.svg?react";

export const TermsAgreement = () => {
  const [allAgreed, setAllAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);

  const handleAllAgree = () => {
    const newValue = !allAgreed;
    setAllAgreed(newValue);
    setTermsAgreed(newValue);
    setPrivacyAgreed(newValue);
    setMarketingAgreed(newValue);
  };

  const handleTermsAgree = () => {
    const newValue = !termsAgreed;
    setTermsAgreed(newValue);
    updateAllAgreed(newValue, privacyAgreed, marketingAgreed);
  };

  const handlePrivacyAgree = () => {
    const newValue = !privacyAgreed;
    setPrivacyAgreed(newValue);
    updateAllAgreed(termsAgreed, newValue, marketingAgreed);
  };

  const handleMarketingAgree = () => {
    const newValue = !marketingAgreed;
    setMarketingAgreed(newValue);
    updateAllAgreed(termsAgreed, privacyAgreed, newValue);
  };

  const updateAllAgreed = (
    terms: boolean,
    privacy: boolean,
    marketing: boolean
  ) => {
    const newAllAgreed = terms && privacy && marketing;
    setAllAgreed(newAllAgreed);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-start gap-8">
        <label className="font-pretendard font-bold text-[#262627] w-24">약관동의</label>
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-5">
            <Checkbox checked={allAgreed} onChange={handleAllAgree} />
            <span className="font-pretendard font-bold text-[#262627]">전체 약관 동의</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-5">
              <Checkbox checked={termsAgreed} onChange={handleTermsAgree} />
              <span className="font-pretendard text-sm font-bold text-[#262627]">이용약관 동의</span>
            </div>
            <NextArrow className="w-4 h-4 text-[#6F6F6F]" />
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-5">
              <Checkbox checked={privacyAgreed} onChange={handlePrivacyAgree} />
              <span className="font-pretendard text-sm font-bold text-[#262627]">개인정보 이용 동의</span>
            </div>
            <NextArrow className="w-4 h-4 text-[#6F6F6F]" />
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-5">
              <Checkbox checked={marketingAgreed} onChange={handleMarketingAgree} />
              <span className="font-pretendard text-sm font-bold text-[#262627]">마케팅 동의 (선택)</span>
            </div>
            <NextArrow className="w-4 h-4 text-[#6F6F6F]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAgreement;


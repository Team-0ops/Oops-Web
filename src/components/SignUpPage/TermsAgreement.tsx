import { useState, useEffect } from "react";
import Checkbox from "../common/Checkbox";
import NextArrow from "../../assets/icons/NextArrow.svg?react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTerms } from "../../hooks/terms/useTerms";

const lsKey = (id: number) => `terms_agree_${id}`;


export const TermsAgreement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { terms, requiredTerms, optionalTerms } = useTerms();
  
  const [allAgreed, setAllAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);


  console.log("terms", terms)
  const idToUrl = (id: number) => {
    const map: Record<number, string> = {
      2: "/terms1",
      3: "/terms2",
      4: "/terms3",
    };
  
    return map[id] ?? "/terms1";
  };

  // localStorage -> state 동기화 (뒤로 돌아올 때도 반영)
  useEffect(() => {
    if (terms.length === 0) return;

    const isAgreed = (id: number) => localStorage.getItem(lsKey(id)) === "true";

    // 지금 UI는 3개 fixed라서 기존처럼 1/2/3에 매핑
    // (terms가 정렬되어 있든 아니든, url과 동일하게 1/2/3로 가고 있으니 그대로 유지)
    const t1 = isAgreed(1);
    const t2 = isAgreed(2);
    const t3 = isAgreed(3);

    setTermsAgreed(t1);
    setPrivacyAgreed(t2);
    setMarketingAgreed(t3);

    // 전체 약관 동의는 "모든 REQUIRED + 모든 OPTIONAL" true일 때만 true
    const reqAll = requiredTerms.every((t) => isAgreed(t.id));
    const optAll = optionalTerms.every((t) => isAgreed(t.id));
    setAllAgreed(reqAll && optAll);
  }, [location.key, terms.length, requiredTerms, optionalTerms]);

  const setOptionalTrue = () => {
    for (const t of optionalTerms) {
      localStorage.setItem(lsKey(t.id), "true");
    }
    // 현재 UI 상태 (id=3이 OPTIONAL이라는 가정이지만, optionalTerms 기준으로도 처리됨)
    if (optionalTerms.some((t) => t.id === 3)) setMarketingAgreed(true);
  };

  const handleAllAgree = () => {
    // 전체동의가 이미 true면: 전체 해제(원래 UX 유지)
    if (allAgreed) {
      // 전부 해제
      for (const t of terms) localStorage.removeItem(lsKey(t.id));

      setAllAgreed(false);
      setTermsAgreed(false);
      setPrivacyAgreed(false);
      setMarketingAgreed(false);
      return;
    }

    // 전체동의 시작: OPTIONAL은 즉시 체크
    setOptionalTrue();

    // 요구사항 1/3: REQUIRED 중 아직 동의 안 한 첫번째로 이동
    const nextRequired = requiredTerms
      .slice()
      .sort((a, b) => a.id - b.id)
      .find((t) => localStorage.getItem(lsKey(t.id)) !== "true");

    if (!nextRequired) {
      // REQUIRED가 이미 전부 동의되어있으면 전체동의 true로 만들 수 있음
      // (옵션은 위에서 체크함)
      setAllAgreed(true);
      return;
    }

    navigate(idToUrl(nextRequired.id));
  };

  // 요구사항 5: REQUIRED는 개별 체크 시 "바로 체크 X", 해당 URL로 이동
  // (이미 체크된 REQUIRED를 해제하는 건 허용)
  const handleTermsAgree = () => {
    if (!termsAgreed) {
      navigate("/terms1");
      return;
    }
    // 해제
    localStorage.removeItem(lsKey(1));
    setTermsAgreed(false);
    setAllAgreed(false);
  };

  const handlePrivacyAgree = () => {
    if (!privacyAgreed) {
      navigate("/terms2");
      return;
    }
    // 해제
    localStorage.removeItem(lsKey(2));
    setPrivacyAgreed(false);
    setAllAgreed(false);
  };

  // OPTIONAL은 개별 토글 가능
  const handleMarketingAgree = () => {
    const newValue = !marketingAgreed;
    setMarketingAgreed(newValue);

    if (newValue) localStorage.setItem(lsKey(3), "true");
    else localStorage.removeItem(lsKey(3));

    // 전체동의 여부는 effect에서 계산되지만, 즉시 UX 반영하고 싶으면:
    setAllAgreed(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-start gap-8">
        <label className="font-pretendard font-bold text-[#262627] w-24">
          약관동의
        </label>
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-5">
            <Checkbox checked={allAgreed} onChange={handleAllAgree} />
            <span className="font-pretendard font-bold text-[#262627]">
              전체 약관 동의
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-5">
              <Checkbox checked={termsAgreed} onChange={handleTermsAgree} />
              <button type="button" onClick={() => navigate("/terms1")}>
                <span className="font-pretendard text-sm font-bold text-[#262627]">
                  이용약관 동의
                </span>
              </button>
            </div>
            <button type="button" onClick={() => navigate("/terms1")}>
              <NextArrow className="w-4 h-4 text-[#6F6F6F]" />
            </button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-5">
              <Checkbox checked={privacyAgreed} onChange={handlePrivacyAgree} />
              <button type="button" onClick={() => navigate("/terms2")}>
                <span className="font-pretendard text-sm font-bold text-[#262627]">
                  개인정보 이용 동의
                </span>
              </button>
            </div>
            <button type="button" onClick={() => navigate("/terms2")}>
              <NextArrow className="w-4 h-4 text-[#6F6F6F]" />
            </button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-5">
              <Checkbox
                checked={marketingAgreed}
                onChange={handleMarketingAgree}
              />
              <button type="button" onClick={() => navigate("/terms3")}>
                <span className="font-pretendard text-sm font-bold text-[#262627]">
                  마케팅 동의 (선택)
                </span>
              </button>
            </div>
            <button type="button" onClick={() => navigate("/terms3")}>
              <NextArrow className="w-4 h-4 text-[#6F6F6F]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAgreement;

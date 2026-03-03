import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import CardFlip from "./CardFlip";
import FullResultCard from "./FullResultCard";
import { requestLuckyDraw, getUserProfile } from "../../apis/luckyDrawApi";
import type { LuckyCard } from "../../types/lucky";
import type { CustomAxiosError } from "../../types/AxiosError";
import {
  MIN_POINT_TO_DRAW,
  DELAY_BEFORE_RESULT_MS,
  DELAY_BEFORE_FULL_CARD_MS,
} from "./constants";
import LeftArrow from "../../assets/icons/LeftArrow.svg?react";
import OctoSvg from "../../assets/icons/octopus.svg?react";
import BunnySvg from "../../assets/icons/rabit.svg?react";
import WhaleSvg from "../../assets/icons/whale.svg?react";
import PenguinSvg from "../../assets/icons/penguin.svg?react";
import CatSvg from "../../assets/icons/cat.svg?react";
import PuppySvg from "../../assets/icons/puppy.svg?react";
import TurtleSvg from "../../assets/icons/turtle.svg?react";
import BearSvg from "../../assets/icons/bear.svg?react";
import CrocoSvg from "../../assets/icons/crocodile.svg?react";

const Octo = () => <OctoSvg className="w-full h-full object-contain" />;
const Bunny = () => <BunnySvg className="w-full h-full object-contain" />;
const Whale = () => <WhaleSvg className="w-full h-full object-contain" />;
const Penguin = () => <PenguinSvg className="w-full h-full object-contain" />;
const Cat = () => <CatSvg className="w-full h-full object-contain" />;
const Puppy = () => <PuppySvg className="w-full h-full object-contain" />;
const Turtle = () => <TurtleSvg className="w-full h-full object-contain" />;
const Bear = () => <BearSvg className="w-full h-full object-contain" />;
const Croco = () => <CrocoSvg className="w-full h-full object-contain" />;

// 카드 설정 (keywords = API name 매칭)
const CARD_CONFIG: ReadonlyArray<{
  keywords: readonly string[];
  Component: React.FC;
}> = [
  { keywords: ["문어"], Component: Octo },
  { keywords: ["토끼"], Component: Bunny },
  { keywords: ["고래"], Component: Whale },
  { keywords: ["펭"], Component: Penguin },
  { keywords: ["냥"], Component: Cat },
  { keywords: ["강아지", "멍"], Component: Puppy },
  { keywords: ["꾸준", "거북이"], Component: Turtle },
  { keywords: ["곰"], Component: Bear },
  { keywords: ["악어", "아거"], Component: Croco },
];

const cardList = CARD_CONFIG.map((c) => c.Component);

const getIndexFromName = (name: string): number => {
  const index = CARD_CONFIG.findIndex((config) =>
    config.keywords.some((k) => name.includes(k))
  );
  return index >= 0 ? index : 0;
};

const LuckyDraw = () => {
  const [forceStop, setForceStop] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showFullCard, setShowFullCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<LuckyCard & { FrontComponent: React.FC } | null>(null);
  const [userPoint, setUserPoint] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoint = async () => {
      try {
        const res = await getUserProfile();
        setUserPoint(res.result.point);
      } catch (e) {
        console.error("포인트 조회 실패", e);
      }
    };
    fetchPoint();
  }, []);

  const handleCloseResult = useCallback(() => {
    setShowFullCard(false);
    setShowResult(false);
    setForceStop(false);
    setSelectedIndex(null);
    setSelectedCard(null);
  }, []);

  const handleDrawClick = useCallback(async () => {
    setForceStop(true);

    try {
      const result = await requestLuckyDraw();
      const luckyCard = result.result;
      if (!luckyCard) throw new Error("부적 정보 없음");

      const index = getIndexFromName(luckyCard.name);
      const frontComponent = cardList[index];

      setSelectedCard({ ...luckyCard, FrontComponent: frontComponent });
      setSelectedIndex(index);

      setTimeout(() => {
        setShowResult(true);
        setTimeout(() => {
          setShowFullCard(true);
        }, DELAY_BEFORE_FULL_CARD_MS);
      }, DELAY_BEFORE_RESULT_MS);
    } catch (e: unknown) {
      console.error("API 오류:", e);

      let message = "부적 뽑기 실패!";
      if ((e as AxiosError).isAxiosError) {
        const axiosError = e as CustomAxiosError;
        const serverMessage = axiosError.response?.data?.message;
        if (serverMessage) message = serverMessage;
      } else if (e instanceof Error) {
        message = e.message;
      }

      alert(message);
      setForceStop(false);
    }
  }, []);

  const isDrawDisabled = userPoint < MIN_POINT_TO_DRAW || forceStop;

  return (
    <div className="w-full flex flex-col items-center relative bg-[#FFFBF8] min-h-screen px-[20px]">
      {showFullCard && selectedCard && (
        <FullResultCard onClose={handleCloseResult} card={selectedCard} />
      )}

      <button
        onClick={() => navigate("/")}
        className="w-[24px] h-[24px] self-start mt-[20px] z-30"
      >
        <LeftArrow />
      </button>

      <div className="flex flex-col items-center z-30">
        <h1 className="text-[24px] font-bold mt-[21px] mb-[12px]">행운 부적 추첨</h1>
        <p className="text-[14px] text-[#4D4D4D]">나에게 행운을 가져다줄 행운 부적을</p>
        <p className="text-[14px] text-[#4D4D4D] mb-[12px]">뽑아보세요!</p>
      </div>

      <div className="grid grid-cols-3 gap-[18px] mb-[65px] justify-items-center z-30">
        {cardList.map((CardComponent, idx) => (
          <CardFlip
            key={idx}
            forceStop={forceStop}
            isWinner={showResult && selectedIndex === idx}
            FrontCard={CardComponent}
          />
        ))}
      </div>

      <button
        onClick={handleDrawClick}
        disabled={isDrawDisabled}
        className={`h-[63px] w-[335px] rounded-[4px] text-[16px] font-semibold mb-[20px] z-30
          ${isDrawDisabled
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-[#B3E378] text-black"
          }`}
      >
        {userPoint < MIN_POINT_TO_DRAW
          ? `${MIN_POINT_TO_DRAW}포인트가 모이면 뽑을 수 있어요!`
          : "행운 부적 뽑으러 가기"}
      </button>
    </div>
  );
};

export default LuckyDraw;

import { memo } from "react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import BackSvg from "../../assets/icons/back.svg?react";

const Verso = () => (
  <BackSvg className="w-full h-full" />
);

interface CardFlipProps {
  forceStop: boolean;
  isWinner?: boolean;
  FrontCard: React.FC;
}

const CardFlip = memo(({ forceStop, isWinner, FrontCard }: CardFlipProps) => {
  const [rotateY, setRotateY] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!forceStop) {
      const startDelay = Math.random() * 1000;

      const loop = () => {
        setRotateY((prev) => (prev + 180) % 360);
        const nextDelay = Math.random() * 2000 + 800;
        intervalRef.current = window.setTimeout(loop, nextDelay);
      };

      const startTimeout = window.setTimeout(loop, startDelay);

      return () => {
        clearTimeout(startTimeout);
        if (intervalRef.current) clearTimeout(intervalRef.current);
      };
    } else {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      setRotateY(isWinner ? 0 : 180);
    }
  }, [forceStop, isWinner]);

  return (
    <motion.div
      animate={{ rotateY }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-[78px] h-[110px] relative"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="absolute w-full h-full rounded-[4px] overflow-hidden"
        style={{ backfaceVisibility: "hidden" }}
      >
        <FrontCard />
      </div>

      <div
        className="absolute w-full h-full rounded-[4px] overflow-hidden"
        style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
      >
        <Verso />
      </div>
    </motion.div>
  );
});

CardFlip.displayName = "CardFlip";

export default CardFlip;

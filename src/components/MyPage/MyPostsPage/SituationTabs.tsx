import type { GetMyPostsParams } from "../../../types/MyPage";

type Situation = GetMyPostsParams["situation"];

const LABEL: Record<NonNullable<Situation>, string> = {
    OOPS: "웁스 중",
    OVERCOMING: "극복 중",
    OVERCOME: "극복 완료",
  };

  export default function SituationTabs({
    value,
    onChange,
  }: {
    value: NonNullable<Situation>;
    onChange: (v: NonNullable<Situation>) => void;
  }) {
    const items: NonNullable<Situation>[] = ["OOPS", "OVERCOMING", "OVERCOME"];
  
    return (
      <div className="w-full flex-1 justify-center items-center">
        <div className="flex items-center gap-[2.12] rounded-full border border-[#e6e6e6] p-1 bg-white">
          {items.map((s) => {
            const active = value === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => onChange(s)}
                className={`w-full h-[2.75rem] rounded-full text-[0.85rem] font-semibold
                  ${active ? "bg-[#B3E378] text-[#111] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]" : "bg-white text-[#777]"}`}
              >
                {LABEL[s]}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
/* MediaQueyContext.tsx

미디어 쿼리 전역 관리를 위해 context API 사용
reazct-responsive 라이브러리 활용 -> 이후 provider로 APP에서 감싸 사용할 예정인 context
*/
import React, { createContext, PropsWithChildren } from "react";
import { useMediaQuery } from "../hooks/common/useMediaQuery";
import { MediaQueryType } from "../types/MediaQueryContextType";

// context 생성
export const MediaQueryContext: React.Context<MediaQueryType> =
  createContext<MediaQueryType>({
    isMobile: null,
  });

export const MediaQueryProvider = ({ children }: PropsWithChildren) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  if (isMobile === null) {
    throw new Error(
      "MediaQueryProvider must be used within a MediaQueryProvider"
    );
  }
  console.log("MediaQueryProvider isMobile:", isMobile);

  return (
    <MediaQueryContext.Provider value={{ isMobile }}>
      {children}
    </MediaQueryContext.Provider>
  );
};

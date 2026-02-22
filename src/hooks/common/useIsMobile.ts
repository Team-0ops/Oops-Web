/* useIsMobile.ts
해당 모니터의 크기가 모바일인지 아닌지 판별하기 위한 훅 || 근데 굳이 필요한 부분인지 모르겠음 일단 따라 만들어봄.
 */
import { useContext } from "react";
import { MediaQueryContext } from "../../context/MediaQueryContext";

export const useIsMobile = (): boolean => {
  const context = useContext(MediaQueryContext).isMobile;

  if (context === null) {
    throw new Error("useIsMobile must be used within a MediaQueryProvider");
  }

  return context;
};

import { useState, useEffect } from "react";

// query 파라미터를 받아 미디어 쿼리를 감지하는 훅
export const useMediaQuery = (query: string): boolean => {
  const [value, setValue] = useState(false); // 화면 크기와 맞는지 여부를 저장하는 상태

  useEffect(() => {
    // 미디어 쿼리 조건이 변경될 때 실행되는 함수
    const onChange = (event: MediaQueryListEvent) => {
      setValue(event.matches); // 쿼리가 일치하면 true, 일치하지 않으면 false
    };

    // 쿼리에 맞는 미디어 쿼리 결과를 가져옴
    const result = matchMedia(query);
    result.addEventListener("change", onChange); // 화면 크기가 변할 때마다 onChange 실행
    setValue(result.matches); // 초기 상태 설정

    return () => result.removeEventListener("change", onChange); // cleanup
  }, [query]);

  return value; // 쿼리 일치 여부 반환
};

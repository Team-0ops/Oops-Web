export type CommonResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  pageInfo?: {
    page: number;
    size: number;
    hasNext: boolean;
    totalElements: number;
    totalPages: number;
  };
  result: T;
};

//TODO :  공통 상수 부분 constant 폴더로 옮기기
// check box에서 선택가능한 타입. (조언/공감)
export type wantedCommentType = "ADVICE" | "EMPATHY";

// postWritePage에서 사용되는 check box 상태 타입
// 로컬에서는 ADVICE, EMPATHY 두가지 상태를 boolean으로 관리하기때문에 나중에 POST요청할때 굳이굳이 string 배열로 변환해야해서..
export type wantedCommentTypeMap = Record<wantedCommentType, boolean>;

// post 에서 사용중인 공용 컴포넌트와 타입 정의
// category 관련 상수, 댓글 조언 타입정의


// 공용으로 사용하기 위한 카테고리 상수
// 공용 문자열 정규화
export const normalizeLabel = (str: string): string => {
  return str.trim().toLowerCase();
}; // 굳이 안해도 될것같긴한데..

// 카테고리 목록 , 필요시 여기만 수정
export const Categories = [
  "일상",
  "연애",
  "인간관계",
  "주식/투자",
  "학교생활",
  "진로",
  "창업",
  "대입/입시",
  "취업/자격증",
  "결혼",
  "여행",
  "부동산",
  "정신 건강",
  "자유",
] as const;

export type CategoryName = (typeof Categories)[number];

// id 매핑
// 작성할때 넘겨주는 값이 number여서 각 배열 순서대로 번호 부여
// CategoryIdMap.get("일상") => 1
export const CategoryIdMap = new Map<string, number>(
  Categories.map((category, index) => [category, index + 1])
);

export const getCategoryId = (category: string)=> CategoryIdMap.get(normalizeLabel(category));



// topic id도 추가할 예정
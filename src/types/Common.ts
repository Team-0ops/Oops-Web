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

// check box에서 선택가능한 타입. (조언/공감)
export type wantedCommentType = "ADVICE" | "EMPATHY";

// postWritePage에서 사용되는 check box 상태 타입
// 로컬에서는 ADVICE, EMPATHY 두가지 상태를 boolean으로 관리하기때문에 나중에 POST요청할때 굳이굳이 string 배열로 변환해야해서..
export type wantedCommentTypeMap = Record<wantedCommentType, boolean>;
export interface PostReportData {
  id: number;
  postId: number;
  title: string;
  content: string;
  author: string;
  reportCount: number;
  recentReportDate: string;
}

export interface CommentReportData {
  id: number;
  commentId: number;
  content: string;
  postId: number;
  postTitle: string;
  author: string;
  reportCount: number;
  recentReportDate: string;
}

// 게시글 신고 예시 데이터
export const postReportData: PostReportData[] = [
  {
    id: 1,
    postId: 54,
    title: "게시글 제목이 길면 짤려...",
    content: "게시글내용인데요 길면...",
    author: "작성자 닉네임",
    reportCount: 50,
    recentReportDate: "2025.10.11",
  },
  {
    id: 2,
    postId: 55,
    title: "게시글 제목이 길면 짤려...",
    content: "게시글내용인데요 길면...",
    author: "작성자 닉네임",
    reportCount: 50,
    recentReportDate: "2025.10.11",
  },
  {
    id: 3,
    postId: 56,
    title: "게시글 제목이 길면 짤려...",
    content: "게시글내용인데요 길면...",
    author: "작성자 닉네임",
    reportCount: 50,
    recentReportDate: "2025.10.11",
  },
  {
    id: 4,
    postId: 57,
    title: "게시글 제목이 길면 짤려...",
    content: "게시글내용인데요 길면...",
    author: "작성자 닉네임",
    reportCount: 50,
    recentReportDate: "2025.10.11",
  },
  {
    id: 5,
    postId: 58,
    title: "게시글 제목이 길면 짤려...",
    content: "게시글내용인데요 길면...",
    author: "작성자 닉네임",
    reportCount: 50,
    recentReportDate: "2025.10.11",
  },
];

// 댓글 신고 예시 데이터
export const commentReportData: CommentReportData[] = [
  {
    id: 33,
    commentId: 54,
    content: "댓글 내용인뎁쇼",
    postId: 44,
    postTitle: "게시글 제목인데...",
    author: "작성자 닉네임",
    reportCount: 50,
    recentReportDate: "2025.10.11",
  },
  {
    id: 88,
    commentId: 54,
    content: "댓글 내용인뎁쇼",
    postId: 44,
    postTitle: "게시글 제목인데...",
    author: "작성자 닉네임",
    reportCount: 50,
    recentReportDate: "2025.10.11",
  },
  {
    id: 98,
    commentId: 90,
    content: "댓글 내용인뎁쇼",
    postId: 44,
    postTitle: "게시글 제목인데...",
    author: "작성자 닉네임",
    reportCount: 50,
    recentReportDate: "2025.10.11",
  },
  {
    id: 78,
    commentId: 77,
    content: "댓글 내용인뎁쇼",
    postId: 44,
    postTitle: "게시글 제목인데...",
    author: "작성자 닉네임",
    reportCount: 50,
    recentReportDate: "2025.10.11",
  },
  {
    id: 5,
    commentId: 58,
    content: "댓글 내용인뎁쇼",
    postId: 44,
    postTitle: "게시글 제목인데...",
    author: "작성자 닉네임",
    reportCount: 50,
    recentReportDate: "2025.10.11",
  },
];

export interface UserReportedData {
  userId: number;
  nickname: string;
  reportCount: number;
}

// 유저 신고 예시 데이터
export const userReportedData: UserReportedData[] = [
  {
    userId: 1,
    nickname: "닉네임",
    reportCount: 33,
  },
  {
    userId: 2,
    nickname: "홍진기바라기",
    reportCount: 33,
  },
  {
    userId: 3,
    nickname: "ㅇㅇㅇ",
    reportCount: 33,
  },
  {
    userId: 4,
    nickname: "333",
    reportCount: 33,
  },
  {
    userId: 5,
    nickname: "ㅗㅗㅗㅗ",
    reportCount: 33,
  },
];

// 게시글 신고 상세 데이터
export interface PostReportDetailData {
  reportId: number;
  postId: number;
  title: string;
  content: string;
  author: string;
  reportCount: number;
  recentReportDate: string;
}

// 댓글 신고 상세 데이터
export interface CommentReportDetailData {
  reportId: number;
  commentId: number;
  postId: number;
  postTitle: string;
  author: string;
  reportCount: number;
  recentReportDate: string;
}

// 신고 내역 아이템
export interface ReportHistoryItem {
  reporter: string;
  reportDate: string;
  reason: string;
}

// 게시글 신고 상세 mock 데이터
export const postReportDetailData: PostReportDetailData = {
  reportId: 33,
  postId: 33,
  title: "제목이 길면 잘리지만 여기선 안잘리고 잘 보인다",
  content: "게시글 내용입니다",
  author: "작성자 닉네임",
  reportCount: 33,
  recentReportDate: "2025.10.11",
};

// 댓글 신고 상세 mock 데이터
export const commentReportDetailData: CommentReportDetailData = {
  reportId: 33,
  commentId: 54,
  postId: 44,
  postTitle: "제목이 길면 잘리지만 여기선 안잘리고 잘 보인다",
  author: "작성자 닉네임",
  reportCount: 33,
  recentReportDate: "2025.10.11",
};

// 신고 내역 mock 데이터
export const reportHistoryData: ReportHistoryItem[] = [
  {
    reporter: "33 화남이",
    reportDate: "2025.09.04",
    reason: "그냥 맘에 안들어요",
  },
  {
    reporter: "33 화남이",
    reportDate: "2025.09.04",
    reason: "그냥 맘에 안들어요",
  },
  {
    reporter: "33 화남이",
    reportDate: "2025.09.04",
    reason: "그냥 맘에 안들어요",
  },
  {
    reporter: "33 화남이",
    reportDate: "2025.09.04",
    reason: "그냥 맘에 안들어요",
  },
  {
    reporter: "33 화남이",
    reportDate: "2025.09.04",
    reason: "그냥 맘에 안들어요",
  },
  {
    reporter: "33 화남이",
    reportDate: "2025.09.04",
    reason: "그냥 맘에 안들어요",
  },
];

// 유저 상세 데이터
export interface UserDetailData {
  userId: number;
  nickname: string;
  reportCount: number;
}

// 유저 신고 내역 아이템
export interface UserReportHistoryItem {
  reporter: string;
  type: "게시글" | "댓글";
  reportId: number;
  reportDate: string;
  reason: string;
}

// 유저 상세 mock 데이터
export const userDetailData: UserDetailData = {
  userId: 33,
  nickname: "니겐임입니다",
  reportCount: 33,
};

// 유저 신고 내역 mock 데이터
export const userReportHistoryData: UserReportHistoryItem[] = [
  {
    reporter: "화남이",
    type: "게시글",
    reportId: 34,
    reportDate: "2025.09.04",
    reason: "그냥 맘에 안들어요",
  },
  {
    reporter: "화남이",
    type: "댓글",
    reportId: 34,
    reportDate: "2025.09.04",
    reason: "그냥 맘에 안들어요",
  },
  {
    reporter: "화남이",
    type: "게시글",
    reportId: 34,
    reportDate: "2025.09.04",
    reason: "그냥 맘에 안들어요",
  },
  {
    reporter: "화남이",
    type: "게시글",
    reportId: 34,
    reportDate: "2025.09.04",
    reason: "그냥 맘에 안들어요",
  },
];


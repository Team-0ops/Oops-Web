export type User = {
  userId: number;
  nickname?: string;
  email?: string;
  profileImage?: string | null;
  point?: number;
  commentReportCount?: number;
  postReportCount?: number;
};

export type UserInfo = {
  userName: string;
  email: string;
  profileImageUrl: string;
  point: number;
  commentReportCount: number;
  postReportCount: number;
};
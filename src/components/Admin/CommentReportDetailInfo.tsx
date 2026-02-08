import { CommentReportDetailData } from "../../mocks/adminReportData";

interface CommentReportDetailInfoProps {
  data: CommentReportDetailData;
}

export const CommentReportDetailInfo = ({
  data,
}: CommentReportDetailInfoProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col">
        <h3 className="h3 text-[#262627] mb-2">신고 번호</h3>
        <span className="body3 text-[#262627]">{data.reportId}</span>
      </div>
      <div className="flex flex-col">
        <h3 className="h3 text-[#262627] mb-2">신고 수</h3>
        <span className="body3 text-[#262627]">{data.reportCount}</span>
      </div>
      <div className="flex flex-col">
        <h3 className="h3 text-[#262627] mb-2">댓글 번호</h3>
        <div className="flex items-center gap-2">
          <span className="body3 text-[#262627]">{data.commentId}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="h3 text-[#262627] mb-2">게시글 번호</h3>
        <span className="body3 text-[#262627]">{data.postId}</span>
      </div>
      <div className="flex flex-col">
        <h3 className="h3 text-[#262627] mb-2">게시글 제목</h3>
        <span className="body3 text-[#262627]">{data.postTitle}</span>
      </div>
      <div className="flex flex-col">
        <h3 className="h3 text-[#262627] mb-2">작성자</h3>
        <span className="body3 text-[#262627]">{data.author}</span>
      </div>
      <div className="flex flex-col">
        <h3 className="h3 text-[#262627] mb-2">최근 신고 날짜</h3>
        <span className="body3 text-[#262627]">{data.recentReportDate}</span>
      </div>
    </div>
  );
};

export default CommentReportDetailInfo;


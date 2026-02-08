import { useNavigate } from "react-router-dom";
import { CommentReportData } from "../../mocks/adminReportData";
import Checkbox from "../common/Checkbox";

interface CommentReportTableProps {
  data: CommentReportData[];
  selectedIds: number[];
  onCheckboxChange: (id: number) => void;
  onSelectAll: () => void;
}

export const CommentReportTable = ({
  data,
  selectedIds,
  onCheckboxChange,
  onSelectAll,
}: CommentReportTableProps) => {
  const navigate = useNavigate();

  const handleRowClick = (reportId: number) => {
    navigate(`/admin/comment-report/${reportId}`);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="overflow-x-auto px-4">
        <table className="w-full table-fixed">
          {/* 테이블 헤더 */}
          <thead>
            <tr className="bg-[#E6F3D7]">
              <th className="w-16 px-4 py-3 text-center">
                <div className="flex justify-center">
                  <Checkbox
                    checked={selectedIds.length === data.length && data.length > 0}
                    onChange={onSelectAll}
                  />
                </div>
              </th>
              <th className="w-24 px-4 py-3 text-center body2 text-[#262627]">
                신고 번호
              </th>
              <th className="w-24 px-4 py-3 text-center body2 text-[#262627]">
                댓글 번호
              </th>
              <th className="w-48 px-4 py-3 text-center body2 text-[#262627]">
                내용
              </th>
              <th className="w-24 px-4 py-3 text-center body2 text-[#262627]">
                게시글 번호
              </th>
              <th className="w-48 px-4 py-3 text-center body2 text-[#262627]">
                게시글 제목
              </th>
              <th className="w-32 px-4 py-3 text-center body2 text-[#262627]">
                댓글 작성자
              </th>
              <th className="w-24 px-4 py-3 text-center body2 text-[#262627]">
                신고 수
              </th>
              <th className="w-36 px-4 py-3 text-center body2 text-[#262627]">
                최근 신고 날짜
              </th>
            </tr>
          </thead>

          {/* 테이블 바디 */}
          <tbody>
            {data.map((item, index) => (
              <tr
                key={`${item.id}-${index}`}
                className="border-b border-[#E4E4E4] hover:bg-[#FAFAFA] cursor-pointer"
                onClick={() => handleRowClick(item.id)}
              >
                <td
                  className="w-16 px-4 py-3 text-center"
                  onClick={handleCheckboxClick}
                >
                  <div className="flex justify-center">
                    <Checkbox
                      checked={selectedIds.includes(item.id)}
                      onChange={() => onCheckboxChange(item.id)}
                    />
                  </div>
                </td>
                <td className="w-24 px-4 py-3 text-center body3 text-[#262627]">
                  {item.id}
                </td>
                <td className="w-24 px-4 py-3 text-center body3 text-[#262627]">
                  {item.commentId}
                </td>
                <td className="w-48 px-4 py-3 text-center body3 text-[#262627]">
                  {item.content}
                </td>
                <td className="w-24 px-4 py-3 text-center body3 text-[#262627]">
                  {item.postId}
                </td>
                <td className="w-48 px-4 py-3 text-center body3 text-[#262627]">
                  {item.postTitle}
                </td>
                <td className="w-32 px-4 py-3 text-center body3 text-[#262627]">
                  {item.author}
                </td>
                <td className="w-24 px-4 py-3 text-center body3 text-[#262627]">
                  {item.reportCount}
                </td>
                <td className="w-36 px-4 py-3 text-center body3 text-[#262627]">
                  {item.recentReportDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CommentReportTable;


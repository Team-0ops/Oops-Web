import { UserDetailData } from "../../mocks/adminReportData";

interface UserDetailInfoProps {
  data: UserDetailData;
}

export const UserDetailInfo = ({ data }: UserDetailInfoProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col">
        <h3 className="h3 text-[#262627] mb-2">유저 번호</h3>
        <span className="body3 text-[#262627]">{data.userId}</span>
      </div>
      <div className="flex flex-col">
        <h3 className="h3 text-[#262627] mb-2">신고 수</h3>
        <span className="body3 text-[#262627]">{data.reportCount}</span>
      </div>
      <div className="flex flex-col">
        <h3 className="h3 text-[#262627] mb-2">유저 닉네임</h3>
        <span className="body3 text-[#262627]">{data.nickname}</span>
      </div>
    </div>
  );
};

export default UserDetailInfo;




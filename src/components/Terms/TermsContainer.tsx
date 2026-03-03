import { useTerms } from "../../hooks/terms/useTerms";
import { useNavigate } from "react-router-dom";

type Props = {
  id: number;
  onAgree?: () => void;
};

const lsKey = (id: number) => `terms_agree_${id}`;

const TermsContainer = ({ id }: Props) => {
  const navigate = useNavigate();
  const { byId } = useTerms();
  const term = byId(id);

  const handleAgreeAndBack = () => {
    // 항상 "현재 약관 id만" true
    localStorage.setItem(lsKey(id), "true");
    navigate(-1);
  };
  
  return (
    <div className="w-full flex flex-col gap-[3.12rem]">
      <div className="flex justify-center items-center text-[1.5rem] font-bold">
        {term?.title}
      </div>
      <div className="whitespace-pre-wrap">{term?.content}</div>
      {/* 누르면 체크 ok되고 넘어가는거로 */}
      <button
        type="button"
        onClick={handleAgreeAndBack}
        className="
                w-full h-[3.125rem] 
                flex justify-center items-center
                rounded-[0.5rem]
                bg-[#b3e378]
                cursor-pointer"
      >
        동의 후 돌아가기
      </button>
    </div>
  );
};

export default TermsContainer;

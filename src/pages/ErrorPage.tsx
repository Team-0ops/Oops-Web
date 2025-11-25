import Error from "../assets/icons/Error.svg?react";
export const ErrorPage = () => {
  return (
    <>
      <div className="w-full items-center flex flex-col gap-[5rem] px-[10rem]">
        <Error className="" />
        <div className="flex flex-col items-center gap-[2.5rem]">
          <div className="flex flex-col items-center gap-[1rem] text-center">
            <p className="h1">죄송합니다. 페이지를 찾을 수 없습니다.</p>
            <p className="body2 text-[#666]">
              존재하지 않는 주소를 입력 하셨거나,
              <br />
              요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
            </p>
          </div>
          <div className="flex w-full gap-[1.5rem]">
            <button className="h3 flex w-full h-[3.75rem] justify-center items-center rounded-[0.75rem] bg-[#B3E378]">
              이전으로
            </button>
            <button className="h3 flex w-full h-[3.75rem] justify-center items-center rounded-[0.75rem] bg-[#B3E378]">
              홈으로
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;

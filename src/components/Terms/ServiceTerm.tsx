import TermsContainer from "./TermsContainer";

const ServiceTerm = ({onAgree}:{onAgree?:()=>void}) => {
  return (
    <>
      <TermsContainer id={1} onAgree={onAgree} />
    </>
  );
};

export default ServiceTerm;

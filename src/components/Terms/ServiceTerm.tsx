import TermsContainer from "./TermsContainer";

const ServiceTerm = ({onAgree}:{onAgree?:()=>void}) => {
  return (
    <>
      <TermsContainer id={2} onAgree={onAgree} />
    </>
  );
};

export default ServiceTerm;

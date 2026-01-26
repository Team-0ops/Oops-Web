import OopsLogo from "../../assets/icons/OopsIcon.svg?react";
import OopsTypo from "../../assets/icons/OopsTypo.svg?react";

const MainLogo = () => {
    return (
        <>
            <div className="flex flex-col items-center gap-5">
                <OopsLogo/>
                <OopsTypo/>
            </div>
        </>
    )

}

export default MainLogo;
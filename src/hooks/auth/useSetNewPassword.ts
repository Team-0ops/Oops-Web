import {useState} from "react";
import {postNewPassword} from "../../apis/auth.ts";
interface props{
    token: string,
    email: string
}
const useSetNewPassword = (props: props) => {
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const resetPassword = async () => {
        setLoading(true);
        try{
            const res = await postNewPassword({
                email: props.email,
                verificationToken: props.token,
                newPassword: newPassword
            });
            console.log(res);
            setStatus("SUCCESS");
        }catch{
            setError("재설정에 실패함");
        }finally {
            setLoading(false);
        }
    };

    return {
        newPassword,
        setNewPassword,
        newPasswordConfirm,
        setNewPasswordConfirm,
        error,
        loading,
        status,
        resetPassword,
    };
}

export default useSetNewPassword;
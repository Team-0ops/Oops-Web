import {useState} from "react";

const useSetNewPassword = (token: string) => {
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const postNewPassword = async () => {
        setLoading(true);
        try{
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
        postNewPassword,
    };
}

export default useSetNewPassword;
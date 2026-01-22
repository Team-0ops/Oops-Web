import {useEffect, useState} from "react";

export const useGetPostListBase = <T>(
    apis: () => Promise<T>
) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    //setEffect 누수를 막기 위한 mount 변수 설정
    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                const res = await apis();
                if (mounted) setData(res);
            } catch (err) {
                if (mounted) setError(err as Error);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        void fetchData();

        return () => {
            mounted = false;
        };
    }, [apis]);

    return { data, isLoading, error };
}

export default useGetPostListBase;
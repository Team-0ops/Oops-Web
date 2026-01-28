import {
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
  useMemo,
  useCallback, useContext
} from "react";
import { RequestSignInDto } from "../types/Auth.ts";
import { User } from "../types/User.ts";
import { getMyInfo, postLogIn } from "../apis/auth.ts";
import axios from "axios";

// 쿠키 기반의 로그인 : 클라이언트 측에서 토큰을 볼수도, 발급할 수 도 없다 =  때문에 사용자의 정보를 가지고 있어야 로그인 여부 결정 가능
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (params: RequestSignInDto) => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext: React.Context<AuthContextType> =
  createContext<AuthContextType>({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    login: async () => {
      throw new Error("AuthProvider가 설정되지 않았습니다.");
    },
    refreshUser: async () => {},
  });

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //쿠키 기반 인증에서 사용자의 정보를 가져와 로그인 여부를 확인함
  const refreshUser = useCallback(async () => {
    try {
      const me = await getMyInfo(); // 쿠키 자동 포함
      setUser(me.result);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (signInData: RequestSignInDto) => {
        try{
            await postLogIn(signInData); // 쿠키 저장
            await refreshUser(); // 로그인 상태 갱신
        }catch(error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                if (status === 401) {
                    throw new Error("비밀번호가 일치하지 않습니다.");
                }
                if (status === 404) {
                    throw new Error("회원가입되지 않은 이메일입니다.");
                }
            }else{
                throw new Error("로그인에 실패하였습니다.");
            }
        }
    },
    [refreshUser],
  );

  // 앱 초기 실행시 로그인 여부 확인을 위한 useEffect 사용
  useEffect(() => {
    refreshUser();
  }, []);

  //불필요한 랜더링을 막기 위한 useMemo 사용
  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      refreshUser,
    }),
    [user, isLoading, login, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
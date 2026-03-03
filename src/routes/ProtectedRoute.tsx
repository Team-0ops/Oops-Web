import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>로딩 중...</div>;

  if (!isAuthenticated) {
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
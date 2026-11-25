// React
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children }) => {
  const { isAuth, status } = useSelector((state) => state.users);

  if (status === "Загрузка") {
    return <h2>Проверка авторизации...</h2>;
  }

  if (status === "Отклонен" || !isAuth) {
    return <Navigate to={"/not-authorized"} replace={true} />;
  }
  return children;
};

export default ProtectedRoutes;

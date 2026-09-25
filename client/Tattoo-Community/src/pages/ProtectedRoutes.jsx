import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router";
const ProtectedRoutes = ({ children }) => {
  const { isAuth, status } = useSelector((state) => state.users);

  if (status === "Загрузка") {
    return (
      <>
        <h2>Проверка авторизации...</h2>
      </>
    );
  }

  if (!isAuth) {
    return (
      <>
        <h1>Вы не авторизованы!</h1>
        <Link to={"/login"}>Войти</Link>
      </>
    );
  }

  return children;
};

export default ProtectedRoutes;

import { Link } from "react-router";

const NotAuthorized = () => {
  return (
    <div className="protected">
      <h1 className=" title protected__title">Вы не авторизованы!</h1>
      <Link className="protected__link" to={"/login"}>
        Войти
      </Link>
    </div>
  );
};

export default NotAuthorized;

// Images
import UserIcon from "@assets/icon/Header/UserIcon.svg";

// React
import { Link } from "react-router";

const Account = ({ setOpenModalWindow }) => {
  return (
    <>
      <img className="header__account__logo" src={UserIcon} alt="User icon" />

      <div className="header__account__dropdown">
        <Link to={"/profile"} className="header__account__profile">
          Личный кабинет
        </Link>

        <button className="button btn-logout" onClick={setOpenModalWindow}>
          Выйти
        </button>
      </div>
    </>
  );
};

export default Account;

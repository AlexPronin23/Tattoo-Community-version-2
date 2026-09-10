// React
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

// Redux
import { userLogout } from "../slices/userSlice";

// Pages
import ProfilePersonal from "./ProfilePersonal";
import ProfilePortfolio from "./ProfilePortfolio";

import "./style.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.users.currentUser);
  const { status } = currentUser;
  const [active, setActive] = useState("personal");

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(userLogout());
      if (userLogout.fulfilled.match(resultAction)) {
        alert(resultAction.payload.message);
        navigate("/", { replace: true });
      } else if (userLogin.rejected.match(resultAction)) {
        alert(resultAction.payload);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleActive = (active) => {
    setActive(active);
  };

  return (
    <div className="profile">
      <div className="container">
        <h1 className="title profile__title">Личный кабинет</h1>
        <div className="profile__tabs">
          {status ? (
            <>
              {" "}
              <button
                onClick={() => handleActive("personal")}
                className={`button btn__tabs ${active === "personal" ? "active" : ""}`}
              >
                Персональные данные
              </button>
              <button
                onClick={() => handleActive("portfolio")}
                className={`button btn__tabs ${active === "portfolio" ? "active" : ""}`}
              >
                Портфолио
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleActive("personal")}
                className={`button btn__tabs ${active === "personal" ? "active" : ""}`}
              >
                Персональные данные
              </button>
            </>
          )}
        </div>
        <div className="profile__info">
          {active === "personal" ? (
            <>
              <ProfilePersonal />
            </>
          ) : (
            <ProfilePortfolio />
          )}
          <button className="button btn-logout" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import "./style.scss";

// React
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// Redux
import { userLogout } from "../../slices/userSlice";

// Images
import HeaderLogo from "@assets/icon/Header/HeaderLogo.svg";
import HeaderImg from "@assets/img/Header/tattooImg.png";
import TattooMachine from "@assets/icon/Header/tattoo-machine.svg";
import BurgerMenuWhite from "@assets/icon/Header/BurgerMenuWhite.svg";
import UserIcon from "@assets/icon/Header/UserIcon.svg";

// Components
import Nav from "../Nav/Nav";
import Logo from "../Logo/Logo";
import MobileMenu from "../MobileMenu/MobileMenu";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.users);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openModalWindow, setOpenModalWindow] = useState(false);

  const handleOpening = () => {
    setOpenMobileMenu(true);
  };

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(userLogout());
      if (userLogout.fulfilled.match(resultAction)) {
        alert(resultAction.payload.message);
        window.location.reload();
        setOpenModalWindow(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__top">
          {/* Logo */}

          <div className="header__logo">
            <Logo src={HeaderLogo} />
          </div>

          {/* Navigation */}
          <nav className="header__nav">
            <Nav />
          </nav>

          {/* Button group or Account page */}

          {isAuth ? (
            <>
              <div className="header__account">
                <img
                  className="header__account__logo"
                  src={UserIcon}
                  alt="User icon"
                />

                <div className="header__account__dropdown">
                  <Link to={"/profile"} className="header__account__profile">
                    Личный кабинет
                  </Link>

                  <button
                    className="button btn-logout"
                    onClick={() => setOpenModalWindow(true)}
                  >
                    Выйти
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="header__btn">
                <Link to={"/login"} className="button btn-login">
                  Войти
                </Link>
                <Link to={"/register"} className="button btn-reg">
                  Зарегистрироваться
                </Link>
              </div>
            </>
          )}

          {/* Mobile(Menu) */}
          <div className={`header__mobile ${openMobileMenu ? "open" : ""}`}>
            <MobileMenu closeMobile={() => setOpenMobileMenu(false)} />
          </div>

          {/* Mobile(Burger menu) */}

          <button onClick={() => handleOpening()}>
            <img
              src={BurgerMenuWhite}
              alt="Burger Menu"
              className="header__burger"
            />
          </button>
        </div>

        {/* Modal window (Logout) */}
        <div className={`header__logout ${openModalWindow ? "open" : ""} `}>
          <div className="header__logout__content">
            <p className="header__logout__title">
              Вы действительно хотите выйти?
            </p>
            <div className="header__logout__btn">
              <button className="button-yes" onClick={handleLogout}>
                Да
              </button>
              <button
                className="button-no"
                onClick={() => setOpenModalWindow(false)}
              >
                Нет
              </button>
            </div>
          </div>
        </div>

        {/* Header content */}
        <div className="header__content">
          <div className="header__text">
            <h1 className="header__title title">
              Вступай в клуб <br /> единомышленников
            </h1>

            <p className="header__welcome">
              Добро пожаловать в дружное пространство для <br /> обмена идеями,
              поддержкой и совместных проектов <br /> — участвуй, вдохновляй и
              находи своих людей.
            </p>

            <p className="header__have">Что мы предоставляем: </p>

            <ul className="header__services">
              <li className="header__service">Общение и обмен опытом</li>
              <li className="header__service">Оказания услуг</li>
              <li className="header__service">Продвижение своего бренда</li>
            </ul>
          </div>

          <div className="header__image">
            <img className="header__img" src={HeaderImg} alt="Header Img" />

            <img
              className="header__machine"
              src={TattooMachine}
              alt="Tattoo machine"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

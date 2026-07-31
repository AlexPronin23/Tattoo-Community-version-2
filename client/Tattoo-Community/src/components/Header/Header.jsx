import "./style.scss";

// React
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Images
import HeaderLogo from "@assets/icon/Header/HeaderLogo.svg";
import HeaderImg from "@assets/img/Header/tattooImg.png";
import TattooMachine from "@assets/icon/Header/tattoo-machine.svg";
import BurgerMenuWhite from "@assets/icon/Header/BurgerMenuWhite.svg";

// Components
import Nav from "../Nav/Nav";
import Logo from "../Logo/Logo";
import MobileMenu from "../MobileMenu/MobileMenu";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);

  // Test
  async function fetchStatus() {
    try {
      const res = await fetch("/api/tattooMasters/status");

      const status = await res.json();

      if (!res.ok) {
        return;
      }

      setStatus(status);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOpening = () => {
    setOpen(true);
  };

  // Test
  useEffect(() => {
    fetchStatus();
  }, []);

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

          {status ? (
            <>
              <div className="header__account">
                <p className="header__account__logo">ПС</p>

                <div className="header__account__dropdown">
                  <Link to={"/profile"} className="header__account__profile">
                    Профиль
                  </Link>

                  <button className="button btn-logout">Выйти</button>
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
          <div className={`header__mobile ${open ? "open" : ""}`}>
            <MobileMenu closeMobile={() => setOpen(false)} />
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

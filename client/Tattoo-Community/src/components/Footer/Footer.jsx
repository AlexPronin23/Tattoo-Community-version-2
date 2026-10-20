import "./style.scss";

// Picture
import FooterLogo from "../../assets/icon/Footer/FooterLogo.svg";
import VK from "../../assets/icon/Footer/VK.svg";

// Components
import Nav from "../Nav/Nav";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__logo">
            <Logo src={FooterLogo} />
          </div>

          <nav className="footer__nav">
            <Nav />
          </nav>

          <div className="footer__social">
            <a href="#" className="footer__phone">
              {" "}
              +79521529988{" "}
            </a>

            <a href="#" className="footer__vk">
              <img src={VK} alt="VK" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

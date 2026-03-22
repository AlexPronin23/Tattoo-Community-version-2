import './style.scss';

// Images
import HeaderLogo from '@assets/icon/Header/HeaderLogo.svg';
import HeaderImg from '@assets/img/Header/tattooImg.png';
import TattooMachine from '@assets/icon/Header/tattoo-machine.svg';

const Header = () => {
    return ( 

      <header className="header">

        <div className="container">

            <div className="header_top">


                {/* Logo */}
                <a href="#" className="header_logo">

                <img src={HeaderLogo} alt="Header Logo" />

                </a>

                {/* Navigation */}
                <nav className="header_nav">
                    <ul className="header_items">
                        <li className="header_item">
                            <a href="#" className="header_link">
                                О нас
                            </a>
                        </li>
                        <li className="header_item">
                            <a href="#" className="header_link">
                                Контакты
                            </a>
                        </li>
                        <li className="header_item">
                            <a href="#" className="header_link">
                                Тату мастера
                            </a>
                        </li>
                        <li className="header_item">
                            <a href="#" className="header_link">
                                Услуги
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Button group */}
                <div className="header_btn">

                   <button className="button btn-login">Войти</button>
                   <button className="button btn-reg">Зарегистрироваться</button>

                </div>

            </div>

                {/* Header content */}
                <div className="header_content">

                    <div className="header_text">

                         <h1 className="header_title title">Вступай в клуб <br /> единомышленников</h1>

                    <p className="header_welcome">
                        Добро пожаловать в дружное пространство для <br /> обмена идеями, поддержкой 
                        и совместных проектов <br /> — участвуй, вдохновляй и находи своих людей.
                    </p>

                    <p className="header_have">Что мы предоставляем: </p>

                    <ul className="header_services">
                        <li className="header_service">
                            Общение и обмен опытом 
                        </li>
                        <li className="header_service">
                            Оказания услуг
                        </li>
                        <li className="header_service">
                            Продвижение своего бренда
                        </li>
                    </ul>

                    </div>

                    <div className="header_image">
                        <img  className = 'header_img' src={HeaderImg} alt="Header Img" />
                        
                        <img className = 'header_machine' src={TattooMachine} alt="Tattoo machine" />
                            
                    </div>

                </div>
                
        </div>
      </header>

     );
}
 
export default Header;
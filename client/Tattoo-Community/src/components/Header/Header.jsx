import './style.scss';

// React
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Images
import HeaderLogo from '@assets/icon/Header/HeaderLogo.svg';
import HeaderImg from '@assets/img/Header/tattooImg.png';
import TattooMachine from '@assets/icon/Header/tattoo-machine.svg';
import BurgerMenuWhite from '@assets/icon/Header/BurgerMenuWhite.svg';

// Components
import Nav from '../Nav/Nav';
import Logo from '../Logo/Logo';
import MobileMenu from '../MobileMenu/MobileMenu';


const Header = () => {

    const [open,setOpen] = useState(false)
    const [theme,setTheme] = useState('dark')

    const handleOpening = () => {
        setOpen(true)
    }

    return ( 

      <header className="header">

        <div className="container">

            <div className="header_top">

                {/* Logo */}
               
               <div className="header_logo">

                    <Logo src={HeaderLogo}/>

               </div>

                {/* Navigation */}
                <nav className="header_nav">
                    <Nav/>
                </nav>


                {/* Button group */}
                <div className="header_btn">

                   {/* <button className="button btn-login">Войти</button>
                   <button className="button btn-reg">Зарегистрироваться</button> */}

                  
                   <Link to={'/login'} className='button btn-login'>Войти</Link>
                   <Link to={'/register'} className='button btn-reg'>Зарегистрироваться</Link>
        
                </div>


                   {/* Mobile(Menu) */}
                <div className={`header_mobile ${open ? "open" : ''}`}>
                    <MobileMenu closeMobile = {() => setOpen(false)}/>
                </div>


                {/* Mobile(Burger menu) */}

                <button 
                onClick={() => handleOpening()}
                >
                    <img src={BurgerMenuWhite} alt="Burger Menu"  className="header_burger"/>

                </button>

             
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
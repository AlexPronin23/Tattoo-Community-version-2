import './style.scss'

// Picture
import FooterLogo from '../../assets/icon/Footer/FooterLogo.svg'
import VK from '../../assets/icon/Footer/VK.svg'

const Footer = () => {
    return ( 
        
        <footer className="footer">

            <div className="container">

                <div className="footer_wrapper">

                    {/* Здесь потом будет отдельный компонент Logo */}
                    <a href="" className="footer_logo">
                        <img src={FooterLogo} alt="Footer Logo" />
                    </a>


                    {/* Здесь потом будет отдельный компонент Nav */}
                    <nav className="footer_nav">

                        <ul className="footer_items">

                            <li className="footer_item">
                                <a href="#" className="footer_link">
                                    О нас
                                </a>
                            </li>
                            <li className="footer_item">
                                <a href="#" className="footer_link">
                                    Контакты
                                </a>
                            </li>
                            <li className="footer_item">
                                <a href="#" className="footer_link">
                                    Тату мастера
                                </a>
                            </li>
                            <li className="footer_item">
                                <a href="#" className="footer_link">
                                    Услуги
                                </a>
                            </li>

                        </ul>

                    </nav>

                    <div className="footer_social">

                        <p className="footer_phone"> +79521529988 </p>

                        <a href="#" className="footer_vk">
                            <img src={VK} alt="VK" />
                        </a>

                        

                    </div>
                

                </div>

            </div>

        </footer>
     );
}
 
export default Footer;
import './style.scss'

// Picture
import FooterLogo from '../../assets/icon/Footer/FooterLogo.svg'
import VK from '../../assets/icon/Footer/VK.svg'

// Components
import Nav from '../Nav/Nav';

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
                        <Nav/>
                    </nav>

                    <div className="footer_social">

                        <a href='#' className="footer_phone"> +79521529988 </a>

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
import './style.scss'

// Images

import FirstPicture from '@assets/img/Main/Services/FirstPicture.png'
import SecondPicture from '@assets/img/Main/Services/SecondPicture.png'
import ThirdPicture from '@assets/img/Main/Services/ThirdPicture.png'

const Services = () => {
    return ( 
        <section className="services">

            <div className="container">

                <div className="services_wrapper">

                    <h1 className="title services_title">Услуги</h1>

                 <div className="services_card">

                    <div className="card">

                        <img src={FirstPicture} alt="First Picture" className="card_img" />
                        <p className="card_text">
                            Профиль мастера
                        </p>

                    </div>

                    <div className="card">

                         <img src={SecondPicture} alt="Second Picture" className="card_img" />
                          <p className="card_text">
                            Продвижение бренда
                          </p>

                    </div>

                    <div className="card">

                         <img src={ThirdPicture} alt="Third Picture" className="card_img" />
                          <p className="card_text">
                            Консультация у чат бота
                          </p>
                          
                    </div>

                </div>

                </div>

            </div>

        </section>
     );
}
 
export default Services;
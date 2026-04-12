import './style.scss'

import FirstPicture from '../../../assets/img/Main/Masters/FirstPicture.png'

const MastersCard = ({user_id, first_name, tattooSalon, experience,isColored,styleTattooName}) => {
    return ( 
          <div className="tattoomasters_card">

                <img src={FirstPicture} alt="Tattoo Masters picture" className="tattoomasters_card-img" />

                <div className="tattoomasters_card-info">

                    <h2 className="tattoomasters_card-name">Имя тату мастера: {first_name}</h2>

                    {/* Когда будет добавлена форма, то будет проверятеся работает ли тату мастер в салоне или нет */}

                    <p className="tattoomasters_card-salon">Тату салон: {tattooSalon}</p>

                    {/* ------------------------------------------------------------- */}

                    <p className="tattoomasters_card-experience">Опыт: {experience} лет</p>

                    {/* <p className="tattoomasters_card-colorful">Мастер использует цветные краски: <span className={`tattoomasters_card-${isColored ? 'green' : 'red'}`}>{isColored ? 'Да': 'Нет'}</span></p>

                    <p className="tattoomasters_card-style">Стили мастера: {styleTattooName}</p> */}

                </div>

                <button className="button tattoomasters_card-btn">Записаться</button>

            </div>
     );
}
 
export default MastersCard;
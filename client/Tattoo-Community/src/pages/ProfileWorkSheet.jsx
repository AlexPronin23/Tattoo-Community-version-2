import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addPortfolio, getPortfolio } from "../slices/portfolioSlice";
import "./style.scss";
const ProfileWorkSheet = () => {
  const dispatch = useDispatch();
  const { currentMaster, created } = useSelector(
    (state) => state.tattooMasters,
  );
  const [images, setImages] = useState([]);
  const { photos, uploaded } = useSelector((state) => state.portfolio);
  const {
    first_name,
    last_name,
    experience,
    isColored,
    isAtHome,
    tattooSalon,
    description,
    styles,
  } = currentMaster || {};

  const imgToBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
    });

  const handleImgChanges = async (e) => {
    const selected = Array.from(e.target.files);

    if (selected.length > 6) {
      alert("Максимум 6 фото");
      return;
    }
    if (selected.some((f) => f.size > 5 * 1024 * 1024)) {
      alert("Один из файлов больше 5 МБ");
      return;
    }

    const base64Array = await Promise.all(selected.map(imgToBase64));

    setImages(base64Array);
  };

  const handleAddPortfolio = async () => {
    if (images.length === 0) {
      alert("Выберите хотя бы одно фото");
      return;
    }

    try {
      const resultAction = await dispatch(addPortfolio({ images: images }));
      if (addPortfolio.fulfilled.match(resultAction)) {
        alert("Успешно!");
        setImages([]);
        // window.location.reload();
      } else if (addPortfolio.rejected.match(resultAction)) {
        alert(`Ошибка : ${resultAction.payload.message}`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    dispatch(getPortfolio());
  }, [dispatch]);

  return (
    <div className="worksheet">
      <div className="container">
        <div className="worksheet__content">
          {!created ? (
            <>
              <h1 className="worksheet__title">У вас пока нет анкеты</h1>
              <Link to="/create" className="button btn-create">
                Создать
              </Link>
            </>
          ) : (
            <>
              <ul className="worksheet__items">
                <li className="worksheet__item">Имя: {first_name}</li>
                <li className="worksheet__item">Фамилия: {last_name}</li>
                <li className="worksheet__item">Опыт: {experience} лет/года</li>
                <li className="worksheet__item">
                  Используете цветные краски: {isColored ? "Да" : "Нет"}
                </li>
                <li className="worksheet__item">
                  Тату салон: {!isAtHome ? "Фриланс" : tattooSalon}
                </li>
                <li className="worksheet__item">О себе: {description}</li>
              </ul>
              <p className="worksheet__style">Используемые стили: </p>
              <ul className="worksheet__styles">
                {styles.map((style) => (
                  <li key={style.style_id}>{style.name}</li>
                ))}
              </ul>
            </>
          )}

          <div className="worksheet__portfolio">
            {!uploaded ? (
              <div className="worksheet__upload">
                <h3 className="worksheet__upload-title">
                  Приложите свои работы
                </h3>

                <input
                  type="file"
                  id="portfolio-upload"
                  className="worksheet__upload-file-input"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImgChanges}
                />

                <label
                  htmlFor="portfolio-upload"
                  className="worksheet__upload-file-label"
                >
                  <span className="worksheet__upload-plus">+</span>
                </label>

                <p className="worksheet__upload-hint">Максимум 6 фото</p>

                <button
                  type="button"
                  className="button btn-create"
                  onClick={handleAddPortfolio}
                >
                  Загрузить
                </button>
              </div>
            ) : (
              <div className="worksheet__gallery">
                {photos.map((img) => {
                  return (
                    <div key={img.id} className="worksheet__gallery__item">
                      <img
                        src={img.img}
                        alt="Photos"
                        className="worksheet__gallery__img"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <Link to={"/"} className="worksheet__back">
            Назад
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileWorkSheet;

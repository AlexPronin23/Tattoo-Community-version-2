// Styles
import "./style.scss";

// React
import { useDispatch, useSelector } from "react-redux";

// Redux
import { setClose } from "../../slices/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.modal);
  return (
    <div className={`modal ${open ? "open" : ""}`}>
      <div className="container">
        <div className="modal__content">
          <form className="modal__form">
            <h2 className="modal__title">Запись к мастеру</h2>
            <div className="modal__form__column">
              <label className="modal__form__label">Введите ваше имя: </label>
              <input
                className="modal__form__input"
                type="text"
                placeholder="Введите  имя"
              />
            </div>
            <div className="modal__form__column">
              <label className="modal__form__label">Дата приема : </label>
              <input className="modal__form__input" type="date" />
            </div>
            <div className="modal__form__column">
              <label className="modal__form__label">Время приема: </label>
              <input className="modal__form__input" type="time" />
            </div>
            <div className="modal__form__column">
              <label className="modal__form__label">Цена за услугу: </label>
              <p className="modal__form__price">5000 руб</p>
            </div>
            <div className="modal__form__column">
              <label className="modal__form__label">Сообщение мастеру: </label>
              <textarea
                className="modal__form__textarea"
                maxLength={100}
              ></textarea>
            </div>
            <div className="modal__button">
              <button className="button btn-modal">Записаться</button>
              <button
                className="button btn-close"
                type="button"
                onClick={() => dispatch(setClose())}
              >
                Закрыть
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

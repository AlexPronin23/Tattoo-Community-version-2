// Styles
import "./style.scss";

// React
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

// Redux
import { setClose } from "../../slices/modalSlice";
import { createOrder } from "../../slices/orderSlice";
import { showPopup, hidePopup } from "../../slices/popupSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.modal);
  const { masterPage } = useSelector((state) => state.tattooMasters);
  const price = masterPage?.price || "";
  const master_id = masterPage?.user_id || "";

  const [orderDate, setOrderData] = useState({
    customerName: "",
    customerPhone: "",
    dateOrder: "",
    timeOrder: "",
    message: "",
  });

  const { customerName, customerPhone, dateOrder, timeOrder, message } =
    orderDate;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchCreateOrder = async (e) => {
    e.preventDefault();

    if (
      !customerName ||
      !customerPhone ||
      !dateOrder ||
      !timeOrder ||
      !message
    ) {
      alert("Вы ввели не полные данные");
      return;
    }

    try {
      const resultAction = await dispatch(
        createOrder({
          master_id: master_id,
          customerName,
          customerPhone,
          dateOrder,
          timeOrder,
          price: price,
          message,
        }),
      );
      if (createOrder.fulfilled.match(resultAction)) {
        setOrderData({
          customerName: "",
          customerPhone: "",
          dateOrder: "",
          timeOrder: "",
          message: "",
        });

        dispatch(
          showPopup({
            type: "success",
            message: resultAction.payload.message,
          }),
        );

        setTimeout(() => {
          dispatch(hidePopup());
          dispatch(setClose());
        }, 3000);
      } else if (createOrder.rejected.match(resultAction)) {
        dispatch(
          showPopup({
            type: "error",
            message: resultAction.payload.message,
          }),
        );

        setTimeout(() => {
          dispatch(hidePopup());
        }, 3000);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={`modal ${open ? "open" : ""}`}>
      <div className="container">
        <div className="modal__content">
          <form className="modal__form" onSubmit={fetchCreateOrder}>
            <h2 className="modal__title">Запись к мастеру</h2>
            <div className="modal__form__column">
              <label className="modal__form__label">Введите ваше имя: </label>
              <input
                className="modal__form__input"
                name="customerName"
                type="text"
                placeholder="Введите имя"
                value={customerName}
                onChange={handleChange}
              />
            </div>
            <div className="modal__form__column">
              <label className="modal__form__label">
                Введите номер телефона:
              </label>
              <input
                className="modal__form__input"
                name="customerPhone"
                type="tel"
                required
                placeholder="+7 (___) ___-__-__"
                maxLength={15}
                value={customerPhone}
                onChange={handleChange}
              />
            </div>
            <div className="modal__form__column">
              <label className="modal__form__label">Дата приема : </label>
              <input
                className="modal__form__input"
                type="date"
                name="dateOrder"
                value={dateOrder}
                onChange={handleChange}
              />
            </div>
            <div className="modal__form__column">
              <label className="modal__form__label">Время приема: </label>
              <input
                className="modal__form__input"
                name="timeOrder"
                type="time"
                value={timeOrder}
                onChange={handleChange}
              />
            </div>
            <div className="modal__form__column">
              <label className="modal__form__label">Цена за услугу: </label>
              <p className="modal__form__price">{price} руб</p>
            </div>
            <div className="modal__form__column">
              <label className="modal__form__label">Сообщение мастеру: </label>
              <textarea
                className="modal__form__textarea"
                name="message"
                maxLength={100}
                value={message}
                onChange={handleChange}
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

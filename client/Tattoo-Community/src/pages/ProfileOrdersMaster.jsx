// Styles
import "./style.scss";

// React
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// Redux
import { getMasterOrders, updateStatusOrder } from "../slices/orderSlice";

const ProfileOrdersMaster = () => {
  const dispatch = useDispatch();
  const { masterOrders, orderCount } = useSelector((state) => state.order);
  const [openInfo, setOpenInfo] = useState(null);
  const [click, setClick] = useState("all");

  useEffect(() => {
    dispatch(getMasterOrders());
  }, [dispatch]);

  const handleOpen = (id) => {
    setOpenInfo((prevId) => (prevId === id ? null : id));
  };

  const handleClick = (click) => {
    setClick(click);
  };

  return (
    <div className="orders">
      <div className="container">
        <div className="orders__wrapper">
          <div className="orders__tabs">
            <button
              onClick={() => handleClick("all")}
              className={`orders__tab ${click === "all" ? "click" : ""}`}
            >
              Все
            </button>
            <button
              onClick={() => handleClick("completed")}
              className={`orders__tab ${click === "completed" ? "click" : ""}`}
            >
              Выполнены
            </button>
            <button
              onClick={() => handleClick("waiting")}
              className={`orders__tab ${click === "waiting" ? "click" : ""}`}
            >
              В ожидании
            </button>
          </div>
          <div className="orders__content">
            {masterOrders.length > 0 ? (
              <>
                {masterOrders.map(
                  ({
                    order_id,
                    customerName,
                    dateOrder,
                    timeOrder,
                    price,
                    message,
                    status,
                    customerPhone,
                  }) => (
                    <div
                      className={`orders__card  ${status === "Выполнен" ? "orders__card-completed" : ""}`}
                      key={order_id}
                      onClick={() => handleOpen(order_id)}
                    >
                      <div className="orders__item">
                        <h2 className="orders__number">Заказ № {order_id}</h2>
                        <span className="orders__status">
                          Статус заказ: {status}
                        </span>
                      </div>

                      <div
                        className={`orders__info ${openInfo === order_id ? "open" : ""}`}
                      >
                        <p className="orders__info__item">
                          Заказ от: {customerName}
                        </p>
                        <p className="orders__info__item">
                          Номер телефона заказчика: {customerPhone}
                        </p>
                        <p className="orders__info__item">Дата: {dateOrder}</p>
                        <p className="orders__info__item">Время: {timeOrder}</p>
                        <p className="orders__info__item">Цена: {price} руб </p>
                        <p className="orders__info__item">
                          Пожелание от заказчика: {message}
                        </p>
                      </div>

                      <div className="orders__button">
                        <button
                          type="button"
                          className="button btn-order"
                          disabled={status === "Выполнен"}
                          onClick={() =>
                            dispatch(
                              updateStatusOrder({
                                order_id,
                                status: "Выполнен",
                              }),
                            )
                          }
                        >
                          Выполнен
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </>
            ) : (
              <p>У вас нет пока заказов</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOrdersMaster;

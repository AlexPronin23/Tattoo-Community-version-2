// Styles
import "./style.scss";

// React
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// Redux
import {
  getMasterOrders,
  updateStatusOrder,
  getCompletedOrders,
  getWaitingOrders,
  getCompletedOrdersCount,
} from "../slices/orderSlice";

const ProfileOrdersMaster = () => {
  const dispatch = useDispatch();
  const { masterOrders, orderCount, completedOrdersCount } = useSelector(
    (state) => state.order,
  );
  const [openInfo, setOpenInfo] = useState(null);
  const [click, setClick] = useState("all");

  useEffect(() => {
    dispatch(getMasterOrders());
    dispatch(getCompletedOrdersCount());
  }, [dispatch]);

  const handleOpen = (id) => {
    setOpenInfo((prevId) => (prevId === id ? null : id));
  };

  const fetchStatusOrders = async (click) => {
    setClick(click);

    if (click === "all") {
      await dispatch(getMasterOrders());
    }

    if (click === "completed") {
      await dispatch(getCompletedOrders());
    }

    if (click === "waiting") {
      await dispatch(getWaitingOrders());
    }
  };

  return (
    <div className="orders">
      <div className="container">
        <div className="orders__wrapper">
          <div className="orders__statistics">
            <p className="orders__count">
              Количество заказов в ожидании: {orderCount}
            </p>
            <p className="orders__count orders__count-completed">
              Количество выполненых заказов: {completedOrdersCount}
            </p>
          </div>
          <div className="orders__tabs">
            <button
              type="button"
              onClick={() => fetchStatusOrders("all")}
              className={`orders__tab ${click === "all" ? "click" : ""}`}
            >
              Все
            </button>
            <button
              type="button"
              onClick={() => fetchStatusOrders("completed")}
              className={`orders__tab ${click === "completed" ? "click" : ""}`}
            >
              Выполнены
            </button>
            <button
              type="button"
              onClick={() => fetchStatusOrders("waiting")}
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

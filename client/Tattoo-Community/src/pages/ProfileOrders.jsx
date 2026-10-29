// Styles
import "./style.scss";

// React
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// Redux
import { getMasterOrders } from "../slices/orderSlice";

const ProfileOrders = () => {
  const dispatch = useDispatch();
  const { masterOrders, orderCount } = useSelector((state) => state.order);
  const [openInfo, setOpenInfo] = useState(null);

  useEffect(() => {
    dispatch(getMasterOrders());
  }, [dispatch]);

  const handleOpen = (id) => {
    setOpenInfo((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="orders">
      <div className="container">
        <div className="orders__content">
          {orderCount > 0 ? (
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
                    className="orders__card"
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
  );
};

export default ProfileOrders;

// Styles
import "./style.scss";

// React
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getBookingsCount, getClientOrders } from "../slices/orderSlice";

const ProfileOrdersClient = () => {
  const dispatch = useDispatch();
  const { bookingsCount, clientOrders } = useSelector((state) => state.order);
  const [openInfo, setOpenInfo] = useState(null);

  useEffect(() => {
    dispatch(getBookingsCount());
    dispatch(getClientOrders());
  }, [dispatch]);

  const handleOpen = (id) => {
    setOpenInfo((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <div className="orders">
        <div className="container">
          <div className="orders__content">
            {bookingsCount > 0 ? (
              <>
                {clientOrders.map((order) => {
                  const { order_id, dateOrder, timeOrder, price, status } =
                    order;

                  const { phone: phone } = order.master || {};

                  const {
                    first_name: first_name,
                    isAtHome: isAtHome,
                    workaddress: workaddress,
                    homeaddress: homeaddress,
                  } = order.master.masterInfo || {};

                  return (
                    <div
                      className={`orders__card ${status === "Выполнен" ? "orders__card-completed" : ""}`}
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
                          Имя мастера: {first_name}
                        </p>
                        <p className="orders__info__item">
                          Номер мастера: {phone}
                        </p>
                        <p className="orders__info__item">Дата: {dateOrder}</p>
                        <p className="orders__info__item">Время: {timeOrder}</p>
                        <p className="orders__info__item">
                          Адрес {!isAtHome ? workaddress : homeaddress}
                        </p>
                        <p className="orders__info__item">Цена: {price} руб </p>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <p>У вас нет пока заказов</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileOrdersClient;

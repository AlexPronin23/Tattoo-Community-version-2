import "./style.scss";

import MastersCard from "../Cards/MastersCard/MastersCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTattooMasters } from "../../slices/tattooMastersSlice";
import Skeleton from "../Skeleton/CardSkeleton";

const Masters = () => {
  const dispatch = useDispatch();
  const masters = useSelector((state) => state.tattooMasters.tattooMasters);
  const { status, error } = useSelector((state) => state.tattooMasters);

  useEffect(() => {
    dispatch(getAllTattooMasters());
  }, [dispatch]);

  return (
    <section className="masters">
      <div className="container">
        <div className="masters_wrapper">
          <h1 className="title masters_title">Тату мастера</h1>

          <div className="masters_card">
            {error ? (
              <>
                <h1>{error}</h1>
              </>
            ) : status === "Загрузка" ? (
              <>
                {[...Array(2)].map(() => (
                  <Skeleton />
                ))}
              </>
            ) : (
              masters.map((master) => (
                <MastersCard key={master.user_id} {...master} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Masters;

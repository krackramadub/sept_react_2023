import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { increment } from "../store/reducers/incrementReducer/incrementReducer";

export const MainPage = () => {
  const dispatch = useDispatch();
  const { value: valueFromStore, isLoading } = useSelector(
    (state) => state.increment
  );

  const navigation = useNavigate();

  const [value, setValue] = useState(valueFromStore || 0);

  const handleIncrement = () => {
    dispatch(increment({ value: 10 }));
  };

  const handleMethod = () => {
    navigation("/admin", {
      // state - зарезервированное наименование, для передачи данных на иную страницу
      state: {
        value: 10,
      },
    });
  };
  return (
    <>
      <div>MainPage {valueFromStore}</div>
      <button onClick={() => handleIncrement()}>+</button>
      <div>
        <p>Переход с помощью ссылки </p>
        <Link to="/admin" state={{}}>
          Перейти в админку
        </Link>
      </div>

      <div>
        <p>Переход с помощью метода </p>
        <button onClick={() => handleMethod()}>Перейти в админку</button>
      </div>
    </>
  );
};

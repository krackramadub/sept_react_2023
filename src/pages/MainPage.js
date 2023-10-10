import React from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";

export const MainPage = () => {
  const navigation = useNavigate();

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
      <div>MainPage</div>
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

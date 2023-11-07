import React, { useContext, useEffect, useRef, useState } from "react";
import "./App.css";

import { Route, Routes, useParams } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { Layout } from "./components/Layouts/Layout";
import { Page404 } from "./pages/Page404";
import { AdminPage } from "./pages/AdminPage";
import { InputLabel } from "./components/InputLabel/InputLabel";
import { PostsPage } from "./pages/PostsPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

/*
    Краткое описание


    Тут происходит переадресация на другую страницу
    const navigate = useNavigation()
    navigate('/', {
      state: {
        value: 10
      }
    })

    Получение данных, переданных на страницу
    const location = useLocation()
    location.state.value

    Переадрессация в виде jsx
    <Link to='/' state={{value: 10}}>Наименование линка</Link>


    Страница принимающая параметры например: /label/1.../label/40
    /label/:id

    Получение параметра из ссылки
    const params = useParams()
    params.id
*/

const App = ({ label }) => {
  // доступ к контексту

  // использование данных из контекста
  const textHello = "";
  const [value, setValue] = useState(0);

  let divRef = useRef(); // установка связи с html элементов

  useEffect(() => {
    console.log("divRef", divRef);

    // divRef.current.target.className
  }, [divRef]);

  let admin = true;
  // Заглушка по ролям / проверка на авторизацию и тд, в ином случае переадресация на Page404
  let ifAdmin = (element) => (admin ? element : <Page404 />);
  return (
    <>
      <Routes>
        {/* Главная страница и ее подстраницы */}
        <Route path="/*" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="label" element={<InputLabel />} />
          <Route path="*" element={<Page404 />} />
          <Route path="*" element={<Page404 />} />
        </Route>

        {/* Страница администратора  и ее подстраницы */}
        <Route path="/admin" element={ifAdmin(<Layout />)}>
          <Route index element={<AdminPage />} />
          <Route path="label/:id/" element={<InputLabel />} />
          <Route path="*" element={<Page404 />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};
export default App;

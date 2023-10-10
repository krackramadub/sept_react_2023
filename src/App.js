import React, { useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import { MyContext } from "./hooks/context";
import { useMyHook } from "./hooks/myCustomHook";
import { Route, Routes, useParams } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { Layout } from "./components/Layouts/Layout";
import { Page404 } from "./pages/Page404";
import { AdminPage } from "./pages/AdminPage";
import { InputLabel } from "./components/InputLabel/InputLabel";

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
  let context = useContext(MyContext);

  // использование данных из контекста
  const textHello = context.label;
  const [value, setValue] = useState(context.value || 0);

  let divRef = useRef(); // установка связи с html элементов

  console.log("context", context);
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
      </Routes>
    </>
  );
};
export default App;

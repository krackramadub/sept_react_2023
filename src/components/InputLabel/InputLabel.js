import React, { useContext, useRef } from "react";
import { MyContext } from "../../hooks/context";
import { useParams } from "react-router-dom";
import { useMyHook } from "../../hooks/myCustomHook";

export const InputLabel = () => {
  let context = useContext(MyContext);
  const value = useMyHook(10);
  const params = useParams();
  return (
    <>
      <div>
        <span>Данные из контекста и из кастомного хука:</span>
        <p>
          {context.label}; useMyHookValue: {value}
        </p>
      </div>
      <p>Параметр ссылки: {params.id}</p>
    </>
  );
};

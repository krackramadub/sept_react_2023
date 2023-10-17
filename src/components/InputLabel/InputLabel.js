import React, { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMyHook } from "../../hooks/myCustomHook";

export const InputLabel = () => {
  const value = useMyHook(10);
  const params = useParams();
  return (
    <>
      <div>
        <span>Данные из контекста и из кастомного хука:</span>
        <p>useMyHookValue: {value}</p>
      </div>
      <p>Параметр ссылки: {params.id}</p>
    </>
  );
};

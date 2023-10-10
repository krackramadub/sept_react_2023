import { createContext, useContext } from "react";

export const MyContext = createContext();

export const customData = {
  label: "Label from context",
  value: 10,
  handleMethod: () => {
    console.log("hello from context");
  },
};

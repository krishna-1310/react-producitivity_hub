import React from "react";
import AppContext from "./context";
export const useAppContext = () => {
  return React.useContext(AppContext);
}
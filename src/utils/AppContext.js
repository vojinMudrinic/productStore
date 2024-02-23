import React from "react";
import { useState } from "react";

export const Context = React.createContext();

const AppContextProvider = ({ children }) => {
  const [globalLoader, setGlobalLoader] = useState(false);
  const [popup, setPopup] = useState(false);
  const [cartData, setCartData] = useState(null);

  return (
    <Context.Provider
      value={{
        globalLoader,
        setGlobalLoader,
        popup,
        setPopup,
        cartData,
        setCartData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContextProvider;

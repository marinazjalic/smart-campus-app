import React from "react";

const MyContext = React.createContext();

const ContextProvider = ({ children }) => {
  const [val, setVal] = React.useState(0);
  return (
    <MyContext.Provider value={{ val, setVal }}>{children}</MyContext.Provider>
  );
};

export { MyContext, ContextProvider };

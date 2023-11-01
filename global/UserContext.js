import React from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [bookings, setBookings] = React.useState([]);
  return (
    <UserContext.Provider value={{ bookings, setBookings }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

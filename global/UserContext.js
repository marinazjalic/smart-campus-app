import React, { useState } from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [bookings, setBookings] = React.useState([]);
  const [userId, setUserId] = React.useState("");
  const [forceUpdate, setForceUpdate] = React.useState(false);
  const [latestBookingObj, setLatestBookingObj] = React.useState([]);

  return (
    <UserContext.Provider
      value={{
        bookings,
        setBookings,
        userId,
        setUserId,
        forceUpdate,
        setForceUpdate,
        latestBookingObj,
        setLatestBookingObj,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

import React, { useState } from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [bookings, setBookings] = React.useState([]);
  const [userId, setUserId] = React.useState("");
  const [forceUpdate, setForceUpdate] = React.useState(false);
  const [latestBookingObj, setLatestBookingObj] = React.useState([]);
  const [predictionObj, setPredictionObj] = React.useState({});
  const [isPredictionMade, setIsPredictionMade] = React.useState(false);

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
        predictionObj,
        setPredictionObj,
        isPredictionMade,
        setIsPredictionMade,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

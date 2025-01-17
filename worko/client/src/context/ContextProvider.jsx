import { createContext, useState, useContext } from "react";

// Create a Context object
const MyContext = createContext();

// Create a provider component
// eslint-disable-next-line react/prop-types
export const MyProvider = ({ children }) => {
  const [userdata, setUserData] = useState([]);

  return (
    <MyContext.Provider value={{ userdata, setUserData }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to consume the context
// eslint-disable-next-line react-refresh/only-export-components
export const useMyContext = () => useContext(MyContext);

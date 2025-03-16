import { createContext } from "react";
import { doctors } from "../assets/images/assets";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currencySymbol = '₹';

    console.log(doctors);
    const value = { doctors, currencySymbol };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

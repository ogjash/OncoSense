import { createContext, useState, useEffect } from "react";
import { doctors as doctorsData } from "../assets/images/assets";

export const AppContext = createContext(null); // Initialize with null

const AppContextProvider = ({ children }) => {
    const [doctors, setDoctors] = useState(doctorsData || []);
    const [currencySymbol] = useState('₹');

    useEffect(() => {
        console.log('Doctors loaded:', doctors?.length);
    }, [doctors]);

    const value = {
        doctors,
        setDoctors,
        currencySymbol
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

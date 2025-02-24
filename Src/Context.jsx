import React, { createContext, useState, useContext } from 'react';


const MyContext = createContext();


export const MyContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const themeStyles = {
        light: {
            backgroundColor: '#ffffff',
            textColor: '#000000',
        },
        dark: {
            backgroundColor: '#121212',
            textColor: '#ffffff',
        },
    };

    return (
        <MyContext.Provider value={{ theme, toggleTheme, themeStyles }}>
            {children}
        </MyContext.Provider>
    );
};


export const useTheme = () => useContext(MyContext);
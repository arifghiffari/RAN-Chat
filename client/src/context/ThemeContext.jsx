import { createContext, useState } from 'react';

export const ThemeContext = createContext({
    currentTheme: "",
    setCurrentTheme: () =>{ },
    theme: {
        light:{
            dataTheme: ""
        },
    
        dark:{
            dataTheme: ""
        }
    }
});

export function ThemeProvider({ children }) {
    const [currentTheme, setCurrentTheme] = useState("light");
    return (
      <ThemeContext.Provider value = {
        {
            currentTheme,
            setCurrentTheme,
            theme: {
                light:{
                    dataTheme: "light"
                },
            
                dark:{
                    dataTheme: "dark"
                }
            }
        }
      }>
        {children}
      </ThemeContext.Provider>
    );
}


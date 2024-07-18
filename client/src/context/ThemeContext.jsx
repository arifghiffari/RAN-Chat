import { createContext, useState } from 'react';

export const ThemeContext = createContext({
    currentTheme: "",
    setCurrentTheme: () =>{ },
    theme: {
        bumblebee:{
            dataTheme: ""
        },
    
        dark:{
            dataTheme: ""
        }
    }
});

export function ThemeProvider({ children }) {
    const [currentTheme, setCurrentTheme] = useState("bumblebee");
    return (
      <ThemeContext.Provider value = {
        {
            currentTheme,
            setCurrentTheme,
            theme: {
                bumblebee:{
                    dataTheme: "bumblebee"
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


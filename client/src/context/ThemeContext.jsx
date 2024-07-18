import { createContext, useState } from 'react';

export const ThemeContext = createContext({
    currentTheme: "",
    setCurrentTheme: () =>{ },
    theme: {
        bumblebee:{
            dataTheme: ""
        },
    
        halloween:{
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
            
                halloween:{
                    dataTheme: "halloween"
                }
            }
        }
      }>
        {children}
      </ThemeContext.Provider>
    );
}


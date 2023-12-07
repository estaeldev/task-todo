import { ThemeProvider as TProvider } from "@mui/material";
import { FC, PropsWithChildren, createContext, useCallback, useMemo, useState } from "react";
import { DarkTheme, LightTheme } from "../themes";


interface IThemeContextData {
    themeName: "light" | "dark"
    toggleTheme: () => void
}

export const ThemeContext = createContext({} as IThemeContextData)

export const ThemeProvider: FC<PropsWithChildren> = ({children}) => {

    const [themeName, setThemeName] = useState<"light" | "dark">("light")

    const toggleTheme = useCallback(() => {
        setThemeName(prev => prev === "light" ? "dark" : "light")
    }, [])

    const theme = useMemo(() => {
        return themeName === "light" ? LightTheme : DarkTheme
    }, [themeName])
    
    const context = useMemo<IThemeContextData>(() => {
        return {themeName, toggleTheme}
    }, [themeName, toggleTheme]) 

    return (
        <ThemeContext.Provider value={context}>
            <TProvider theme={theme}>
                {children}
            </TProvider>
        </ThemeContext.Provider>
    )
}
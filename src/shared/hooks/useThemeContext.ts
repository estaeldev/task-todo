import { useContext } from "react"
import { ThemeContext } from "../contexts"


export const useThemeContext = () => {
    
    const context = useContext(ThemeContext)
    
    if(context === undefined) {
        throw new Error("Fora do contexto - ThemeContext")
    }

    return context

}

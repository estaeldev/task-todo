import { AppBar, Box, Icon, IconButton, Theme, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { useThemeContext } from "../../hooks";

type TTopBarProps = {
    smDown: boolean
    theme: Theme
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export const TopBar: FC<TTopBarProps> = ({smDown, theme, setOpenDrawer}) => {

    const {themeName, toggleTheme} = useThemeContext()

    return (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1}}>
            <Toolbar>
                {smDown && (
                    <IconButton color="inherit" onClick={() => setOpenDrawer(prev => !prev)}> 
                        <Icon>menu</Icon> 
                    </IconButton>
                )}
                <Typography variant="h6">React CRUD Client</Typography>
                <Box display="flex" flex={1}></Box>
                <IconButton onClick={toggleTheme} color="inherit">
                    <Icon> {themeName === "light" ? "dark_mode" : "light_mode"} </Icon>
                </IconButton>
            </Toolbar>                    
        </AppBar>
    )

}

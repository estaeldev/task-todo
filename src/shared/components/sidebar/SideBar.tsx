import { Box, Drawer, List, Theme } from "@mui/material";
import { FC } from "react";
import { ListItemLink } from "./components/ListItemLink";


type TSideBarProps = {
    smDown: boolean
    theme: Theme
    isOpenDrawer: boolean
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export const SideBar: FC<TSideBarProps> = ({smDown, theme, isOpenDrawer, setOpenDrawer, }) => {

    return (
        <Drawer open={isOpenDrawer} variant={smDown ? "temporary" : "permanent"} onClose={() => setOpenDrawer(prev => !prev)}>
            <Box marginTop={theme.spacing(8)} width={theme.spacing(28)} height="auto" padding={1}>
                <List>
                   <ListItemLink label="Home" path="/home" iconName="home" setOpenDrawer={setOpenDrawer}/>
                </List>
            </Box>
        </Drawer>       
    )

}

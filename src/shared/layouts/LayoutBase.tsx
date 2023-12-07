import { Box, Container, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import { FC, PropsWithChildren, useState } from "react";
import { SideBar, TopBar } from "shared/components";


export const LayoutBase: FC<PropsWithChildren> = ({children}) => {

    const [openDrawer, setOpenDrawer] = useState(false)
    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down("sm"))

    return (
        <>
            <CssBaseline />
            
            <TopBar 
                theme={theme}
                smDown={smDown}
                setOpenDrawer={setOpenDrawer} 
            />
           
            <SideBar 
                theme={theme}
                smDown={smDown}
                isOpenDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
            /> 
            
            <Container maxWidth="xl">
                <Box
                    height="auto" 
                    marginLeft={smDown ? 0 : theme.spacing(27)} 
                    marginTop={theme.spacing(10)}>
                    {children}
                </Box>
            </Container>
            
        </>
    )

}

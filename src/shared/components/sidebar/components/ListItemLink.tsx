import { Icon, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { FC } from "react";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

type TListItemLinkProps = {
    path: string
    label: string
    iconName: string
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export const ListItemLink: FC<TListItemLinkProps> = ({label, path, iconName, setOpenDrawer}) => {

    const resolvedPath = useResolvedPath(path)
    const match = useMatch({path: resolvedPath.pathname, end: false})
    const navigate = useNavigate()

    const handleClick = () => {
        setOpenDrawer(prev => !prev)
        navigate(path)
    }
    
    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon> <Icon>{iconName}</Icon> </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    )

}

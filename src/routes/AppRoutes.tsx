import { Home, TodoDetails } from "pages";
import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRoutes: FC = () => {
    
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/todo/details/:id" element={<TodoDetails />} />

            <Route path="*" element={<Navigate to={"/home"} />} />
        </Routes>
    )

}

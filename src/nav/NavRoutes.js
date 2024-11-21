import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Menu from '../pages/Menu';
import TableReservation from '../pages/TableReservation';
import Feedback from '../pages/Feedback';

export default function NavRoutes() {
    const { user } = useContext(UserContext);
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservation" element={<TableReservation />} />
            <Route path="/feedback" element={user ? <Feedback /> : <Login />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );
}
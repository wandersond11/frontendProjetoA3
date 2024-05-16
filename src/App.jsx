import React, {useContext} from 'react';
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {Dimensionamento} from "./pages/Dimensionamento";
import './styles.scss';
import {Navigate, Route, Routes, redirect} from "react-router-dom";
import colors from "./constants/colors";
import {LoginContext} from "./context/Login";

export const App = () => {
    const {
        logged
    } = useContext(LoginContext)

    if (!logged) {
        return redirect("/login");
    }

    return (
        <div
            className="container"
            style={{background: colors.secondary}}
        >
            <Routes>
                <Route path="/" element={<Home/>}/>)
                <Route path="/dimensionamento" element={<Dimensionamento/>}/>)
                <Route path="/login" element={<Login/>}/>)
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </div>
    );
};

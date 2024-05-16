import {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { http } from '../../service/http';

export const LoginContext = createContext();
export const LoginProvider = ({children}) => {
    const [loginError, setLoginError] = useState(false);
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState("")
    const [senha, setSenha] = useState("")

    const login = async () => {
        try {
            const data = await http.post("/usuarios/login",{
                "nome": user,
                "senha": senha
            })
            if (data.request.response === 200) {
                setLogged(true)
                localStorage.setItem("logged", true)
            }
            return data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("logged")) {
            setLogged(true)
        }
    }, [])

    return (
        <LoginContext.Provider
            value={{
                loginError,
                setLoginError,
                logged,
                setLogged,
                login,
                user,
                setUser,
                senha,
                setSenha
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};

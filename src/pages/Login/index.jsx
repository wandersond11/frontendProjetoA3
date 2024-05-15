import React, { useContext, useState } from 'react';
import { LoadingContext } from "../../context/Loading";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/Admin";
import { Button, Text, Alert } from "@chakra-ui/react";
import CustomInput from "../../components/CustomInput";
import './styles.scss'

export const Login = () => {
    const { setLoading } = useContext(LoadingContext)
    const navigate = useNavigate()

    const {
        user,
        setUser,
        senha,
        setSenha,
        login
    } = useContext(AdminContext)

    const [loginError, setLoginError] = useState(false);

    const handleLogin = async () => {
        setLoading(true); // Assuming you have a loading state for login attempts

        try {
            const user =   await login(); // Call the login function with potential navigation
            if(user){ 
                setLoginError(false); // Clear error if login succeeds
                navigate("/")
            }else{
                setLoginError(true); // Set error state if login fails (consider more specific error handling if possible)
            }  
        } catch (error) {
            setLoginError(true); // Set error state if login fails (consider more specific error handling if possible)
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="login-container">
            <div>
                <Text>Entrar</Text>
                <CustomInput
                    label="Usuário"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <CustomInput
                    label="Senha"
                    senha
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                {loginError && (
                    <Alert status="error">
                        Usuário ou senha incorretos. Tente novamente.
                    </Alert>
                )}
                <Button onClick={handleLogin}>
                    Confirmar
                </Button>
            </div>
        </div>
    );
};

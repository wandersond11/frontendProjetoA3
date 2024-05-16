import React, {useContext, useState} from 'react';
import {LoadingContext} from "../../context/Loading";
import {useNavigate} from "react-router-dom";
import {AdminContext} from "../../context/Admin";
import {Button, Text, Alert} from "@chakra-ui/react";
import CustomInput from "../../components/CustomInput";
import {LoginContext} from "../../context/Login";
import './styles.scss'

export const Login = () => {
    const {setLoading} = useContext(LoadingContext)
    const navigate = useNavigate()

    const {
        loginError,
        setLoginError,
        login,
        user,
        setUser,
        senha,
        setSenha,
    } = useContext(LoginContext)

    const handleLogin = async () => {
        setLoading(true);

        try {
            const user = await login();
            if (user) {
                setLoginError(false);
                navigate("/")
            } else {
                setLoginError(true);
            }
        } catch (error) {
            setLoginError(true);
        } finally {
            setLoading(false);
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
                <Button mt="4" onClick={handleLogin}>
                    Confirmar
                </Button>
            </div>
        </div>
    );
};

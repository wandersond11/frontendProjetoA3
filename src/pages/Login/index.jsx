import React, {useContext} from 'react';
import {LoadingContext} from "../../context/Loading";
import {useNavigate} from "react-router-dom";
import {AdminContext} from "../../context/Admin";
import {Button, Text} from "@chakra-ui/react";
import CustomInput from "../../components/CustomInput";
import './styles.scss'

export const Login = () => {
    const {setLoading} = useContext(LoadingContext)
    const navigate = useNavigate()

    const {
        user,
        setUser,
        senha,
        setSenha,
        login
    } = useContext(AdminContext)

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
                <Button onClick={() => login(navigate)}>
                    Confirmar
                </Button>
            </div>
        </div>
    );
};

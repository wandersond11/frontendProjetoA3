import React, {useContext} from 'react';
import {LoadingContext} from "../../context/Loading";
import './styles.scss'
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import {Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {DadosContext} from "../../context/Dados";
import CardInfo from "../../components/CardInfo";

export const Dimensionamento = () => {
    const {setLoading} = useContext(LoadingContext)
    const navigate = useNavigate()

    const {
        infoPlanejamento,
        modulos,
        marcas,
        estruturas,
        tensoes,
        fases,
        setInfoPlanejamentoByKey,
        confirmarValores,
    } = useContext(DadosContext)

    return (
        <div className="dimensionamento-container">
            <div>
                <CustomInput
                    label="Potência"
                    prefix="kWp"
                    value={infoPlanejamento?.potencia}
                    onChange={(e) => setInfoPlanejamentoByKey("potencia", e.target.value)}
                />
                <CustomSelect
                    label="Módulo"
                    options={modulos}
                    value={infoPlanejamento?.modulo}
                    onChange={(e) => setInfoPlanejamentoByKey("modulo", e)}
                />
                <CustomSelect
                    label="Marca"
                    options={marcas}
                    value={infoPlanejamento?.marca}
                    onChange={(e) => setInfoPlanejamentoByKey("marca", e)}
                />
                <CustomSelect
                    label="Estrutura"
                    options={estruturas}
                    value={infoPlanejamento?.estrutura}
                    onChange={(e) => setInfoPlanejamentoByKey("estrutura", e)}
                />
                <CustomSelect
                    label="Tensão"
                    options={tensoes}
                    value={infoPlanejamento?.tensao}
                    onChange={(e) => setInfoPlanejamentoByKey("tensao", e)}
                />
                <CustomSelect
                    label="Fase"
                    options={fases}
                    value={infoPlanejamento?.fase}
                    onChange={(e) => setInfoPlanejamentoByKey("fase", e)}
                />
            </div>
            <Button onClick={() => confirmarValores(navigate)}>
                Dimensionar
            </Button>
            <div>
                <CardInfo
                    name="Área utilizada"
                    value={`${600}m²`}
                />
            </div>
        </div>
    );
};

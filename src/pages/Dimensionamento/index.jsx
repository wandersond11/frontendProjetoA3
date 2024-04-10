import React, {useContext} from 'react';
import {LoadingContext} from "../../context/Loading";
import './styles.scss'
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import {Button, Divider, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {DadosContext} from "../../context/Dados";
import CardInfo from "../../components/CardInfo";
import colors from "../../constants/colors"

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
        infoInstalacao
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
            <Button
                minHeight="40px"
                onClick={() => confirmarValores(navigate)}
            >
                Dimensionar
            </Button>
            <Divider/>
            {Object.keys(infoInstalacao).length + 2 > 0 &&
                <div>
                    <div>
                        <CustomInput
                            label="Instalação"
                            prefix="R$"
                            value={infoPlanejamento?.instalacao}
                            onChange={(e) => setInfoPlanejamentoByKey("instalacao", e.target.value)}
                        />
                        <CustomInput
                            label="Valor médio do kit"
                            prefix="R$"
                            value={infoPlanejamento?.valorMedioKit}
                            onChange={(e) => setInfoPlanejamentoByKey("valorMedioKit", e.target.value)}
                        />
                        <CustomInput
                            label="Frete"
                            prefix="R$"
                            value={infoPlanejamento?.frete}
                            onChange={(e) => setInfoPlanejamentoByKey("frete", e.target.value)}
                        />
                        <CustomInput
                            label="Margem"
                            prefix="R$"
                            value={infoPlanejamento?.margem}
                            onChange={(e) => setInfoPlanejamentoByKey("margem", e.target.value)}
                        />
                    </div>
                    <aside>
                        <Text>
                            Total
                        </Text>
                        <div>
                            <Text color={colors.green}>
                                R$ 20020,84{infoPlanejamento?.total}
                            </Text>
                        </div>
                    </aside>
                </div>
            }
            <Divider/>
            <div>
                <CardInfo
                    name="Kit dimensionado"
                    value={infoPlanejamento?.potencia}
                    suffix=" kWp"
                />
                <CardInfo
                    name="Área utilizada"
                    value={600}
                    suffix="m²"
                />
                <CardInfo
                    name="Horas de Sol"
                    value={5.5}
                    suffix=" H"
                />
                <CardInfo
                    name="Redução na conta de luz"
                    value={600}
                    prefix="R$ "
                />
            </div>
        </div>
    );
};

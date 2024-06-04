import React, {useContext} from 'react';
import {Button, Link, Text} from "@chakra-ui/react";
import './styles.scss'
import CustomInput from "../../components/CustomInput";
import {formatCep} from "../../util/format";
import painelSolar1 from '../../assets/painel-solar-1.jpg'
import painelSolar2 from '../../assets/painel-solar-2.jpg'
import painelSolar3 from '../../assets/painel-solar-3.jpg'
import painelSolar4 from '../../assets/painel-solar-4.jpg'
import CustomSelect from "../../components/CustomSelect";

import colors from '../../constants/colors';
import {DadosContext} from "../../context/Dados";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const {
        showMonths,
        setShowMonths,
        infoLocalidade,
        months,
        setMonths,
        setInfoLocalidadeByKey,
        calcularMedia,
        tensoes,
    } = useContext(DadosContext)



    const navigate = useNavigate()

    const cards = [
        {
            title: "LOREM IPSUM",
            text: "Lorem ipsum dolor sit amet",
            image: painelSolar1,
        },
        {
            title: "LOREM IPSUM",
            text: "Lorem ipsum dolor sit amet",
            image: painelSolar2,
        },
        {
            title: "LOREM IPSUM",
            text: "Lorem ipsum dolor sit amet",
            image: painelSolar3,
        },
        {
            title: "LOREM IPSUM",
            text: "Lorem ipsum dolor sit amet",
            image: painelSolar4,
        },
    ]

    return (
        <div className="home-container">
            <div className="calc">
                <div>
                    {showMonths ?
                        <aside>
                            <Text color="white">Media mensal de consumo (kWh)</Text>
                            <aside>
                                {Object.keys(months).map((key) => {
                                    return (
                                        <CustomInput
                                            placeholder={key}
                                            type="number"
                                            min={0}
                                            value={months[key] === 0 ? "" : months[key]}
                                            onChange={(e) => setMonths({
                                                ...months,
                                                [key]: e.target.value === "" ? 0 : e.target.value
                                            })}
                                        />
                                    )
                                })}
                            </aside>
                            <Button
                                w="full"
                                mt="4"
                                onClick={calcularMedia}
                            >
                                Confirmar
                            </Button>
                        </aside> :
                        <aside>
                            <CustomInput
                                label="Media mensal de consumo"
                                prefix="kWh"
                                value={infoLocalidade?.media}
                                onChange={(e) => setInfoLocalidadeByKey("media", e.target.value)}
                            />
                            <Button
                                variant="link"
                                mt="2px"
                                onClick={() => setShowMonths(true)}
                            >
                                Não sei minha média
                            </Button>
                        </aside>
                    }
                    <CustomInput
                        label="Custo por kWh"
                        prefix="R$"
                        value={infoLocalidade?.custo}
                        onChange={(e) => setInfoLocalidadeByKey("custo", e.target.value)}
                    />
                    <CustomInput
                        label="Horas de sol"
                        value={infoLocalidade?.horas}
                        placeholder="1"
                        maxLength={9}
                        onChange={(e) => setInfoLocalidadeByKey("horas", e.target.value)}
                    />

                    
                    <CustomSelect
                        label="Tensão"
                        options={tensoes}
                        value={infoLocalidade?.tensao}
                        onChange={(e) => setInfoLocalidadeByKey("tensao", e)}
                    />

                    <CustomInput
                        label="CEP"
                        value={infoLocalidade?.cep}
                        placeholder="00000-000"
                        maxLength={9}
                        onChange={(e) => setInfoLocalidadeByKey("cep", formatCep(e.target.value))}
                    />
                    {infoLocalidade?.endereco && <>
                        <CustomInput
                            label="Cidade"
                            value={infoLocalidade?.endereco?.localidade}
                        />
                        <CustomInput
                            label="Estado"
                            value={infoLocalidade?.endereco?.uf}
                        />
                        <CustomInput
                            label="Bairro"
                            value={infoLocalidade?.endereco?.bairro}
                        />
                        <CustomInput
                            label="Rua"
                            value={infoLocalidade?.endereco?.logradouro}
                        />
                        <CustomInput
                            label="Número"
                            value={infoLocalidade?.endereco?.numero}
                            onChange={(e) => setInfoLocalidadeByKey("endereco", {...infoLocalidade?.endereco, numero: e.target.value})}
                        />
                    </>}
                    <Button mt="4" onClick={() => navigate("/dimensionamento")}>
                        Confirmar
                    </Button>
                </div>
            </div>
            <div className="cards">
                {cards.map((card) => {
                    return (
                        <div style={{backgroundImage: `url(${card.image})`}}>
                            <div>
                                <Text>{card.title}</Text>
                                <Text>{card.text}</Text>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

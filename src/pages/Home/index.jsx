import React, {useContext, useEffect, useState} from 'react';
import {LoadingContext} from "../../context/Loading";
import {Button, Link, Text} from "@chakra-ui/react";
import './styles.scss'
import {CustomInput} from "../../components/atoms/CustomInput/CustomInput";
import {formatCep} from "../../util/format";
import painelSolar1 from '../../assets/painel-solar-1.jpg'
import painelSolar2 from '../../assets/painel-solar-2.jpg'
import painelSolar3 from '../../assets/painel-solar-3.jpg'
import painelSolar4 from '../../assets/painel-solar-4.jpg'
import {CheckIcon} from '@chakra-ui/icons';
import colors from '../../constants/colors';

export const Home = () => {
    const {setLoading} = useContext(LoadingContext)

    const [showMonths, setShowMonths] = useState()
    const [media, setMedia] = useState()
    const [custo, setCusto] = useState()
    const [cep, setCep] = useState()
    const [endereco, setEndereco] = useState()
    const [months, setMonths] = useState({
        jan: 0,
        fev: 0,
        mar: 0,
        abr: 0,
        mai: 0,
        jun: 0,
        jul: 0,
        ago: 0,
        set: 0,
        out: 0,
        nov: 0,
        dez: 0
    })

    useEffect(() => {
        if (cep?.length === 9) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "https://viacep.com.br/ws/" + cep + "/json/");
            xhr.onload = () => {
                if (xhr.status === 200) {
                    setEndereco(JSON.parse(xhr.responseText));
                } else {
                    alert("CEP inválido!");
                }
            };
            xhr.send();

            console.log(endereco)
        }
    }, [cep])

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

    const calcularMedia = () => {
        let total = 0
        Object.keys(months)?.map((key) => total += Number.parseFloat(months[key]))
        setMedia((total / 12).toFixed(2))
        setShowMonths(false)
    }

    return (
        <div
            className="home-container"
            style={{background: colors.secondary}}
        >
            <div className="calc">
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
                        <Button rightIcon={<CheckIcon/>} onClick={calcularMedia}>
                            Confirmar
                        </Button>
                    </aside> :
                    <aside>
                        <CustomInput
                            label="Media mensal de consumo (kWh)"
                            prefix="kWh"
                            value={media}
                            onChange={(e) => setMedia(e.target.value)}
                        />
                        <Link
                            color={colors.main}
                            style={{marginTop: '4px'}}
                            onClick={() => setShowMonths(true)}
                        >
                            Não sei minha média
                        </Link>
                    </aside>
                }
                <CustomInput
                    label="Custo por kWh"
                    prefix="R$"
                    value={custo}
                    onChange={(e) => setCusto(e.target.value)}
                />
                <CustomInput
                    label="CEP"
                    value={cep}
                    placeholder="00000-000"
                    maxLength={9}
                    onChange={(e) => setCep(formatCep(e.target.value))}
                />
                {endereco && <>
                    <CustomInput
                        label="Cidade"
                        value={endereco.localidade}
                    />
                    <CustomInput
                        label="Estado"
                        value={endereco.uf}
                    />
                    <CustomInput
                        label="Bairro"
                        value={endereco.bairro}
                    />
                    <CustomInput
                        label="Rua"
                        value={endereco.logradouro}
                    />
                </>}
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

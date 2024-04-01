import React, {useContext, useState} from 'react';
import {LoadingContext} from "../../context/Loading";
import {Button, IconButton, Input, Link, Text} from "@chakra-ui/react";
import './styles.scss'
import {CustomInput} from "../../components/atoms/CustomInput/CustomInput";
import {formatCep} from "../../util/formatCep";
import {CheckIcon} from '@chakra-ui/icons';
import colors from '../../constants/colors';
export const Home = () => {
    const {setLoading} = useContext(LoadingContext)

    const [showMonths, setShowMonths] = useState()
    const [media, setMedia] = useState()
    const [custo, setCusto] = useState()
    const [cep, setCep] = useState()
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
        dez: 0,
    })

    const cards = [
        {
            title: "LOREM IPSUM",
            text: "Lorem ipsum dolor sit amet",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjlS7FUuqmEeKh-0KHUhObZzTaUiTMAhaGaTdHJ6b87A&s",
        },
        {
            title: "LOREM IPSUM",
            text: "Lorem ipsum dolor sit amet",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjlS7FUuqmEeKh-0KHUhObZzTaUiTMAhaGaTdHJ6b87A&s",
        },
        {
            title: "LOREM IPSUM",
            text: "Lorem ipsum dolor sit amet",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjlS7FUuqmEeKh-0KHUhObZzTaUiTMAhaGaTdHJ6b87A&s",
        },
        {
            title: "LOREM IPSUM",
            text: "Lorem ipsum dolor sit amet",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjlS7FUuqmEeKh-0KHUhObZzTaUiTMAhaGaTdHJ6b87A&s",
        },
    ]

    const calcularMedia = () => {
        let total = 0
        Object.keys(months)?.map((key) => total += Number.parseFloat(months[key]))
        setMedia((total / 12).toFixed(2))
        setShowMonths(false)
    }

    return (
        <div className="home-container">
            <div className="calc">
                {showMonths ?
                    <aside>
                        <Text>Media mensal de consumo (kWh)</Text>
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
                        <Button onClick={calcularMedia}>
                            Confirmar
                        </Button>
                    </aside> :
                    <aside>
                        <CustomInput
                            label="Media mensal de consumo (kWh)"
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
                    value={custo}
                    onChange={(e) => setCusto(`R$ ${e.target.value}`)}
                />
                <CustomInput
                    label="CEP"
                    value={cep}
                    onChange={(e) => setCep(formatCep(e.target.value))}
                />
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

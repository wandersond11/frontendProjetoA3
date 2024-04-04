import React, {useContext, useEffect, useState} from 'react';
import {LoadingContext} from "../../context/Loading";
import {Button, Link, Text} from "@chakra-ui/react";
import './styles.scss'
import {CustomInput} from "../../components/atoms/CustomInput/CustomInput";
import {CustomSelect} from "../../components/atoms/CustomSelect/CustomSelect";
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
    const [infoLocalidade, setInfoLocalidade] = useState({})
    const [infoPlanejamento, setInfoPlanejamento] = useState({})
    const [info, setInfo] = useState({})
    const [months, setMonths] = useState({jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0})
    const [content, setContent] = useState(2)

    const modulos = [
        "DAH 550W",
        "RISEN 660W",
        "RISEN 605W",
        "RISEN 550W",
        "ZNSHINE BIFACIAL (GRAFENO) 665W",
        "RESUN 560W",
        "AMERISOLAR 605W",
        "AMERISOLAR 550W",
        "AMERISOLAR 450W",
        "SUNOVA 550W",
        "LONGI 550W",
        "TRINA 510W",
        "TRINA 405W",
        "ZNSHINE BIFACIAL (GRAFENO) 555W",
        "ZNSHINE 550W (GRAFENO)",
        "SUNERGY 570W TOPCON",
        "AE SOLAR HM6L-60-460W",
        "OSDA 575W TOPCON",
        "SENGI 545W (FINAME)",
        "CANADIAN SOLAR 550W"
    ]
    const marcas = ["Solis"]
    const estruturas = ["Aluzinco", "Colonial"]
    const tensoes = ["220V", "380V", "480V", "600V"]
    const fases = ["Monofásico", "Bifásico", "Trifásico"]

    const setInfoLocalidadeByKey = (key, value) => setInfoLocalidade(obj => {return {...obj, [key]: value}})

    const setInfoPlanejamentoByKey = (key, value) => setInfoPlanejamento(obj => {return {...obj, [key]: value}})

    useEffect(() => {
        if (infoLocalidade?.cep?.length === 9) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "https://viacep.com.br/ws/" + infoLocalidade?.cep + "/json/");
            xhr.onload = () => {
                if (xhr.status === 200) {
                    setInfoLocalidadeByKey("endereco", JSON.parse(xhr.responseText));
                } else {
                    alert("CEP inválido!");
                }
            };
            xhr.send();
        }
    }, [infoLocalidade?.cep])

    useEffect(() => {
        console.log(infoPlanejamento)
    }, [infoPlanejamento])

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
        setInfoLocalidadeByKey("media", (total / 12).toFixed(2))
        setShowMonths(false)
    }

    return (
        <div
            className="home-container"
            style={{background: colors.secondary}}
        >
            <div className="calc">
                {content === 1 ?
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
                            <Button onClick={calcularMedia}>
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
                            <Link
                                color={colors.main}
                                style={{marginTop: '4px'}}
                                onClick={() => setShowMonths(true)}
                                >
                                Não sei minha média
                            </Link>
                        </aside>}
                        <CustomInput
                            label="Custo por kWh"
                            prefix="R$"
                            value={infoLocalidade?.custo}
                            onChange={(e) => setInfoLocalidadeByKey("custo", e.target.value)}
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
                        <Button onClick={() => setContent(2)}>
                            Confirmar
                        </Button>
                    </div> :
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
                        <Button onClick={() => setInfo({...infoLocalidade, ...infoPlanejamento})}>
                            Dimensionar
                        </Button>
                    </div>
                }
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

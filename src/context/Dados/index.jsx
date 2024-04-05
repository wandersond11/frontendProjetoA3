import {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const DadosContext = createContext();
export const DadosProvider = ({children}) => {
    const [showMonths, setShowMonths] = useState()
    const [infoLocalidade, setInfoLocalidade] = useState({})
    const [infoPlanejamento, setInfoPlanejamento] = useState({})
    const [info, setInfo] = useState({})
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

    const setInfoLocalidadeByKey = (key, value) => setInfoLocalidade(obj => { return {...obj, [key]: value} })

    const setInfoPlanejamentoByKey = (key, value) => setInfoPlanejamento(obj => { return {...obj, [key]: value} })

    const calcularMedia = () => {
        let total = 0
        Object.keys(months)?.map((key) => total += Number.parseFloat(months[key]))
        setInfoLocalidadeByKey("media", (total / 12).toFixed(2))
        setShowMonths(false)
    }

    const confirmarValores = (navigate) => {
        setInfo({...infoLocalidade, ...infoPlanejamento})
        navigate("/dimensionamento")
    }

    return (
        <DadosContext.Provider
            value={{
                showMonths,
                setShowMonths,
                infoLocalidade,
                setInfoLocalidade,
                infoPlanejamento,
                setInfoPlanejamento,
                info,
                setInfo,
                months,
                setMonths,
                modulos,
                marcas,
                estruturas,
                tensoes,
                fases,
                setInfoLocalidadeByKey,
                setInfoPlanejamentoByKey,
                calcularMedia,
                confirmarValores,
            }}
        >
            {children}
        </DadosContext.Provider>
    );
};

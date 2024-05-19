import {createContext, useEffect, useState} from 'react';

export const DadosContext = createContext();
export const DadosProvider = ({children}) => {
    const [showMonths, setShowMonths] = useState()
    const [info, setInfo] = useState({})
    const [infoLocalidade, setInfoLocalidade] = useState({})
    const [infoPlanejamento, setInfoPlanejamento] = useState({})
    const [infoInstalacao, setInfoInstalacao] = useState({})
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
        {
          "nome": "GENERIC 500W",
          "valor": "500",
          "preco": "800",
          "area": "0.12"
        },
        {
          "nome": "SOLARMAX 600W",
          "valor": "600",
          "preco": "1400",
          "area": "0.5"
        },
        {
          "nome": "POWERLIGHT 550W",
          "valor": "550",
          "preco": "1250",
          "area": "0.5"
        },
        {
          "nome": "SUNPOWER 570W",
          "valor": "570",
          "preco": "1350",
          "area": "0.13"
        },
        {
          "nome": "ECLIPSE 530W",
          "valor": "530",
          "preco": "1200",
          "area": "0.12"
        },
        {
          "nome": "SUNRISE 560W",
          "valor": "560",
          "preco": "1300",
          "area": "0.14"
        },
        {
          "nome": "SUPERNOVA 590W",
          "valor": "590",
          "preco": "1450",
          "area": "0.16"
        },
        {
          "nome": "SOLARIS 520W",
          "valor": "520",
          "preco": "1150",
          "area": "0.13"
        },
        {
          "nome": "SOLARFLARE 580W",
          "valor": "580",
          "preco": "1400",
          "area": "0.15"
        },
        {
          "nome": "SUNBLAZE 540W",
          "valor": "540",
          "preco": "1300",
          "area": "0.14"
        }
      ]
      
      
    const marcas = ["Solis"]
    const estruturas = ["Aluzinco", "Colonial"]
    const tensoes = ["110V", "220V"]
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

    const setInfoByKey = (key, value, set) => set(obj => { return {...obj, [key]: value} })

    const setInfoLocalidadeByKey = (key, value) => setInfoByKey(key, value, setInfoLocalidade)

    const setInfoPlanejamentoByKey = (key, value) => setInfoByKey(key, value, setInfoPlanejamento)

    const setInfoInstalacaoByKey = (key, value) => setInfoByKey(key, value, setInfoPlanejamento)

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
                infoInstalacao,
                setInfoInstalacao,
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

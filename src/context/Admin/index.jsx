import {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { http } from '../../service/http';

export const AdminContext = createContext();
export const AdminProvider = ({children}) => {
    const [showMonths, setShowMonths] = useState()
    const [infoLocalidade, setInfoLocalidade] = useState({})
    const [infoPlanejamento, setInfoPlanejamento] = useState({})
    const [info, setInfo] = useState({})
    const [user, setUser] = useState("")
    const [senha, setSenha] = useState("")
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

    const modulos = {
        "DAH 550W": "550",
        "RISEN 660W": "660",
        "RISEN 605W": "605",
        "RISEN 550W": "550",
        "ZNSHINE BIFACIAL (GRAFENO) 665W": "665",
        "RESUN 560W": "560",
        "AMERISOLAR 605W": "605",
        "AMERISOLAR 550W": "550",
        "AMERISOLAR 450W": "450",
        "SUNOVA 550W": "550",
        "LONGI 550W": "550",
        "TRINA 510W": "510",
        "TRINA 405W": "405",
        "ZNSHINE BIFACIAL (GRAFENO) 555W": "555",
        "ZNSHINE 550W (GRAFENO)": "550",
        "SUNERGY 570W TOPCON": "570",
        "AE SOLAR HM6L-60-460W": "460",
        "OSDA 575W TOPCON": "575",
        "SENGI 545W (FINAME)": "545",
        "CANADIAN SOLAR 550W": "550"
      };
      
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

    const login = async () => {
        try {
            const data = await http.post("/usuarios/login",{
                "nome":user,
                "senha":senha  
            })
            return data 
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AdminContext.Provider
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
                user,
                setUser,
                senha,
                setSenha,
                login
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

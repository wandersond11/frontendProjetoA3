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
        infoInstalacao,
        // infoLocalidade 
    } = useContext(DadosContext)    


    
    function calcularGeracaoDiariaPainel(horasSol, tensao) {
        // Defina a potência nominal do painel solar (em Wp)
        console.log(modulos[2].valor)
        const potenciaPainel = modulos[2].valor; // Exemplo: 400Wp
      
        console.log(potenciaPainel, "teste")

        console.log(modulos[2].valor, "valor")
        console.log(horasSol, "horasSol")

        // Fator de desempenho (entre 0,75 e 0,85)
        const fatorDesempenho = 0.80;
      
        // Cálculo da geração diária por painel
        let geracaoDiariaPainel = (potenciaPainel * horasSol * fatorDesempenho) / 1000;


        console.log(geracaoDiariaPainel, "geracaoDiariaPainel")

        console.log(geracaoDiariaPainel, "teste2")
      
        // Ajuste para a tensão do sistema (110V ou 220V)
        if (tensao === 110) {
          geracaoDiariaPainel *= 0.85; // Fator de conversão para 110V (aproximado)
        }
      
        console.log(geracaoDiariaPainel, "teste3")
        return geracaoDiariaPainel;
    }
      

    function calcularNumeroPaineis(mediaKwh, geracaoDiariaPainel) {
        // Considerando 30 dias por mês
        const diasMes = 30;

        // Cálculo do número de painéis necessários
        console.log(mediaKwh,geracaoDiariaPainel,mediaKwh / (geracaoDiariaPainel * diasMes))
        const numeroPainéis = mediaKwh / (geracaoDiariaPainel * diasMes);
      
        return Math.ceil(numeroPainéis); // Arredondar para cima
    }

    function calcularCustoTotalSistema(numeroPainéis) {
        // Custo estimado por painel solar (em reais)
        const custoPainel = modulos[2].preco; // Exemplo: R$ 1.500 por painel
      
        // Cálculo do custo total do sistema
        const custoTotalSistema = numeroPainéis * custoPainel;
      
        return custoTotalSistema;
    }      


    function calcularaAreaPainel(numeroPainéis) {

        const area = modulos[2].area; 
      

        const areaTotal = numeroPainéis *area;
      
        return areaTotal;
    }      
      
    function calcularConsumoSolar(mediaKwh, valorKwh, horasSol, tensao) {
        // Validação dos dados de entrada
        if (!mediaKwh || !valorKwh || !horasSol || !tensao) {
            throw new Error("Dados inválidos. Preencha todos os campos corretamente.");
        }
    
        // Cálculo da geração diária por painel
        let geracaoDiariaPainel = calcularGeracaoDiariaPainel(horasSol, tensao);
    
        // Cálculo do número de painéis necessários
        let numeroPaineis = calcularNumeroPaineis(mediaKwh, geracaoDiariaPainel);
    
        // Cálculo do custo total do sistema
        let custoTotalSistema = calcularCustoTotalSistema(numeroPaineis);
    
        // Cálculo da área total dos painéis
        let areaTotal = calcularaAreaPainel(numeroPaineis);
    
        // Cálculo da energia gerada pelo sistema solar por mês
        let energiaGeradaPorMes = geracaoDiariaPainel * 30; // Assumindo 30 dias no mês
    
        // Cálculo da economia de energia mensal
        let economiaEnergiaMensal = mediaKwh - energiaGeradaPorMes;
    
        // Cálculo da economia financeira mensal
        let economiaFinanceiraMensal = economiaEnergiaMensal * valorKwh;
    
        // Retorno do resultado
        return {
            numeroPaineis: numeroPaineis,
            custoTotalSistema: custoTotalSistema,
            areaTotal: areaTotal,
            economiaEnergiaMensal: economiaEnergiaMensal,
            economiaFinanceiraMensal: economiaFinanceiraMensal.toFixed(2)
        };
    }
    
    // const infoLocalidade = {numeroPaineis: 2, custoTotalSistema: 2500, areaTotal: 1, economiaEnergiaMensal: 21, economiaFinanceiraMensal: "19.16"}

  const infoLocalidade = {
    cep: "38412-324",
    custo: "0.91",
    media:"115",
    endereco: {cep: "38412-324", logradouro: "Alameda José de Oliveira Guimarães", complemento: "", bairro: "Jardim Holanda", localidade: "Uberlândia", },
    horas: "8",
    tensao: "129",}
    console.log(infoLocalidade , "TESTE" )
      
    console.log(calcularConsumoSolar(infoLocalidade.media,infoLocalidade.custo ,infoLocalidade.horas,infoLocalidade.tensao))

    return (
        <div className="dimensionamento-container">
            <div>
                {/* <CustomInput
                    label="Potência"
                    prefix="kWp"
                    value={calcularKwp(infoLocalidade?.media ,infoLocalidade?.horas, 0.8 )   }
                    onChange={(e) => setInfoPlanejamentoByKey("potencia", e.target.value)}
                /> */}
                <CustomSelect
                    label="Módulo"
                    options={modulos.map(modulo => modulo.nome)}
                    value={modulos.map(modulo => modulo.nome)[2]}
                    onChange={(e) => setInfoPlanejamentoByKey("modulo", e)}
                />
                {/* <CustomSelect
                    label="Marca"
                    options={marcas}
                    value={infoPlanejamento?.marca}
                    onChange={(e) => setInfoPlanejamentoByKey("marca", e)}
                /> */}
                {/* <CustomSelect
                    label="Estrutura"
                    options={estruturas}
                    value={infoPlanejamento?.estrutura}
                    onChange={(e) => setInfoPlanejamentoByKey("estrutura", e)}
                /> */}
                <CustomSelect
                    label="Tensão"
                    options={tensoes}
                    value={infoLocalidade.tensao}
                    onChange={(e) => setInfoPlanejamentoByKey("tensao", e)}
                />
                {/* <CustomSelect
                    label="Fase"
                    options={fases}
                    value={infoPlanejamento?.fase}
                    onChange={(e) => setInfoPlanejamentoByKey("fase", e)}
                /> */}
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
                        {/* <CustomInput
                            label="Instalação"
                            prefix="R$"
                            value={infoPlanejamento?.instalacao}
                            onChange={(e) => setInfoPlanejamentoByKey("instalacao", e.target.value)}
                        /> */}
                        <CustomInput
                            label="Numero de painéis"
                            prefix="Unidade"
                            value={
                                calcularConsumoSolar(infoLocalidade.media,infoLocalidade.custo ,infoLocalidade.horas,infoLocalidade.tensao).numeroPaineis 

                            }
                            onChange={(e) => setInfoPlanejamentoByKey("valorMedioKit", e.target.value)}
                        />
                        {/* <CustomInput
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
                        /> */}
                    </div>
                    <aside>
                        <Text>
                            Total
                        </Text>
                        <Text backgroundColor={colors.green}>
                           {calcularConsumoSolar(infoLocalidade.media,infoLocalidade.custo ,infoLocalidade.horas,infoLocalidade.tensao).custoTotalSistema + 'R$'}
                           {infoPlanejamento?.total}
                        </Text>
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
                    value={
                        calcularConsumoSolar(infoLocalidade.media,infoLocalidade.custo ,infoLocalidade.horas,infoLocalidade.tensao).areaTotal 
                    }
                    suffix="m²"
                />
                <CardInfo
                    name="Horas de Sol"
                    value={infoLocalidade.horas}
                    suffix=" H"
                />
                <CardInfo
                    name="Redução na conta de luz"
                    value={
                        calcularConsumoSolar(infoLocalidade.media,infoLocalidade.custo ,infoLocalidade.horas,infoLocalidade.tensao).economiaFinanceiraMensal 

                    }
                    prefix="R$ "
                />
            </div>
        </div>
    );
};

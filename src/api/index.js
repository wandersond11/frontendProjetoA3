import { http } from "../service/http";


export const api ={
    calcula : (consumo,valor, dia) => http.get(`/calculate?consumoMensal=${consumo}&valorKwh=${valor}&horasSolDia=${dia}`)
}
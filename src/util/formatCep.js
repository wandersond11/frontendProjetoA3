
export const formatCep = (valor) => {
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    return valor;
}

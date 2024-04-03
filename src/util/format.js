
export const formatCep = (text) => {
    text = text.replace(/\D/g, "");
    text = text.replace(/(\d{5})(\d)/, "$1-$2");
    return text;
}

export const capitalize = (text) => {
    const words = text.split(" ");

    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return capitalizedWords.join(" ");
}

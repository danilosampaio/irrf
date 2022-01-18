/**
 * Formata mês e ano no seguinte padrão: YYYY-MM
 * 
 * @param {*} mesReferencia 
 * @param {*} anoReferencia 
 * @returns {string} Data formatada no padrão YYYY-MM
 */
function formataMesAno (mesReferencia, anoReferencia) {
    const hoje = new Date();
    let mes = mesReferencia ? mesReferencia + '' : hoje.getMonth() + 1;
    let ano = anoReferencia ? anoReferencia + '' : hoje.getFullYear();

    if (mes.length === 1) {
        mes = '0' + mes;
    }

    if (ano.length === 2) {
        ano = '20' + ano;
    }

    return `${ano}-${mes}`;
}

module.exports = {
    formataMesAno
}
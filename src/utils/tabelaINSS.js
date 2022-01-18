const vigencias = require('../vigenciasINSS');
const { formataMesAno } = require('./dataUtils');

/**
 * Retorna a tabela de aliquotas do INSS para o ano e mês de referência informado.
 * 
 * @param {*} mesReferencia caso não seja informado, o mês de referência será o mês atual. Ex: 1
 * @param {*} anoReferencia caso não seja informado, o ano de referência será o ano atual. Ex: 2022
 * @returns {Array} tabela de aliquotas do INSS
 */
function tabelaINSS(mesReferencia, anoReferencia) {
    const referencia = formataMesAno(mesReferencia, anoReferencia);
    const tabelaVigente = vigencias.find(vigencia => vigencia.de <= `${referencia}` && `${referencia}` <= vigencia.ate);

    if (!tabelaVigente) {
        throw new Error(`Não foi encontrada a vigência da tabela INSS para o mês ${referencia}`);
    }

    return tabelaVigente.tabela;
}

module.exports = tabelaINSS;
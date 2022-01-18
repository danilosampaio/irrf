const tabelaINSS = require('./utils/tabelaINSS');
const tabelaIRRF = require('./utils/tabelaIRRF');

/**
 * Calcula o valor do Imposto de Renda Retido na Fonte (IRRF) que é descontado na folha de pagamento mensalmente.
 * Resumo do cálculo:
 * 
 * IRRF = baseCalculo * aliquota - deducao
 * 
 * Onde:
 *  - baseCalculo = salarioBruto - deducaoINSS - pensao - deducaoPorDependente
 *  - aliquota = percentual definido por faixa salarial
 *  - deducao = valor fixo definido por faixa salarial
 * 
 * @param {*} salarioBruto valor bruto do salário sem descontos
 * @param {*} mesReferencia caso não seja informado, o mês de referência será o mês atual. Ex: 1
 * @param {*} anoReferencia caso não seja informado, o ano de referência será o ano atual. Ex: 2022
 * @param {*} dependentesSemPensao número de dependentes que não recebem pensão.
 * @param {*} pensao Valor total pago em pensão para outros dependentes (que foram desconsiderados no parâmetro `dependentesSemPensao`).
 * @returns {Object} Objeto com o valor do IRRF e o racional da base de cálculo e deduções.
 */
function calculaIRRF (
    salarioBruto,
    mesReferencia,
    anoReferencia,
    dependentesSemPensao = 0,
    pensao = 0
) {
    //dedução de R$ 189,59 por dependente
    const deducaoPorDependente = dependentesSemPensao * 189.59;

    //calcula o valor a deduzir do INSS, pois esse valor é subtraído do salário bruto para formar a base de cálculo do IRRF
    const calculoINSS = calculaINSS(salarioBruto, mesReferencia, anoReferencia);

    //define a base de cálculo do IRRF
    const baseDeCalculo = salarioBruto - calculoINSS.inss - deducaoPorDependente - pensao;

    //identifica a tabela vigente do IRRF com base no ano e mês de referência
    const tabelaIRRFVigente = tabelaIRRF(mesReferencia, anoReferencia);

    //identifica a faixa salarial na tabela de IRRF
    const faixaIRRF = tabelaIRRFVigente.find(faixa => faixa.faixaSalarial.de <= baseDeCalculo && baseDeCalculo <= faixa.faixaSalarial.ate);

    //aplica a alíquota da faixa salarial na base de cálculo, e subtrai o valor fixo de cada faixa salarial
    const totalDeducao = baseDeCalculo * (faixaIRRF.aliquota / 100) - faixaIRRF.parcelaADeduzir;

    return {
        irrf: totalDeducao > 0 ? totalDeducao : 0,
        racional: {
            baseDeCalculo,
            calculoINSS,
            deducaoPorDependente,
            pensao,
            faixaIRRF
        }
    }
}

/**
 * Calcula a dedução do INSS que é descontado na folha de pagamento mensalmente.
 * 
 * Resumo do cálculo:
 * 
 * INSS = ∑ (valorDedutivel * aliquota)
 * 
 * Onde:
 *  - valorDedutivel = iteração nas faixas salariais começando da faxia de menor valor até a de maior valor. A faixa atual menor ou igual
 *                      ao valor do salário? Caso sim, aplica-se a alíquota ao valor da faixa. Caso não, aplica-se a alíquota ao valor restante.
 *                      o valor restante é o salario subtraído do valor da faixa, que é feita a cada iteração.
 *  - aliquota = percentual definido por faixa salarial
 * 
 * @param {*} salarioBruto 
 * @param {*} mesReferencia caso não seja informado, o mês de referência será o mês atual. Ex: 1
 * @param {*} anoReferencia caso não seja informado, o ano de referência será o ano atual. Ex: 2022
 * @returns {Object} Objeto com o valor do INSS e o racional da base de cálculo.
 */
function calculaINSS (salarioBruto, mesReferencia, anoReferencia) {
    //identifica a tabela vigente do INSS com base no ano e mês de referência
    const tabelaInssVigente = tabelaINSS(mesReferencia, anoReferencia);

    // variável de controle que será decrementada a cada faixa salarial
    let valorDedutivel = salarioBruto;

    //racional das deduções por faixa salarial
    const deducaoPorFaixa = [];

    //valor total da dedução do INSS
    let deducaoTotal = 0;

    let count = 0;
    //percorre as faixas da tabela do INSS, até chegar na última faixa, ou até que o valor a deduzir seja igual a zero
    while (valorDedutivel > 0 && count < tabelaInssVigente.length) {
        const faixa = tabelaInssVigente[count];
        const intervaloFaixa = faixa.faixaSalarial.ate - faixa.faixaSalarial.de;

        //a cada faixa, verificar se o valor restante a deduzir é maior ou igual ao valor da faixa salarial, pois
        //como a cada faixa salarial é subtraída do valor a deduzir, o valor a deduzir restante pode ser menor que o valor faixa atual,
        //nesse caso, considera-se o valor restante como o valor da faixa atual
        const deduzirMaximoDaFaixaAtual = valorDedutivel >= intervaloFaixa;

        //aplica a alíquota da faixa salarial
        const deducao = (faixa.aliquota / 100) * (deduzirMaximoDaFaixaAtual ? intervaloFaixa : valorDedutivel);

        //acumula a dedução
        deducaoTotal += deducao;

        //subtrai o valor da faixa salarial do valor a deduzir
        valorDedutivel = valorDedutivel - intervaloFaixa;

        //atualiza o racional
        deducaoPorFaixa.push({
            faixa,
            deducao
        })

        count++;
    }

    return {
        inss: deducaoTotal > 0 ? deducaoTotal : 0,
        racional: {
            deducaoPorFaixa
        }
    }
}

module.exports ={
    calculaIRRF,
    calculaINSS
}
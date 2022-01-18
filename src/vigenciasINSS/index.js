const De_2020_03_Ate_2020_12 = require('./De_2020_03_Ate_2020_12');
const De_2021_01_Ate_2021_12 = require('./De_2021_01_Ate_2021_12');
const De_2022_01_Ate_hoje = require('./De_2022_01_Ate_hoje');

module.exports = [
    {
        de: '2022-01',
        ate: '9999-99', //atual
        tabela: De_2022_01_Ate_hoje
    },
    {
        de: '2021-01',
        ate: '2021-12',
        tabela: De_2021_01_Ate_2021_12
    },
    {
        de: '2020-03',
        ate: '2020-12',
        tabela: De_2020_03_Ate_2020_12
    }
];

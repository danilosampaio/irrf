const { calculaIRRF } = require("../src");

describe('Calcula IRRF', () => {
    test('IRRF de R$ 32,96', () => {
        const { irrf, racional } = calculaIRRF(3000, 1, 2021, 2, 0);
        expect(+irrf.toFixed(2)).toBe(32.96);
        expect(racional).toEqual({
            baseDeCalculo: 2343.4241,
            calculoINSS: {
                inss: 277.3959,
                racional: {
                    deducaoPorFaixa: [
                        {
                            deducao: 82.5,
                            faixa: {
                                aliquota: 7.5,
                                faixaSalarial: {
                                    ate: 1100,
                                    de: 0,
                                },
                            },
                        },
                        {
                            deducao: 99.3123,
                            faixa: {
                                aliquota: 9,
                                faixaSalarial: {
                                    ate: 2203.48,
                                    de: 1100.01,
                                },
                           },
                        },
                        {
                            deducao: 95.58359999999999,
                            faixa: {
                                aliquota: 12,
                                faixaSalarial: {
                                    ate: 3305.22,
                                    de: 2203.49,
                                },
                            },
                        }
                    ]
                }
            },
            deducaoPorDependente: 379.18,
            pensao: 0,
            faixaIRRF: {
                faixaSalarial: {
                    de: 1903.99,
                    ate:  2826.66
                },
                aliquota: 7.5,
                parcelaADeduzir: 142.8
            }
        });
    });

    test('IRRF de R$ 3.363,77', () => {
        const { irrf, racional } = calculaIRRF(16334.77, 1, 2021, 1, 0);
        expect(+irrf.toFixed(2)).toBe(3363.77);
        expect(racional).toEqual({
            baseDeCalculo: 15393.192500000001,
            calculoINSS: 751.9875,
            calculoINSS: {
                inss: 751.9875,
                racional: {
                    deducaoPorFaixa: [
                        {
                            deducao: 82.5,
                            faixa: {
                                aliquota: 7.5,
                                faixaSalarial: {
                                    ate: 1100,
                                    de: 0,
                                },
                            },
                        },
                        {
                            deducao: 99.3123,
                            faixa: {
                                aliquota: 9,
                                faixaSalarial: {
                                    ate: 2203.48,
                                    de: 1100.01,
                                },
                           },
                        },
                        {
                            deducao: 132.20759999999999,
                            faixa: {
                                aliquota: 12,
                                faixaSalarial: {
                                    ate: 3305.22,
                                    de: 2203.49,
                                },
                            },
                        },
                        {
                            deducao: 437.9676,
                            faixa: {
                                aliquota: 14,
                                faixaSalarial: {
                                    ate: 6433.57,
                                    de: 3305.23,
                                },
                            },
                        }
                    ]
                }
            },
            deducaoPorDependente: 189.59,
            pensao: 0,
            faixaIRRF: {
                faixaSalarial: {
                    de: 4664.69,
                    ate:  1.7976931348623157e+308
                },
                aliquota: 27.5,
                parcelaADeduzir: 869.36
            }
        });
    });

    test('IRRF de R$ 2.828,41', () => {
        const { irrf, racional } = calculaIRRF(14388, 1, 2021, 1, 0);
        expect(+irrf.toFixed(2)).toBe(2828.41);
        expect(racional).toEqual({
            baseDeCalculo: 13446.4225,
            calculoINSS: {
                inss: 751.9875,
                racional: {
                    deducaoPorFaixa: [
                        {
                            deducao: 82.5,
                            faixa: {
                                aliquota: 7.5,
                                faixaSalarial: {
                                    ate: 1100,
                                    de: 0,
                                },
                            },
                        },
                        {
                            deducao: 99.3123,
                            faixa: {
                                aliquota: 9,
                                faixaSalarial: {
                                    ate: 2203.48,
                                    de: 1100.01,
                                },
                           },
                        },
                        {
                            deducao: 132.20759999999999,
                            faixa: {
                                aliquota: 12,
                                faixaSalarial: {
                                    ate: 3305.22,
                                    de: 2203.49,
                                },
                            },
                        },
                        {
                            deducao: 437.9676,
                            faixa: {
                                aliquota: 14,
                                faixaSalarial: {
                                    ate: 6433.57,
                                    de: 3305.23,
                                },
                            },
                        }
                    ]
                }
            },
            deducaoPorDependente: 189.59,
            pensao: 0,
            faixaIRRF: {
                faixaSalarial: {
                    de: 4664.69,
                    ate:  1.7976931348623157e+308
                },
                aliquota: 27.5,
                parcelaADeduzir: 869.36
            }
        });
    });
})
# Calculadora Imposto de Renda - IRRF
> Calcula o valor do Imposto de Renda Retido na Fonte (IRRF) que é descontado na folha de pagamento mensalmente.

## Resumo do cálculo

`IRRF = baseCalculo * aliquota - deducao`
 
Onde:

    - baseCalculo = salarioBruto - deducaoINSS - pensao - deducaoPorDependente
    - aliquota = percentual definido por faixa salarial
    - deducao = valor fixo definido por faixa salarial

## Install

```sh
$ npm install irrf
```

## Uso

```js
const { calculaIRRF } = require('irrf');

const { irrf, racional } = calculaIRRF(5000);

//==> Result
{
    irrf: 345.91,
    racional: {
        baseDeCalculo: 4463.84,
        calculoINSS: {
            ...
        }
    }
}
```

```js
const { irrf, racional } = calculaIRRF(5000, 3, 2020, 1);

//==> Result
{
    irrf: 299.19,
    racional: {
        baseDeCalculo: 4251.46,
        calculoINSS: {
            ...
        },
        deducaoPorDependente: 189.59,
    }
}
```

## API

### calculaIRRF(salarioBruto, mesReferencia, anoReferencia, dependentesSemPensao, pensao)

#### salarioBruto

*Required*  
Type: `number`

Valor bruto do salário sem descontos

#### mesReferencia

*Optional*  
Type: `number`
Default: new Date().getMonth()

caso não seja informado, o mês de referência será o mês atual. Ex: 1

#### anoReferencia

*Optional*  
Type: `number`
Default: new Date().getFullYear()

caso não seja informado, o ano de referência será o ano atual. Ex: 2022

#### dependentesSemPensao

*Optional*  
Type: `number`
Default: 0

número de dependentes que não recebem pensão.

#### pensao

*Optional*  
Type: `number`
Default: 0

Valor total pago em pensão para outros dependentes (que foram desconsiderados no parâmetro `dependentesSemPensao`).

## License
MIT © [Danilo Sampaio](http://github.org/danilosampaio)

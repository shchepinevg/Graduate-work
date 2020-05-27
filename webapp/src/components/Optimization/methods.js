export const GA = {
    name: "Генетический алгоритм",
    recomParam: [
        {
            name: "selection",
            type: "discrete",
            borderLow: "1",
            borderHight: "4",
            value: "2"
        },
        {
            name: "crossover",
            type: "discrete",
            borderLow: "1",
            borderHight: "5",
            value: "2"
        },
        {
            name: "mutation",
            type: "discrete",
            borderLow: "1",
            borderHight: "4",
            value: "1"
        },
        {
            name: "mut_pow",
            type: "discrete",
            borderLow: "1",
            borderHight: "50",
            value: "10"
        },
        {
            name: "N_pop",
            type: "continuous",
            borderLow: "20",
            borderHight: "2000",
            value: "44"
        },
        {
            name: "P_mut",
            type: "continuous",
            borderLow: "0",
            borderHight: "1",
            value: "0.1"
        },
        {
            name: "P_cross",
            type: "continuous",
            borderLow: "0",
            borderHight: "1",
            value: "0.8"
        },
        {
            name: "elitism",
            type: "continuous",
            borderLow: "0",
            borderHight: "1",
            value: "0.05"
        },
        {
            name: "sel_tour_K",
            type: "continuous",
            borderLow: "1",
            borderHight: "5",
            value: "3"
        },
        {
            name: "cross_blx_a",
            type: "continuous",
            borderLow: "0",
            borderHight: "1",
            value: "0.5"
        },
        {
            name: "cross_lpc_a",
            type: "continuous",
            borderLow: "0",
            borderHight: "1",
            value: "0"
        },
        {
            name: "cross_lpc_b",
            type: "continuous",
            borderLow: "0",
            borderHight: "1",
            value: "0.15"
        },
    ]
}

export const DE = {
    name: "Дифференциальная эволюция",
    recomParam: [
        {
            name: "strategy",
            type: "continuous",
            borderLow: "1",
            borderHight: "6",
            value: "2"
        },
        {
            name: "N_pop",
            type: "continuous",
            borderLow: "20",
            borderHight: "2000",
            value: "44"
        },
        {
            name: "CR",
            type: "continuous",
            borderLow: "0",
            borderHight: "1",
            value: "0.5"
        },
        {
            name: "F",
            type: "continuous",
            borderLow: "0",
            borderHight: "2",
            value: "0.8"
        },
        {
            name: "C",
            type: "continuous",
            borderLow: "0",
            borderHight: "1",
            value: "0"
        }
    ]
}

export const CE = {
    name: "Кросс-энтропия",
    recomParam: [
        {
            name: "N_pop",
            type: "continuous",
            borderLow: "20",
            borderHight: "2000",
            value: "44"
        },
        {
            name: "rho",
            type: "continuous",
            borderLow: "0.1",
            borderHight: "0.9999",
            value: "0.1"
        }
    ]
}
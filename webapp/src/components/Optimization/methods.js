export const GA = {
    name: "Генетический алгоритм",
    recomParam: [
        {
            "name": "selection",
            "discrete_continuous": "discrete",
            "lower_bound": "1",
            "upper_bound": "4",
            "value": "2"
        },
        {
            "name": "crossover",
            "discrete_continuous": "discrete",
            "lower_bound": "1",
            "upper_bound": "5",
            "value": "2"
        },
        {
            "name": "mutation",
            "discrete_continuous": "discrete",
            "lower_bound": "1",
            "upper_bound": "4",
            "value": "1"
        },
        {
            "name": "mut_pow",
            "discrete_continuous": "discrete",
            "lower_bound": "1",
            "upper_bound": "50",
            "value": "10"
        },
        {
            "name": "N_pop",
            "discrete_continuous": "continuous",
            "lower_bound": "20",
            "upper_bound": "2000",
            "value": "44"
        },
        {
            "name": "P_mut",
            "discrete_continuous": "continuous",
            "lower_bound": "0",
            "upper_bound": "1",
            "value": "0.1"
        },
        {
            "name": "P_cross",
            "discrete_continuous": "continuous",
            "lower_bound": "0",
            "upper_bound": "1",
            "value": "0.8"
        },
        {
            "name": "elitism",
            "discrete_continuous": "continuous",
            "lower_bound": "0",
            "upper_bound": "1",
            "value": "0.05"
        },
        {
            "name": "sel_tour_K",
            "discrete_continuous": "continuous",
            "lower_bound": "1",
            "upper_bound": "5",
            "value": "3"
        },
        {
            "name": "cross_blx_a",
            "discrete_continuous": "continuous",
            "lower_bound": "0",
            "upper_bound": "1",
            "value": "0.5"
        },
        {
            "name": "cross_lpc_a",
            "discrete_continuous": "continuous",
            "lower_bound": "0",
            "upper_bound": "1",
            "value": "0"
        },
        {
            "name": "cross_lpc_b",
            "discrete_continuous": "continuous",
            "lower_bound": "0",
            "upper_bound": "1",
            "value": "0.15"
        },
    ]
}

export const DE = {
    name: "Дифференциальная эволюция",
    recomParam: [
        {
            "name": "strategy",
            "discrete_continuous": "continuous",
            "lower_bound": "1",
            "upper_bound": "6",
            "value": "2"
        },
        {
            "name": "N_pop",
            "discrete_continuous": "continuous",
            "lower_bound": "20",
            "upper_bound": "2000",
            "value": "44"
        },
        {
            "name": "CR",
            "discrete_continuous": "continuous",
            "lower_bound": "0",
            "upper_bound": "1",
            "value": "0.5"
        },
        {
            "name": "F",
            "discrete_continuous": "continuous",
            "lower_bound": "0",
            "upper_bound": "2",
            "value": "0.8"
        },
        {
            "name": "C",
            "discrete_continuous": "continuous",
            "lower_bound": "0",
            "upper_bound": "1",
            "value": "0"
        }
    ]
}

export const CE = {
    name: "Кросс-энтропия",
    recomParam: [
        {
            "name": "N_pop",
            "discrete_continuous": "continuous",
            "lower_bound": "20",
            "upper_bound": "2000",
            "value": "44"
        },
        {
            "name": "rho",
            "discrete_continuous": "continuous",
            "lower_bound": "0.1",
            "upper_bound": "0.9999",
            "value": "0.1"
        }
    ]
}
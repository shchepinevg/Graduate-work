const run1 = {
    mode: "Оптимизация функции func1",
    min: "-0.12",
    data: [
        {
            key: "1",
            name: "x1",
            type: "Дискретный",
            borderL: "-5",
            borderH: "5",
            value: "3"
        },
        {
            key: "2",
            name: "x2",
            type: "Дискретный",
            borderL: "0",
            borderH: "20",
            value: "8"
        },
        {
            key: "3",
            name: "x3",
            type: "Непрерывный",
            borderL: "0",
            borderH: "1",
            value: "0.83"
        }
    ]
}

const run2 = {
    mode: "Оптимизация функции func1",
    min: "0",
    data: [
        {
            key: "1",
            name: "x1",
            type: "Дискретный",
            borderL: "-10",
            borderH: "10",
            value: "4"
        },
        {
            key: "2",
            name: "x2",
            type: "Дискретный",
            borderL: "-5",
            borderH: "25",
            value: "6"
        },
        {
            key: "3",
            name: "x3",
            type: "Непрерывный",
            borderL: "0",
            borderH: "1",
            value: "0.84"
        }
    ]
}

export const runFunc1 = [run1, run2]
const formulas = [
    {
        id: 1,
        inputs: [
            { resource: 'iron ore', quantity: 2 },
        ],
        outputs: [
            { resource: 'iron bar', quantity: 1 },
        ],
    },
    {
        id: 2,
        inputs: [
            { resource: 'iron ore', quantity: 3 },
            { resource: 'coal', quantity: 1 },
        ],
        outputs: [
            { resource: 'steel bar', quantity: 1 },
        ],
    },
    {
        id: 3,
        inputs: [
            { resource: 'water', quantity: 1000 },
        ],
        outputs: [
            { resource: 'hydrogen', quantity: 999 },
            { resource: 'deuterium', quantity: 1 },
        ],
    },
    {
        id: 4,
        inputs: [
            { resource: 'butter', quantity: 2 },
            { resource: 'egg', quantity: 3 },
            { resource: 'sugar', quantity: 1 },
            { resource: 'flour', quantity: 2 },
            { resource: 'baking soda', quantity: 2 },
        ],
        outputs: [
            { resource: 'cookies', quantity: 36 },
        ],
    },
]


// Add the new formula to the 'formulas' array
function addFormula(input, output) {
    const newId = formulas.length +1
    const newFor = {
        id: newId,
        inputs: input,
        outputs: output
    }
    formulas.push(newFor)
    return newFor
}

function fetchFormula(formulaId) {
    return formulas.find((f) => f.id === formulaId);
}

module.exports = {
    addFormula,
    formulas,
    fetchFormula
}
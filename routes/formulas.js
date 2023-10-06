var express = require('express');
var router = express.Router();
const {addFormula, formulas, fetchFormula} = require('../database/formulas')

// API to Add a new formula.
router.post('/', (req, res) => {
    try {
        // Parse the request body to get the formula details
        const { inputs, outputs } = req.body;

        // Validate the request data (e.g., ensure inputs and outputs are arrays)
        if (!Array.isArray(inputs) || !Array.isArray(outputs)) {
            return res.status(400).json({ error: 'Invalid formula data' });
        }

        const newFormula = addFormula(inputs, outputs)

        // Return a success response with the newly created formula
        res.status(201).json(newFormula);
    } catch (error) {
        // Handle any errors that occur during formula creation
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API to See the inputs and outputs of a specific formula.
router.get('/:formulaId', (req, res) => {
    try {
        // Extract the formula ID from the URL parameters
        const formulaId = parseInt(req.params.formulaId);

        // Find the formula with the specified ID in the 'formulas' array
        const formula = fetchFormula(formulaId);

        // Check if the formula exists
        if (!formula) {
            return res.status(404).json({ error: 'Formula not found' });
        }

        // Return the inputs and outputs of the formula as a response
        res.status(200).json({
            inputs: formula.inputs,
            outputs: formula.outputs,
        });
    } catch (error) {
        // Handle any errors that occur during formula retrieval
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;

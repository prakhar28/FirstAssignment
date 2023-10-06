var express = require('express');
var router = express.Router();
const { fetchPlansContainingFormula, plans, addNewPlan, fetchPlan, addFormulaToPlan } = require('../database/plans')
const {addFormula, formulas, fetchFormula} = require("../database/formulas");
router.get('/:formulaId', (req, res) => {
    try {
        // Extract the formula ID from the URL parameters
        const {formulaId} = req.params;
        console.log("form", formulaId)
        // Find all plans that contain the specified formula ID
        const plansContainingFormula = fetchPlansContainingFormula(parseInt(formulaId))

        // Return the list of plans containing the formula as a response
        res.status(200).json(plansContainingFormula);
    } catch (error) {
        // Handle any errors that occur during plan retrieval
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', (req, res) => {
    try {
        // Parse the request body to get the plan details
        const { sequence } = req.body;

        // Validate the request data (e.g., ensure sequence is an array of valid formula IDs)
        if (!Array.isArray(sequence) || sequence.length === 0) {
            return res.status(400).json({ error: 'Invalid plan data' });
        }

        const newPlan = addNewPlan(sequence);

        // Return a success response with the newly created plan
        res.status(201).json(newPlan);
    } catch (error) {
        // Handle any errors that occur during formula creation
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.post('/:planId/append', (req, res) => {
    try {
        // Extract the plan ID and formula ID from the URL parameters
        const planId = parseInt(req.params.planId);
        const formulaId = parseInt(req.body.formulaId);

        // Find the planIndex with the specified ID in the 'plans' array
        const planIndex = fetchPlan(planId);

        // Check if the plan exists
        if (planIndex === -1) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        // Find the formula with the specified ID in the 'formulas' array
        const formula = fetchFormula(formulaId);

        // Check if the formula exists
        if (!formula) {
            return res.status(404).json({ error: 'Formula not found' });
        }

        // Append the formula ID to the end of the plan's sequence
        const updatedPlan = addFormulaToPlan(planIndex, formulaId)

        // Return the updated plan as a response
        res.status(200).json(updatedPlan);
    } catch (error) {
        // Handle any errors that occur during the appending process
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;

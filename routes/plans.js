var express = require('express');
var router = express.Router();
const { fetchPlansContainingFormula, plans, addNewPlan, fetchPlan, addFormulaToPlan, updatePlanFormula, deletePlan } = require('../database/plans')
const {fetchFormula, fetchAllFormulasWithId} = require("../database/formulas");

// API to List which plans contain a specific formula
router.get('/:formulaId', (req, res) => {
    try {
        // Extract the formula ID from the URL parameters
        const {formulaId} = req.params;
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

// API to Add a new plan.
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

// API to Append a formula to the end of a plan.
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

// API to Replace a formula anywhere in the sequence of formulas associated with a plan.
router.put('/:planId/replace_formula', (req, res) => {
    try {
        // Extract the plan ID, formula index, and new formula ID from the URL parameters
        const planId = parseInt(req.params.planId);
        const formulaIndex = parseInt(req.body.formulaIndex);
        const newFormulaId = parseInt(req.body.newFormulaId); // Assume new formula ID is in the request body

        // Find the plan with the specified ID in the 'plans' array
        const planIndex = fetchPlan(planId)

        // Check if the plan exists
        if (planIndex === -1) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        // Check if the formula index is valid
        if (formulaIndex < 0 || formulaIndex >= plans[planIndex].sequence.length) {
            return res.status(400).json({ error: 'Invalid formula index' });
        }

        // Find the formula with the specified ID in the 'formulas' array
        const newFormula = fetchFormula(newFormulaId);

        // Check if the new formula exists
        if (!newFormula) {
            return res.status(404).json({ error: 'New formula not found' });
        }

        // Replace the formula at the specified index with the new formula ID
        const updatePlan = updatePlanFormula(planIndex, formulaIndex, newFormulaId)

        // Return the updated plan as a response
        res.status(200).json(updatePlan);
    } catch (error) {
        // Handle any errors that occur during the replacement process
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// API to List all the formulas contained in a plan.
router.get('/:planId/formulas', (req, res) => {
    try {
        // Extract the plan ID from the URL parameters
        const planId = parseInt(req.params.planId);

        // Find the plan with the specified ID in the 'plans' array
        const planIndex = fetchPlan(planId)

        // Check if the plan exists
        if (planIndex === -1) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        // Retrieve the sequence of formula IDs from the plan
        const formulaIds = plans[planIndex].sequence;

        // Retrieve the details of the formulas based on their IDs
        const planFormulas = fetchAllFormulasWithId(formulaIds);

        // Return the list of formulas contained in the plan as a response
        res.status(200).json(planFormulas);
    } catch (error) {
        // Handle any errors that occur during formula retrieval
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API to Delete a plan.
router.delete('/:planId', (req, res) => {
    try {
        // Extract the plan ID from the URL parameters
        const planId = parseInt(req.params.planId);

        // Find the index of the plan with the specified ID in the 'plans' array
        const planIndex = fetchPlan(planId)

        // Check if the plan exists
        if (planIndex === -1) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        // Remove the plan from the 'plans' array
        deletePlan()

        // Return a success response
        res.status(204).send("Successfully deleted"); // 204 No Content indicates a successful deletion
    } catch (error) {
        // Handle any errors that occur during plan deletion
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;

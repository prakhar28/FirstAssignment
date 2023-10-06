const plans = [
    {
        id: 1,
        sequence: [1, 2],
    },
    {
        id: 2,
        sequence: [2,3,4]
    },
    {
        id: 3,
        sequence: [1, 3]
    }
];

function fetchPlansContainingFormula(formulaId) {
   return plans.filter((plan) => plan.sequence.includes(formulaId))
}

function addFormulaToPlan(planIndex, formulaId) {
    plans[planIndex].sequence.push(formulaId)
    return plans[planIndex]
}

function addNewPlan(sequence) {
    const newPlan = {
        id: plans.length +1,
        sequence
    }
    plans.push(newPlan);
    return newPlan
}

function fetchPlan(planId) {
    return plans.findIndex((p) => p.id === planId)
}

function updatePlanFormula(planIndex, formulaIndex, newFormulaId) {
    const planToUpdate = plans[planIndex];
    planToUpdate.sequence[formulaIndex] = newFormulaId;
    return planToUpdate;
}

function deletePlan(planIndex) {
    return plans.splice(planIndex, 1);
}

module.exports = {
    plans,
    fetchPlansContainingFormula,
    addNewPlan,
    fetchPlan,
    addFormulaToPlan,
    updatePlanFormula,
    deletePlan
}
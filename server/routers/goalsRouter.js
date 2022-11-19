const express = require('express')
const router = express.Router()

const { getGoals, getGoalById, addGoal, updateGoalById, deleteGoalById } = require('../controllers/goalsControllers')
const { getSteps, getStepById, addStep, updateStepById, deleteStepById } = require('../controllers/goalsControllers')


//CRUS Goals
router.get('/user/:user_id', getGoals)
router.get('/user/:user_id/goal/:goal_id', getGoalById)
router.post('/user/:user_id', addGoal)
router.patch('/user/:user_id/goal/:goal_id', updateGoalById)
router.delete('/user/:user_id/goal/:goal_id', deleteGoalById)

//CRUD STEPs
router.get('/user/:user_id/goal/:goal_id/steps', getSteps)
router.get('/user/:user_id/goal/:goal_id/steps/:step_id', getStepById)
router.post('/user/:user_id/goal/:goal_id/steps', addStep)
router.patch('/user/:user_id/goal/:goal_id/steps/:step_id', updateStepById)
router.delete('/:goal_id/steps/:step_id', deleteStepById)

module.exports = router;
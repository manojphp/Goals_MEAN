const goalsModel = require('../models/goalsModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb');
const { PRIVATE_KEY } = require('../config.json');
const { json } = require('express');

//Goals
module.exports.addGoal = async(req, res, next) => {
    try {
        const userId = req.params.user_id
        const results = await goalsModel.create({...req.body, user_id: userId })
        res.json({ success: true })

    } catch (e) {
        next(e)
    }
}

module.exports.getGoals = async(req, res, next) => {
    try {
        const user_id = req.params.user_id
        const results = await goalsModel.find({ user_id: user_id })
        res.json({ success: true, data: results })
    } catch (e) {
        console.log(e)
    }
}

module.exports.getGoalById = async(req, res, next) => {
    try {
        const goalId = req.params.goal_id
        const userId = req.params.user_id
        const results = await goalsModel.findOne({ _id: goalId, user_id: userId })
        res.json({ success: true, data: results })
    } catch (e) {
        console.log(e)
    }
}

module.exports.updateGoalById = async(req, res, next) => {
    try {
        const goalId = req.params.goal_id
        const userId = req.params.user_id
        const title = req.body.title
        const description = req.body.description
        const deadline = req.body.deadline
        const results = await goalsModel.updateOne({ _id: goalId, user_id: userId }, {
            $set: {
                title: title,
                description: description,
                deadline: deadline
            }
        })
        res.json({ success: true, data: results })
    } catch (e) {
        next(e)
    }
}

module.exports.deleteGoalById = async(req, res, next) => {
    try {
        const goalId = req.params.goal_id
        const userId = req.params.user_id
        const results = await goalsModel.deleteOne({ _id: goalId, user_id: userId })
        res.json({ success: true, data: results })
    } catch (e) {
        console.log(e)
    }
}

//STEPs
module.exports.addStep = async(req, res, next) => {
    try {
        console.log('here')
        const step = req.body
        step._id = ObjectId()
        const goal_id = req.params.goal_id
        const results = await goalsModel.updateOne({ _id: goal_id }, { $push: { steps: step } })
        res.json({ success: true, data: results })
    } catch (e) {
        next(e)
    }
}

module.exports.getSteps = async(req, res, next) => {
    try {
        const goalId = req.params.goal_id
        const userId = req.params.user_id
        const results = await goalsModel.findOne({ _id: goalId, user_id: userId })
        console.log(results.steps)
        res.json({ success: true, data: results.steps })
    } catch (e) {
        next(e)
    }
}

module.exports.getStepById = async(req, res, next) => {
    try {
        const goalId = req.params.goal_id
        const userId = req.params.user_id
        const stepId = req.params.step_id
        const results = await goalsModel.findOne({ _id: goalId, user_id: userId, "steps._id": stepId }, { "steps.$": 1 })
        res.json({ success: true, data: results })
    } catch (e) {
        next(e)
    }
}

module.exports.updateStepById = async(req, res, next) => {
    try {
        const goalId = req.params.goal_id
        const userId = req.params.user_id
        const stepId = req.params.step_id

        const title = req.body.title
        const description = req.body.description
        const status = req.body.status
        const deadline = req.body.deadline

        const results = await goalsModel.updateOne({ _id: goalId, user_id: userId, "steps._id": stepId }, {
            $set: {
                "steps.$[obj].title": title,
                "steps.$[obj].description": description,
                "steps.$[obj].status": status,
                "steps.$[obj].deadline": deadline
            }
        }, { arrayFilters: [{ "obj._id": stepId }] })
        console.log(results)
        res.json(results)
    } catch (e) {
        next(e)
    }
}

module.exports.deleteStepById = async(req, res, next) => {
    try {

    } catch (e) {
        next(e)
    }
}
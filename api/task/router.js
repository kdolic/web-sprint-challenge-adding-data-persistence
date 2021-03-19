// build your `/api/tasks` router here
const express = require('express')
const router = express.Router()

const Task = require('./model')

router.get('/', async (req, res, next) => {
    try{
        const tasks = await Task.getTasks()
        res.status(200).json(tasks)
    } catch(err){
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const taskID = await Task.getById(req.params.id)
        res.status(200).json(taskID)
    } catch(err){
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const addTask = await Task.create(req.body)
        res.status(201).json(addTask)
    } catch(err){
        next(err)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
      sageAdvice: 'Finding the real error is 90% of the bug fix',
      error: err.message,
      stack: err.stack,
    })
  })

  module.exports = router
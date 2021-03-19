// build your `/api/projects` router here
const express = require('express')
const router = express.Router()

const Project = require('./model')

router.get('/', async (req, res, next) => {
    try{
        const projects = await Project.getProjects()
        res.status(200).json(projects)
    } catch(err){
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const projectID = await Project.getById(req.params.id)
        res.status(200).json(projectID)
    } catch(err){
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const addProject = await Project.create(req.body)
        res.status(201).json(addProject)
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
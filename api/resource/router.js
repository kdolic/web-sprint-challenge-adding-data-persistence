// build your `/api/resources` router here
const express = require('express')
const router = express.Router()

const Resource = require('./model')

router.get('/', async (req, res, next) => {
    try{
        const resources = await Resource.getResources()
        res.status(200).json(resources)
    } catch(err){
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const resourceID = await Resource.getById(req.params.id)
        res.status(200).json(resourceID)
    } catch(err){
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const addResource = await Resource.create(req.body)
        res.status(201).json(addResource)
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
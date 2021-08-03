const express = require('express')
const router = express.Router()
const ObjectID = require('mongoose').Types.ObjectId

const {PostMessage} = require('../models/postMessage')

// ! get message
router.get('/', (req, res) => {
  PostMessage.find((err, docs) => {
    if (!err) {
      res.send(docs)
    } else console.log("Error while retrieving all recodes: " + JSON.stringify(err, undefined, 2));
  })
})

// ! post new message
router.post('/', (req, res) => {
  const newRecord = new PostMessage({
    title: req.body.title,
    message: req.body.message
  })

  newRecord.save((err, docs) => {
    if (!err) {
      res.send(docs)
    } else console.log("Error while creating new record: " + JSON.stringify(err, undefined, 2));
  })
})

// ! update a message
router.put('/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id: ${req.params.id}`)
  }

  const updateRecord = {
    title: req.body.title,
    message: req.body.message
  }

  PostMessage.findByIdAndUpdate(req.params.id, { $set: updateRecord }, {new: true}, (err, docs) => {
    if (!err) {
      res.send(docs)
    } else console.log("Error while updating a record: " + JSON.stringify(err, undefined, 2));
  })
})

// ! delete a message
router.delete('/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id: ${req.params.id}`)
  }

  PostMessage.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs)
    } else console.log("Error while deleting a record: " + JSON.stringify(err, undefined, 2));
  })
})

module.exports = router;
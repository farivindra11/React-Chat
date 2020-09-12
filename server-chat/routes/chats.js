const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat')
const moment = require('moment')


/* GET users listing. */
router.get('/', function (req, res, next) {
  Chat.find({}).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.status(500).json(err)
  })
});

router.post('/', function (req, res, next) {
  const { id, name, message } = req.body;
  Chat.create({ id, name, message }).then((data) => {
    res.status(201).json(data)
  }).catch((err) => {
    res.status(500).json(err)
  })
});

router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  Chat.findOneAndRemove({id: Number(id)}).then((data) => {
    res.status(201).json(data)
  }).catch((err) => {
    res.status(500).json(err)
  })
});

module.exports = router;

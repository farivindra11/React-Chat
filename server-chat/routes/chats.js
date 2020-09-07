var express = require('express');
var router = express.Router();
const Chat = require('../models/Chat')

/* GET users listing. */
router.get('/', function(req, res, next) {
  Chat.find().then((data) => {
    res.json(data)
  }).catch((err) => {
    res.status(500).json(err)
  })
});

module.exports = router;

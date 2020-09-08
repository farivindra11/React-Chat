var express = require('express');
var router = express.Router();
const Chat = require('../models/Chat')
// console.log(Chat);
/* GET users listing. */
router.get('/', function(req, res, next) {
  Chat.find({}).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.status(500).json(err)
  })
});

router.post('/', function(req, res, next) {
  const {id, name, message} = req.body;
  Chat.create({id, name, message}).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.status(500).json(err)
  })
});

module.exports = router;

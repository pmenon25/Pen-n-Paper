var express = require('express');
var router = express.Router();
const characterCtrl =  require('../controller/characterCtrl.js')

router.get('/user/show/create' , characterCtrl.create);


module.exports = router;
var express = require('express');
var router = express.Router();
const userCtrl = require('../controller/userCtrl.js')

router.get('/', userCtrl.index);
router.get('/show', userCtrl.show);
router.get("/show/equipments", userCtrl.equipment);
router.get('/show/spells', userCtrl.spells);
router.get('/show/classes', userCtrl.classes);
router.get('/show/create', userCtrl.create);
router.post('/show', userCtrl.submit);
router.get('/show/:id/view', userCtrl.viewSheet);
router.delete('/show/:id', userCtrl.deleteSheet)

module.exports = router;
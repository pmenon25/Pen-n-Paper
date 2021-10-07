var express = require('express');
var router = express.Router();
const userCtrl = require('../controller/userCtrl.js')

router.get('/', userCtrl.index);
router.get('/show', userCtrl.show);
router.get("/equipment", userCtrl.equipment);
router.get('/spells', userCtrl.spells);
router.get('/classes', userCtrl.classes);
router.get('/create', userCtrl.create);
router.post('/show', userCtrl.submit);
router.get('/:id/view', userCtrl.viewSheet);
router.delete('/:id/delete', userCtrl.deleteSheet)

module.exports = router;
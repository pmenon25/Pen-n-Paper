var express = require('express');
var router = express.Router();
const userCtrl = require('../controller/userCtrl.js')

router.get('/', userCtrl.index);
router.get('/show', userCtrl.show);
router.get("/equipment", userCtrl.equipment);
router.get('/spells', userCtrl.spells);
router.get('/classes', userCtrl.classes);

router.get('/new', userCtrl.create);
router.post('/create', userCtrl.submit);

router.get('/:id/view', userCtrl.viewSheet);
router.delete('/:id/delete', userCtrl.deleteSheet);
router.put('/:id/update', userCtrl.updateSheet)

module.exports = router;
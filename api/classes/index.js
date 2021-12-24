const express = require('express');
const router = express.Router();

const classController = require('./classController')

/* GET classes listing. */
router.get('/', classController.list);

/* POST create class. */
router.post('/', classController.create);

/* GET detail class. */
router.get('/detail/:id', classController.detail);
router.get('/invitelink/:id/:role', classController.inviteLink);

router.get('/members/:id', classController.getMember);
router.post('/uploadListStudent/:idClass', classController.addListStudent);

router.get('/acceptlink/:tokenlink/:tokenid',classController.acceptlink);
module.exports = router;
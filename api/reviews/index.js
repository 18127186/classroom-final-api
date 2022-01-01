const express = require('express');
const router = express.Router();
const reviewController = require('./reviewController');

router.get('/:idClass', reviewController.getReviews);

module.exports = router;
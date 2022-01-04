const express = require('express');
const router = express.Router();
const reviewController = require('./reviewController');

router.get('/:idClass', reviewController.getReviews);
router.get('/detail/:idClass/:idReview', reviewController.getReviewDetail);

router.post('/update/:idClass/:idReview', reviewController.updateGrade);

module.exports = router;
const express = require('express');
const router = express.Router();
const reviewController = require('./reviewController');

router.get('/:idClass/:studentID', reviewController.getReviews);
router.get('/for-student/:idClass/:idStudent', reviewController.getListReviewsForStudent);
router.get('/detail/:idClass/:idReview', reviewController.getReviewDetail);

router.post('/update/:idClass/:idReview', reviewController.updateGrade);
router.post('/create', reviewController.createReview);

module.exports = router;
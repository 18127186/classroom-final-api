const reviewService = require('./reviewService');
const Authorization = require('../../modules/authorization');
const notificationController = require('../notification/notificationController');

exports.getReviews = async (req, res) => {
    const isTeacher = await Authorization.teacherAuthority(req.user.id, req.params.idClass);
    if (!isTeacher){
        const ListReviews = await reviewService.getListReviewsForStudent(req.params.idClass, req.params.studentID);

        if (ListReviews) {
            res.status(200).json(ListReviews);
        } else {
            res.status(404).json({message: 'Fail!'});
    }
    } else {
        const ListReviews = await reviewService.getListReviews(req.params.idClass);

        if (ListReviews) {
            res.status(200).json(ListReviews);
        } else {
            res.status(404).json({message: 'Fail!'});
        }
    }
}

exports.getListReviewsForStudent = async (req, res) => {
    const ListReviews = await reviewService.getListReviewsForStudent(req.params.idClass, req.params.studentID);

    if (ListReviews) {
        res.status(200).json(ListReviews);
    } else {
        res.status(404).json({message: 'Fail!'});
    }
}

exports.getReviewDetail = async (req, res) => {
    const ReviewDetail = await reviewService.getReviewDetail(req.params.idReview);

    if (ReviewDetail) {
        res.status(200).json(ReviewDetail);
    } else {
        res.status(404).json({message: 'Fail!'});
    }
}

exports.updateGrade = async (req, res) => {
    const isTeacher = await Authorization.teacherAuthority(req.user.id, req.params.idClass);
    if (!isTeacher){
        res.status(404).json({message: "Authorization Secure Error!"});
    } else {
        const result = await reviewService.updateGrade(req.body.update_grade, req.params.idReview);

        if (result) {
            var link = "classes/grade-reviews/detail/" + result.idClass + "/" + req.params.idReview;
            notificationController.addNoti(1, req.user.id, req.params.idClass, req.body.studentId, link);

            res.status(200).json({message: 'Update successfully!'});
        } else {
            res.status(404).json({message: 'Fail!'});
        }
    }
}

exports.createReview = async (req, res) => {
    const reviewObj = {
        assign_id: req.body.assign_id,
        student_id: req.body.student_id,
        expect_grade: req.body.expect_grade,
        explanation: req.body.explanation,
        current_grade: req.body.current_grade
    }

    const result = await reviewService.createReview(reviewObj);

    if (result) {
        var link = "classes/grade-reviews/detail/" + req.body.id_class + "/" + result.insertId;
        notificationController.addNoti(3, req.user.id, req.body.id_class, null, link);

        res.status(200).json({message: 'Create successfully!'});
    } else {
        res.status(404).json({message: 'Fail!'});
    }
}
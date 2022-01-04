const reviewsModel = require('./reviewModel');

exports.getListReviews = (classID) => {
    return reviewsModel.getListReviews(classID);
}

exports.getReviewDetail = (id) => {
    return reviewsModel.getReviewDetail(id);
}

exports.updateGrade = (update_grade, id) => {
    return reviewsModel.updateGrade(update_grade, id);
}
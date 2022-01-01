const reviewsModel = require('./reviewModel');

exports.getListReviews = (classID) => {
    return reviewsModel.getListReviews(classID);
}
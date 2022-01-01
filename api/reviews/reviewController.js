const reviewService = require('./reviewService');
const Authorization = require('../../modules/authorization');

exports.getReviews = async (req, res) => {
    const isTeacher = await Authorization.teacherAuthority(req.user.id, req.params.idClass);
    if (!isTeacher){
        res.status(404).json({message: "Authorization Secure Error!"});
    } else {
        const ListReviews = await reviewService.getListReviews(req.params.idClass);

        if (ListReviews) {
            res.status(200).json(ListReviews);
        } else {
            res.status(404).json({message: 'Fail!'});
        }
    }
}
const db = require("../../database");

exports.getListReviews = (classID) => db.execute(
    "SELECT A.id, A.assign_id, B.topic, A.student_id, A.expect_grade, A.explanation" 
    +  ` FROM reviews as A  
    JOIN assignments as B ON A.assign_id = B.id 
    WHERE B.class_id = ${classID}`
)

exports.getListReviewsForStudent = (classID, studentID) => db.execute(
    "SELECT A.id, A.assign_id, B.topic, A.student_id, A.expect_grade, A.explanation" 
    +  ` FROM reviews as A  
    JOIN assignments as B ON A.assign_id = B.id 
    WHERE B.class_id = ${classID} and A.student_id = ${studentID}`
)

exports.getReviewDetail = (id) => db.execute(
    "SELECT A.id, A.assign_id, B.topic, A.student_id, A.current_grade, A.update_grade, A.done, A.expect_grade, A.explanation" 
    +  ` FROM reviews as A  
    JOIN assignments as B ON A.assign_id = B.id 
    WHERE A.id = ${id}`
)

exports.updateGrade = (update_grade, id) => db.execute(
    `UPDATE reviews 
    SET update_grade = '${update_grade}', done = '1' 
    WHERE (id = '${id}');`
)

exports.createReview = (reviewObj) => db.execute(
    `INSERT INTO reviews (assign_id, student_id, expect_grade, explanation, current_grade) 
    VALUES ('${reviewObj.assign_id}', '${reviewObj.student_id}', '${reviewObj.expect_grade}', '${reviewObj.explanation}', '${reviewObj.current_grade}');`
)
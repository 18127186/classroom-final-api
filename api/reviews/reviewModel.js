const db = require("../../database");

exports.getListReviews = (classID) => db.execute(
    "SELECT A.id, A.assign_id, B.topic, A.student_id, A.expect_grade, A.explanation" 
    +  ` FROM reviews as A  
    JOIN assignments as B ON A.assign_id = B.id 
    WHERE B.class_id = ${classID}`
)
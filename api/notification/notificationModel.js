const db = require("../../database");

exports.getNotiByClass = (idAcc, idClass) => db.execute(
    "SELECT A.id_class as id_class, "
    + "     B.name as name, "
    + "     A.content as content " 
    + " FROM notifications as A"
    + " JOIN accounts as B ON B.id = A.creator " 
    + ` WHERE A.creator != '${idAcc}' 
            AND ((A.forAll) OR (NOT A.forAll AND A.id_class IN (${idClass})))` );

exports.addNoti = (userId, classesId, content, target) => db.execute(
    `INSERT INTO notifications (id_class, creator, content, forAll, target) 
    VALUES ('${classesId}', '${userId}', '${content}', TRUE, '${target}')`
);

exports.addNotiAll = (userId, classesId, content) => db.execute(
    `INSERT INTO notifications (id_class, creator, content, forAll) 
    VALUES ('${classesId}', '${userId}', '${content}', FALSE)`
);
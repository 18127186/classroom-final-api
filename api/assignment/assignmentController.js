const assignmentService = require('./assignmentService');
const gradeService = require('../grades/gradesService');
const Authorization = require('../../modules/authorization');

exports.list = async function(req, res) {
    const assignment = await assignmentService.list(req.params.idClass);

    if (assignment) {
        res.status(200).json(assignment);
    } else {
        res.status(404).json({message: 'No assignment available!'});
    }
};

exports.getAssign = async function(req, res) {
    console.log(req.user);
    const assignment = await assignmentService.getAssignById(req.params.idAssign);

    if (assignment[0]) {
        const point = await gradeService.getGrade(req.user.studentID, req.params.idAssign);

        if (point.length > 0){
            assignment[0]["point"] = point[0].grade;
        } else {
            assignment[0]["point"] = "";
        }

        res.status(200).json(assignment[0]);
    } else {
        res.status(404).json({message: 'No assignment available!'});
    }
};

exports.deleteAssignment = async function(req, res) {
    const isTeacher = await Authorization.teacherAuthority(req.user.id, req.params.idClass);
    if (!isTeacher){
        res.status(404).json({message: "Authorization Secure Error!"});
    } else {
        const assignment = await assignmentService.deleteAssignment(req.params.idAssign);
    
        if (assignment) {
            res.status(200).json(assignment);
        } else {
            res.status(404).json({message: 'Create failed!'});
        }
    }
}

exports.createAssignment = async function(req, res) {

    const isTeacher = await Authorization.teacherAuthority(req.user.id, req.params.idClass);
    if (!isTeacher){
        res.status(404).json({message: "Authorization Secure Error!"});
    } else {
        const assignObj = {
            "idClass": req.params.idClass, 
            "topic": req.body.topic, 
            "description": req.body.description,
            "creator": req.user.id, 
            "deadline": req.body.deadline,
            "grade": req.body.grade,
        };
    
        const assignment = await assignmentService.createAssignment(assignObj);
    
        if (assignment) {
            res.status(200).json(assignment);
        } else {
            res.status(404).json({message: 'Create failed!'});
        }
    }
};

exports.updateAssignment = async (req, res) => {
    const isTeacher = await Authorization.teacherAuthority(req.user.id, req.params.idClass);
    if (!isTeacher){
        res.status(404).json({message: "Authorization Secure Error!"});
    } else {
        const assignObj = {
            "id": req.params.idAssign, 
            "topic": req.body.topic, 
            "description": req.body.description, 
            "deadline": req.body.deadline,
            "grade": req.body.grade,
        };
    
        const assignment = await assignmentService.updateAssignment(assignObj);
    
        if (assignment) {
            res.status(200).json(assignment);
        } else {
            res.status(404).json({message: 'Update failed!'});
        }
    }
}

exports.updateRank = async (req, res) => {
    const isTeacher = await Authorization.teacherAuthority(req.user.id, req.params.idClass);
    if (!isTeacher){
        res.status(404).json({message: "Authorization Secure Error!"});
    } else {
        const listAssign = req.body;
    
        const assignment = await assignmentService.updateRank(listAssign);
    
        if (assignment) {
            res.status(200).json(assignment);
        } else {
            res.status(404).json({message: 'Update rank failed!'});
        }
    }
}
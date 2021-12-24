const classService = require('./classService');
const classMemberService = require('./classMemberService');
const Authorization = require('../../modules/authorization');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
exports.list = async function(req, res) {
    const classes = await classService.list(req.user.id);

    if (classes) {
        res.status(200).json(classes);
    } else {
        res.status(404).json({message: 'No classes available!'});
    }
};

exports.detail = function(req,res) {
    const id = req.params.id;
    classService.detail(parseInt(id), (result) => {
        
        if(result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({message: "The class with the given ID wasn't found"});
        }
    });

}
exports.inviteLink = async function(req,res) {
    const id = req.params.id;
    const role = req.params.role;
    const classes = await classService.list(id);

    if (classes) {
        const token= jwt.sign({
            id: id,
            role: role
        }, 'secret', {
            expiresIn: '24h'
        })
        let url = 'https://best-classroom-ever.herokuapp.com/classes/acceptlink/'+ token;
        res.status(200).json(url);
    } else {
        res.status(404).json({message: 'No classes available!'});
    }
}
exports.create = async function(req, res) {
    const userRoll = "teacher";
    const createClassResult =  await classService.create(req.body.name, req.user.id, req.body.description);
    
    if (createClassResult) {
        const addClassMemberResult =  await classMemberService.addClassMember(createClassResult.insertId, req.user.id, userRoll);

        if(addClassMemberResult) {
            res.status(201).json({message: 'Class created! Member added!', id: createClassResult.insertId});
        } else {
            res.status(404).json({message: "Error add member to class!"});
        }

    } else {    
        res.status(500).json({message: 'Error creating class!'});
    }
};

exports.getMember = async (req, res) => {
    const id = req.params.id;
    const teachers = await classService.getMembersByClassId(id, 'teacher');
    const students = await classService.getMembersByClassId(id, 'student');

    if (teachers || students) {
        var result = {
            teachers: teachers,
            students: students
        }
        res.status(201).json(result);
    }
    else {
        res.status(404).json({message: "No data!"});
    }
}
exports.acceptlink = async function(req,res) {
    const linkid = req.params.tokenlink;
    const payloadidclass = jwt_decode(linkid);
    const idacc = req.params.tokenid;
    const payloadIDAcc = jwt_decode(idacc);
    const exist = await classMemberService.findOneAcc(payloadIDAcc.id, payloadidclass.id);
    if (exist.length <= 0 && payloadIDAcc.username !== "root") {
        await classMemberService.addClassMember(payloadidclass.id,payloadIDAcc.id,payloadidclass.role);
        return res.json("success");
    } else {
        res.json("Account Exists in class");
    }
    
}

exports.addListStudent = async function(req,res) {
    const isTeacher = await Authorization.teacherAuthority(req.user.id, req.params.idClass);
    if (!isTeacher){
        res.status(404).json({message: "Authorization Secure Error!"});
    } else {
        const listStudent = req.body.listStudent;
        let successList = [];

        await classService.deleteStudentsFromClass(req.params.idClass);

        for (let i = 0; i < listStudent.length; i++) {
            await classService.addStudent(req.params.idClass, listStudent[i]);
            successList.push(listStudent[i]);
        }

        if (successList.length > 0) {
            return res.status(201).json({message: 'List member added!', successList: successList});
        } else {
            return res.status(404).json("All member exist in class");
        }
    }
}
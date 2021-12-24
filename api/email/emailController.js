const emailService = require('./emailService');
const Authorization = require('../../modules/authorization')

exports.sendEmail = async (req, res) => {
    const recipient = req.body.recipient;
    const inviteLink = req.body.inviteLink;
    const role = req.body.role;
    const classId = req.body.classId;

    const isTeacher = await Authorization.teacherAuthority(req.user.id, classId);
    if (!isTeacher){
        res.status(404).json({message: "Authorization Secure Error!"});
    }

    const result = await emailService.sendEmail(recipient, inviteLink, role);
    
    if (result) {
        res.status(202).json({message: 'Email sent!'});
    }
    else {
        res.status(404).json({message: "Error!"});
    }
};
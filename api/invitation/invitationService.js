const invitationModel = require('./invitationModel');

exports.getInvitationByIdClass = (classId) => invitationModel.getInvitationByIdClass(classId);

exports.getInvitationByCode = (classId) => invitationModel.getInvitationByCode(classId);

exports.addInvitation = (invitation) => invitationModel.addInvitation(invitation);

exports.getCodeFromToken = () => {
    const now = Date.now(); 

    let cur = now;
    let token = "";

    while (cur !== 0){
        let temp = cur % 10;
        token += String.fromCharCode(temp + 65);
        cur = Math.floor(cur/10);
    }

    while (token.length < 13) {
        token += "A";
    }

    return token;
}
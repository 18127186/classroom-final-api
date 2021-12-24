const accountService = require('./accountService');

exports.getInfo = async function(req, res) {
    const id = req.params.id;
    const acc = await accountService.getInfoByUserId(id);

    if (acc) {
        res.status(200).json({account: acc});
    } else {
        res.status(404).json({message: 'No accounts available!'});
    }
};

exports.list = async function(req, res) {
    const accs = await accountService.list();

    if (accs) {
        res.status(200).json(accs);
    } else {
        res.status(404).json({message: 'No accounts available!'});
    }
};

exports.create = async function(req, res) {
    const newAcc = req.body;
    const result = await accountService.create(newAcc);

    if (result) {
        res.status(201).json({message: 'Account created!', id: result.insertId});
    } else {
        res.status(500).json({message: 'Error Account class!'});
    }
};

exports.update = async function(req, res) {
    const editInfo = {
        id: req.user.id,
        studentId: req.body.studentID,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address
    }

    const result = await accountService.checkExistedByStudentId(editInfo.studentId);

    if (result.length === 0) {
        const result2 = await accountService.updateInfo(editInfo);
        if (result2) {
            res.status(201).json({message: 'Account updated!', result: result2});
        } else {
            res.status(500).json({message: 'An Error Occur!', result: result2});
        }
    } else {
        res.status(500).json({message: 'Student ID existed!'});
    }
};

exports.getRole = async (req, res) => {
    const userId = req.params.id;
    const classId = req.body.classId;

    const result = await accountService.getRole(userId, classId);

    if (result) {
        res.status(201).json(result);
    }
    else {
        res.status(500).json({message: 'Error!'});
    }
}
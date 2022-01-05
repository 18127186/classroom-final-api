const notificationModel = require('./notificationModel');

exports.getNoti = (userId, classesId) => notificationModel.getNotiByClass(userId, classesId);

exports.addNoti = (userId, classesId, content, target) => notificationModel.addNoti(userId, classesId, content, target);

exports.addNotiAll = (userId, classesId, content) => notificationModel.addNotiAll(userId, classesId, content);
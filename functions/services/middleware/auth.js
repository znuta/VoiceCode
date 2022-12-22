const {auth} = require("firebase-admin");
const {logger} = require("../../utils/log-util");

const verifyToken = async (token, ) => {
    logger.log("verifying token...")
    let user = await auth().verifyIdToken(token)
    return user;
}

const updateUserProfile = async (uid, data) => {
    logger.log("verifying token...")
    let user = await auth().updateUser(uid, data)
    return user;
}

exports.verifyToken = verifyToken;
exports.updateUserProfile = updateUserProfile;
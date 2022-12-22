const {firestore} = require("firebase-admin");
const {logger} = require("../../utils/log-util");

const getUserInfo = async (userid) => {
    logger.log("getting user info from db", userid)
    try {
        const firestoreInstance = firestore();

        const doc = await firestoreInstance
            .collection('users-info')
            .doc(userid)
            .get()
        logger.log("+++", JSON.stringify(doc.data()))
        return doc.data()

    } catch (e) {
        logger.error(e.message, "getUserInfo", e);
    }
};

const updateUserInfo = (userid, data) => {
    try {
        const firestoreInstance = firestore();
        const updatedData = {
            ...data,
            updatedAt: new Date(),
            updatedBy: userid,
        };
        const updateData = async () => {
            await firestoreInstance
                .collection('users-info')
                .doc(userid)
                .update(updatedData);
        }
        updateData()
        return updatedData;
    } catch (e) {
        throw e;
    }
}

const createUserInfo = (userid, data) => {
    const firestoreInstance = firestore();
    const cData = {
        ...data,
        createdAt: new Date(),
    };
    const updateData = async () => {
        await firestoreInstance
            .collection('users-info')
            .doc(userid)
            .set(cData);
    }

    updateData()

    return cData
}

exports.getUser = getUserInfo
exports.updateUser = updateUserInfo
exports.createUser = createUserInfo

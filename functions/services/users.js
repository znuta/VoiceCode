const functions = require("firebase-functions");
const {preConditionCheck} = require("../utils/authUtil");
const {getUserInfo, updateUser, createUser} = require("./helpers/users-helper");
const {logger} = require("../utils/log-util");

exports.createUserInfo = functions
    .https.onCall(async (data, context) => {
            try {
                preConditionCheck(context.app);
              
                const userid = context.auth.uid;

                if (data.id) {
                    throw new functions.https.HttpsError('invalid-argument', "This method does not do updates!")
                }

                const ud = createUser(userid, data)
                return ud;
            } catch (e) {
                throw e;
            }
        }
    )

exports.updateUserInfo = functions
    .https.onCall(async (data, context) => {
            try {
                preConditionCheck(context.app);
              
                const userid = context.auth.uid;

                const ud = updateUser(userid, data)

                return ud;
            } catch (e) {
                throw e;
            }
        }
    )

exports.retrieveUserInfo = functions
    .https.onCall(async (data, context) => {
        try {
            preConditionCheck(context.app);

            const data = getUserInfo(context.auth.uid);

            return data;
        } catch (e) {
            logger.error(e);
        }
    });
/*eslint-disable*/
const functions = require("firebase-functions");
const {auth} = require('firebase-admin')

const preConditionCheck = (app) => {
    console.log("checking auth...")
    if (app === undefined) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'The function must be called from an App Check verified app.')
    }
}

const validateClaims = (uid, user, res) => {
    if (uid !== user.uid) {
        res.status(403).send({
            code: 403,
            message: "You are not allowed to access the information you are requesting for."
        })
    }
}


exports.preConditionCheck = preConditionCheck;
exports.validateClaims = validateClaims;

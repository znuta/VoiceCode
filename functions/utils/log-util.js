const functions = require("firebase-functions");

const {error, ...others} = functions.logger
const logError = (message, caller, errorObject) => {
  
    error(errorObject || message)
}

exports.logger = {error: logError, ...others}
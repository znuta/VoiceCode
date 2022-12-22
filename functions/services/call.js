const functions = require("firebase-functions");
const {logger} = require("../utils/log-util");
const { makeCall, receiveCommand, app } = require("./helpers/call-helper");

exports.makeCall = functions
    .https.onCall(async (data, context) => {
            try {

                const call = makeCall(data)
                return call;

            } catch (e) {
                throw e;
            }
        }
    )

exports.processCall = functions
    .https.onCall(async (data, context) => {
       
            try {
                
                const call = receiveCommand("What is my sister name?")
                return call;

            } catch (e) {
                throw e;
            }
        }
    )

exports.receiveCommand = functions.https.onRequest(app) 
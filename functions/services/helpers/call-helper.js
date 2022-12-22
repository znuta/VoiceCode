const {firestore} = require("firebase-admin");
const {logger} = require("../../utils/log-util");
const twilio = require('twilio');
const express = require('express');
const { processVoice } = require("./voice-recognition-help");
const  app = express()

const makeCall = async (data) => {
    logger.log("getting user info from db", data)
    const {receipientNumber, audio, question} = data
    
    try {

      // Your Twilio account SID and auth token, which can be found in your Twilio account dashboard
        const accountSid = process.env.ACCOUNT_SID;
        const authToken = process.env.AUTH_TOKEN;

        // Your Twilio phone number
        const fromPhoneNumber = '+18446990368';

        // The phone number you want to call
        const toPhoneNumber = receipientNumber;

        // Create a new Twilio client
        const client = twilio(accountSid, authToken);

        // Make the phone call
        client.calls
        .create({
            url: `http://localhost:5001/hackathon-4efea/us-central1/call-processCall?question= ${question}`,  // URL of the voice command API endpoint
           
            to: toPhoneNumber,
            from: fromPhoneNumber
        })
        .then(call => {
           
            const callSid = call.sid
            const records = call.subresource_uris.recordings;
            const isUser = processVoice(audio, records) 
            return isUser
        }).catch(err=> console.log('__ERROR__', err))
        
    } catch (e) {
        logger.error(e.message, "getUserInfo", e);
    }
};

app.post('/', (req, res) => {
    try {
        
        const VoiceResponse = require('twilio').twiml.VoiceResponse;

        const twiml = new VoiceResponse();

        // Use the Gather verb to collect the user's voice command
        const gather = twiml.gather({
            input: 'speech',
            timeout: 3,
            finishOnKey: '#'
        });
        
        gather.say(question);

        // If the user doesn't say anything, prompt them to try again
        twiml.redirect('/receiveCommand');

        // Use <Record> to record the caller's message
        twiml.record();

        res.type('text/xml');
        res.send(twiml.toString());

    } catch (e) {
        throw e;
    }
}
)

exports.makeCall = makeCall
exports.app = app

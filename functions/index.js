// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const dotenv = require("dotenv")
if (admin.apps.length === 0) {
    admin.initializeApp();
}

exports.users = require('./services/users')
exports.call = require('./services/call')
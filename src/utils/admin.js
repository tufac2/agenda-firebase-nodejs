// INITIALIZE APP
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hr-backend-b643c.firebaseio.com"
})
const db = admin.firestore()

// SETUP SENDGRID
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = "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";
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = { admin, db, sgMail }
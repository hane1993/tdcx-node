const admin = require('firebase-admin');

const serviceAccount = require('./tdcx-assisment-firebase-adminsdk-fu2qn-7eb801faa1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.db = admin.firestore();

exports.admin = admin;

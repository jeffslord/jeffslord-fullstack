var admin = require("firebase-admin");

var serviceAccount = require("../config/home-f65a9-firebase-adminsdk-sjzuh-dfad38ba19.json")
const uid = "hCUK7ou9aLWwPcTKkAJ1w0gidBx2"

admin.initializeApp({
    // credential: admin.credential.applicationDefault(),
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://home-f65a9.firebaseio.com"
});

admin.auth().setCustomUserClaims(uid, { cv: true }).then(() => {
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
    admin.auth().getUser(uid).then((userRecord) => {
        // The claims can be accessed on the user record.
        console.log(userRecord.customClaims.cv);
        process.exit(22);
    });
});
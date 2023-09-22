import { initializeApp, cert } from "firebase-admin/app";
import dotenv from 'dotenv';

dotenv.config();
const serviceAccount = {
  type: "service_account",
  project_id: process.env.PUBLIC_FIREBASE_PROJECT_ID,
  private_key_id: process.env.PUBLIC_FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.PUBLIC_FIREBASE_PRIVATE_KEY,
  client_email: process.env.PUBLIC_FIREBASE_CLIENT_EMAIL,
  client_id: process.env.PUBLIC_FIREBASE_CLIENT_ID,
  auth_uri: process.env.PUBLIC_FIREBASE_AUTH_URI,
  token_uri: process.env.PUBLIC_FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.PUBLIC_FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: process.env.PUBLIC_FIREBASE_CLIENT_CERT_URL,
};
console.log(serviceAccount,  {env:process.env})
const app = initializeApp({
  credential: cert(serviceAccount ),
});


import { getFirestore,  } from "firebase-admin/firestore";


console.log("Uploading csv to firebase!")
import fs from 'fs';

console.log(process.cwd())

const db = getFirestore(app);
const guestsRef = db.collection("guests");

fs.readFile('invitados.csv', function (err, data) {

    if (err) {
        return console.log(err);
    }

    //Convert and store csv information into a buffer. 
    const bufferString = data.toString();

    //Store information for each individual person in an array index. Split it by every newline in the csv file. 
    const arr = bufferString.split('\r\n');
    
    const jsonObj = [];
    const headers = arr[0].split(';');
    
    for(var i = 1; i < arr.length; i++) {
        const data = arr[i].split(';');
        const obj = {};
        for(let j = 0; j < data.length; j++) {
           obj[headers[j].trim()] = data[j].trim();
        }
        if (!obj.name) continue
        guestsRef.doc(obj.name).set(obj);
        jsonObj.push(obj);
      }
      console.log(jsonObj);
      
    
});


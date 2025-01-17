import admin from "firebase-admin";
import { Storage } from "@google-cloud/storage";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const bucket = admin.storage().bucket();

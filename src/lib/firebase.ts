import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_firebaseApiKey,
    authDomain: import.meta.env.VITE_firebaseAuthDomain,
    projectId: import.meta.env.VITE_firebaseProjectId,
    storageBucket: import.meta.env.VITE_firebaseStorageBucket,
    messagingSenderId: import.meta.env.VITE_firebaseMessagingSenderId,
    appId: import.meta.env.VITE_firebaseAppId,
    measurementId: import.meta.env.VITE_firebaseMeasurementId,
};

export const app = initializeApp(firebaseConfig);

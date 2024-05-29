import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDMraRK0kwgwwXBQTDvJB5qM8PiaboLVCA",
    authDomain: "p2pweb-c3db2.firebaseapp.com",
    projectId: "p2pweb-c3db2",
    storageBucket: "p2pweb-c3db2.appspot.com",
    messagingSenderId: "509978594664",
    appId: "1:509978594664:web:0c2898b8ad341da284dadd",
    measurementId: "G-XH1FRH44SP"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

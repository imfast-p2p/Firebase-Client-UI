importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDMraRK0kwgwwXBQTDvJB5qM8PiaboLVCA",
  authDomain: "p2pweb-c3db2.firebaseapp.com",
  projectId: "p2pweb-c3db2",
  storageBucket: "p2pweb-c3db2.appspot.com",
  messagingSenderId: "509978594664",
  appId: "1:509978594664:web:0c2898b8ad341da284dadd",
  measurementId: "G-XH1FRH44SP"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

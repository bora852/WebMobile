importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

const config = {
  projectId: "webmobileproject-2d658",
  authDomain: "webmobileproject-2d658.firebaseapp.com",
  apiKey: "AIzaSyCmQ16A9lD5zpXztM6kLbHTBQAyzfht35o",
  databaseURL: "https://webmobileproject-2d658.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "417231299643"
};
firebase.initializeApp(config);

console.log("message ws")

const messaging = firebase.messaging();

self.addEventListener("push", function(event) {
  const payload = event.data.json();
  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    data: payload.notification.click_action
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

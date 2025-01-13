importScripts("https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js");

// Replace these with your Firebase configuration keys
const firebaseConfig = {
  apiKey: "AIzaSyCCM1zRYsNNy72ECXKq1HoLR7O7AeXK2Bw",
  authDomain: "react-7bacc.firebaseapp.com",
  databaseURL: "https://react-7bacc-default-rtdb.firebaseio.com",
  projectId: "react-7bacc",
  storageBucket: "react-7bacc.firebasestorage.app",
  messagingSenderId: "326706175764",
  appId: "1:326706175764:web:6538047b2f3e6bab262c01",
  measurementId: "G-SJR5HRW9FC",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message", payload);

  const { title, body, icon } = payload.notification;
  const notificationOptions = {
    body,
    icon,
    data: { url: payload.fcmOptions?.link || payload.data?.link },
  };

  self.registration.showNotification(title, notificationOptions);
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  console.log("[firebase-messaging-sw.js] Notification click received.");
  event.notification.close();

  const url = event.notification.data.url;

  if (url) {
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          for (const client of clientList) {
            if (client.url === url && "focus" in client) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow(url);
          }
        })
    );
  }
});

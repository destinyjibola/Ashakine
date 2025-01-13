import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

export const FIREBASE_VAPID_KEY =
  "BPe7MiA-51dSRxOy-gGqAafUX6Ce6diMGArPe7VzwLgw_O9iK3AWMAlmpwhW07Gdzmu7st6dxCYcMdrUEvugMlc";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      } else {
        alert(
          "No registration token available. Request permission to generate one."
        );
        return null;
      }
    })
    .catch((err) => {
      alert("An error occurred while retrieving token - " + err);
      return null;
    });
};

onMessage(messaging, ({ notification }) => {
  new Notification(notification.title, {
    body: notification.body,
    icon: notification.icon,
  });
});

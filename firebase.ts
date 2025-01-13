import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
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

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };

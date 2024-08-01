import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFcl8BnEr0jWTMQoJSKEtuG04un7J3RXA",
  authDomain: "fcm-demo-33514.firebaseapp.com",
  projectId: "fcm-demo-33514",
  storageBucket: "fcm-demo-33514.appspot.com",
  messagingSenderId: "944920842332",
  appId: "1:944920842332:web:16d9f8a37a9bb23e3e5699",
  measurementId: "G-JP8H5GZGNH"
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

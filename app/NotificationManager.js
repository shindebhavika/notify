"use client"; // This directive ensures that this component is rendered on the client side

import { useEffect } from "react";

export default function NotificationManager() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        }).catch((err) => {
          console.log('Service Worker registration failed:', err);
        });
    }
  }, []);

  return null; // This component does not render anything
}

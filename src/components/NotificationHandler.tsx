// src/NotificationHandler.js
import { useState } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "../firebase-config";

const NotificationHandler = () => {
  const [token, setToken] = useState("");
  const messaging = getMessaging(app);
  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      console.log("permission", permission);
      if (permission === "granted") {
        console.log("Notification permission granted.");

        const token = await getToken(messaging, {
          vapidKey:
            "BHQ7-2BFlWsABSpTS0BZ1RGI3VqJ2_IfuYaCTvU0_I1fblB23QukQ6kEZnv3QXMTmUK1plDN6dLvJFSoXfz0HVo", // Lấy từ Firebase Project Settings -> Cloud Messaging
        });
        setToken(token);
        console.log("FCM Token:", token);
        // Gửi token này lên server của bạn để lưu lại và gửi thông báo sau này

        // Lắng nghe thông báo khi ứng dụng đang chạy
        onMessage(messaging, (payload) => {
          console.log("Message received. ", payload);
          const notificationTitle = payload.notification?.title;
          const notificationOptions = {
            body: payload.notification?.body,
          };
          new Notification(notificationTitle || "", notificationOptions);
        });
      } else {
        console.log("Unable to get permission to notify.");
      }
    } catch (error) {
      console.error("Error getting token: ", error);
    }
  };

  return (
    <div>
      Token: {token}
      <button onClick={requestPermission}>Request Permission</button>
    </div>
  );
};

export default NotificationHandler;

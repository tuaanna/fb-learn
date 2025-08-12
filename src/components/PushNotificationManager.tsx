import { requestForToken } from "@/firebase";
import { useEffect, useState } from "react";

export const PushNotificationManager = () => {
  const [token, setToken] = useState<string | null>(null);
  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        requestForToken().then((token) => {
          setToken(token as string);
        });
        console.log("Người dùng đã cấp quyền hiển thị thông báo!");
      } else if (permission === "denied") {
        console.log("Người dùng đã từ chối cấp quyền.");
      } else {
        console.log("Người dùng chưa đưa ra quyết định.");
      }
      return permission;
    }
  };

  useEffect(() => {
    requestForToken().then((token) => {
      setToken(token as string);
    });
  }, []);

  return (
    <>
      <button onClick={requestNotificationPermission}>Cho phép</button>
      <div>Token: {token}</div>
    </>
  );
};

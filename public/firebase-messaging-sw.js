importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBx0fKKoUHERgsKMNqUQnpyG-m3fE9vLIk",
  authDomain: "push-noti-125b3.firebaseapp.com",
  projectId: "push-noti-125b3",
  storageBucket: "push-noti-125b3.firebasestorage.app",
  messagingSenderId: "433204968631",
  appId: "1:433204968631:web:f3ee5b4576ee0710c62132",
  measurementId: "G-N2587NFS4V",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("push", (event) => {
  // Lắng nghe sự kiện push
  console.log("[Service Worker] Push Received.", event);

  let notificationTitle = "Thông báo";
  let notificationBody = "Default Body";

  // Kiểm tra xem sự kiện có chứa dữ liệu không
  if (event.data) {
    const data = event.data.json();
    console.log("[Service Worker] Push had this data:", data);
    notificationTitle = data.notification.title;
    notificationBody = data.notification.body;
  }

  const options = {
    body: notificationBody,
    // Bạn có thể thêm các tùy chọn khác như icon, badge, actions...
    // icon: '/images/icon.png',
  };

  // Sử dụng event.waitUntil() để đảm bảo service worker không bị tắt
  // trước khi thông báo được hiển thị
  event.waitUntil(
    self.registration.showNotification(notificationTitle, options)
  );
});

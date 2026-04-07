// ══════════════════════════════════════════════════════════
// firebase-messaging-sw.js
// Đặt file này ở THƯ MỤC GỐC của web app (cùng với index.html)
// ══════════════════════════════════════════════════════════

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// ⚠️ THAY THẾ bằng config Firebase của bạn (giống trong index.html)
firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
});

const messaging = firebase.messaging();

// Nhận thông báo khi app đang ở background
messaging.onBackgroundMessage(payload => {
  console.log('[SW] Background message:', payload);
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || '🔥 Biệt Đội Giữ Lửa', {
    body: body || 'Có tin nhắn mới từ nhóm!',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    tag: 'bdgl-notification',
    renotify: true,
    requireInteraction: true,
    actions: [
      { action: 'open', title: '📷 Chụp ngay' },
      { action: 'dismiss', title: 'Để sau' }
    ]
  });
});

// Xử lý click thông báo
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(clients.openWindow('/'));
  }
});

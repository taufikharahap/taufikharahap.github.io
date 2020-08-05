var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BPLah5r6X-OOP-28EuWfhgn0GY4KRvJPezGUQhU1diaY-t5gdJgr26g864QWDZKHD88gxSWVwt4GquyFarJlldk",
   "privateKey": "HugeVHYq7JhHWvCUHgonLG5sYdjYRHjZTfBgRo--JgE"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ft6d0jmTJ7U:APA91bEmIeu0AD-EpmvUIaeHwcn2TH-WXieuHRaGQWJ2cV99qMFu33CS-oKF7YG89gdXR0GxHVko4CO5Wz72lzYCkbXkIqNIb9uPZllojg8vd8j5roarCLhV3KsyIyM8yK9ajmJBr4za",
   "keys": {
       "p256dh": "BPqBvNlco/j9RWLRtMf7G3ULMJQixA18Vth1VepurQT3ZJlxQpTpZC4AnK1RpOwbPn0qt5Xrn58E1mYqiOK05R0=",
       "auth": "/1ZclHXx8UPyyNDVuxDnfA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '16928951938',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
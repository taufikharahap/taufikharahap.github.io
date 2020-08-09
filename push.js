var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BCBYBkW-6KUOZOB9uksQXSIeDb6BvCawEcQiXTIfdckJvrCC9y3QmykbtwIOzHarfjXtg7b9vVocKLNW5xe_JWQ",
   "privateKey": "VAPGyQCGa-6d5kr4O-KihN8o6YEBW-x-of95UQlt7dg"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/d_lSEcOzl60:APA91bHVv1KepBEH-QY5yH6Qsf9pj8XXAznq1_6FW49kmf5K8yz5rcjxvhfyaaAR9O4PVJYKiNnUwYZbcJO1HdDgG3W4JF_JbdknB_kfKEO1RucB8xvdjMgIwXPM7TcFFDyXrb1vc4MS",
   "keys": {
       "p256dh": "BBgCz4LfxkUmLmb7BCz0/KBlye8liNAjcCviWx8ndHbFqmWsPelHubL/8NTuedTlenCIr5xTxNWb+q6GVnwkB7s=",
       "auth": "zT+YExIm1UA0EyV8OwIAfA=="
   }
};
var payload = 'Hallo! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '914185440474',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
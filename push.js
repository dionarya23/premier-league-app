var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BM61aX_KAvY1lwydYGOfqj-wUuN-Y7FNKNt4Q4PTkTWys0Cc5uJwKE66IFb9tck1QGnEUhRRttCmPavxGFuRC_U",
    "privateKey": "a2HkNwfhkJmYkJh4VwqdY7pfCCfVaxW4_NdRSnQpaUE"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dB8TDlqR7V4:APA91bF7RYjRBDJEjnzZKMvK1QinBiR3rbHDkf9txjlauTPt5CBRVB9TsxcG4w3yd19Wq76ZqAmk7ZWkmef_Twc6Vl3DaX0WSlOw_fuBUnIZJVShfk74XTXapxNMJQK2UsOI9oI7Ex-j",
    "keys": {
        "p256dh": "BHHd+/90FbR/nOpzn2dA4Cv6tVR1um7yjv95DmWBs9lbdk8LRF/9gejHP4UWy8XteNU0km2PBR3A9wucJ0JZ7kM=",
        "auth": "5VMfajOTAalDlR+/0sn0Lw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '1091250868353',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
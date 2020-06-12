var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BGax6ek5Gz-zv7o3y7sJT0k8GeXd6b-BLsCza1TvzMOkYR9PGHBYOTWjy8b4_mzAzQrN3DlUCc9JiHAeNkQIrJA",
   "privateKey": "QWYRGB_xdYGfkrZ90qXINjhGb7-oG-GFz1yy74ck0r0"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fWIDTfO8yPg:APA91bFPIC0MCNQaY534WoxI2u8vUa_Shoqzl6RJ_SxJPqm8iiVQVttOFKBau3ByszRcC5bcse8nWCxFIfnZEgGz-0mA0uY2W9Sjbpr2jlH8x4aK6v4nAyvxVvqsqb8sPp6fI-MV-JOh",
   "keys": {
       "p256dh": "BMBMA/zfppyx6ir6SQBmBzfLTJnhDptIvaX7vbY+L/mIChs8Ny6iQi6zxDw3/BDDVJp45HQJ9HfxIkVqkhRWYIs=",
       "auth": "SG6gA3YZp3p33b0j4+cXrg=="
   }
};
var payload = 'Yay... your app now can receive push notification!';
 
var options = {
   gcmAPIKey: '42140623835',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);

// Date and Time

var UTCDate = (date, dateOnly) => {
    const get_month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if(dateOnly === true) {
        return `${date.getDate()} ${get_month[date.getMonth()]} ${date.getFullYear()}`
    } else {
        return `${date.getDate()} ${get_month[date.getMonth()]} ${date.getFullYear()} ${setAMPM(date)}`
    }
}

var dateYMD = date => {
    return date.toJSON().slice(0,10);
}

var setAMPM = date => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}


    //REGISTER SERVICE WORKER
    if (!('serviceWorker' in navigator)) {
      console.log("Service worker tidak didukung browser ini.");
    } else {
      registerServiceWorker();
      requestPermission();
    }
    // Register service worker
    function registerServiceWorker() {
      return navigator.serviceWorker.register('/service-worker.js')
        .then(function (registration) {
          console.log('Registrasi service worker berhasil.');
          return registration;
        })
        .catch(function (err) {
          console.error('Registrasi service worker gagal.', err);
        });
    }

    // Periksa Push Notification
    function requestPermission() {
      if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
          if (result === "denied") {
            console.log("Fitur notifikasi tidak diijinkan.");
            return;
          } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin.");
            return;
          }
    
      if (('PushManager' in window)) {
        navigator.serviceWorker.getRegistration().then(function(registration) {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array("BGax6ek5Gz-zv7o3y7sJT0k8GeXd6b-BLsCza1TvzMOkYR9PGHBYOTWjy8b4_mzAzQrN3DlUCc9JiHAeNkQIrJA")
            }).then(function(subscribe) {
                console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch(function(e) {
                console.error('Tidak dapat melakukan subscribe ', e.message);
            });
          });
        }
      });
    }
  }

    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/');
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
  }

    // Request API untuk pertama kali
    document.addEventListener("DOMContentLoaded", function(){
      getNextmatches();
    });

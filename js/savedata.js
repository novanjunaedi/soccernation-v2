

// REGISTER SERVICE WORKER
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function() {
            navigator.serviceWorker
                .register("/service-worker.js")
                .then(function() {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
                .catch(function() {
                console.log("Pendaftaran ServiceWorker gagal");
            });
        });
        } else {
          console.log("ServiceWorker belum didukung browser ini.");
        }
          document.addEventListener("DOMContentLoaded", function() {
            var urlParams = new URLSearchParams(window.location.search);
            var isFromSaved = urlParams.get("saved");

            var insert = document.getElementById("save");
            var remove = document.getElementById("delete");

            if (isFromSaved) {
              // Memanggil API yang sudah tersimpan di database
              var item = getTeamsById();
              // Hide fab jika dimuat dari indexed db
              insert.style.display = 'none';
              remove.style.display = 'true';
              
              // ambil artikel lalu tampilkan
              
            } else {
              var item = getTeamsById();
              remove.style.display = 'none';
            }

            insert.onclick = function() {
              console.log("Tombol Save di klik.");
              M.toast({ html: `Team saved to favorite` })
              item.then(function(teams) {
                saveFavTeam(teams);
              });
            };

            remove.onclick = function() {
              console.log("Tombol Delete di klik.");
              M.toast({ html: `Team deleted from favorite` })
              item.then(function(teams) {
                deleteFavTeam(teams);
              });
            };
          });

var base_url = "https://api.football-data.org/v2/";
const uri_match = `${base_url}competitions/PL/matches?status=SCHEDULED&dateFrom=${dateYMD(new Date())}&dateTo=${dateYMD(new Date(Date.now() + 12096e5))}`

function fetchWithToken(url){
  return fetch(url, {
    headers: {
      'X-Auth-Token': '9e44af272fc541e9ac7da576257957f0'
    }
  })
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json

// Next Matches
function getNextmatches() {
  if ("caches" in window) {
    caches.match(uri_match).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var matchesHTML = "";
          data.matches.forEach(function(matches) {
            matchesHTML += `
                        
                        <div class="col s12">
                          <div class="card card-style">
                            <h5>${matches.homeTeam.name} vs ${matches.awayTeam.name}</h5>
                            <p>${UTCDate(new Date(matches.utcDate))}</p>
                          </div>
                        </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("nextmatches").innerHTML = matchesHTML;
        })
      }
    });
  }

  // Next Matches
  fetchWithToken(uri_match)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
        
      // Menyusun komponen card artikel secara dinamis
      var matchesHTML ="";
      data.matches.forEach(function(matches) {
        matchesHTML += `
                        <div class="col s12">
                          <div class="card card-style">
                            <h5>${matches.homeTeam.name} vs ${matches.awayTeam.name}</h5>
                            <p>${UTCDate(new Date(matches.utcDate))}</p>
                          </div>
                        </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("nextmatches").innerHTML = matchesHTML;
    })
    .catch(error);
}


// Matches
function getMatches() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/PL/matches").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var matchesHTML = "";
          data.matches.forEach(function(matches) {
            matchesHTML += `
                        <tr>
                          <td>${matches.homeTeam.name}</td>
                          <td>vs</td>
                          <td>${matches.awayTeam.name}</td>
                          <td>${matches.score.fullTime.homeTeam}</td>
                          <td>${matches.score.fullTime.awayTeam}</td>
                          <td>${matches.utcDate.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$3-$2-$1')}</td>
                        </tr>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("matches").innerHTML = matchesHTML;
        })
      }
    });
  }

  // Matches
  fetchWithToken(base_url + "competitions/PL/matches")
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
        
      // Menyusun komponen card artikel secara dinamis
      var matchesHTML ="";
      data.matches.forEach(function(matches) {

        for(let notfound in matches) {
                if(matches[notfound] == null) {
                    matches[notfound] = '-';
                  }
                }

        matchesHTML += `
                        <tr>
                          <td>${matches.homeTeam.name}</td>
                          <td>vs</td>
                          <td>${matches.awayTeam.name}</td>
                          <td>${matches.score.fullTime.homeTeam}</td>
                          <td>${matches.score.fullTime.awayTeam}</td>
                          <td>${matches.utcDate.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$3-$2-$1')}</td>
                        </tr>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("matches").innerHTML = matchesHTML;
    })
    .catch(error);
}

  //Standings
  function getStandings() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2021/standings?standingType=TOTAL").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var standingsHTML = "";
          data.standings[0].table.forEach(function(standings) {
            standingsHTML += `
                        <tr>
                          <td><center>${standings.position}</center></td>
                          <td><center><img src="${standings.team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width:auto; height:20px;"></center></td>
                          <td>${standings.team.name}</td>
                          <td><center>${standings.playedGames}</center></td>
                          <td><center>${standings.won}</center></td>
                          <td><center>${standings.draw}</center></td>
                          <td><center>${standings.lost}</center></td>
                          <td><center>${standings.goalsFor}</center></td>
                          <td><center>${standings.goalsAgainst}<center></td>
                          <td><center>${standings.goalDifference}</center></td>
                          <td><center>${standings.points}</center></td>
                        </tr>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("standings").innerHTML = standingsHTML;
        })
      }
    });
  }

//Standings
    fetchWithToken(base_url + "competitions/2021/standings?standingType=TOTAL")
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
        
      // Menyusun komponen card artikel secara dinamis
      var standingsHTML ="";
      data.standings[0].table.forEach(function(standings) {
        standingsHTML += `
                        <tr>
                          <td><center>${standings.position}</center></td>
                          <td><center><img src="${standings.team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width:auto; height:20px;"></center></td>
                          <td>${standings.team.name}</td>
                          <td><center>${standings.playedGames}</center></td>
                          <td><center>${standings.won}</center></td>
                          <td><center>${standings.draw}</center></td>
                          <td><center>${standings.lost}</center></td>
                          <td><center>${standings.goalsFor}</center></td>
                          <td><center>${standings.goalsAgainst}<center></td>
                          <td><center>${standings.goalDifference}</center></td>
                          <td><center>${standings.points}</center></td>
                        </tr>
            `;
      });

      //crestUrl = crestUrl.replace(/^http:\/\//i, 'https://');
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standings").innerHTML = standingsHTML;
    })
    .catch(error);
}

//Scorers
  function getScorers() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/PL/scorers").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var scorersHTML = "";
          data.scorers.forEach(function(scorers) {
            scorersHTML += `
                        <tr>
                          <td>${scorers.player.name}</td>
                          <td>${scorers.player.position}</td>
                          <td>${scorers.team.name}</td>
                          <td>${scorers.numberOfGoals}</td>
                        </tr>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("scorers").innerHTML = scorersHTML;
        })
      }
    });
  }

//Scorers
    fetchWithToken(base_url + "competitions/PL/scorers")
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
        
      // Menyusun komponen card artikel secara dinamis
      var scorersHTML ="";
      data.scorers.forEach(function(scorers) {
        scorersHTML += `
                        <tr>
                          <td>${scorers.player.name}</td>
                          <td>${scorers.player.position}</td>
                          <td>${scorers.team.name}</td>
                          <td>${scorers.numberOfGoals}</td>
                        </tr>
            `;
      });

      //crestUrl = crestUrl.replace(/^http:\/\//i, 'https://');
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("scorers").innerHTML = scorersHTML;
    })
    .catch(error);
}

  //Teams
  function getTeams() {
  if ("caches" in window) {  
    caches.match(base_url + "competitions/2021/teams").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var teamsHTML = "";
          data.teams.forEach(function(teams) {
            teamsHTML += `
                 <div class ="col s12 m6">
                    <div class="card">
                       <center>
                       <div class="card-image">
                          <img src="${teams.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width: 256px; height: 256px; padding: 15px;">
                        </div>
                        <div class="card-content" style="background: white;">
                            <span class="card-title" style="padding: 10px;">${teams.name}</span>
                            <a class="waves-effect waves-light btn-small" href="./teamdetail.html?id=${teams.id}">Details</a>
                        </div>
                        </center>
                    </div>
                  </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = teamsHTML;
        })
      }
    });
  }

    //Teams
    fetchWithToken(base_url + "competitions/2021/teams")
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var teamsHTML = "";
          data.teams.forEach(function(teams) {
            teamsHTML += `
                 <div class ="col s12 m6">
                    <div class="card">
                       <center>
                       <div class="card-image">
                          <img src="${teams.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width: 256px; height: 256px; padding: 15px;">
                        </div>
                        <div class="card-content" style="background: white;">
                            <span class="card-title" style="padding: 10px;">${teams.name}</span>
                            <a class="waves-effect waves-light btn-small" href="./teamdetail.html?id=${teams.id}">Details</a>
                        </div>
                        </center>
                    </div>
                  </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}


function getTeamsById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(teams) {
            var teamdetailHTML = `
            <div class="card">
              <center>
              <div class="card-image">
                <img src="${teams.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width: 256px; height: 256px; padding: 15px;">
              </div>
              </center>
              <div class="card-content">
                <span class="card-title">${teams.name}</span><br/>
                Short Name :
                ${teams.shortName}<br/>
                TLA :
                ${teams.tla}<br/>
                Area :
                ${teams.area.name}<br/>
                Founded :
                ${teams.founded}<br/>
                Club Colors :
                ${teams.clubColors}<br/>
                Phone :
                ${teams.phone}<br/>
                Email :
                ${teams.email}<br/>
                Address :
                ${teams.address}<br/>
                Venue :
                ${teams.venue}<br/>
                Website :
                ${teams.website}<br/>
              </div>
            </div>
          `;
          teamdetailHTML += `
              <br/>
              <h4>Team Squad</h4>
          `;

          teams.squad.forEach(function(squad){
            teamdetailHTML += `
              <ul class="collection">
                <li class="collection-item">
                  <span class="title"><h5>${squad.name}</h5></span>
                  <p>Date of Birth : ${squad.dateOfBirth.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$3-$2-$1')}<br>
                     Country of Birth : ${squad.countryOfBirth}<br>
                     Position : ${squad.position}<br>
                     Shirt Number : ${squad.shirtNumber}<br>
                     Role : ${squad.role}<br>
                     Nationality : ${squad.nationality}
                  </p>
                </li>
              </ul>
          `;
          });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = teamdetailHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(teams);
          });
        }
      });
    }

    fetchWithToken(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function(teams) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
         console.log(teams);
        // Menyusun komponen card artikel secara dinamis
        var teamdetailHTML = `
            <div class="card">
              <center>
              <div class="card-image">
                <img src="${teams.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width: 256px; height: 256px; padding: 15px;">
              </div>
              </center>
              <div class="card-content">
                <span class="card-title">${teams.name}</span><br/>
                Short Name :
                ${teams.shortName}<br/>
                TLA :
                ${teams.tla}<br/>
                Area :
                ${teams.area.name}<br/>
                Founded :
                ${teams.founded}<br/>
                Club Colors :
                ${teams.clubColors}<br/>
                Phone :
                ${teams.phone}<br/>
                Email :
                ${teams.email}<br/>
                Address :
                ${teams.address}<br/>
                Venue :
                ${teams.venue}<br/>
                Website :
                ${teams.website}<br/>
              </div>
            </div>
          `;
          teamdetailHTML += `
              <br/>
              <h4>Team Squad</h4>
          `;

          teams.squad.forEach(function(squad){
            teamdetailHTML += `
              <ul class="collection">
                <li class="collection-item">
                  <span class="title"><h5>${squad.name}</h5></span>
                  <p>Date of Birth : ${squad.dateOfBirth.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$3-$2-$1')}<br>
                     Country of Birth : ${squad.countryOfBirth}<br>
                     Position : ${squad.position}<br>
                     Shirt Number : ${squad.shirtNumber}<br>
                     Role : ${squad.role}<br>
                     Nationality : ${squad.nationality}
                  </p>
                </li>
              </ul>
          `;
          });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = teamdetailHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(teams);
      });
  });
}


//FavTeam (Saved Team)
function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var teamsHTML = "";
          teams.forEach(function(teams) {
            teamsHTML += `
                 <div class ="col s12 m6">
                    <div class="card">
                       <center>
                       <div class="card-image">
                          <img src="${teams.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width: 256px; height: 256px; padding: 15px;">
                        </div>
                        <div class="card-content" style="background: white;">
                            <span class="card-title" style="padding: 10px;">${teams.name}</span>
                            <a class="waves-effect waves-light btn-small" href="./teamdetail.html?id=${teams.id}&saved=true">Details</a>
                        </div>
                        </center>
                    </div>
                  </div>
                `;
          });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("saved-teams").innerHTML = teamsHTML;
  });
}

function getSavedTeamsById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(teams) {
    var teamdetailHTML = `
            <div class="card">
              <center>
              <div class="card-image">
                <img src="${teams.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width: 256px; height: 256px; padding: 15px;">
              </div>
              </center>
              <div class="card-content">
                <span class="card-title">${teams.name}</span><br/>
                Short Name :
                ${teams.shortName}<br/>
                TLA :
                ${teams.tla}<br/>
                Area :
                ${teams.area.name}<br/>
                Founded :
                ${teams.founded}<br/>
                Club Colors :
                ${teams.clubColors}<br/>
                Phone :
                ${teams.phone}<br/>
                Email :
                ${teams.email}<br/>
                Address :
                ${teams.address}<br/>
                Venue :
                ${teams.venue}<br/>
                Website :
                ${teams.website}<br/>
              </div>
            </div>
          `;
          teamdetailHTML += `
              <br/>
              <h4>Team Squad</h4>
          `;

          teams.squad.forEach(function(squad){
            teamdetailHTML += `
              <ul class="collection">
                <li class="collection-item">
                  <span class="title"><h5>${squad.name}</h5></span>
                  <p>Date of Birth : ${squad.dateOfBirth.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$3-$2-$1')}<br>
                     Country of Birth : ${squad.countryOfBirth}<br>
                     Position : ${squad.position}<br>
                     Shirt Number : ${squad.shirtNumber}<br>
                     Role : ${squad.role}<br>
                     Nationality : ${squad.nationality}
                  </p>
                </li>
              </ul>
          `;
          });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}

const base_url = "https://api.football-data.org/v2/";
const api_token = "9c95a1bad9fd4a88b40493354968cadd";

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
function getStandings() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2001/standings",{
      headers:{
        'X-Auth-Token':api_token
      }
    }).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let standing = "";
          data.standings.forEach(function(grup) {
            standing +=`
              <div class="col s12 m12" >
                <div class="card-panel card-klasemen">
                  <p id="titel-group-name">${grup.group}</p>
                  <div class="flex-container-column">
                      <div class="flex-container-row titel-tabel-klasemen">
                        <div class="cell cell-logo">Logo</div>
                        <div class="cell cell-name">Team Name</div>
                        <div class="cell cell-info">Won</div>
                        <div class="cell cell-info">Draw</div>
                        <div class="cell cell-info">Lost</div>
                        <div class="cell cell-info">Points</div>
                        <div class="cell cell-info">Profile</div>
                      </div>`;
                grup.table.forEach(function (tabel) {
                  standing += `
                      <div class="flex-container-row">
                        <div class="cell cell-logo"><img src="${tabel.team.crestUrl.replace(/^http:\/\//i, 'https://')}" height="40px" width="30px" alt="logo"/></div>
                        <div class="cell cell-name">${tabel.team.name}</div>
                        <div class="cell cell-info">${tabel.won}</div>
                        <div class="cell cell-info">${tabel.draw}</div>
                        <div class="cell cell-info">${tabel.lost}</div>
                        <div class="cell cell-info">${tabel.points}</div>
                        <div class="cell cell-info"><a href="./info-team.html?id=${tabel.team.id}">Klik</a></div>
                      </div>`;
                });

            standing +=`
                  </div>
                </div>
              </div>`;
          });
    
        // Sisipkan komponen card ke dalam elemen dengan id #standings
        document.getElementById("standings").innerHTML = standing;
        });
      }
    });
  }

  fetch(base_url + "competitions/2001/standings",{
    headers:{
      'X-Auth-Token':api_token
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      let standing = "";

      data.standings.forEach(function(grup) {
        standing +=`
            <div class="col s12 m12" >
              <div class="card-panel card-klasemen">
                <p id="titel-group-name">${grup.group}</p>
                <div class="flex-container-column">
                    <div class="flex-container-row titel-tabel-klasemen">
                      <div class="cell cell-logo">Logo</div>
                      <div class="cell cell-name">Team Name</div>
                      <div class="cell cell-info">Won</div>
                      <div class="cell cell-info">Draw</div>
                      <div class="cell cell-info">Lost</div>
                      <div class="cell cell-info">Points</div>
                      <div class="cell cell-info">Profile</div>
                    </div>`;
              grup.table.forEach(function (tabel) {
                standing += `
                    <div class="flex-container-row">
                      <div class="cell cell-logo"><img src="${tabel.team.crestUrl.replace(/^http:\/\//i, 'https://')}" height="40px" width="30px" alt="logo"/></div>
                      <div class="cell cell-name">${tabel.team.name}</div>
                      <div class="cell cell-info">${tabel.won}</div>
                      <div class="cell cell-info">${tabel.draw}</div>
                      <div class="cell cell-info">${tabel.lost}</div>
                      <div class="cell cell-info">${tabel.points}</div>
                      <div class="cell cell-info"><a href="./info-team.html?id=${tabel.team.id}">Klik</a></div>
                    </div>`;
              });

          standing +=`
                </div>
              </div>
            </div>`;
      });

    // Sisipkan komponen card ke dalam elemen dengan id #standings
    document.getElementById("standings").innerHTML = standing;
    })
    .catch(error);
}

function getInfoTeamById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            // Menyusun komponen card artikel secara dinamis
            let squadHTML = "";
            data.squad.forEach(function(player){
              squadHTML +=`
                <div class="flex-container-row">
                  <div class="cell-squad">${player.name}</div>
                  <div class="cell-squad">${player.position}</div>
                </div>`;
            })

            let infoTeamHTML = `
                <div class="col s12 m12" >
                  <div id="notifikasi"></div>
                  <div class="card-panel card-profile">
                    <p id="titel-profile">Profile</p>
                    <div class="flex-container-column">
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Name</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.name}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Short Name</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.shortName}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Address</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.address}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Phone</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.phone}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Website</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det"><a href="${data.website}">${data.website}<a/></div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Email</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.email}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Club Colors</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.clubColors}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Venue</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.venue}</div>
                      </div>
                    </div>
                    <div class="fixed-bg" style="background-image: url(${data.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="logo");"></div>
                    <div class="flex-container-column">
                      <p id="titel-squad"><span>Squad</span> ${data.name}</P>
                      <div class="flex-container-row">
                        <div class="cell-squad">Name</div>
                        <div class="cell-squad">Position</div>
                      </div>
                      ${squadHTML}
                    </div>
                </div>`;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = infoTeamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "teams/" + idParam,{
      headers:{
        'X-Auth-Token':api_token
      }
    })
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        let squadHTML = "";
            data.squad.forEach(function(player){
              squadHTML +=`
                <div class="flex-container-row">
                  <div class="cell-squad">${player.name}</div>
                  <div class="cell-squad">${player.position}</div>
                </div>`;
            })

            let infoTeamHTML = `
                <div class="col s12 m12" >
                  <div id="notifikasi"></div>
                  <div class="card-panel card-profile">
                    <p id="titel-profile">Profile</p>
                    <div class="flex-container-column">
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Name</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.name}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Short Name</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.shortName}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Address</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.address}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Phone</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.phone}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Website</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det"><a href="${data.website}">${data.website}<a/></div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Email</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.email}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Club Colors</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.clubColors}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Venue</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.venue}</div>
                      </div>
                    </div>
                    <div class="fixed-bg" style="background-image: url(${data.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="logo");"></div>
                    <div class="flex-container-column">
                      <p id="titel-squad"><span>Squad</span> ${data.name}</P>
                      <div class="flex-container-row">
                        <div class="cell-squad">Name</div>
                        <div class="cell-squad">Position</div>
                      </div>
                      ${squadHTML}
                    </div>
                </div>`;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = infoTeamHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    let infoTeamHTML = "";
    teams.forEach(function(team) {
      infoTeamHTML += `
          <div class="col s12 m4">
              <div class="card medium card-saved">
                  <div class="card-image">
                    <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="logo" height="220px" width="250px">
                  </div>
                  <div class="card-content">
                    <span class="card-title center">${team.name}</span>
                  </div>
                  <div class="card-action center">
                      <a class="waves-effect waves-light btn" href="./info-team.html?id=${team.id}&saved=true">Lihat</a>
                      <a class="waves-effect waves-light btn removeButton" id="${team.id}">Hapus</a>
                  </div>
              </div>
          </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #saved-teams
    document.getElementById("saved-teams").innerHTML = infoTeamHTML;

    document.querySelectorAll(".removeButton").forEach(function(button) {
      button.onclick = function(event) {
            let teamId = event.target.id;
            let alert = confirm("Apakah anda yakin mengahapus team ini?");

            if (alert == true) {
              deleteForLater(parseInt(teamId));
              getSavedTeams()
            }
      };
    });
  });
}

function getSavedTeamById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  
  getById(idParam).then(function(data) {
    console.log(data);
    let squadHTML = "";
            data.squad.forEach(function(player){
              squadHTML +=`
                <div class="flex-container-row">
                  <div class="cell-squad">${player.name}</div>
                  <div class="cell-squad">${player.position}</div>
                </div>`;
            })

            let infoTeamHTML = `
                <div class="col s12 m12" >
                  <div id="notifikasi"></div>
                  <div class="card-panel card-profile">
                    <p id="titel-profile">Profile</p>
                    <div class="flex-container-column">
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Name</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.name}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Short Name</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.shortName}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Address</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.address}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Phone</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.phone}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Website</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det"><a href="${data.website}">${data.website}<a/></div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Email</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.email}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Club Colors</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.clubColors}</div>
                      </div>
                      <div class="flex-container-row">
                        <div class="cell-profile cell-ket">Venue</div>
                        <div class="cell-profile cell-bar">:</div>
                        <div class="cell-profile cell-det">${data.venue}</div>
                      </div>
                    </div>
                    <div class="fixed-bg" style="background-image: url(${data.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="logo");"></div>
                    <div class="flex-container-column">
                      <p id="titel-squad"><span>Squad</span> ${data.name}</P>
                      <div class="flex-container-row">
                        <div class="cell-squad">Name</div>
                        <div class="cell-squad">Position</div>
                      </div>
                      ${squadHTML}
                    </div>
                </div>`;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = infoTeamHTML;
  });
}

const base_url = "https://api.football-data.org/v2/";
const token = "218249a19b2540bf94ac21f1af3e51f6";

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
    caches.match(`${base_url}competitions/2021/standings`).then(function(response) {
      if (response) {
        response.json().then(function(data) {
           standings(data)
        });
      }
    });
  }

  fetch(`${base_url}competitions/2021/standings`, {
        headers: {
            'X-Auth-Token': token
        }
    })
    .then(status)
    .then(json)
    .then(function(data) {
      standings(data)
    })
    .catch(error);
}

function getDetailClub() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function (data) {
            var dataSquad = "";
            var tabelCompetitions = "";
            data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));

            document.getElementById("name_club").innerHTML = data.name;
            document.getElementById("crest_club").src = data.crestUrl;
            document.getElementById("name").innerHTML = data.name;
            document.getElementById("address").innerHTML = data.address;
            document.getElementById("phone").innerHTML = data.phone;
            document.getElementById("website").innerHTML = data.website;
            document.getElementById("founded").innerHTML = data.founded;
            document.getElementById("venue").innerHTML = data.venue;

           

            data.squad.forEach(function (squad, index) {
                var position = squad.position != null ? squad.position : squad.role
                dataSquad += `
                <tr>
                    <td >
                    <a href="#"> ${squad.name}</a>
                    </td>
                    <td >${position}</td>
                </tr>
                `
            });
            
           
            data.activeCompetitions.forEach(function(comp, index) {
              tabelCompetitions += `
                <tr>
                    <td>${index+1}</td>
                    <td>${comp.name}</td>
                    <td>${comp.area.name}</td>
              </tr>
              `
          })

            document.getElementById("competition_list").innerHTML = tabelCompetitions
            document.getElementById("list_squad").innerHTML = `<table> <tbody> ${dataSquad}  </tbody> </table>`;


            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "teams/" + idParam, {
      headers: {
          'X-Auth-Token': token
      }
  })
      .then(status)
      .then(json)
      .then(function(data) {
        var dataSquad = "";
        var tabelCompetitions = "";
        data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));

            document.getElementById("name_club").innerHTML = data.name;
            document.getElementById("crest_club").src = data.crestUrl;
            document.getElementById("name").innerHTML = data.name;
            document.getElementById("address").innerHTML = data.address;
            document.getElementById("phone").innerHTML = data.phone;
            document.getElementById("website").innerHTML = data.website;
            document.getElementById("founded").innerHTML = data.founded;
            document.getElementById("venue").innerHTML = data.venue;
         
            data.squad.forEach(function (squad, index) {
                var position = squad.position != null ? squad.position : squad.role
                dataSquad += `
                        <tr>
                            <td >
                            <a href="#"> ${squad.name}</a>
                            </td>
                            <td >${position}</td>
                        </tr>
                        `
            });

            data.activeCompetitions.forEach(function(comp, index) {
                tabelCompetitions += `
                  <tr>
                      <td>${index+1}</td>
                      <td>${comp.name}</td>
                      <td>${comp.area.name}</td>
                </tr>
                `
            })

            document.getElementById("competition_list").innerHTML = tabelCompetitions
            document.getElementById("list_squad").innerHTML = `<table> <tbody> ${dataSquad}  </tbody> </table>`


            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
      });
  });
}

function getTopScore() {
  if ("caches" in window) {
    caches.match(`${base_url}competitions/2021/scorers`).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          topScore(data)
        });
      }
    });
  }

  fetch(`${base_url}competitions/2021/scorers`, {
        headers: {
            'X-Auth-Token': token
        }
    })
    .then(status)
    .then(json)
    .then(function(data) {
      topScore(data)
    })
    .catch(error);
}

function getFavoriteTeams() {
  getAll().then(function(teams) {

    if (teams.length !== 0) {
      var teamsHTML = "";
      teams.forEach(function(team) {
        console.log(team)
        teamsHTML += `
                    <div class="card">
                      <a href="./club.html?id=${team.teamsId}">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${team.crestUrl}" />
                        </div>
                      </a>
                      <div class="card-content">
                        <span class="card-title truncate">${team.name}</span>
                      </div>
                    </div>
                  `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("favorite_team").innerHTML = teamsHTML;
    } else {
      var htmlNotFound = `
      <div>
          <span>Favorite Team Belum ada</span>
      </div>`

      document.getElementById('favorite_team').innerHTML = htmlNotFound
    }
    
  });
}
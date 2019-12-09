function standings(data) {

    var standingData = "";

    data.standings[0].table.forEach(function(club) {
   club = JSON.parse(JSON.stringify(club).replace(/http:/g, 'https:'));

     standingData += `<tr>
                 <td class="center-align">${club.position}</td>
                 <td>
                     <a href="./club.html?id=${club.team.id}">
                         <p class="hide-on-small-only">
                             <img class = "responsive-img show-on-medium-and-up show-on-medium-and-down" src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
                             ${club.team.name}
                         </p>
                         <p class="hide-on-med-and-up">
                             <img src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
                         </p>
                     </a>
                 </td>
                 <td class="center-align">${club.playedGames}</td>
                 <td class="center-align">${club.won}</td>
                 <td class="center-align">${club.draw}</td>
                 <td class="center-align">${club.lost}</td>
                 <td class="center-align">${club.goalsFor}</td>
                 <td class="center-align">${club.goalsAgainst}</td>
                 <td class="center-align">${club.goalDifference}</td>
                 <td class="center-align">${club.points}</td>
       </tr>`
    })

     document.getElementById("standings").innerHTML = standingData;
     document.getElementById("season").innerHTML = `Seasons ${data.season.startDate.split('-')[0]} - ${data.season.endDate.split('-')[0]}`
     document.getElementById('matchday').innerHTML = `Matchday ${data.season.currentMatchday}`
}

function topScore(data) {

    var topScoreData = "";

    data.scorers.forEach(function(topScore, index) {
        topScoreData += `<tr>
                 <td class="center-align">${index+1}</td>
                 <td class="center-align">${topScore.player.name}</td>
                 <td class="center-align">${topScore.numberOfGoals}</td>
                 <td class="center-align">${topScore.team.name}</td>
       </tr>`
    })

     document.getElementById("top_score").innerHTML = topScoreData;
     document.getElementById("season_topscore").innerHTML = `Seasons ${data.season.startDate.split('-')[0]} - ${data.season.endDate.split('-')[0]}`
     document.getElementById('matchday_topscore').innerHTML = `Matchday ${data.season.currentMatchday}`

}
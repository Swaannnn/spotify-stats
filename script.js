// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQChDZPCxDJ7XDk5HscjMAzIPQ4QUBDERnUDf5KcuiciHoDtj3TFuDujspw1_Pywdk2CvFj_ZCW7y2XjqF4_O2VOw3a0bM0y3m05OHtcOGDAY4Y1zDVbb0VRqTjvsfHE_MzVdn-TPO3odcKMzx_iJq0pyH7ATQxKnollCI6aZQ_HyE1_9VO50_z7hXncKdilS9BwPtOI4Muc9CK6HDB05ZivYvcf2Wm3vrIwYGTr6M16yMrKyZ41uImSu_uVtzwmvWNelpum4_PG5K7MXea_Kpnw';

/// connexion au compte (avec le token)
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}






/// récupère le bouton et lance la fonction au click
const valider = document.querySelector("#bouttonValider");
/// récupère l'endroit ou afficher les top titres
const topTitres = document.querySelector(".topTitres");

/// endroit sans texte pour le moment
const endroitListe = document.querySelector(".listTopTitres")
var listTopTitres = ""

/// fonction qui récupère les top tracks
async function getTopTracks(){

    /// constante qui récupère le nombre de track souhaité
    var numberTrack = document.getElementById("nbTrack").value
    var timeAgo = document.getElementById("timeAgo").value

  return (await fetchWebApi(
    'v1/me/top/tracks?time_range='+timeAgo+'&limit='+numberTrack, 'GET'
  )).items;
}

/// récupère les tops tracks et l'écrit dans la console
async function start() {
    const topTracks = await getTopTracks();

    listTopTitres = (
        topTracks?.map(
          ({name, artists, id, image}) =>
            `${name} by ${artists.map(artist => artist.name).join(', ')} (url cover : ${})`
        )
      );

    topTitres.style.display = "inline";
    endroitListe.innerText = listTopTitres
}

valider.addEventListener("click", () => {
    /// lance la fonction topTracks et affiche les top tracks
    start();
});

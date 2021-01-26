const URL = "https://api.spacexdata.com/v4/launches";

// Deklarerar dagens datum, för att kunna
// avgöra om uppskjutningen har varit eller inte
const todaysDate = Math.round(new Date().getTime()/1000);

/* 6. Det här är vår huvudfunktion. Den plockar upp datan (json)
som vi skickade med när vi kallade på funktionen. Så 'launches'
innehåller hela responsen från API:et eftersom det är detsamma som
json (som vi skickade med). */
const displayLaunches = (launches) => {
  launches.map(launch => {

    const name = launch.name;
    const date = launch.date_utc.slice(0,10);
    const dayUnix = launch.date_unix;
    const success = launch.success;

    const checkSuccess = () => {
      if (todaysDate < dayUnix) {
        return "Not yet!"
      } else if (success) {
        return "Launch successful"
      } else {
        return "Launch failed"
      }
    }

    document.querySelector(".all-launches").innerHTML +=
    `<div class="launch">
      <h2>${name}</h2>
      <p> ${checkSuccess()} </p>
      <p> ${date} </p>
      <div class="details"> 
        <a href="details.html"> Details</a>
      </div>
    </div>`
  })
} 
    
/* 3.  Det första som sker i vår fil är denna fetch-funktionen.
Fetch är en inbyggd JavaScript-funktion som skickar en förfrågan
till den URL vi skriver inom parentesen. När vi fått svar omvandlar
vi datan till JSON-format (JavaScript Object Notation) och därefter
specificerar vi vad vi vill göra med datan. */
fetch(URL)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
     /* 4. Här loggar vi datan till konsollen för att se hur den är
    strukturerad. Öppna konsollen i browsern för att kika! */
    console.log(json)

    // Här kallar vi på vår displayLaunches-funktion och skickar
    //med data/json som argument.
    displayLaunches(json)
  })



  
const URL = "https://api.spacexdata.com/v4/launches";

const todaysDate = Math.round(new Date().getTime()/1000);

fetch(URL)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
    displayLaunchesDetails(json)
  })

const displayLaunchesDetails = (launches) => {
  launches.map(launch => {

    const name = launch.name;
    const details = launch.details;

    const checkDetails = () => {
      if (details === null) {
        return "No details, this launch was successful."
      } else {
        return details
      }
    }
    document.querySelector(".all-launches-details").innerHTML +=
    `<div class="launch">
      <h2>${name}</h2>
      <p> ${checkDetails()} </p>
      <div class="details"> 
      <a href="index.html">Overview</a>
      </div>
    </div>`
  })
}
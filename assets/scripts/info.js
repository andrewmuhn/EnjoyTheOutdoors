import { mountainsArray } from "./mountainData.js";

const loadMountains = () => {
  for (let i = 0; i < mountainsArray.length; i++) {
    let option = document.createElement("option");
    option.text = mountainsArray[i].name;
    mountainSelect.add(option);
  }
};

const getSunsetForMountain = async (lat, lng) => {
  let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
  );
  let data = await response.json();
  console.log(data.results);
  return data.results;
};

const displayMountain = (mountain, times) => {
  const mountainContainer = document.getElementById("mountainContainer");
  mountainContainer.innerHTML = "";
  const mountainCard = document.createElement("div");
  mountainCard.className = ("card mt-3 p-2 restricted");
  mountainCard.onclick = () => {
    mountainCard.classList.toggle("flipped");
    mountainCard.innerHTML = mountainCard.classList.contains("flipped") ? mountainBack : mountainMain;
  };

  const mountainMain = `
    <h2 class="card-title d-flex justify-content-between align-items-center" id="mountainHeader">${mountain.name}
    <img src="../assets/images/Screenshot_2024-05-06_at_9.56.08_AM-removebg-preview.png" alt="flip-arrow" id="flipArrow">
    </h2>
    <p class="card-text">Elevation: ${mountain.elevation} ft</p>
    <p class="card-text">Effort: ${mountain.effort}</p>
    <img src="../assets/images/${mountain.img}" alt="${mountain.name}">
    <p class="card-text">Sunrise: ${times.sunrise} UTC</p>
    <p class="card-text">Sunset: ${times.sunset} UTC</p>
  `;
  const mountainBack = `
    <h2 class="card-title d-flex justify-content-between align-items-center" id="mountainHeader">${mountain.name}
    <img src="../assets/images/Screenshot_2024-05-06_at_9.56.08_AM-removebg-preview.png" alt="flip-arrow" id="flipArrow">
    </h2>
    <p class="card-text">${mountain.desc}</p>
    <p class="card-text">Coordinates: ${mountain.coords.lat}, ${mountain.coords.lng}</p>
  `;


  mountainCard.innerHTML = mountainMain;
  mountainContainer.appendChild(mountainCard);
};

window.onload = function () {
  loadMountains();
};

window.onchange = function () {
  const mountainSelect = document.getElementById("mountainSelect");
  const selectedMountain =
    mountainSelect.options[mountainSelect.selectedIndex].text;
  const filteredMountain = mountainsArray.find(
    (mountain) => mountain.name === selectedMountain
  );
  console.log(filteredMountain);
  getSunsetForMountain(
    filteredMountain.coords.lat,
    filteredMountain.coords.lng
  ).then((times) => {
    console.log(times);
    displayMountain(filteredMountain, times);
  });
};


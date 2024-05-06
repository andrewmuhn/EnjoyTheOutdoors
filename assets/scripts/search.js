import { nationalParksArray } from "./nationalParkData.js";
import { locationsArray } from "./locationData.js";
import { parkTypesArray } from "./parkTypeData.js";

let stateSelect = document.getElementById("stateSelect");

const loadLocations = () => {
  for (let i = 0; i < locationsArray.length; i++) {
    let option = document.createElement("option");
    option.text = locationsArray[i];
    stateSelect.add(option);
  }
};

const loadParkTypes = () => {
  for (let i = 0; i < parkTypesArray.length; i++) {
    let option = document.createElement("option");
    option.text = parkTypesArray[i];
    parkTypeSelect.add(option);
  }
};

const searchByRadio = () => {
  const locationRadio = document.getElementById("locationRadio");
  const parkTypeRadio = document.getElementById("parkTypeRadio");
  const allRadio = document.getElementById("allRadio");
  if (locationRadio.checked) {
    document.getElementById("locationSelectContainer").style.display = "block";
    document.getElementById("parkTypeSelectContainer").style.display = "none";
    searchByLocation();
  } else if (parkTypeRadio.checked) {
    document.getElementById("locationSelectContainer").style.display = "none";
    document.getElementById("parkTypeSelectContainer").style.display = "block";
    searchByParkType();
  } else if (allRadio.checked) {
    document.getElementById("locationSelectContainer").style.display = "none";
    document.getElementById("parkTypeSelectContainer").style.display = "none";
    displayParks(nationalParksArray);
  }
};

const searchByLocation = () => {
  const stateSelect = document.getElementById("stateSelect");
  const selectedState = stateSelect.options[stateSelect.selectedIndex].text;
  const filteredParks = nationalParksArray.filter(
    (park) => park.State === selectedState
  );
  console.log(filteredParks);
  displayParks(filteredParks);
};

const searchByParkType = () => {
  const parkTypeSelect = document.getElementById("parkTypeSelect");
  const selectedParkType =
    parkTypeSelect.options[parkTypeSelect.selectedIndex].text;
  const filteredParks = nationalParksArray.filter((park) =>
    park.LocationName.includes(selectedParkType)
  );
  console.log(filteredParks);
  displayParks(filteredParks);
};

const displayParks = (parks) => {
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";
  let rowCounter = 1;
  parks.forEach((park, index) => {
    if (index % 2 === 0) {
      const row = document.createElement("div");
      row.className = "row row-cols-1 row-cols-md-2 g-4";
      row.id = `row-${rowCounter}`;
      const col = displayPark(park);
      row.appendChild(col);
      searchResults.appendChild(row);
    } else {
      const row = document.getElementById(`row-${rowCounter}`);
      const col = displayPark(park);
      row.appendChild(col);
      rowCounter++;
    }
  });
};

const displayPark = (park) => {
  const col = document.createElement("div");
  col.className = "col mb-4";

  const card = document.createElement("div");
  card.className = "card h-100";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = park.LocationName;
  cardBody.appendChild(cardTitle);

  const location = document.createElement("p");
  location.className = "card-text";
  location.textContent = `Location: ${park.City}, ${park.State}`;
  cardBody.appendChild(location);

  if (park.Address) {
    const address = document.createElement("p");
    address.className = "card-text";
    address.textContent = `Address: ${park.Address}`;
    cardBody.appendChild(address);
  }

  if (park.Phone) {
    const phone = document.createElement("p");
    phone.className = "card-text";
    phone.textContent = `Phone: ${park.Phone}`;
    cardBody.appendChild(phone);
  }

  if (park.Fax) {
    const fax = document.createElement("p");
    fax.className = "card-text";
    fax.textContent = `Fax: ${park.Fax}`;
    cardBody.appendChild(fax);
  }

  if (park.Coordinates) {
    const coordinates = document.createElement("p");
    coordinates.className = "card-text";
    coordinates.textContent = `Coordinates: ${park.Coordinates}`;
    cardBody.appendChild(coordinates);
  }

  if (park.Visit) {
    const visit = document.createElement("a");
    visit.className = "card-text";
    visit.href = park.Visit;
    visit.textContent = `Visit Website`;
    cardBody.appendChild(visit);
  }

  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
};

window.onload = function () {
  loadLocations();
  loadParkTypes();
};

window.onchange = function () {
  searchByRadio();
};

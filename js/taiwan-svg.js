const group = document.querySelectorAll("g");
const polygon = document.querySelectorAll("polygon");
const path = document.querySelectorAll("path");
console.table("Paths:", path);
console.table("Polygon:", polygon);
console.table("Groups:", group);

function handleClickCitiesEvent(citiesBlocks) {
  citiesBlocks.forEach((city) => {
    city.addEventListener("click", function (e) {
      console.log("User clicked :", e.target.id, "city");
      switchStatusOfCities(city);
    });
  });
}

function switchStatusOfCities(nextActiveCity) {
  const lastActiveCity = document.querySelector(".city__active");
  console.log("Current active city name:", lastActiveCity.id);
  lastActiveCity.classList.remove("city__active");
  console.log("Removed class name 'city__active' from current city");
  nextActiveCity.classList.add("city__active");
  console.log("Now current active city is", nextActiveCity.id);
}

handleClickCitiesEvent(group);
handleClickCitiesEvent(polygon);
handleClickCitiesEvent(path);

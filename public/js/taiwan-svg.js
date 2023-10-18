const TaiwanSVG = document.querySelector("#svg2606");
const group = TaiwanSVG.querySelectorAll("g");
const polygon = TaiwanSVG.querySelectorAll("polygon");
const path = TaiwanSVG.querySelectorAll("path");

window.onload = initToGetTaipeiData;

function initToGetTaipeiData() {
  getClickedCityData("臺北市");
  handleClickCitiesEvent(group);
  handleClickCitiesEvent(polygon);
  handleClickCitiesEvent(path);
}

function handleClickCitiesEvent(citiesBlocks) {
  citiesBlocks.forEach((city) => {
    city.addEventListener("click", function (e) {
      switchStatusOfCities(city);
      if (e.target.id) {
        console.log("User clicked :", e.target.id);
        getClickedCityData(city.id);
      } else {
        console.log("User clicked :", e.target.parentNode.id);
        getClickedCityData(city.parentNode.id);
      }
    });
  });
}

function switchStatusOfCities(nextActiveCity) {
  const lastActiveCity = document.querySelector(".city__active");
  lastActiveCity.classList.remove("city__active");
  nextActiveCity.classList.add("city__active");
}

async function getClickedCityData(clickedCityName) {
  const chinesePattern = /[\u4e00-\u9fa5]/;
  if (chinesePattern.test(clickedCityName)) {
    const cityData = await countryData(clickedCityName);
    console.log(`Katlyn : ${clickedCityName}'s weather data :`);
    console.table(cityData);
  }
  return;
}

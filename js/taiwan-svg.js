const TaiwanSVG = document.querySelector("#svg2606");
const group = TaiwanSVG.querySelectorAll("g");
const polygon = TaiwanSVG.querySelectorAll("polygon");
const path = TaiwanSVG.querySelectorAll("path");
const formCitySelect = document.querySelector("#citySelect");

const today = new Date();
const day = today.getDay() - 1;
const date = today.getDate();
let mobileDayCount = 0;

window.onload = initToGetTaipeiData;
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function initToGetTaipeiData() {
  handleClickCitiesEvent(group);
  handleClickCitiesEvent(polygon);
  handleClickCitiesEvent(path);
  getClickedCityData("臺北市");
  handleSelectCity();
  handleCarousel();
  const currentMonthElement = document.querySelector("#current-month");
  currentMonthElement.textContent = months[today.getMonth()];
  const currentDayElement = document.querySelector("#current-day");
  currentDayElement.textContent = `${days[day]}, `;
  document.querySelector("#current-date").textContent = date;
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

function handleSelectCity() {
  formCitySelect.addEventListener("change", function () {
    getClickedCityData(formCitySelect.value);
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
    renderCurrentCityDetails(
      cityData["T"][day],
      cityData["Wx"][day],
      cityData["WxValue"][day],
      cityData["MaxT"][day],
      cityData["MinT"][day],
      cityData["PoP12h"][day],
      clickedCityName
    );
    renderCurrentCityWeeksInfos(cityData["T"], cityData["WxValue"]);
    return cityData;
  }
  return;
}

function renderCurrentCityDetails(
  temperature,
  wxDescription,
  wxValue,
  MaxT,
  MinT,
  PoP12h,
  cityName
) {
  document.querySelector("#current-city-name").textContent = cityName;
  document.querySelector("#current-city-temperature").textContent =
    temperature + "°";
  document.querySelector("#wx").textContent = wxDescription;
  document.querySelector("#WxValue").textContent = wxValue;
  document.querySelector("#MaxT").textContent = MaxT + "°";
  document.querySelector("#MinT").textContent = MinT + "°";
  document.querySelector("#PoP12h").textContent = PoP12h;
  const iconElement = document.querySelector("#current-day-icon");
  setWeatherIcon(iconElement, wxValue);
}

function renderCurrentCityWeeksInfos(weeksAverageTemperature, WxValue) {
  days.forEach((day, i) => {
    const currentDay = document.querySelector(`#${day}`);
    const currentDayImgElement = currentDay.querySelector(".icon-weather");
    const currentWxValue = Number(WxValue[i]);
    currentDay.querySelector(
      ".week_T"
    ).textContent = `${weeksAverageTemperature[i]}°`;
    setWeatherIcon(currentDayImgElement, currentWxValue);
  });
}

function setWeatherIcon(currentDayImgElement, currentWxValue) {
  if (currentWxValue > 1 && currentWxValue <= 3) {
    currentDayImgElement.setAttribute("src", "../images/cloudy-and-sunny.png");
  } else if (currentWxValue > 3 && currentWxValue <= 7) {
    currentDayImgElement.setAttribute("src", "../images/cloudy-2.png");
  } else if (currentWxValue > 7) {
    currentDayImgElement.setAttribute("src", "../images/rainy.png");
  } else {
    currentDayImgElement.setAttribute("src", "../images/sunny_day.png");
  }
}

function handleCarousel() {
  const dayList = document.querySelectorAll(".week");
  const btns = document.querySelectorAll(".btn-outer");
  btns.forEach((el) => {
    el.addEventListener("click", function (e) {
      console.log(el.id);
      if (el.id === "btn-previous") {
        if (mobileDayCount <= 0) {
          mobileDayCount = 6;
        } else {
          mobileDayCount -= 1;
        }
      } else {
        if (mobileDayCount >= 6) {
          mobileDayCount = 0;
        } else {
          mobileDayCount += 1;
        }
      }
      const currentDay = document.querySelector(".active-day");
      currentDay.classList.remove("active-day");
      dayList[mobileDayCount].classList.add("active-day");
    });
  });
}

const group = document.querySelectorAll("g");
const polygon = document.querySelectorAll("polygon");
const path = document.querySelectorAll("path");
console.table("Paths:", path);
console.table("Polygon:", polygon);
console.table("Groups:", group);

function handleClickCitiesEvent(citiesBlocks) {
  citiesBlocks.forEach((city) => {
    city.addEventListener("click", function (e) {
      console.log(e.target.id);
    });
  });
}

handleClickCitiesEvent(group);
handleClickCitiesEvent(polygon);
handleClickCitiesEvent(path);

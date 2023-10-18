const country = "臺北市";
const CWB_API_KEY = "CWA-26B39C5D-83DA-4330-A10E-F13F446664FF";
async function fetchAPI() {
  const response = await fetch(
    "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=" + CWB_API_KEY);
  const data = await response.json();
  const countries = data.records.locations[0].location;
  const result = {};
  countries.forEach((country) => {
    let countryName = country.locationName;
    result[countryName] = {};
    result[countryName]["WxValue"] = [];
    let weatherFactor = country.weatherElement;

    let hour = parseInt(
      new Date(weatherFactor[0].time[0].startTime).getHours()
    );

    weatherFactor.forEach((factor) => {
      let index = 0;
      if (hour >= 18) {
        index = 1;
      }

      let factorName = factor.elementName;
      result[countryName][factorName] = [];
      for (let i = 0; i < 7; i++) {
        if (factor.elementName === "UVI") {
          index = i;
        }
        if (factor.elementName === "Wx") {
          result[countryName]["WxValue"].push(
            factor.time[index].elementValue[1].value
          );
        }

        let text = factor.time[index].elementValue[0].value;
        if (text === " ") {
          text = "0";
        }
        result[countryName][factorName].push(text)
        index += 2;
      }
    });
  });
  console.log(`===============result==================== `);
  console.log(result);

  return result;
}

async function countryData(country) {
  const result = {}
  const data = await Data;
  result["MaxT"] = data[country]["MaxT"];
  result["MinT"] = data[country]["MinT"];
  result["PoP12h"] = data[country]["PoP12h"];
  result["Wx"] = data[country]["Wx"];
  result["WxValue"] = data[country]["WxValue"];
  console.log(`顯示單一城市：`);
  console.log(result);
  return result;
}

const Data = fetchAPI();
console.log("data:");
// countryData(country);

//botMessage
function DiscordMessage(){
  countryData(country).then(source => {
      let headers = {
          "Content-Type": "application/json"
      }

      fetch("/api/message",{
          method: "POST",
          headers: headers,
          body: JSON.stringify(source)
      }).then(response => response.json()).then(data => {
          console.log(data)
      }).catch(error => {
          console.log(error)
      })
  });
}
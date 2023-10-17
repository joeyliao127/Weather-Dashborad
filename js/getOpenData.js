const country = "臺北市"
const CWB_API_KEY = 'CWA-26B39C5D-83DA-4330-A10E-F13F446664FF';

fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=" + CWB_API_KEY).then((response) => {
  return response.json();
}).then((data) => {
  const countries = data.records.locations[0].location;
  let now_hour = new Date().toLocaleString('zh-TW', {
    hour: 'numeric',
    hour12: false
  });
  now_hour = parseInt(now_hour.replace('時', ''))

  countries.forEach(element => {
    if (element.locationName === country) {
      console.log(element.locationName)

      let weather = element.weatherElement;
      weather.forEach(item => {

        console.log("欄位：" + item.description)
        console.log("class：" + item.elementName)

        let index = 0;
        if (now_hour >= 18) {
          index = 1;
        }

        for (let i = 0; i < 7; i++) {
          if (item.elementName === "UVI") { index = i; }

          console.log(item.time[index].startTime)

          let details = item.time[index].elementValue
          details.forEach(d => {

            console.log("值：" + d.value)
            console.log("單位：" + d.measures)

          })
          index += 2;
        }
        console.log("----------------------")
      })
    }
  });

  // renderRaining(0);
});
let citySearch = document.querySelector('city-search');
let input = document.querySelector('input');
let btn = document.querySelector('button');
let selectedCity = document.querySelector('.searches');
let vLine = document.querySelector('hr');
let cityName = document.querySelector('.city-name');
let genCityInfo = document.querySelector('.city-spacifics');
let cityTemp = document.querySelector('.temp');
let cityWind = document.querySelector('.wind');
let cityHumidity = document.querySelector('.humidity');
let dayforCast = document.querySelector('h3');
//day1
let cityDate1 = document.querySelector('.city-date1');
let forcastPic1 = document.querySelector('.forcast-pic1');
let temp1 = document.querySelector('.temp1');
let wind1 = document.querySelector('.wind1');
let humidity1 = document.querySelector('.humidity1');
//day2
let cityDate2 = document.querySelector('.city-date2');
let forcastPic2 = document.querySelector('.forcast-pic2');
let temp2 = document.querySelector('.temp2');
let wind2 = document.querySelector('.wind2');
let humidity2 = document.querySelector('.humidity2');
//day3
let cityDate3 = document.querySelector('.city-date3');
let forcastPic3 = document.querySelector('.forcast-pic3');
let temp3 = document.querySelector('.temp3');
let wind3 = document.querySelector('.wind3');
let humidity3 = document.querySelector('.humidity3');
//day4
let cityDate4 = document.querySelector('.city-date4');
let forcastPic4 = document.querySelector('.forcast-pic4');
let temp4 = document.querySelector('.temp4');
let wind4 = document.querySelector('.wind4');
let humidity4 = document.querySelector('.humidity4');
//day5
let cityDate5 = document.querySelector('.city-date5');
let forcastPic5 = document.querySelector('.forcast-pic5');
let temp5 = document.querySelector('.temp5');
let wind5 = document.querySelector('.wind5');
let humidity5 = document.querySelector('.humidity5');

let lon = 0;
let lat = 0;
// Get current date
let currentDate = dayjs();

let formDate = currentDate.format('MM-DD-YYYY');

// Create a Moment object for the current date and time
var currentDate2 = moment();

// Format the current date
var formattedDate = currentDate2.format('YYYY-MM-DD');

// Output the formatted date
console.log('Current Date:', formattedDate);

kelven = function kelvin(kel) {
  let fer = (kel - 273.15) * (9 / 5) + 32;
  return fer;
};

let apiKey = '2ea3de401fcebeccbaaf9bc35590c4bc';
function getApi() {
  let api =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    input.value +
    '&appid=' +
    apiKey;

  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let cityT = kelven(data.main.temp);
      console.log(data);
      cityName.prepend(data.name + ' (' + formDate + ')');
      cityTemp.prepend(cityT.toFixed(2) + ' F');
      cityWind.prepend(data.wind.speed + ' mph');
      cityHumidity.prepend(data.main.humidity + ' g/kg');

      const newDiv = document.createElement('div');
      // newDiv.textContent = data.name;
      // newDiv.classList.add('searches');
      // citySearch.appendChild(newDiv);
    });

  let apiLonLat =
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
    input.value +
    '&limit=5&appid=2ea3de401fcebeccbaaf9bc35590c4bc';

  fetch(apiLonLat)
    .then(function (response) {
      return response.json();
    })
    .then(function (longLatData) {
      lon = longLatData[0].lat;
      lat = longLatData[0].lat;

      let apiFiveDay =
        'http://api.openweathermap.org/data/2.5/forecast?lat=' +
        lat +
        '&lon=' +
        lon +
        '&appid=' +
        apiKey;

      fetch(apiFiveDay)
        .then(function (response) {
          console.log(lon);
          console.log(lat);
          return response.json();
        })
        .then(function (daysForcast) {
          //Day1
          let day1 = daysForcast.list[0].dt_txt;
          let currentDate3 = moment();
          let day1Temp = kelven(daysForcast.list[0].main.temp);
          day1 = currentDate3.format('MM-DD-YYYY');
          cityDate1.prepend(day1);
          temp1.prepend(day1Temp.toFixed(2) + ' F');
          wind1.prepend(daysForcast.list[0].wind.speed + ' mph');
          humidity1.prepend(daysForcast.list[0].main.humidity + ' g/kg');
          //Day2
          let day2 = daysForcast.list[8].dt_txt;
          let day2Temp = kelven(daysForcast.list[8].main.temp);
          day2 = currentDate3.format('MM-DD-YYYY');
          cityDate2.prepend(day2);
          temp2.prepend(day2Temp.toFixed(2) + ' F');
          wind2.prepend(daysForcast.list[8].wind.speed + ' mph');
          humidity2.prepend(daysForcast.list[8].main.humidity + ' g/kg');
          //Day3
          let day3 = daysForcast.list[16].dt_txt;
          let day3Temp = kelven(daysForcast.list[16].main.temp);
          day3 = currentDate3.format('MM-DD-YYYY');
          cityDate3.prepend(day3);
          temp3.prepend(day3Temp.toFixed(2) + ' F');
          wind3.prepend(daysForcast.list[16].wind.speed + ' mph');
          humidity3.prepend(daysForcast.list[16].main.humidity + ' g/kg');
          //Day4
          let day4 = daysForcast.list[24].dt_txt;
          let day4Temp = kelven(daysForcast.list[24].main.temp);
          day4 = currentDate3.format('MM-DD-YYYY');
          cityDate4.prepend(day4);
          temp4.prepend(day4Temp.toFixed(2) + ' F');
          wind4.prepend(daysForcast.list[24].wind.speed + ' mph');
          humidity4.prepend(daysForcast.list[24].main.humidity + ' g/kg');
          //Day5
          let day5 = daysForcast.list[32].dt_txt;
          let day5Temp = kelven(daysForcast.list[32].main.temp);
          day5 = currentDate3.format('MM-DD-YYYY');
          cityDate5.prepend(day5);
          temp5.prepend(day5Temp.toFixed(2) + ' F');
          wind5.prepend(daysForcast.list[32].wind.speed + ' mph');
          humidity5.prepend(daysForcast.list[32].main.humidity + ' g/kg');
        });
    });
}

btn.addEventListener('click', getApi);

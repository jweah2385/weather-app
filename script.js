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
let clearBtn = document.querySelector('#clear');
let section3 = document.querySelector('.each-day-temp');
let section2 = document.querySelector('.parentOfSec');
let firstPic = document.querySelector('.firstPic');
let savedData = document.querySelector('.data-save');
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
let firstIcon = '';
let icon1 = '';
let icon2 = '';
let icon3 = '';
let icon4 = '';
let icon5 = '';
let lon = 0;
let lat = 0;
// Get current date
let currentDate = dayjs();

let formDate = currentDate.format('MM-DD-YYYY');

// Create a Moment object for the current date and time
let currentDate2 = moment();
let currentDate3 = moment();

// Format the current date
var formattedDate = currentDate2.format('YYYY-MM-DD');

//Converts K to F
kelven = function kelvin(kel) {
  let fer = (kel - 273.15) * (9 / 5) + 32;
  return fer;
};

//Clears the div
function clear() {
  let childDivs = section3.querySelectorAll('.day-temp');
  let childDivs2 = section2.querySelectorAll('.sec2child');
  for (let i = 0; i < childDivs.length; i++) {
    let children = childDivs[i].children;
    for (let i = 0; i < children.length; i++) {
      children[i].innerHTML = '';
      children[i].src = '';
    }
  }
  for (let i = 0; i < childDivs2.length; i++) {
    let children2 = childDivs2[i].children;
    for (let i = 0; i < children2.length; i++) {
      children2[i].innerHTML = '';
      firstPic.src = '';
    }
  }
  cityName.innerHTML = '';
}

//Fetches information from openweather api
let apiKey = '2ea3de401fcebeccbaaf9bc35590c4bc';
function getApi() {
  clear();
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
      firstPic.classList.remove('nodisplay');
      let cityT = kelven(data.main.temp);
      let firstIconforApi = data.weather[0].icon;

      let firstIconUrl =
        'https://openweathermap.org/img/wn/' + firstIconforApi + '.png';
      firstPic.src = firstIconUrl;

      cityName.prepend(data.name + ' (' + formDate + ')');
      cityTemp.prepend('Temp: ' + cityT.toFixed(2) + ' F');
      cityWind.prepend('Wind: ' + data.wind.speed + ' mph');
      cityHumidity.prepend('Humidity: ' + data.main.humidity + ' %');
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
          return response.json();
        })
        .then(function (daysForcast) {
          //Inserting temp, wind, humidity icon and date into div
          //Day1
          let day1 = daysForcast.list[2].dt_txt;
          let day1Temp = kelven(daysForcast.list[2].main.temp);
          let day1Date = currentDate3.add(1, 'days').format('MM-DD-YYYY');
          let weatherpic1 = forcastPic1.prepend();
          icon1 = daysForcast.list[2].weather[0].icon;
          let icon1Url1 = 'https://openweathermap.org/img/wn/' + icon1 + '.png';
          forcastPic1.src = icon1Url1;
          cityDate1.prepend(day1Date);
          temp1.prepend('Temp: ' + day1Temp.toFixed(2) + ' F');
          wind1.prepend('Wind: ' + daysForcast.list[2].wind.speed + ' mph');
          humidity1.prepend(
            'Humidity: ' + daysForcast.list[2].main.humidity + ' %'
          );

          //Day2
          let day2 = daysForcast.list[10].dt_txt;
          let day2Temp = kelven(daysForcast.list[10].main.temp);
          let day2Date = currentDate3.add(1, 'days').format('MM-DD-YYYY');
          icon2 = daysForcast.list[10].weather[0].icon;
          let icon1Url2 = 'https://openweathermap.org/img/wn/' + icon2 + '.png';
          forcastPic2.src = icon1Url2;
          cityDate2.prepend(day2Date);
          temp2.prepend('Temp: ' + day2Temp.toFixed(2) + ' F');
          wind2.prepend('Wind: ' + daysForcast.list[10].wind.speed + ' mph');
          humidity2.prepend(
            'Humidity: ' + daysForcast.list[10].main.humidity + ' %'
          );

          //Day3
          let day3 = daysForcast.list[18].dt_txt;
          let day3Temp = kelven(daysForcast.list[18].main.temp);
          let day3Date = currentDate3.add(1, 'days').format('MM-DD-YYYY');
          icon3 = daysForcast.list[18].weather[0].icon;
          let icon1Url3 = 'https://openweathermap.org/img/wn/' + icon3 + '.png';
          forcastPic3.src = icon1Url3;
          cityDate3.prepend(day3Date);
          temp3.prepend('Temp: ' + day3Temp.toFixed(2) + ' F');
          wind3.prepend('Wind: ' + daysForcast.list[18].wind.speed + ' mph');
          humidity3.prepend(
            'Humidity: ' + daysForcast.list[18].main.humidity + ' %'
          );

          //Day4
          let day4 = daysForcast.list[26].dt_txt;
          let day4Temp = kelven(daysForcast.list[26].main.temp);
          let day4Date = currentDate3.add(1, 'days').format('MM-DD-YYYY');
          icon4 = daysForcast.list[26].weather[0].icon;
          let icon1Url4 = 'https://openweathermap.org/img/wn/' + icon4 + '.png';
          forcastPic4.src = icon1Url4;
          cityDate4.prepend(day4Date);
          temp4.prepend('Temp: ' + day4Temp.toFixed(2) + ' F');
          wind4.prepend('Wind: ' + daysForcast.list[26].wind.speed + ' mph');
          humidity4.prepend(
            'Humidity: ' + daysForcast.list[26].main.humidity + ' %'
          );

          //Day5
          let day5 = daysForcast.list[34].dt_txt;
          let day5Temp = kelven(daysForcast.list[34].main.temp);
          let day5Date = currentDate3.add(1, 'days').format('MM-DD-YYYY');
          icon5 = daysForcast.list[34].weather[0].icon;
          cityDate5.prepend(day5Date);
          let icon1Url5 = 'https://openweathermap.org/img/wn/' + icon5 + '.png';
          forcastPic5.src = icon1Url5;
          temp5.prepend('Temp: ' + day5Temp.toFixed(2) + ' F');
          wind5.prepend('Wind: ' + daysForcast.list[34].wind.speed + ' mph');
          humidity5.prepend(
            'Humidity: ' + daysForcast.list[34].main.humidity + ' %'
          );
          save();
        });
    });
}

btn.addEventListener('click', getApi);
clearBtn.addEventListener('click', clear);

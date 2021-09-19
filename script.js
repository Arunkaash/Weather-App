const curDate = document.getElementById('date');

let weathercon = document.getElementById("weatherCondition");
const tempStatus = "clouds"; //for weather condition changement

const getCurrentDay = ()=>{
    var weekday = new Array();
    {
        weekday[0]="Sun";
        weekday[1]="Mon";
        weekday[2]="Tue";
        weekday[3]="Wed";
        weekday[4]="Thu";
        weekday[5]="Fri";
        weekday[6]="Sat";
    }
    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];
    return day;
}
const getCurrentTime = () =>{
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var now = new Date();
    var month = months[now.getMonth()+1];
    var date = now.getDate();

    let hours = now.getHours();
    let mins = now.getMinutes();

    let period = "AM";
    if (hours>11){
        period ="PM";
        if(hours >12) hours -=12;
    }
    
    if(mins< 10){
        mins = "0" + mins;
    }
    return `${month} ${date} | ${hours}:${mins} ${period}`;
}
curDate.innerHTML= getCurrentDay() +" | " +getCurrentTime();
//  console.log(curDate.value);
// #########################################################################

// 57720d11b2fcb156eeb5937cf8d807db
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

const weatherApi = {
    key: "57720d11b2fcb156eeb5937cf8d807db",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

let searchInputBox = document.getElementById('enterCity');

// event Listner on Keypress
searchInputBox.addEventListener('keypress', (event) =>{
    if(event.keyCode ==13)
    {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
    }
});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    // city
    let city = document.getElementById('locationcity');
    city.innerHTML = `<i id="sun" class="fas fa-map-marker-alt"></i>${weather.name} ${weather.sys.country}`;

    // temp
    let temp = document.getElementById('temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg; C`;

    // min and max temp
    let minmaxtemp = document.getElementById('minmaxtemp');
    minmaxtemp.innerHTML = `Min ${Math.round(weather.main.temp_min)}&deg; C | Max ${Math.round(weather.main.temp_max)}&deg; C`;

    //weather Type
    let weatherType = document.getElementById("weatherType");
        weatherType.innerText = `${weather.weather[0].main}`;

    // weather icon and image
     if(weatherType.textContent == 'Clear') {
            document.getElementById('weatherCondition').innerHTML =`<i class="fas fa-sun fa-4x" style="color: #ffb142;"></i>`;
            document.getElementById('body').style.backgroundImage = "url('./images/clear.jpg')";
     }
     else if(weatherType.textContent == 'Haze') {
            document.getElementById('weatherCondition').innerHTML = `<i class="fas fa-smog fa-4x" style="color: #ebebeb;"></i>`;
            document.getElementById('body').style.backgroundImage = "url('./images/haze.jpg')";
         } 
     else if(weatherType.textContent == 'Clouds') {
            document.getElementById('weatherCondition').innerHTML = `<i class="fas fa-cloud fa-4x" style="color: #d3d3d3;"></i>`;
            document.getElementById('body').style.backgroundImage = "url('./images/clouds.jpg')";
         } 
     else if(weatherType.textContent == 'Rain') {
            document.getElementById('weatherCondition').innerHTML = `<i class="fas fa-cloud-showers-heavy fa-4x" style="color: #36a4e4;"></i>`;
            document.getElementById('body').style.backgroundImage = "url('./images/rain.jpg')";
         } 
     else if(weatherType.textContent == 'Snow') {
            document.getElementById('weatherCondition').innerHTML = `<i class="fas fa-snowflake fa-4x"style="color: white;"></i>`;
            document.getElementById('body').style.backgroundImage = "url('./images/snow.jpg')";
         } 
     else if(weatherType.textContent == 'Thunderstorm') {
            document.getElementById('weatherCondition').innerHTML = `<i class="fab fa-cloudflare fa-4x" style="color: #014b75;"></i>`;
            document.getElementById('body').style.backgroundImage = "url('./images/thunderstrome.jpg')";
         } 
            
    }    

 

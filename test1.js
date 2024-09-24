import { arr, div, dataText } from './src/js/constans.js';
import { oneImageShow } from './src/js/getImage.js';
import { getHour, getDay, getMonth } from './src/js/getClock.js';
const API = `2aecb4465f352bc5a3a9145663c40cbd`;
const coordinates = document.querySelector('#coordinates');
const myCoordinates = document.querySelector('#My-coordinates_p');
const myCityTemp = document.querySelector('#myCity-temp_li');
const apiUrl =
    'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en';
const myCity = document.querySelector('#block-myCity_div');
const textErr = document.querySelector('.text-err_p');
const textErrmyCity = document.querySelector('.text-err-myCity_p');
function fn() {
    div.style.backgroundImage = `url("${oneImageShow(arr)}")`;
    div.style.padding = '1.25rem';

    setTimeout(getHour(), 1000);

    const p = document.createElement('p');
    dataText.appendChild(p);
    p.textContent = `${getDay()}, ${getMonth()}`;
    const input = document.querySelector('#input');
    const btn = document.addEventListener('click', () => {
        const town = input.value.trim();
        if (town !== '') {
            getLocationsCity(town);
            localStorage.setItem('test', town);
        }
    });
    async function getLocationsCity(town) {
        try {
            const res = await fetch(`${apiUrl}&q=${town}&appid=${API}`);
            if (!res.ok) {
                throw new Error('Ошибка запроса');
            }
            const data = await res.json();

            document.querySelector(
                '.city'
            ).textContent = `Погода в городе${' '}${data.name}`;

            document.querySelector(
                '.temp'
            ).textContent = `Температура ${Math.round(
                data.main.temp
            )} градусов`;

            document.querySelector(
                '.descript'
            ).textContent = `Облочность -  ${data.weather[0]['description']}`;

            return [data.name, data.main.temp, data.weather[0]['description']];
        } catch (err) {
            textErr.textContent = `${err}`;
        }
    }

    async function success(position) {
        try {
            const pos = position.coords;

            myCity.style.display = 'block';
            let lon = pos.longitude;
            let lat = pos.latitude;
            myCoordinates.innerHTML = `Ваши координаты - долгота: ${
                ~~(lon * 100) / 100
            }, широта ${~~(lat * 100) / 100}`;
            let apiUrlCity = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API}`;
            console.log(apiUrlCity);
            const res = await fetch(`${apiUrlCity}`);
            if (!res.ok) {
                throw new Error('Ошибка запроса');
            }

            const data = await res.json();

            let myCityData = data.map((item) => item.name);
            console.log(myCityData);
            document.querySelector(
                '.myCity_li'
            ).textContent = `Ваш город - ${' '}${data.map(
                (item) => item.name
            )}`;
            const response = await fetch(
                `${apiUrl}&q=${myCityData}&appid=${API}`
            );
            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }
            const city = await response.json();

            document.querySelector(
                '.myCity-temp_li'
            ).textContent = `Температура ${Math.round(
                city.main.temp
            )} градусов`;

            document.querySelector(
                '.myCity-descript_li'
            ).textContent = `Облочность- ${city.weather[0]['description']}`;

            return [city.name];
        } catch (err) {
            textErrmyCity.textContent = `${err}`;
        }
    }

    window.addEventListener('load', getLocations);
    function getLocations() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
        } else {
            alert('Пожалуйста, включите геолокацию на вашем устройстве');
        }
    }
}

document.addEventListener('DOMContentLoaded', fn);

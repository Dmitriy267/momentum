import { data, hour } from './constans.js';
export function getHour() {
    const date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    if (ss < 10) ss = '0' + ss;
    hour.innerHTML = hh + ':' + mm + ':' + ss;
    setTimeout(getHour, 1000);
}
export function getDay() {
    const options = {
        day: 'numeric',
        month: 'long',
    };
    let days = data.toLocaleDateString('ru-Ru', options);

    return days;
}

export function getMonth() {
    const options = {
        weekday: 'long',
    };
    let weekday = data.toLocaleDateString('ru-Ru', options);

    return weekday;
}

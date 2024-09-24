import { data } from './constans.js';
export function oneImageShow(arr) {
    let hour = data.getHours();

    let result = [];

    if (hour >= 0 && hour < 6) {
        result = arr.slice(0, 1);
    }
    if (hour >= 6 && hour < 12) {
        result = arr.slice(1, 2);
    }
    if (hour >= 12 && hour < 18) {
        result = arr.slice(2, 3);
    }
    if (hour >= 18 && hour < 0) {
        result = arr.slice(3, 4);
    }

    return result.join();
}

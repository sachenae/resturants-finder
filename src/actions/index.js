import axios from 'axios';

const API_KEY ="b9963445d60cb2e5fdcc39af32367ef1";
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city, country) {
    const url = `${ROOT_URL}&q=${city},${country}`;
    const request = axios.get(url);

   

    return {
        type: FETCH_WEATHER,
        payload: request
    }
}

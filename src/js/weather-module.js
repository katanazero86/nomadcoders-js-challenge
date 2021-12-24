const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = '9292233a78e0ccd650151d87f51f5133';
export const OPEN_WEATHER_ICONS_BASE_URL = 'http://openweathermap.org/img/wn';

export const findCurrentWeatherByGeographicCoordinates = ({lat, lon}) => {
    return fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`, {
        method: 'get',
        cache: 'no-cache'
    });
}
import localStorageModule from './localstorage-module.js';
import randomImage from './random-image.js';
import {getCurrentPosition, checkGeolocationSupport, handleGeolocationError} from './geo-location.js';
import {OPEN_WEATHER_ICONS_BASE_URL, findCurrentWeatherByGeographicCoordinates} from './weather-module.js';

const quotes = [
    'It is kind of fun to do the impossible. — Walt Disney',
    'There are better starters than me but I’m a strong finisher. — Usain Bolt',
    'Tough times never last, but tough people do. — Robert H. Schuller',
    'I’ve failed over and over and over again in my life and that is why I succeed. – Michael Jordan',
    'If you don’t get out of the box you’ve been raised in, you won’t understand how much bigger the world is. – Angelina Jolie',
    'But I know, somehow, that only when it is dark enough can you see the stars. ― Martin Luther King, Jr',
    'Grind Hard, Shine Hard. – Dwayne Johnson',
    'I didn’t get there by wishing for it or hoping for it, but by working for it.  – Estée Lauder',
];

const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * 8)];
};

// join
const handleJoinClick = () => {
    const userNameInputEl = document.getElementById('user-name');
    if (userNameInputEl.value.trim() === '') {
        alert('이름을 입력해주세요!');
        userNameInputEl.focus();
        return false;
    }
    localStorageModule.setUserName(userNameInputEl.value.trim());
    joinApp();
};
const joinBtnEl = document.getElementById('join-btn');
joinBtnEl.addEventListener('click', handleJoinClick);

const handleUserNameInput = e => {
    if (e.keyCode === 13) {
        handleJoinClick();
    }
};
const userNameInputEl = document.getElementById('user-name');
userNameInputEl.addEventListener('keyup', handleUserNameInput);

// todo
const handleAddTodoClick = () => {
    const todoInputEl = document.getElementById('todo-input');
    if (todoInputEl.value.trim() === '') {
        alert('TODO 를 입력해주세요!');
        todoInputEl.focus();
        return false;
    }
    const todos = JSON.parse(localStorageModule.getTodoAll(localStorageModule.getUserName()));
    const targetTodo = {
        idx: 0,
        description: '',
        complete: false,
    };
    targetTodo.idx = todos.length > 0 ? parseInt(todos[todos.length - 1].idx) + 1 : 0;
    targetTodo.description = todoInputEl.value.trim();
    todos.push(targetTodo);
    localStorageModule.setTodo(localStorageModule.getUserName(), JSON.stringify(todos));

    const divEl = document.createElement('div');
    divEl.classList.add('todo-item');
    divEl.dataset.completeIdx = targetTodo.idx;
    const pEl = document.createElement('p');
    pEl.innerText = `${targetTodo.description}`
    pEl.dataset.completeIdx = targetTodo.idx;
    ;
    const imgEl = document.createElement('img');
    imgEl.src = './imgs/delete-forever.png';
    imgEl.alt = 'delete-forever';
    imgEl.dataset.deleteIdx = targetTodo.idx;
    divEl.appendChild(pEl);
    divEl.appendChild(imgEl);

    const appTodoEl = document.querySelector('.app__todo');
    appTodoEl.appendChild(divEl);

    todoInputEl.value = '';

};
const todoAddBtnEl = document.getElementById('todo-add-btn');
todoAddBtnEl.addEventListener('click', handleAddTodoClick);

const handleTodoInput = e => {
    if (e.keyCode === 13) {
        handleAddTodoClick();
    }
};
const todoInputEl = document.getElementById('todo-input');
todoInputEl.addEventListener('keyup', handleTodoInput);

const joinApp = async () => {

    const options = {
        dateStyle: 'medium',
        timeStyle: 'medium',
    };

    // real time clock
    const initClock = () => {
        const today = new Date();
        const clockString = new Intl.DateTimeFormat('ko-kr', options).format(today);
        const clockEl = document.getElementById('clock');
        clockEl.innerText = clockString;

    };
    initClock();
    setInterval(() => {
        initClock();
    }, 1000);

    // quote
    const initQuote = () => {
        const targetQuote = getRandomQuote();
        const quoteEl = document.getElementById('quote');
        quoteEl.innerText = targetQuote;
    };
    initQuote();

    // greeting
    const initGreeting = () => {
        const userName = localStorageModule.getUserName();
        const greetingEl = document.getElementById('greeting');
        greetingEl.innerText = `Hello ${userName}. Have a good day :)`;
    };
    initGreeting();

    const appLoginEl = document.querySelector('.app__login');
    appLoginEl.style.display = 'none';

    const randomImageResult = await randomImage.getRandomImage();
    if (randomImageResult.status === 200) {
        const waterDropWrapEl = document.querySelector('.water-drops-wrap');
        waterDropWrapEl.style.display = 'none';

        const appEl = document.querySelector('.app');
        appEl.style.backgroundImage = `url(${randomImageResult.url})`;
    }

    const appContentsEl = document.querySelector('.app__contents');
    appContentsEl.style.display = 'block';

    // todo
    const initTodo = () => {

        const appTodoEl = document.querySelector('.app__todo');
        appTodoEl.addEventListener('click', e => {
            e.stopPropagation();
            const targetEl = e.target;
            const deleteIdx = targetEl.dataset.deleteIdx !== undefined ? parseInt(targetEl.dataset.deleteIdx) : null;
            const completeIdx = targetEl.dataset.completeIdx !== undefined ? parseInt(targetEl.dataset.completeIdx) : null;

            const todos = JSON.parse(localStorageModule.getTodoAll(localStorageModule.getUserName()));

            // delete todo
            if (deleteIdx !== null) {
                const newTodos = todos.filter(todo => todo.idx !== deleteIdx)
                localStorageModule.setTodo(localStorageModule.getUserName(), JSON.stringify(newTodos));
                targetEl.parentNode.remove();
            }

            // complete todo
            if (completeIdx !== null) {
                const newTodos = todos.map(todo => {
                    if (todo.idx === completeIdx) {
                        todo.complete = !todo.complete;
                        return todo;
                    }
                    return todo;
                });
                localStorageModule.setTodo(localStorageModule.getUserName(), JSON.stringify(newTodos));
                targetEl.classList.toggle('todo-item--complete');
            }

        });

        const todos = JSON.parse(localStorageModule.getTodoAll(localStorageModule.getUserName()));
        const todoRender = targetTodos => {
            // todo render
            const fragment = new DocumentFragment();
            targetTodos.forEach(todo => {
                const divEl = document.createElement('div');
                divEl.classList.add('todo-item');
                divEl.dataset.completeIdx = todo.idx;
                if (todo.complete) divEl.classList.add('todo-item--complete');
                const pEl = document.createElement('p');
                pEl.innerText = `${todo.description}`
                pEl.dataset.completeIdx = todo.idx;
                ;
                const imgEl = document.createElement('img');
                imgEl.src = './imgs/delete-forever.png';
                imgEl.alt = 'delete-forever';
                imgEl.dataset.deleteIdx = todo.idx;
                divEl.appendChild(pEl);
                divEl.appendChild(imgEl);
                fragment.appendChild(divEl);
            });

            const appTodoEl = document.querySelector('.app__todo');
            appTodoEl.appendChild(fragment);
        };
        todoRender(todos);
    };
    initTodo();

    // location & weather
    const initGeoLocationAndWeather = () => {
        if (!checkGeolocationSupport()) {
            console.err('geolocation not supported');
            return false;
        }

        getCurrentPosition().then(async (position) => {
            const lat = position?.coords?.latitude;
            const lon = position?.coords?.longitude;
            const currentWeatherResult = await findCurrentWeatherByGeographicCoordinates({lat, lon});
            if (currentWeatherResult.status === 200) {
                currentWeatherResult.json().then(data => {
                    const currentWeather = {...data};
                    const renderWeatherHtml = `
            <header class="current-weather__header">
                <h2>
                    Weather in ${currentWeather.name}, ${currentWeather.sys.country}
                </h2>
                <div class="weather">
                    <figure>
                        <img src="${OPEN_WEATHER_ICONS_BASE_URL}/${currentWeather.weather[0].icon}@2x.png" width="100"
                             height="100"/>
                        <span class="weather-current-temperature">${(currentWeather.main.temp - 273.15).toFixed(1)} °C</span>
                    </figure>
                    <p>${currentWeather.weather[0].main}</p>
                </div>
            </header>
            <div class="current-weather__body">
                <div class="weather-item">
                    <p class="weather-item__title">풍향(Wind)</p>
                    <p class="weather-item__value">${currentWeather.wind.speed} m/s | ${currentWeather.wind.deg} deg</p>
                </div>
                <div class="weather-item">
                    <p class="weather-item__title">구름량(Cloudiness)</p>
                    <p class="weather-item__value">${currentWeather.clouds.all} %</p>
                </div>
                <div class="weather-item">
                    <p class="weather-item__title">압력(Pressure)</p>
                    <p class="weather-item__value">${currentWeather.main.pressure} hpa</p>
                </div>
                <div class="weather-item">
                    <p class="weather-item__title">습기(Humidity)</p>
                    <p class="weather-item__value">${currentWeather.main.humidity} %</p>
                </div>
                <div class="weather-item">
                    <p class="weather-item__title">지리 좌표(Geo coords)</p>
                    <p class="weather-item__value">[${currentWeather.coord.lat}, ${currentWeather.coord.lon}]</p>
                </div>
            </div>
    `;

                    const currentWeatherEl = document.querySelector('.current-weather');
                    currentWeatherEl.innerHTML = renderWeatherHtml;

                });
            }
        }).catch(error => {
            alert(handleGeolocationError(error));
            return false;
        });

    };
    initGeoLocationAndWeather();

};
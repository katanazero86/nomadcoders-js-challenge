import localStorageModule from './localstorage-module.js';
import randomImage from './random-image.js';

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

};
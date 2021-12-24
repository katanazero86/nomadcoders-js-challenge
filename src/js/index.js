// import {quotes} from "./quotes";


// components
console.log(document.getElementById('greeting'));
console.log(document.getElementById('quote'));
console.log(document.getElementById('clock'));
const greetingComponent = document.getElementById('greeting');
const quoteComponent = document.getElementById('clock');
const clockComponent = document.getElementById('quote');

const handleJoinClick = () => {
    console.log(document.getElementsByTagName('greeting-component'));
    console.log(document.getElementsByName('greeting-component'))
    const userNameInputEl = document.getElementById('user-name');
    if (userNameInputEl.value.trim() === '') {
        alert('이름을 입력해주세요!');
        userNameInputEl.focus();
        return false;
    }
    localStorage.setItem('userName', userNameInputEl.value.trim());
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


const options = {
    dateStyle: 'medium',
    timeStyle: 'medium',
};

// real time clock
const initClock = () => {
    const today = new Date();
    const clockString =  new Intl.DateTimeFormat('ko-kr', options).format(today);
    const clockEl = document.getElementById('clock');
    clockEl.setAttribute('time', clockString);

};
initClock();
setInterval(() => {
    initClock();
}, 1000);

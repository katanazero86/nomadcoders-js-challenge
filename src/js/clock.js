const CLOCK_ELEMENT_SELECTOR = '.app__clock';
const CLOCK_INTERVAL = 1000;

const targetEl = document.querySelector(CLOCK_ELEMENT_SELECTOR);
const initClock = () => {
    const date = new Date();
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    if(targetEl) targetEl.innerText = `${hour} : ${minutes} : ${seconds}`;

};
initClock();
setInterval(() => {
    initClock();
}, CLOCK_INTERVAL);

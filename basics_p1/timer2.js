// set interval to intermittently report

// constants
const waitTime = 3000;
const waitInterval = 500;
let currentTIme = 0;

// increments current time 
const incTime = () => {
    currentTIme +=waitInterval;
    console.log(`waiting ${currentTIme/1000} seconds`);
};

// logs wait time
console.log(`Setting a  ${waitTime/1000} wait time. `);

// logs output
const timerComplete = () => { 
    clearInterval(interval)
    console.log('Done!');}

// returned interval is a special object
const interval = setInterval(incTime,waitInterval);
setTimeout(timerComplete,waitTime);


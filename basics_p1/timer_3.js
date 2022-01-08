// Wait time as percetnage 

// constants
const waitTime = 5000;
const waitInterval = 500;
let currentTIme = 0;

// increments current time 
const incTime = () => {
    currentTIme +=waitInterval;
    // percentage
    const p = Math.floor((currentTIme/waitTime)*100);

    process.stdout.clearLine();// removes last line from terminal
    process.stdout.cursorTo(0); // moves cursor to start of line 
    process.stdout.write(`waiting ... ${p} %`);
};

// logs wait time
console.log(`Setting a  ${waitTime/1000} wait time. `);

// logs output
const timerComplete = () => { 
    clearInterval(interval)
    process.stdout.clearLine(); // clear
    process.stdout.cursorTo(0); // stay on same line
    console.log('Done!');}

// calls periodically each weaitinterval
const interval = setInterval(incTime,waitInterval);
// calls once, when time is reached
setTimeout(timerComplete,waitTime);


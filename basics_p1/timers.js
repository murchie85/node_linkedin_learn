// set timeout
const waitTime = 3000;

console.log(`Setting a  ${waitTime/1000} wait time. `);

const timerComplete = () => console.log('Done!');

// calls timerComplete once waitTime reached
setTimeout(timerComplete,waitTime);


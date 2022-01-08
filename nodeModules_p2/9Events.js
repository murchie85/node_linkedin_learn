const events = require("events");

// CONSTRUCT
const emitter  = new events.EventEmitter();

// HANDLE
emitter.on("CustomEvent", (message,user)=>{
    console.log(`${user}:${message}`);
});


// IMPLEMENT
// 1st is event type, "Raise" custome event
// next 2 parms are Parms we pass to it
emitter.emit("CustomEvent", "Hello world", "Computer");
emitter.emit("CustomEvent", "This event is raised when we want", "Adam")
emitter.emit("CustomEvent", "Please input your message, press exit to exit", "Adam")

// IMPLEMENT
// Or we could simply listen to terminal input
process.stdin.on('data',data=>{
    const input = data.toString().trim();

    if(input ==="exit"){
        emitter.emit("CustomEvent",'goodbye','process')
        process.exit()
    }

    emitter.emit("CustomEvent", input, "terminal");
})
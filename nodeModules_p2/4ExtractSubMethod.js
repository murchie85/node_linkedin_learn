const path = require("path");
const { log } = require("util"); // only extracting log method


log(path.basename(__filename));

log( " ^ The name of the current file. ");

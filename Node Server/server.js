/*
 *  Server/Rest API is hosted here, ready my dude?
 */
const ip = "127.0.0.1";
const port = 44844;

var stdin = process.openStdin();

var prompt = function () {
    process.stdout.write("GlassGift> ");
}

console.log("Launching Rest API for GlassGift...");

stdin.on("data", function (d) {
    var args = d.toString().split(" ");
    switch (args[0].trim()) {
        case "test":
            console.log("You have entered a test command!");
            break;
        case "helloworld":
            console.log("What is this? CS 180");
            break;
        default:
            console.log("How quaint...");
            break;
    }
    prompt();
});

/*
 * Sql stuff (Postgre Sql)
 */

//var pg = require("pg");

/*
 * Handling network requests
 */

var net = require("net");
//sockets.length will get the # of connections since launch, not # of active connections
var sockets = [];

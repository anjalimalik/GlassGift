/*
 *  Server/Rest API is hosted here, ready my dude?
 */
const ip = "127.0.0.1";
const port = 44844;

var stdin = process.openStdin();

var prompt = function () {
    process.stdout.write("GlassGift> ");
};

console.log("Launching RESTful API for GlassGift...");

var main = function () {
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
};

/*
 * Sql stuff (Postgre Sql)
 */

module.exports = server;
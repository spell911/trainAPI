// var message:string = "Hello World" 
// console.log(message)
var Greeting = /** @class */ (function () {
    function Greeting(name) {
        console.log("in construnctor");
    }
    Greeting.prototype.greet = function () {
        console.log("Hello World!!!");
    };
    return Greeting;
}());
var obj = new Greeting("ggwp");
obj.greet();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodecron = require("node-cron");
nodecron.schedule("50 15 * * *", function () {
    console.log("run by node cron :");
});
console.log("job shcedule start");
//# sourceMappingURL=D:/node_workspace/trainAPI/sche.js.map
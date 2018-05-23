"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//main import
//before import > npm install --save
var express = require("express");
var bodyParser = require("body-parser");
var http_1 = require("http");
var cors = require("cors");
//import api comfig
var config = require("config");
//import jwt
//class for validate
//before import > npm install --save
var auth_1 = require("./shared/auth");
//import web socket
//before import > npm install --save
var io = require("socket.io");
//import api controller
//class to do someting
var user_1 = require("./controller/user");
var issue_1 = require("./controller/issue");
var login_1 = require("./controller/login");
var pic_1 = require("./controller/pic");
/* new instance */
// app server define
var app = express();
var server = new http_1.Server(app);
//server list port define
var port = config.get("port");
server.listen(port);
//socket define
var socketio = io(server);
console.log("server start on port " + port);
/* use */
//socket
socketio.on("connection", function (_socket) {
    _socket.on("newPic", function (payload) {
        socketio.emit("updatePic", 1);
    });
    _socket.on("deletePic", function (payload) {
        socketio.emit("updatePic", -1);
    });
});
//jwt validate
app.use(auth_1.jwt.initialize());
//cors
app.use(cors());
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//any controller in api
app.use("/api/v1/user", user_1.UserController);
app.use("/api/v1/login", login_1.LoginController);
app.use("/api/v1/issue", issue_1.IssueController);
app.use("/api/v1/pic", pic_1.PicController);
//# sourceMappingURL=D:/node_workspace/trainAPI/app.js.map
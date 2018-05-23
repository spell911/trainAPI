//main import
//before import > npm install --save
import * as express from "express";
import * as bodyParser from "body-parser";
import { Server } from "http";
import * as cors from "cors";
//import api comfig
import * as config from "config";
//import jwt
//class for validate
//before import > npm install --save
import { jwt } from "./shared/auth";
//import web socket
//before import > npm install --save
import * as io from "socket.io";
//import api controller
//class to do someting
import { UserController } from "./controller/user";
import { IssueController } from "./controller/issue";
import { LoginController } from "./controller/login";
import { PicController } from "./controller/pic";

/* new instance */

// app server define
const app = express();
const server = new Server(app);
//server list port define
let port = config.get("port");
server.listen(port);
//socket define
const socketio = io(server);
console.log(`server start on port ${port}`);

/* use */

//socket
socketio.on("connection", _socket => {
  _socket.on("newPic", payload => {
    socketio.emit("updatePic", 1);
  });
  _socket.on("deletePic", payload => {
    socketio.emit("updatePic", -1);
  });
});

//jwt validate
app.use(jwt.initialize());
//cors
app.use(cors());
//bodyParser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
//any controller in api
app.use("/api/v1/user", UserController);
app.use("/api/v1/login", LoginController);
app.use("/api/v1/issue", IssueController);
app.use("/api/v1/pic", PicController);

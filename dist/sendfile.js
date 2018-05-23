"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ssh2 = require("ssh2");
var config = require("config");
var client = new ssh2.Client();
client.connect(config.get("SFTP"));
client.on("ready", function (req, res) {
    client.sftp(function (err, _sftp) {
        _sftp.fastPut("upload/1527051819363_lee.jpg", "/home/train/PHICH.jpg", function (err) {
            console.log(err);
            client.end();
        });
    });
});
//# sourceMappingURL=D:/node_workspace/trainAPI/sendfile.js.map
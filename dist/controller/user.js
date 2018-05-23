"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../shared/user");
var auth_1 = require("../shared/auth");
var router = express_1.Router();
router.get("", auth_1.jwt.authenticate(), function (req, res) {
    user_1.UserService.list(function (err, result) {
        res.json(result);
    });
});
exports.UserController = router;
//# sourceMappingURL=D:/node_workspace/trainAPI/controller/user.js.map
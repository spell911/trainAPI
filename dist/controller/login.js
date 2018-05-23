"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_db_1 = require("../shared/mysql-db");
var jwt = require("jwt-simple");
var config = require("config");
var router = express_1.Router();
router.post("/doLogin", function (req, res) {
    var dat = req.body;
    var sql = "select user_code as \"userCode\"\n, user_first_name as \"userName\"\n, user_last_name as \"userLastName\"\n, user_email as \"userEmail\"\nfrom sc_user \nwhere (user_code = '" + dat.userCode + "' or user_email = '" + dat.userCode + "') \nand user_pwd = '" + dat.userPwd + "' \nand user_active = 'Y'";
    mysql_db_1.mysqlDB.query(sql, function (err, result) {
        var _token = jwt.encode({
            userCode: dat.userCode
        }, config.get("TOKEN_KEY"));
        if (err) {
            res.json(err);
        }
        else {
            if (result.length > 0) {
                res.json({
                    success: true,
                    auth_token: _token,
                    userName: result[0].userName
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Login fail"
                });
            }
        }
    });
});
exports.LoginController = router;
//# sourceMappingURL=D:/node_workspace/trainAPI/controller/login.js.map
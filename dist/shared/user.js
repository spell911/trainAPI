"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_db_1 = require("../shared/mysql-db");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.list = function (cb) {
        var sql = "select * from sc_user";
        mysql_db_1.mysqlDB.query(sql, cb);
    };
    return User;
}());
exports.UserService = new User();
//# sourceMappingURL=D:/node_workspace/trainAPI/shared/user.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var config = require("config");
var MysqlDB = /** @class */ (function () {
    function MysqlDB() {
        this.pool = mysql.createPool(config.get("mysql"));
    }
    MysqlDB.prototype.query = function (sql, cb) {
        this.pool.getConnection(function (err, _con) {
            if (err) {
                console.log("getConnection :" + err);
            }
            else {
                _con.query(sql, function (err, result) {
                    _con.release();
                    cb(err, result);
                });
            }
        });
    };
    return MysqlDB;
}());
exports.mysqlDB = new MysqlDB();
//# sourceMappingURL=D:/node_workspace/trainAPI/shared/mysql-db.js.map
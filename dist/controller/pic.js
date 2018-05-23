"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_db_1 = require("../shared/mysql-db");
var auth_1 = require("../shared/auth");
var apicache = require("apicache");
//router
var router = express_1.Router();
//authen before use this class
router.use(auth_1.jwt.authenticate());
//cache
var cache = apicache.middleware;
//select pic
router.get("", cache("1 minutes"), function (req, res) {
    var sql = "\n    select\n  concat(param_code,'-',entry_code,'-',item_code) as \"pkCode\"\n  , item_code as \"picId\"\n  , item_value as \"picCode\"\n  , item_desc as \"picName\"\nfrom sc_entry_item\nwhere param_code = 'ISSUE'\n  and entry_code = 'PIC'\n    ";
    mysql_db_1.mysqlDB.query(sql, function (err, result) {
        res.json(result);
    });
});
//insert pic
router.post("", function (req, res) {
    var dat = req.body;
    var userInfo = req.user;
    var sql = "\n    insert into sc_entry_item (\n        item_code\n        ,entry_code\n        ,param_code\n        ,item_value\n        ,item_desc\n        ,item_cre\n        ,item_cre_dat\n        ,item_upd\n        ,item_upd_dat\n    ) VALUES (\n        '" + dat.picId + "'\n        ,'PIC'\n        ,'ISSUE'\n        ,'" + dat.picCode + "'\n        ,'" + dat.picName + "'\n        ,'" + userInfo.userCode + "'\n        ,sysdate()\n        ,'" + userInfo.userCode + "'\n        ,sysdate()\n    )\n    ";
    mysql_db_1.mysqlDB.query(sql, function (err, result) {
        if (err) {
            res.json({
                status: false,
                message: "error"
            });
        }
        else {
            res.json({
                status: true,
                message: "complete"
            });
        }
    });
});
//delete pic
router.delete("/:pkCode", function (req, res) {
    var sql = "\n    delete from sc_entry_item\n    where concat(param_code,'-',entry_code,'-',item_code) = '" + req.params.pkCode + "'\n    ";
    mysql_db_1.mysqlDB.query(sql, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});
//count total pic
router.get("/countTotalPic", function (req, res) {
    var sql = "\n    select count(1) as \"totalPic\"\n    from sc_entry_item\n    where param_code = 'ISSUE'\n        and entry_code = 'PIC'\n      ";
    mysql_db_1.mysqlDB.query(sql, function (err, result) {
        res.json(result);
    });
});
exports.PicController = router;
//# sourceMappingURL=D:/node_workspace/trainAPI/controller/pic.js.map
import { Router, Request, Response } from "express";
import { mysqlDB } from "../shared/mysql-db";
import { jwt } from "../shared/auth";
import * as apicache from "apicache";

//router
const router: Router = Router();

//authen before use this class
router.use(jwt.authenticate());

//cache
let cache = apicache.middleware;

//select pic
router.get("", cache("1 minutes"), (req, res) => {
  let sql = `
    select
  concat(param_code,'-',entry_code,'-',item_code) as "pkCode"
  , item_code as "picId"
  , item_value as "picCode"
  , item_desc as "picName"
from sc_entry_item
where param_code = 'ISSUE'
  and entry_code = 'PIC'
    `;
  mysqlDB.query(sql, (err, result) => {
    res.json(result);
  });
});
//insert pic
router.post("", (req, res) => {
  let dat = req.body;
  let userInfo = req.user;
  let sql = `
    insert into sc_entry_item (
        item_code
        ,entry_code
        ,param_code
        ,item_value
        ,item_desc
        ,item_cre
        ,item_cre_dat
        ,item_upd
        ,item_upd_dat
    ) VALUES (
        '${dat.picId}'
        ,'PIC'
        ,'ISSUE'
        ,'${dat.picCode}'
        ,'${dat.picName}'
        ,'${userInfo.userCode}'
        ,sysdate()
        ,'${userInfo.userCode}'
        ,sysdate()
    )
    `;
  mysqlDB.query(sql, (err, result) => {
    if (err) {
      res.json({
        status: false,
        message: "error"
      });
    } else {
      res.json({
        status: true,
        message: "complete"
      });
    }
  });
});
//delete pic
router.delete("/:pkCode", (req, res) => {
  let sql = `
    delete from sc_entry_item
    where concat(param_code,'-',entry_code,'-',item_code) = '${
      req.params.pkCode
    }'
    `;
  mysqlDB.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
//count total pic
router.get("/countTotalPic", (req, res) => {
  let sql = `
    select count(1) as "totalPic"
    from sc_entry_item
    where param_code = 'ISSUE'
        and entry_code = 'PIC'
      `;
  mysqlDB.query(sql, (err, result) => {
    res.json(result);
  });
});

export const PicController: Router = router;

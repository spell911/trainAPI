"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../shared/user");
var excel = require("excel4node");
var multer = require("multer");
var config = require("config");
var nodemailer = require("nodemailer");
var router = express_1.Router();
//multer diskStorage
var diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.get("UPLOAD_PATH"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + " - " + file.originalname);
    }
});
var upload = multer({
    storage: diskStorage
});
//export excel
router.get("/excel", function (req, res) {
    user_1.UserService.list(function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            var wb = new excel.Workbook();
            var ws = wb.addWorksheet("All User");
            var i = 0;
            do {
                ws.cell(i, 1).string("user_code");
                ws.cell(i, 2).string("user_title");
                ws.cell(i, 3).string("user_first_name");
                ws.cell(i, 4).string("user_last_name");
                ws.cell(i, 5).string("user_email");
                ws.cell(i, 6).string("user_tel");
                i++;
            } while (i < result.length);
            {
                ws.cell(i + 1, 1).string(result[i].user_code);
                ws.cell(i + 1, 2).string(result[i].user_title);
                ws.cell(i + 1, 3).string(result[i].user_first_name);
                ws.cell(i + 1, 4).string(result[i].user_last_name);
                ws.cell(i + 1, 5).string(result[i].user_email);
                ws.cell(i + 1, 6).string(result[i].user_tel);
            }
            //   for (let i = 0; i < result.length; i++) {
            //     ws.cell(i + 1, 1).string(result[i].user_code);
            //     ws.cell(i + 1, 2).string(result[i].user_title);
            //     ws.cell(i + 1, 3).string(result[i].user_first_name);
            //     ws.cell(i + 1, 4).string(result[i].user_last_name);
            //     ws.cell(i + 1, 5).string(result[i].user_email);
            //     ws.cell(i + 1, 6).string(result[i].user_tel);
            //   }
            wb.write("issue.xlsx", res);
        }
    });
});
//upload file
router.post("/attach/:id", upload.single("attach"), function (req, res) {
    res.json({
        success: true
    });
});
//send email
router.post("/sendEmail/:id", function (req, res) {
    var email = nodemailer.createTransport(config.get("STMP"));
    email.sendMail({
        subject: "ผ้าป่าสามัคคี",
        to: "primaryphichz@gmail.com",
        html: "<b>ร่วมทอดผ้าป่าสามัคคี..</b>",
        attachments: [
            {
                path: "upload/1527063028421 - issue (3).xlsx"
            }
        ]
    }, function (err, result) {
        if (err) {
            res.json({ success: false });
        }
        else {
            res.json({ success: true });
        }
    });
});
exports.IssueController = router;
//# sourceMappingURL=D:/node_workspace/trainAPI/controller/issue.js.map
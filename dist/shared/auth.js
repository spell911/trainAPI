"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passportJWT = require("passport-jwt");
var config = require("config");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: config.get("TOKEN_KEY"),
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT")
};
// var jwt = function () {
var Auth = /** @class */ (function () {
    function Auth() {
        var strategy = new Strategy(params, function (payload, done) {
            // console.log(payload);
            // var user = { id: '888' } //users[payload.id] || null;
            var user = payload;
            if (user) {
                return done(null, user);
            }
            else {
                return done(new Error("User not found"), null);
            }
        });
        passport.use(strategy);
    }
    Auth.prototype.initialize = function () {
        return passport.initialize();
    };
    Auth.prototype.authenticate = function () {
        return passport.authenticate("jwt", config.get("JWT_SESSION"));
    };
    return Auth;
}());
exports.jwt = new Auth();
//# sourceMappingURL=D:/node_workspace/trainAPI/shared/auth.js.map
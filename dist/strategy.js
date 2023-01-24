"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CognitoJwtStrategy = void 0;
var passport_strategy_1 = require("passport-strategy");
var extractJwt_1 = require("./extractJwt");
var CognitoJwtStrategy = /** @class */ (function (_super) {
    __extends(CognitoJwtStrategy, _super);
    function CognitoJwtStrategy(options, verify) {
        var _this = this;
        var _a;
        _this = _super.call(this) || this;
        _this.name = 'cognito-jwt';
        _this.authenticate = function (req) {
            var token = _this.jwtFromRequest(req);
            if (!token) {
                return _this.fail(new Error('No auth token'), 400);
            }
            _this.verify(token, function (err, user, info) {
                if (err) {
                    _this.error(err);
                }
                else if (!user) {
                    _this.fail(info);
                }
                else {
                    _this.success(user, info);
                }
            });
        };
        _this.jwtFromRequest =
            (_a = options.jwtFromRequest) !== null && _a !== void 0 ? _a : (0, extractJwt_1.fromAuthHeaderAsBearerToken)();
        _this.verify = verify;
        return _this;
    }
    return CognitoJwtStrategy;
}(passport_strategy_1.Strategy));
exports.CognitoJwtStrategy = CognitoJwtStrategy;

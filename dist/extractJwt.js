"use strict";
exports.__esModule = true;
exports.fromAuthHeaderAsBearerToken = exports.fromAuthHeaderWithScheme = void 0;
var re = /(\S+)\s+(\S+)/;
var parseAuthHeader = function (authHeaderValue) {
    if (typeof authHeaderValue !== 'string') {
        return null;
    }
    var matches = authHeaderValue.match(re);
    return matches && { scheme: matches[1], value: matches[2] };
};
var authHeader = 'authorization';
var fromAuthHeaderWithScheme = function (authScheme) {
    return function (request) {
        var authHeaderValue = request.headers[authHeader];
        if (!authHeaderValue) {
            return null;
        }
        var authParams = parseAuthHeader(authHeaderValue);
        if (authParams && authScheme === authParams.scheme.toLowerCase()) {
            return authParams.value;
        }
        return null;
    };
};
exports.fromAuthHeaderWithScheme = fromAuthHeaderWithScheme;
var fromAuthHeaderAsBearerToken = function () {
    return (0, exports.fromAuthHeaderWithScheme)('bearer');
};
exports.fromAuthHeaderAsBearerToken = fromAuthHeaderAsBearerToken;

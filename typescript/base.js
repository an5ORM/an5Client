"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.An5 = void 0;
var An5;
(function (An5) {
    class An5ClientKnownRequestError extends Error {
        constructor(message, { code, clientVersion }) {
            super(message);
            this.code = code;
        }
    }
    An5.An5ClientKnownRequestError = An5ClientKnownRequestError;
})(An5 || (exports.An5 = An5 = {}));

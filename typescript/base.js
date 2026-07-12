"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mssql = void 0;
var Mssql;
(function (Mssql) {
    class MssqlClientKnownRequestError extends Error {
        constructor(message, { code, clientVersion }) {
            super(message);
            this.code = code;
        }
    }
    Mssql.MssqlClientKnownRequestError = MssqlClientKnownRequestError;
})(Mssql || (exports.Mssql = Mssql = {}));

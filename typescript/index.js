"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.An5Client = exports.An5 = void 0;
__exportStar(require("./base"), exports);
__exportStar(require("./User"), exports);
__exportStar(require("./Order"), exports);
const base_1 = require("./base");
var An5;
(function (An5) {
    An5.An5ClientKnownRequestError = base_1.An5.An5ClientKnownRequestError;
})(An5 || (exports.An5 = An5 = {}));
class An5Client {
    $connect() { return Promise.resolve(); }
    $disconnect() { return Promise.resolve(); }
    $transaction(fn, options) { return typeof fn === 'function' ? fn(this) : Promise.all(fn); }
    $queryRaw(queryParts, ...values) { return Promise.resolve([]); }
    $queryRawUnsafe(query, ...values) { return Promise.resolve([]); }
    $executeRaw(queryParts, ...values) { return Promise.resolve(0); }
    $executeRawUnsafe(query, ...values) { return Promise.resolve(0); }
}
exports.An5Client = An5Client;

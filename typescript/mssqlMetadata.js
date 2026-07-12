"use strict";
// This file is auto-generated. Do not edit directly.
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationMap = exports.modelFields = exports.modelToTable = void 0;
exports.modelToTable = {
    user: "[dbo].[users]",
    order: "[dbo].[orders]",
};
exports.modelFields = {
    user: { id: "string", email: "string", name: "string?", createdAt: "Date" },
    order: { id: "string", userId: "string", total: "number", createdAt: "Date" },
};
exports.relationMap = {
    user: {},
    order: {},
};

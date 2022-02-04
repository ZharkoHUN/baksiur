"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _promise = _interopRequireDefault(require("mysql2/promise"));

var _util = require("util");

var _config = require("./config");

var pool = _promise["default"].createPool(_config.database);

pool.getConnection(function (err, connection) {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }

    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections");
    }

    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
  }

  if (connection) connection.release();
  console.log("DB is Connected");
  return;
});
var _default = pool;
exports["default"] = _default;
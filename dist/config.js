"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.port = exports.database = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var database = {
  connectionLimit: 10,
  host: process.env.DATABASE_HOST || "127.0.0.1",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "hpeti"
};
exports.database = database;
var port = process.env.PORT || 8000; //80.211.213.86

exports.port = port;
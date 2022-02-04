"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoggedIn = exports.isAdminUser = exports.isAdmin = void 0;

var isLoggedIn = function isLoggedIn(req, res, next) {
  console.log(req.isAuthenticated());

  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/signin");
};

exports.isLoggedIn = isLoggedIn;

var isAdmin = function isAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.admin == 1) return next();else return res.redirect("/");
  } else return res.redirect("/");
};

exports.isAdmin = isAdmin;

var isAdminUser = function isAdminUser(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.admin == 1) return true;else return false;
  } else return false;
};

exports.isAdminUser = isAdminUser;
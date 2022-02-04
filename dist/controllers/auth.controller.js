"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = exports.renderSignUp = exports.renderSignIn = exports.logout = void 0;

var _passport = _interopRequireDefault(require("passport"));

var renderSignUp = function renderSignUp(req, res) {
  res.render("auth/signup");
};

exports.renderSignUp = renderSignUp;

var signUp = _passport["default"].authenticate("local.signup", {
  successRedirect: "/profile",
  failureRedirect: "/signup",
  failureFlash: true
});

exports.signUp = signUp;

var renderSignIn = function renderSignIn(req, res, next) {
  res.render("auth/signin");
};

exports.renderSignIn = renderSignIn;

var signIn = _passport["default"].authenticate("local.signin", {
  successRedirect: "/profile",
  failureRedirect: "/signin",
  failureFlash: true
});

exports.signIn = signIn;

var logout = function logout(req, res, next) {
  req.logout();
  res.redirect("/");
};

exports.logout = logout;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderUserProfile = void 0;

var renderUserProfile = function renderUserProfile(req, res, next) {
  console.log("Bejön a render profile");
  res.render("profile");
};

exports.renderUserProfile = renderUserProfile;
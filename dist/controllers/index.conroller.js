"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderIndex = void 0;

var renderIndex = function renderIndex(req, res) {
  res.render("index", {
    loggedin: req.isAuthenticated()
  });
};

exports.renderIndex = renderIndex;
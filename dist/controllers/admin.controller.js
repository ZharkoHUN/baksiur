"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderLinks = exports.renderEditLink = exports.renderAddLink = exports.redirectLinks = exports.editLink = exports.deleteLink = exports.addLink = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = _interopRequireDefault(require("../database"));

var helpers = _interopRequireWildcard(require("../lib/helpers"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var renderAddLink = function renderAddLink(req, res) {
  res.render("admin/add");
};

exports.renderAddLink = renderAddLink;

var addLink = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, fullname, username, phone, contact, email, webpage, password, newLink;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.user.admin == 0)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", res.redirect('/'));

          case 2:
            _req$body = req.body, fullname = _req$body.fullname, username = _req$body.username, phone = _req$body.phone, contact = _req$body.contact, email = _req$body.email, webpage = _req$body.webpage, password = _req$body.password;
            _context.t0 = fullname;
            _context.t1 = username;
            _context.t2 = phone || "Nincs megadva";
            _context.t3 = contact || "Nincs megadva";
            _context.t4 = email || "Nincs megadva";
            _context.t5 = webpage || "Nincs megadva";
            _context.next = 11;
            return helpers.encryptPassword(password);

          case 11:
            _context.t6 = _context.sent;
            newLink = {
              fullname: _context.t0,
              username: _context.t1,
              phone: _context.t2,
              contact: _context.t3,
              email: _context.t4,
              webpage: _context.t5,
              password: _context.t6
            };
            _context.next = 15;
            return _database["default"].query("INSERT INTO users set ?", [newLink]);

          case 15:
            req.flash("success", "Sikeres hozzáadás");
            res.redirect("/admin");

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addLink(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.addLink = addLink;

var renderLinks = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var page, _yield$pool$query, _yield$pool$query2, rows;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = req.params.page;
            _context2.next = 3;
            return _database["default"].query("SELECT * FROM users");

          case 3:
            _yield$pool$query = _context2.sent;
            _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
            rows = _yield$pool$query2[0];
            res.render("admin/list", {
              users: rows,
              paginate: {
                total: rows.length
              }
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function renderLinks(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.renderLinks = renderLinks;

var redirectLinks = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            res.redirect("/admin/1");

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function redirectLinks(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.redirectLinks = redirectLinks;

var deleteLink = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(req.user.admin == 0)) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", res.redirect('/'));

          case 2:
            id = req.params.id;
            _context4.next = 5;
            return _database["default"].query("DELETE FROM users WHERE ID = ?", [id]);

          case 5:
            req.flash("success", "Sikeres törlés");
            res.redirect("/admin");

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteLink(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteLink = deleteLink;

var renderEditLink = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, _yield$pool$query3, _yield$pool$query4, rows;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return _database["default"].query("SELECT * FROM users WHERE id = ?", [id]);

          case 3:
            _yield$pool$query3 = _context5.sent;
            _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
            rows = _yield$pool$query4[0];
            res.render("admin/edit", {
              admin: rows[0]
            });

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function renderEditLink(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.renderEditLink = renderEditLink;

var editLink = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, _req$body2, username, fullname, phone, contact, admin, email, webpage, newLink;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!(req.user.admin == 0)) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt("return", res.redirect('/'));

          case 2:
            id = req.params.id;
            _req$body2 = req.body, username = _req$body2.username, fullname = _req$body2.fullname, phone = _req$body2.phone, contact = _req$body2.contact, admin = _req$body2.admin, email = _req$body2.email, webpage = _req$body2.webpage;
            newLink = {
              username: username,
              fullname: fullname,
              phone: phone,
              contact: contact,
              email: email,
              webpage: webpage,
              admin: admin == "on" ? 1 : 0
            };
            _context6.next = 7;
            return _database["default"].query("UPDATE users set ? WHERE id = ?", [newLink, id]);

          case 7:
            req.flash("success", "Sikeres szerkesztés");
            res.redirect("/admin");

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function editLink(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.editLink = editLink;
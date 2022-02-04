"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _database = _interopRequireDefault(require("../database"));

var helpers = _interopRequireWildcard(require("./helpers"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_passport["default"].use("local.signin", new _passportLocal.Strategy({
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true
}, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, username, password, done) {
    var _yield$pool$query, _yield$pool$query2, rows, user, validPassword;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _database["default"].query("SELECT * FROM users WHERE username = ?", [username]);

          case 2:
            _yield$pool$query = _context.sent;
            _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
            rows = _yield$pool$query2[0];

            if (!(rows.length > 0)) {
              _context.next = 13;
              break;
            }

            user = rows[0];
            _context.next = 9;
            return helpers.matchPassword(password, user.password);

          case 9:
            validPassword = _context.sent;

            if (validPassword) {
              done(null, user, req.flash("success", "Üdv itt, " + user.username));
            } else {
              done(null, false, req.flash("message", "Hibás jelszó"));
            }

            _context.next = 14;
            break;

          case 13:
            return _context.abrupt("return", done(null, false, req.flash("message", "Ez a felhasználónév nem létezik.")));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}()));

_passport["default"].use("local.signup", new _passportLocal.Strategy({
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true
}, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, username, password, done) {
    var fullname, newUser, _yield$pool$query3, _yield$pool$query4, haveAcc, _yield$pool$query5, _yield$pool$query6, result;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fullname = req.body.fullname;
            newUser = {
              fullname: fullname,
              username: username,
              password: password,
              admin: 0
            };
            _context2.next = 4;
            return helpers.encryptPassword(password);

          case 4:
            newUser.password = _context2.sent;
            _context2.next = 7;
            return _database["default"].query("SELECT * FROM users WHERE username = ?", newUser.username);

          case 7:
            _yield$pool$query3 = _context2.sent;
            _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
            haveAcc = _yield$pool$query4[0];

            if (haveAcc[0]) {
              _context2.next = 20;
              break;
            }

            _context2.next = 13;
            return _database["default"].query("INSERT INTO users SET ? ", newUser);

          case 13:
            _yield$pool$query5 = _context2.sent;
            _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
            result = _yield$pool$query6[0];
            newUser.id = result.insertId;
            return _context2.abrupt("return", done(null, newUser));

          case 20:
            return _context2.abrupt("return", done(null, false, req.flash("message", "Ez a Felhasználónév már foglalt.")));

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}()));

_passport["default"].serializeUser(function (user, done) {
  done(null, user.id);
});

_passport["default"].deserializeUser( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, done) {
    var _yield$pool$query7, _yield$pool$query8, rows;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _database["default"].query("SELECT * FROM users WHERE id = ?", [id]);

          case 2:
            _yield$pool$query7 = _context3.sent;
            _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
            rows = _yield$pool$query8[0];
            done(null, rows[0]);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}());
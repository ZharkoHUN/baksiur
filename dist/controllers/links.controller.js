"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderLinks = exports.renderEditLink = exports.renderAddLink = exports.redirectLinks = exports.editLink = exports.deleteLink = exports.addLink = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = _interopRequireDefault(require("../database"));

var renderAddLink = function renderAddLink(req, res) {
  res.render("links/add");
};

exports.renderAddLink = renderAddLink;

var addLink = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, title, type, url, description, newLink;

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
            _req$body = req.body, title = _req$body.title, type = _req$body.type, url = _req$body.url, description = _req$body.description;
            newLink = {
              title: title,
              url: url,
              description: description,
              type: type,
              creator: req.user.fullname,
              user_id: req.user.id
            };
            _context.next = 6;
            return _database["default"].query("INSERT INTO links set ?", [newLink]);

          case 6:
            req.flash("success", "Sikeres hozzáadás");
            res.redirect("/links");

          case 8:
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
            return _database["default"].query("SELECT * FROM links");

          case 3:
            _yield$pool$query = _context2.sent;
            _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
            rows = _yield$pool$query2[0];
            res.render("links/list", {
              links: rows,
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
            res.redirect("/links/1");

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
            return _database["default"].query("DELETE FROM links WHERE ID = ?", [id]);

          case 5:
            req.flash("success", "Sikeres törlés");
            res.redirect("/links");

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
            return _database["default"].query("SELECT * FROM links WHERE id = ?", [id]);

          case 3:
            _yield$pool$query3 = _context5.sent;
            _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
            rows = _yield$pool$query4[0];
            res.render("links/edit", {
              link: rows[0]
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
    var id, _req$body2, title, description, url, type, newLink;

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
            _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, url = _req$body2.url, type = _req$body2.type;
            newLink = {
              title: title,
              description: description,
              url: url,
              type: type
            };
            _context6.next = 7;
            return _database["default"].query("UPDATE links set ? WHERE id = ?", [newLink, id]);

          case 7:
            req.flash("success", "Sikeres szerkesztés");
            res.redirect("/links");

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
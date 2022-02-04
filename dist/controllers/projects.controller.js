"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserToProject = exports.addState = exports.addProject = void 0;
exports.createDir = createDir;
exports.renderProjects = exports.renderProject = exports.renderEditProject = exports.renderAddProject = exports.removeUserFromProject = exports.redirectProjects = exports.getFullnameFromID = exports.editProject = exports.downloadFile = exports.deleteState = exports.deleteProject = exports.deleteImage = exports.deleteFile = void 0;
exports.uploadImages = uploadImages;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = _interopRequireDefault(require("../database"));

var helpers = _interopRequireWildcard(require("../lib/helpers"));

var _auth = require("../lib/auth");

var _fs = _interopRequireWildcard(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var renderAddProject = function renderAddProject(req, res) {
  if (req.user.admin == 0) {
    return res.redirect('/');
  }

  res.render("projects/add");
};

exports.renderAddProject = renderAddProject;

var downloadFile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var file;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            file = "".concat(__dirname, "/../../uploads/project_").concat(req.params.id, "/").concat(req.params.name);
            res.download(file);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function downloadFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.downloadFile = downloadFile;

var deleteFile = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var file;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.user.admin == 0)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.redirect('/'));

          case 2:
            file = "".concat(__dirname, "/../../uploads/project_").concat(req.params.id, "/").concat(req.params.name);

            _fs["default"].unlink(file, function (err) {
              if (err) {
                console.error(err);
                return;
              }

              req.flash("success", "Sikeres törlés: " + req.params.name);
              return res.redirect("/projects/show/" + req.params.id + "#project-csatolmanyok");
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function deleteFile(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteFile = deleteFile;

var deleteImage = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var file;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(req.user.admin == 0)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", res.redirect('/'));

          case 2:
            file = "".concat(__dirname, "/../../uploads/project_").concat(req.params.id, "/img/").concat(req.params.name);

            _fs["default"].unlink(file, function (err) {
              if (err) {
                console.error(err);
                return;
              }

              req.flash("success", "Sikeres törlés: " + req.params.name);
              return res.redirect("/projects/show/" + req.params.id + "#project-kepek");
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deleteImage(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteImage = deleteImage;

var renderProject = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var testFolder, folderArray, imageArray, id, _yield$pool$query, _yield$pool$query2, rows, _yield$pool$query3, _yield$pool$query4, staterows, i, _checkDateColors, _checkDateColors2, sendStates;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            testFolder = './uploads/project_' + req.params.id;
            folderArray = [];

            _fs["default"].readdir(testFolder, function (err, files) {
              if (files) {
                files.forEach(function (file) {
                  var re = /(?:\.([^.]+))?$/;
                  var xt = re.exec(file)[1];
                  if (xt !== undefined) folderArray.push({
                    file: file,
                    ext: xt
                  });
                });
              }
            });

            imageArray = [];

            _fs["default"].readdir(testFolder + '/img', function (err, files) {
              if (files) {
                files.forEach(function (file) {
                  var dir = "/../../uploads/project_".concat(req.params.id, "/img/").concat(file);
                  imageArray.push({
                    file: file,
                    dir: dir
                  });
                });
              }
            });

            id = req.params.id;
            _context4.next = 8;
            return _database["default"].query("SELECT * FROM projects WHERE id = ?", [id]);

          case 8:
            _yield$pool$query = _context4.sent;
            _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
            rows = _yield$pool$query2[0];
            _context4.next = 13;
            return _database["default"].query("SELECT * FROM states WHERE project_id = ? ORDER BY id DESC", [id]);

          case 13:
            _yield$pool$query3 = _context4.sent;
            _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
            staterows = _yield$pool$query4[0];
            i = 0;

          case 17:
            if (!(i < staterows.length)) {
              _context4.next = 24;
              break;
            }

            _context4.next = 20;
            return getFullnameFromID(staterows[i].creator);

          case 20:
            staterows[i].fullname = _context4.sent;

          case 21:
            i++;
            _context4.next = 17;
            break;

          case 24:
            if (rows[0].finished == 1) {
              rows[0].color = "#2c2c2c";
              rows[0].statusz = "Befejezett";
            } else {
              _checkDateColors = checkDateColors(rows[0].expire);
              _checkDateColors2 = (0, _slicedToArray2["default"])(_checkDateColors, 2);
              rows[0].color = _checkDateColors2[0];
              rows[0].statusz = _checkDateColors2[1];
            }

            sendStates = staterows.length > 0 ? staterows : "nincs";
            res.render("projects/show", {
              project: rows[0],
              admin: req.user.admin,
              state: sendStates,
              folder: folderArray.length > 0 ? folderArray : "nincs",
              imagefolder: imageArray.length > 0 ? imageArray : "nincs"
            });

          case 27:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function renderProject(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.renderProject = renderProject;

function formatLines(str) {
  var lines = str.split("\r\n");
  return JSON.stringify(lines);
}

var getFullnameFromID = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var _yield$pool$query5, _yield$pool$query6, rows;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _database["default"].query("SELECT * FROM users WHERE id = ?", [id]);

          case 2:
            _yield$pool$query5 = _context5.sent;
            _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
            rows = _yield$pool$query6[0];

            if (!(rows.length > 0)) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", rows[0].fullname);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getFullnameFromID(_x9) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getFullnameFromID = getFullnameFromID;

function createDir(req, res, next) {
  // This is just for my Controller same as app.post(url, function(req,res,next) {....
  if (req.user.admin == 0) {
    return res.redirect('/');
  }

  var uploadDir = _path["default"].join(__dirname, '../../uploads/project_' + req.params.id + '/');

  if (!_fs["default"].existsSync(uploadDir)) {
    _fs["default"].mkdirSync(uploadDir, {
      recursive: true
    });
  }

  var sampleFile;
  var uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    req.flash("success", "Nincsenek kiválasztva fájlok!");
    return res.redirect("/projects/show/" + req.params.id + "#project-csatolmanyok");
  }

  var names = [];
  sampleFile = req.files.filer;
  var keys = Object.keys(sampleFile);

  if (typeof sampleFile.name === "undefined") {
    for (var i = 0; i < keys.length; i++) {
      var val = sampleFile[keys[i]];
      uploadPath = uploadDir + val.name;
      val.mv(uploadPath, function (err) {});
      names.push(val.name);
    }
  } else {
    uploadPath = uploadDir + sampleFile.name;
    sampleFile.mv(uploadPath, function (err) {});
    names.push(sampleFile.name);
  }

  var strer = JSON.stringify(names);
  names = strer;
  names = names.replaceAll('"', '');
  names = names.replaceAll('[', '');
  names = names.replaceAll(']', '');
  names = names.replaceAll(',', ', ');
  req.flash("success", "Sikeres hozzáadás: " + names);
  return res.redirect("/projects/show/" + req.params.id + "#project-csatolmanyok");
}

var request = require('request');

function uploadImages(req, res, next) {
  // This is just for my Controller same as app.post(url, function(req,res,next) {....
  if (req.user.admin == 0) {
    return res.redirect('/');
  }

  var uploadDir = _path["default"].join(__dirname, '../../uploads/project_' + req.params.id + '/img/');

  if (!_fs["default"].existsSync(uploadDir)) {
    _fs["default"].mkdirSync(uploadDir, {
      recursive: true
    });
  }

  var sampleFile;
  var uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    req.flash("success", "Nincsenek kiválasztva képek!");
    return res.redirect("/projects/show/" + req.params.id + "#project-kepek");
  }

  var names = [];
  sampleFile = req.files.filer;
  var keys = Object.keys(sampleFile);

  if (typeof sampleFile.name === "undefined") {
    for (var i = 0; i < keys.length; i++) {
      var val = sampleFile[keys[i]];
      uploadPath = uploadDir + val.name;
      val.mv(uploadPath, function (err) {});
      names.push(val.name);
    }
  } else {
    uploadPath = uploadDir + sampleFile.name;
    sampleFile.mv(uploadPath, function (err) {});
    names.push(sampleFile.name);
  }

  var strer = JSON.stringify(names);
  names = strer;
  names = names.replaceAll('"', '');
  names = names.replaceAll('[', '');
  names = names.replaceAll(']', '');
  names = names.replaceAll(',', ', ');
  req.flash("success", "Sikeres feltöltés: " + names);
  return res.redirect("/projects/show/" + req.params.id + "#project-kepek");
}

var addProject = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body, name, contact, description, expire, reward, newProject;

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
            _req$body = req.body, name = _req$body.name, contact = _req$body.contact, description = _req$body.description, expire = _req$body.expire, reward = _req$body.reward;
            newProject = {
              name: name || "Nincs megadva",
              contact: contact || "Nincs megadva",
              description: description || "Nincs megadva",
              expire: expire || "Nincs megadva",
              reward: reward || "Nincs megadva",
              owners: "[]"
            };
            _context6.next = 6;
            return _database["default"].query("INSERT INTO projects set ?", [newProject]);

          case 6:
            req.flash("success", "Sikeres hozzáadás");
            res.redirect("/projects");

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function addProject(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

exports.addProject = addProject;

var addState = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, state, newState;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (!(req.user.admin == 0)) {
              _context7.next = 2;
              break;
            }

            return _context7.abrupt("return", res.redirect('/'));

          case 2:
            id = req.params.id;
            state = req.body.state;
            newState = {
              project_id: id,
              state: state,
              creator: req.user.id
            };
            _context7.next = 7;
            return _database["default"].query("INSERT INTO states set ?", [newState]);

          case 7:
            req.flash("success", "Sikeres hozzáadás");
            res.redirect("/projects/show/" + id + "#project-statusz");

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function addState(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

exports.addState = addState;

function checkDateColors(date) {
  if (date > Date.now()) {
    if (date - Date.now() < 60 * 1000 * 60 * 24 * 10) {
      return ["#744b0e", "10 napon belül lejár"];
    }

    return ["#365733", "Aktív"];
  } else {
    return ["#751212", "LEJÁRT HATÁRIDŐ"];
  }
}

var renderProjects = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var page, rows, _yield$pool$query7, _yield$pool$query8, _yield$pool$query9, _yield$pool$query10, i, _checkDateColors3, _checkDateColors4;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            page = req.params.page;

            if (!(req.user.admin == 1)) {
              _context8.next = 9;
              break;
            }

            _context8.next = 4;
            return _database["default"].query("SELECT * FROM projects");

          case 4:
            _yield$pool$query7 = _context8.sent;
            _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
            rows = _yield$pool$query8[0];
            _context8.next = 14;
            break;

          case 9:
            _context8.next = 11;
            return _database["default"].query("SELECT * from projects WHERE JSON_CONTAINS(owners, ?, '$')", [req.user.id]);

          case 11:
            _yield$pool$query9 = _context8.sent;
            _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
            rows = _yield$pool$query10[0];

          case 14:
            if (rows.length > 0) {
              for (i = 0; i < rows.length; i++) {
                if (rows[i].finished == 1) {
                  rows[i].color = "#2c2c2c";
                  rows[i].statusz = "Befejezett";
                } else {
                  _checkDateColors3 = checkDateColors(rows[i].expire);
                  _checkDateColors4 = (0, _slicedToArray2["default"])(_checkDateColors3, 2);
                  rows[i].color = _checkDateColors4[0];
                  rows[i].statusz = _checkDateColors4[1];
                }
              }
            }

            res.render("projects/list", {
              project: rows,
              paginate: {
                total: rows.length
              },
              isadmin: req.user.admin
            });

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function renderProjects(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();

exports.renderProjects = renderProjects;

var redirectProjects = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            res.redirect("/projects/1");

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function redirectProjects(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();

exports.redirectProjects = redirectProjects;

var deleteState = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var _req$params, projectid, id;

    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (!(req.user.admin == 0)) {
              _context10.next = 2;
              break;
            }

            return _context10.abrupt("return", res.redirect('/'));

          case 2:
            _req$params = req.params, projectid = _req$params.projectid, id = _req$params.id;
            _context10.next = 5;
            return _database["default"].query("DELETE FROM states WHERE id = ?", [id]);

          case 5:
            req.flash("success", "Sikeres törlés");
            return _context10.abrupt("return", res.redirect("/projects/show/" + projectid + "#project-statusz"));

          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function deleteState(_x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();

exports.deleteState = deleteState;

var deleteProject = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            if (!(req.user.admin == 0)) {
              _context11.next = 2;
              break;
            }

            return _context11.abrupt("return", res.redirect('/'));

          case 2:
            id = req.params.id;
            _context11.next = 5;
            return _database["default"].query("DELETE FROM projects WHERE ID = ?", [id]);

          case 5:
            req.flash("success", "Sikeres törlés");
            res.redirect("/projects/show");

          case 7:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function deleteProject(_x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();

exports.deleteProject = deleteProject;

var renderEditProject = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var id, _yield$pool$query11, _yield$pool$query12, rows, _yield$pool$query13, _yield$pool$query14, users, i, _checkDateColors5, _checkDateColors6;

    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            if (!(req.user.admin == 0)) {
              _context12.next = 2;
              break;
            }

            return _context12.abrupt("return", res.redirect('/'));

          case 2:
            id = req.params.id;
            _context12.next = 5;
            return _database["default"].query("SELECT * FROM projects WHERE id = ?", [id]);

          case 5:
            _yield$pool$query11 = _context12.sent;
            _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
            rows = _yield$pool$query12[0];
            _context12.next = 10;
            return _database["default"].query("SELECT * FROM users");

          case 10:
            _yield$pool$query13 = _context12.sent;
            _yield$pool$query14 = (0, _slicedToArray2["default"])(_yield$pool$query13, 1);
            users = _yield$pool$query14[0];
            i = 0;

          case 14:
            if (!(i < users.length)) {
              _context12.next = 26;
              break;
            }

            _context12.next = 17;
            return userIsOnProject(id, users[i].id);

          case 17:
            _context12.t0 = _context12.sent;

            if (!(_context12.t0 == true)) {
              _context12.next = 22;
              break;
            }

            users[i].onproject = true;
            _context12.next = 23;
            break;

          case 22:
            users[i].onproject = false;

          case 23:
            i++;
            _context12.next = 14;
            break;

          case 26:
            if (rows[0].finished == 1) {
              rows[0].color = "#2c2c2c";
              rows[0].statusz = "Befejezett";
            } else {
              _checkDateColors5 = checkDateColors(rows[0].expire);
              _checkDateColors6 = (0, _slicedToArray2["default"])(_checkDateColors5, 2);
              rows[0].color = _checkDateColors6[0];
              rows[0].statusz = _checkDateColors6[1];
            }

            res.render("projects/edit", {
              project: rows[0],
              users: users
            });

          case 28:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function renderEditProject(_x22, _x23) {
    return _ref12.apply(this, arguments);
  };
}();

exports.renderEditProject = renderEditProject;

var editProject = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var id, _req$body2, name, contact, description, expire, reward, finished, newProject;

    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            if (!(req.user.admin == 0)) {
              _context13.next = 2;
              break;
            }

            return _context13.abrupt("return", res.redirect('/'));

          case 2:
            id = req.params.id;
            _req$body2 = req.body, name = _req$body2.name, contact = _req$body2.contact, description = _req$body2.description, expire = _req$body2.expire, reward = _req$body2.reward, finished = _req$body2.finished;
            newProject = {
              name: name,
              contact: contact,
              description: description,
              expire: expire,
              reward: reward,
              finished: finished == "on" ? 1 : 0
            };
            _context13.next = 7;
            return _database["default"].query("UPDATE projects set ? WHERE id = ?", [newProject, id]);

          case 7:
            req.flash("success", "Sikeres szerkesztés");
            res.redirect("/projects/show/" + id);

          case 9:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function editProject(_x24, _x25) {
    return _ref13.apply(this, arguments);
  };
}(); // Felhasználó hozzáadása projkthez


exports.editProject = editProject;

var addUserToProject = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var _req$params2, id, userid, _yield$pool$query15, _yield$pool$query16, rows, newProject, arr, _arr;

    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            if (!(req.user.admin == 0)) {
              _context14.next = 2;
              break;
            }

            return _context14.abrupt("return", res.redirect('/'));

          case 2:
            _req$params2 = req.params, id = _req$params2.id, userid = _req$params2.userid;
            _context14.next = 5;
            return _database["default"].query("SELECT owners FROM projects WHERE id = ?", [id]);

          case 5:
            _yield$pool$query15 = _context14.sent;
            _yield$pool$query16 = (0, _slicedToArray2["default"])(_yield$pool$query15, 1);
            rows = _yield$pool$query16[0];
            newProject = {};

            if (!(rows[0].owners == "[]")) {
              _context14.next = 23;
              break;
            }

            arr = [userid];
            _context14.next = 13;
            return _database["default"].query("UPDATE projects SET owners = ? WHERE id = ?", [JSON.stringify(arr).replaceAll('"', ''), id]);

          case 13:
            _context14.t0 = req;
            _context14.t1 = "";
            _context14.next = 17;
            return getFullnameFromID(userid);

          case 17:
            _context14.t2 = _context14.sent;
            _context14.t3 = _context14.t1.concat.call(_context14.t1, _context14.t2, " sikeresen hozz\xE1adva ehhez a projecthez: ").concat(id);

            _context14.t0.flash.call(_context14.t0, "success", _context14.t3);

            res.redirect("/projects/edit/" + id);
            _context14.next = 35;
            break;

          case 23:
            _arr = JSON.parse(rows[0].owners);

            _arr.push(userid);

            _context14.next = 27;
            return _database["default"].query("UPDATE projects SET owners = ? WHERE id = ?", [JSON.stringify(_arr).replaceAll('"', ''), id]);

          case 27:
            _context14.t4 = req;
            _context14.t5 = "";
            _context14.next = 31;
            return getFullnameFromID(userid);

          case 31:
            _context14.t6 = _context14.sent;
            _context14.t7 = _context14.t5.concat.call(_context14.t5, _context14.t6, " sikeresen hozz\xE1adva ehhez a projecthez: ").concat(id);

            _context14.t4.flash.call(_context14.t4, "success", _context14.t7);

            res.redirect("/projects/edit/" + id);

          case 35:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function addUserToProject(_x26, _x27) {
    return _ref14.apply(this, arguments);
  };
}();

exports.addUserToProject = addUserToProject;

var removeUserFromProject = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var _req$params3, id, userid, _yield$pool$query17, _yield$pool$query18, owners, arr, index;

    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            if (!(req.user.admin == 0)) {
              _context15.next = 2;
              break;
            }

            return _context15.abrupt("return", res.redirect('/'));

          case 2:
            _req$params3 = req.params, id = _req$params3.id, userid = _req$params3.userid;
            _context15.next = 5;
            return _database["default"].query("SELECT owners from projects WHERE id = ?", [id]);

          case 5:
            _yield$pool$query17 = _context15.sent;
            _yield$pool$query18 = (0, _slicedToArray2["default"])(_yield$pool$query17, 1);
            owners = _yield$pool$query18[0];
            arr = JSON.parse(owners[0].owners);
            index = arr.indexOf(Number(userid));

            if (index > -1) {
              arr.splice(index, 1);
            }

            _context15.next = 13;
            return _database["default"].query("UPDATE projects SET owners = ? WHERE id = ?", [JSON.stringify(arr).replaceAll('"', ''), id]);

          case 13:
            _context15.t0 = req;
            _context15.t1 = "";
            _context15.next = 17;
            return getFullnameFromID(userid);

          case 17:
            _context15.t2 = _context15.sent;
            _context15.t3 = _context15.t1.concat.call(_context15.t1, _context15.t2, " sikeresen kit\xF6r\xF6lve ebb\u0151l a projectb\u0151l: ").concat(id);

            _context15.t0.flash.call(_context15.t0, "success", _context15.t3);

            res.redirect("/projects/edit/" + id);

          case 21:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function removeUserFromProject(_x28, _x29) {
    return _ref15.apply(this, arguments);
  };
}();

exports.removeUserFromProject = removeUserFromProject;

function userIsOnProject(_x30, _x31) {
  return _userIsOnProject.apply(this, arguments);
}

function _userIsOnProject() {
  _userIsOnProject = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(p, u) {
    var _yield$pool$query19, _yield$pool$query20, rows, retval, i;

    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _database["default"].query("SELECT * from projects WHERE JSON_CONTAINS(owners, ?, '$')", [u]);

          case 2:
            _yield$pool$query19 = _context16.sent;
            _yield$pool$query20 = (0, _slicedToArray2["default"])(_yield$pool$query19, 1);
            rows = _yield$pool$query20[0];
            retval = false;

            if (!rows) {
              _context16.next = 15;
              break;
            }

            i = 0;

          case 8:
            if (!(i < rows.length)) {
              _context16.next = 15;
              break;
            }

            if (!(rows[i].id == p)) {
              _context16.next = 12;
              break;
            }

            retval = true;
            return _context16.abrupt("break", 15);

          case 12:
            i++;
            _context16.next = 8;
            break;

          case 15:
            return _context16.abrupt("return", retval);

          case 16:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _userIsOnProject.apply(this, arguments);
}
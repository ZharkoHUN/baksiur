"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeago = exports.formatdate = void 0;

var timeagoa = _interopRequireWildcard(require("timeago.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var locale = function locale(number, index, totalSec) {
  // number: the time ago / time in number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [['épp most', 'épp most'], ['%s másodperccel ezelőtt', '%s másodperccel ezelőtt'], ['1 perccel ezelőtt', '1 perccel ezelőtt'], ['%s perccel ezelőtt', '%s perccel ezelőtt'], ['1 órája', '1 órája'], ['%s órája', '%s órája'], ['1 napja', '1 napja'], ['%s napja', '%s napja'], ['1 hete', '1 hete'], ['%s hete', '%hete'], ['1 hónapja', '1 hónapja'], ['%s hónapja', '%s hónapja'], ['1 éve', '1 éve'], ['%s éve', '%s éve']][index];
};

timeagoa.register('hu_HU', locale);

var timeago = function timeago(savedTimestamp) {
  return timeagoa.format(savedTimestamp, 'hu_HU') + " (".concat(formatDate(savedTimestamp, 4), ")");
};

exports.timeago = timeago;

var formatdate = function formatdate(savedTimestamp) {
  return "".concat(formatDate(savedTimestamp, 4));
};

exports.formatdate = formatdate;

function formatDate(dateObj, format) {
  var monthNames = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
  var curr_date = dateObj.getDate();
  var curr_month = dateObj.getMonth();
  curr_month = curr_month + 1;
  var curr_year = dateObj.getFullYear();
  var curr_min = dateObj.getMinutes();
  var curr_hr = dateObj.getHours();
  var curr_sc = dateObj.getSeconds();
  if (curr_month.toString().length == 1) curr_month = '0' + curr_month;
  if (curr_date.toString().length == 1) curr_date = '0' + curr_date;
  if (curr_hr.toString().length == 1) curr_hr = '0' + curr_hr;
  if (curr_min.toString().length == 1) curr_min = '0' + curr_min;

  if (format == 1) //dd-mm-yyyy
    {
      return curr_date + "-" + curr_month + "-" + curr_year;
    } else if (format == 2) //yyyy-mm-dd
    {
      return curr_year + "-" + curr_month + "-" + curr_date;
    } else if (format == 3) //dd/mm/yyyy
    {
      return curr_date + "/" + curr_month + "/" + curr_year;
    } else if (format == 4) // MM/dd/yyyy HH:mm:ss
    {
      return curr_year + "-" + curr_month + "-" + curr_date + " " + curr_hr + ":" + curr_min;
    }
}
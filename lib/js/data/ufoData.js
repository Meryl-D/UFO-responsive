"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterShapeData = filterShapeData;
exports.getDateYearData = getDateYearData;
exports.getEntriesPerYear = getEntriesPerYear;
exports.getMaxAmountRounded = getMaxAmountRounded;
exports.getRandSightings = getRandSightings;
exports.getStringYearData = getStringYearData;
exports.parseYear = void 0;

var _math = require("../lib/math.js");

var d3 = _interopRequireWildcard(require("d3"));

var _storage = require("/src/js/lib/storage.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Retransforme les chaines en date et formatte la date.
var parseTime = d3.timeParse('%m/%d/%Y %H:%M');
var dateFormat = d3.timeFormat('%Y');
var parseYear = d3.timeParse('%Y');
/*-----------------------------------------
 Nettoyage et mise en place des données
-----------------------------------------*/
// nettoie une première fois les données
// const cleanedData = allUfoData.filter(d =>
//     d.shape != null &&
//     d.comments != null &&
//     d.latitude != null &&
//     d.longitude != null &&
//     d.country === 'us' &&
//     parseTime(d.datetime) >= parseTime('01/01/1940 00:00')
// )
// permet de voir quelles formes sont les plus populaires
// const orderByOccurrence = (data, property) => {
//     let counts = {};
//     data.forEach(object => {
//         if(!counts[object[property]]) counts[object[property]] = 0;
//         counts[object[property]]++;
//     });
//     return Object.entries(counts).sort((a,b) => b[1]-a[1]);
// }
// orderByOccurrence(cleanedData, 'shape');
//  Sélectionne les données pour le top 5 des formes.
// export const ufoData = cleanedData.filter(d =>
//     d.shape === 'light' ||
//     d.shape === 'circle' ||
//     d.shape === 'triangle' ||
//     d.shape === 'unknown' ||
//     d.shape === 'fireball'
// )

exports.parseYear = parseYear;

function filterShapeData(ufoData) {
  var shape = _storage.storage.getItem('shape'); // Ne prend que les entrées avec la forme définie au préalable (sera déterminée par un clic de l'utilisateur)


  return ufoData.filter(function (d) {
    return d.shape == shape;
  });
}
/*--------------------------------------------------------
 Filtrer les données pour les marqueurs sur la carte
--------------------------------------------------------*/


function getRandSightings(shapeData) {
  var randSightings = [];

  for (var i = 1; i <= 5; i++) {
    var randIndex = (0, _math.getRandomInt)(0, shapeData.length);
    var lat = shapeData[randIndex].latitude;
    var lng = shapeData[randIndex].longitude; // Permet de ne pas avoir des marqueurs trop proches les uns des autres

    while (isTooClose(lat, lng, randSightings)) {
      randIndex = (0, _math.getRandomInt)(0, shapeData.length);
      lat = shapeData[randIndex].latitude;
      lng = shapeData[randIndex].longitude;
    }

    randSightings.push(shapeData[randIndex]);
  }

  return randSightings;
}

function isTooClose(lat, lng, array) {
  if (!array.length) return;
  var isTooClose = false;
  var i = 0;

  while (i < array.length && !isTooClose) {
    if (Math.abs(array[i].latitude - lat) < 2 || Math.abs(array[i].longitude - lng) < 2) isTooClose = true;
    i++;
  }

  return isTooClose;
}
/*--------------------------------------------------------
 Filtrage des données pour le graphe d'entrées par année
--------------------------------------------------------*/
// Fait un tableau de dates pour pouvoir ensuite les compter.


function getStringYearData(shapeData) {
  return shapeData.map(function (d) {
    return dateFormat(parseTime(d.datetime));
  });
} // Fait un tableau de dates pour pouvoir ensuite les compter.


function getDateYearData(stringYearData) {
  return stringYearData.map(function (d) {
    return parseYear(d);
  });
} // Crée un objet avec les années comme propriétés et le nombre d'entrées comme valeurs.


function countEntries(stringYearData) {
  var count = {};

  var _iterator = _createForOfIteratorHelper(stringYearData),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var year = _step.value;
      count[year] = count[year] ? count[year] + 1 : 1;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return count;
} // Crée un tableau avec pour clé l'année et pour valeur le nombre d'entrées.


function getEntriesPerYear(stringYearData) {
  var entriesPerYear = [];
  var count = countEntries(stringYearData);

  for (var _i = 0, _Object$entries = Object.entries(count); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        year = _Object$entries$_i[0],
        amount = _Object$entries$_i[1];

    entriesPerYear.push({
      'year': parseYear(year),
      'amount': amount
    });
  }

  return entriesPerYear;
} // défini le nombre d'entrées max.


function getMaxAmountRounded(stringYearData) {
  var maxRounded = Math.ceil(d3.max(Object.values(countEntries(stringYearData))) / 10) * 10;
  if (maxRounded / 10 % 2 != 0 && maxRounded < 100) maxRounded += 10;
  return maxRounded;
}
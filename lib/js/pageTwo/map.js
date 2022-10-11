"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderMap = renderMap;

var d3 = _interopRequireWildcard(require("d3"));

var _ufoData = require("/src/js/data/ufoData.js");

var _leaflet = _interopRequireDefault(require("leaflet"));

require("leaflet.heat");

var _alienPinShadow = _interopRequireDefault(require("/assets/img/alien-pin-shadow.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**--------------------------
 Carte géographique
 --------------------------*/
function renderTileLayer() {
  var map = _leaflet["default"].map('map', {
    zoomSnap: 0.25
  }).setView([51, -145], 3.5);

  var tileLayer = _leaflet["default"].tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
    minZoom: 3.5
  }).addTo(map); // défini les limites de la carte.


  var bounds = map.getBounds(); // défini les limites de la carte et l'animation quand l'utilisateur arrive au bord.

  map.setMaxBounds(bounds);
  map.on('drag', function () {
    map.panInsideBounds(bounds, {
      animate: true
    });
  }); // enlève le zoom par défaut (situé en haut à gauche) et le remplace par un zoom en bas à droite.

  map.zoomControl.remove();

  _leaflet["default"].control.zoom({
    position: 'bottomright'
  }).addTo(map);

  return map;
}
/**--------------------------
 Marqueurs et popups
 --------------------------*/


function renderMarkers(map) {
  var alienPin = _leaflet["default"].icon({
    iconUrl: _alienPinShadow["default"],
    iconSize: [23, 30],
    // size of the icon
    iconAnchor: [12, 29],
    // point of the icon which will correspond to marker's location
    popupAnchor: [0, -35] // point from which the popup should open relative to the iconAnchor

  });

  var randSightings = (0, _ufoData.getRandSightings)(); // Ajoute les marqueurs

  randSightings.forEach(function (sighting) {
    var marker = _leaflet["default"].marker([sighting.latitude, sighting.longitude], {
      icon: alienPin
    }).addTo(map);

    marker.bindPopup("\"".concat(sighting.comments, "\""));
  });
}
/**--------------------------
 Couche heatmap
 --------------------------*/


function renderHeatMapLayer(map) {
  var shapeData = (0, _ufoData.filterShapeData)();
  var heatMapArray = [];
  shapeData.forEach(function (d) {
    var heatMapPoint = {
      lat: d.latitude,
      lon: d.longitude
    };
    heatMapArray.push(heatMapPoint);
  });

  var heatMap = _leaflet["default"].heatLayer(heatMapArray, {
    radius: 15,
    blur: 10,
    minOpacity: 0.15,
    gradient: {
      0.1: '#FF33B1',
      0.5: '#16F2F2',
      0.7: '#A0FF00'
    }
  }).addTo(map);
}

function renderMap() {
  var map = renderTileLayer();
  renderMarkers(map);
  renderHeatMapLayer(map);
}
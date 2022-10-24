"use strict";

require("/src/css/index.css");

var _small_ = _interopRequireDefault(require("/data/ufo-sighting/small_500.csv"));

var _ufoData = require("/src/js/data/ufoData.js");

var _map = require("/src/js/pageTwo/map.js");

var _card = require("/src/js/pageTwo/card.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (window.location.pathname != '/') {
  var shapeData = (0, _ufoData.filterShapeData)(_small_["default"]);
  var stringYearData = (0, _ufoData.getStringYearData)(shapeData);
  (0, _map.renderMap)(shapeData);
  (0, _card.renderChart)(stringYearData);
  (0, _card.renderMovie)();
  (0, _card.renderUfoImg)(); // rend le graphe responsive

  window.addEventListener('resize', function () {
    document.querySelector('.graph').replaceChildren();
    (0, _card.renderChart)(stringYearData);
  });
}
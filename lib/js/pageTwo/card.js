"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderChart = renderChart;
exports.renderMovie = renderMovie;
exports.renderUfoImg = renderUfoImg;

var d3 = _interopRequireWildcard(require("d3"));

var _ufoData = require("/src/js/data/ufoData.js");

var _movieData = require("/src/js/data/movieData.js");

var _storage = require("/src/js/lib/storage.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

d3.formatDefaultLocale('fr_FR');
/**--------------------------------
 Graphe du nombre d'entrées par an
 --------------------------------*/

function renderChart() {
  var maxRounded = (0, _ufoData.getMaxAmountRounded)();
  var dateYearData = (0, _ufoData.getDateYearData)();
  var entriesPerYear = (0, _ufoData.getEntriesPerYear)(); // Défini les dimensions et marges du graphe

  var margin = {
    top: 7,
    right: 12,
    bottom: 16,
    left: 31
  },
      width = parseInt(d3.select('.graph').style('width'), 10) - margin.left - margin.right,
      height = parseInt(d3.select('.graph').style('height'), 10) - margin.top - margin.bottom; // Ajoute le svg au container

  var svg = d3.select(".graph").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(".concat(margin.left, ",").concat(margin.top, ")")); // Ajoute l'axe X --> format de date

  var x = d3.scaleTime().domain(d3.extent(dateYearData, function (d) {
    return d;
  })).range([0, width]);
  svg.append("g").attr("transform", "translate(0,".concat(height, ")")).call(d3.axisBottom(x).tickValues(x.ticks(4).concat(x.domain()))); // Ajoute l'axe Y

  var y = d3.scaleSqrt().domain([0, maxRounded]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y).tickValues(y.ticks(4).concat(maxRounded))); // Ajoute le graphe

  svg.append("path").datum(entriesPerYear).attr("fill", "#1BAFB1").attr("stroke", "#11686A").attr("stroke-width", 1.5).attr("d", d3.area().x(function (d) {
    return x(d.year);
  }).y0(y(0)).y1(function (d) {
    return y(d.amount);
  })); //Ajoute le film au graphe

  addMovieToChart(svg, x, y, maxRounded);
}
/**--------------------------------
 Infos sur le film
 --------------------------------*/


function renderMovie() {
  var movieInfoArr = getMovieInfoArr();
  var movieInfo = movieInfoArr[0]; // Ajoute les infos sur le film dans la card

  var movieContainer = d3.select('.movie');

  var moviePoster = require("/assets/img/".concat(movieInfo.img));

  movieContainer.select('.movie-poster').attr('src', moviePoster);
  movieContainer.select('.title').text(movieInfo.title);
  movieContainer.select('.synopsis').text(movieInfo.synopsis);
  movieContainer.select('.release-year').text(movieInfo.releaseYear);
  movieContainer.select('.pg').text(movieInfo.pg);
  movieContainer.select('.duration').text(movieInfo.duration);
  movieContainer.select('.director').text(movieInfo.director);
  movieContainer.select('.stars').text(movieInfo.stars);
}

function getMovieInfoArr() {
  var shape = _storage.storage.getItem('shape');

  return _movieData.movieData.filter(function (movie) {
    return movie.shape == shape;
  });
}

function addMovieToChart(svg, x, y, maxRounded) {
  var movieInfoArr = getMovieInfoArr(); // Ajoute le trait sur le graphe

  svg.selectAll("myLine").data(movieInfoArr).enter().append("line").attr("x1", function (d) {
    return x((0, _ufoData.parseYear)(d.releaseYear));
  }).attr("x2", function (d) {
    return x((0, _ufoData.parseYear)(d.releaseYear));
  }).attr("y1", function (d) {
    return y(maxRounded / 2);
  }).attr("y2", y(0)).attr("stroke", "#fff"); // Ajoute le titre sur le graphe

  svg.selectAll(".text").data(movieInfoArr).enter().append("text").attr("class", "label").attr("x", function (d) {
    return x((0, _ufoData.parseYear)(d.releaseYear));
  }).attr("y", function (d) {
    return y(maxRounded / 2 + 60);
  }) //.attr("dy", ".75em")
  .attr("text-anchor", "middle").attr("fill", "#fff").attr("font-size", ".7em").text(function (d) {
    return d.title;
  });
}

function renderUfoImg() {
  var movieInfo = getMovieInfoArr()[0];

  var ufoImg = require("/assets/img/".concat(movieInfo.ufoImg));

  d3.select('.ufo-img').attr('src', ufoImg);
}
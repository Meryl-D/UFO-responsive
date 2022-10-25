"use strict";

require("/src/css/index.css");

var _storage = require("/src/js/lib/storage.js");

var _map = require("/src/js/pageTwo/map.js");

var _card = require("/src/js/pageTwo/card.js");

var shapes = document.querySelectorAll('.shape-btn');
shapes.forEach(function (shape) {
  shape.addEventListener('click', function (evt) {
    _storage.storage.setItem('shape', evt.currentTarget.dataset.shape);

    window.location.pathname = '/map.html';
  });
});
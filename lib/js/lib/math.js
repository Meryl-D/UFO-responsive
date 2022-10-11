"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomInt = getRandomInt;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
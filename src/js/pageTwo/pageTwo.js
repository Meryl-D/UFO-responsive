import { renderMap } from './map.js';
import { storage } from '../lib/storage.js';
import { renderChart, renderMovie } from './card.js';

storage.setItem('shape', 'triangle');

renderMap();
renderChart();
renderMovie();

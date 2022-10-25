import '/src/css/index.css';
import { storage } from '/src/js/lib/storage.js';
import { renderMap } from '/src/js/pageTwo/map.js';
import { renderChart, renderMovie, renderUfoImg } from '/src/js/pageTwo/card.js';

const shapes = document.querySelectorAll('.shape-btn');
shapes.forEach(shape => {
    shape.addEventListener('click', evt => {
        storage.setItem('shape', evt.currentTarget.dataset.shape);
        window.location.pathname = '/map.html';

    });
});
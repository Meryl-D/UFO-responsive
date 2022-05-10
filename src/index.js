import '/src/css/index.css';
import { renderMap } from '/src/js/pageTwo/map.js';
import { storage } from '/src/js/lib/storage.js';
import { renderChart, renderMovie, renderUfoImg } from '/src/js/pageTwo/card.js';
import * as d3 from 'd3';

const shapes = document.querySelectorAll('.shape-btn');
console.log(shapes);
shapes.forEach(shape => {
    shape.addEventListener('click', evt => {
        storage.setItem('shape', evt.currentTarget.dataset.shape);
        window.location.pathname = '/map.html';

    });
});

if (window.location.pathname != '/') {

    renderMap();
    renderChart();
    renderMovie();
    renderUfoImg();

    // rend le graphe responsive
    window.addEventListener('resize', () => {
        document.querySelector('.graph').replaceChildren();
        renderChart();
    })

}
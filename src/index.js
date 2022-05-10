import '/src/css/index.css';
import { renderMap } from '/src/js/pageTwo/map.js';
import { storage } from '/src/js/lib/storage.js';
import { renderChart, renderMovie, renderUfoImg } from '/src/js/pageTwo/card.js';
import * as d3 from 'd3';

d3.select('body').on('click', evt => {
    if (!evt.target.classList.contains('shape-btn')) return;
    storage.setItem('shape', evt.target.dataset.shape);
    window.location.pathname = '/map.html';
})

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
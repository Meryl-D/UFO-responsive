import '/src/css/index.css';
import { renderMap } from '/src/js/pageTwo/map.js';
import { storage } from '/src/js/lib/storage.js';
import { renderChart, renderMovie } from '/src/js/pageTwo/card.js';

if (window.location.pathname != '/') {

    storage.setItem('shape', 'triangle');

    renderMap();
    renderChart()
    renderMovie();

    // rend le graphe responsive
    window.addEventListener('resize', () => {
        document.querySelector('.graph').replaceChildren();
        renderChart();
    })

}
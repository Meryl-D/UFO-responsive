import '/src/css/index.css';
import { renderMap } from '/src/js/pageTwo/map.js';
import { renderChart, renderMovie, renderUfoImg } from '/src/js/pageTwo/card.js';

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
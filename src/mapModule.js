import '/src/css/index.css';
import ufoData from '/data/ufo-sighting/small_500.csv';
import { filterShapeData, getStringYearData } from "/src/js/data/ufoData.js";
import { renderMap } from '/src/js/pageTwo/map.js';
import { renderChart, renderMovie, renderUfoImg } from '/src/js/pageTwo/card.js';

console.log(ufoData)

if (window.location.pathname != '/') {

    const shapeData = filterShapeData(ufoData)
    const stringYearData = getStringYearData(shapeData)

    renderMap(shapeData);
    renderChart(stringYearData);
    renderMovie();
    renderUfoImg();

    // rend le graphe responsive
    window.addEventListener('resize', () => {
        document.querySelector('.graph').replaceChildren();
        renderChart(stringYearData);
    })

}
import * as d3 from 'd3';
import { getMaxAmountRounded, getEntriesPerYear, getDateYearData } from "/src/js/data/ufoData.js";
import { movieData } from '/src/js/data/movieData.js';
import { storage } from '/src/js/lib/storage.js';

/**--------------------------------
 Changement dynamique du titre
 --------------------------------*/
//  const shapeCaps = shape.toUpperCase();
//  console.log(shapeCaps);

// d3.select(".movie h2 em")
//     .text(`${shapeCaps}`);


d3.formatDefaultLocale('fr_FR');

/**--------------------------------
 Graphe du nombre d'entrées par an
 --------------------------------*/
export function renderChart() {
    const maxRounded = getMaxAmountRounded();
    const dateYearData = getDateYearData();
    const entriesPerYear = getEntriesPerYear();

    // Défini les dimensions et marges du graphe
    const margin = { top: 7, right: 12, bottom: 16, left: 31 },
        width = parseInt(d3.select('.graph').style('width'), 10) - margin.left - margin.right,
        height = parseInt(d3.select('.graph').style('height'), 10) - margin.top - margin.bottom;

    // Ajoute le svg au container
    const svg = d3.select(".graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Ajoute l'axe X --> format de date
    const x = d3.scaleTime()
        .domain(d3.extent(dateYearData, d => d))
        .range([0, width])

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickValues(x.ticks(4).concat(x.domain())));

    // Ajoute l'axe Y
    const y = d3.scaleSqrt()
        .domain([0, maxRounded])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y).tickValues(y.ticks(4).concat(maxRounded)));

    // Ajoute le graphe
    svg.append("path")
        .datum(entriesPerYear)
        .attr("fill", "#1BAFB1")
        .attr("stroke", "#11686A")
        .attr("stroke-width", 1.5)
        .attr("d", d3.area()
            .x(d => x(d.year))
            .y0(y(0))
            .y1(d => y(d.amount))
        )
    
    //Ajoute le film au graphe
    addMovieToChart(svg, x, y, maxRounded);
    
}


/**--------------------------------
 Infos sur le film
 --------------------------------*/
export function renderMovie() {
    const movieInfoArr = getMovieInfoArr();
    const movieInfo = movieInfoArr[0];

    // Ajoute les infos sur le film dans la card
    const movieContainer = d3.select('.movie');
    const moviePoster = require(`../../../assets/img/${movieInfo.img}`);

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
    const shape = storage.getItem('shape');
    return movieData.filter(movie => movie.shape == shape);

}

function addMovieToChart(svg, x, y, maxRounded) {
    const movieInfoArr = getMovieInfoArr();

    // Ajoute le trait sur le graphe
    svg.selectAll("myLine")
        .data(movieInfoArr)
        .enter()
        .append("line")
        .attr("x1", d => x(d.releaseYear))
        .attr("x2", d => x(d.releaseYear))
        .attr("y1", y(0))
        .attr("y2", d => y(maxRounded / 2))
        .attr("stroke", "#fff");

    // Ajoute le titre sur le graphe
    svg.selectAll(".text")
        .data(movieInfoArr)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => x(d.releaseYear))
        .attr("y", d => y(maxRounded / 2 + 60))
        //.attr("dy", ".75em")
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", ".7em")
        .text(d => d.title);
}
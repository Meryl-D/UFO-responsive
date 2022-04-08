import * as d3 from 'd3';
import { ufoData } from "/src/js/ufoData.js";

/**--------------------------------
 Graphe du nombre d'entrées par an
 --------------------------------*/

const shape = 'fireball';

// Retransforme les chaines en date et formatte la date.
const parseTime = d3.timeParse('%m/%d/%Y %H:%M');
const dateFormat = d3.timeFormat('%Y');
const parseYear = d3.timeParse('%Y');

// Ne prend que les entrées avec la forme définie au préalable (sera déterminée par un clic de l'utilisateur)
const shapeData = ufoData.filter(d => d.shape == shape);

// Fait un tableau de dates pour pouvoir ensuite les compter.
const stringYearData = shapeData.map(d => dateFormat(parseTime(d.datetime)));
const dateYearData = stringYearData.map(d => parseYear(d));

// Compte le nombre d'entrée par année.
const count = {};

for (const year of stringYearData) {
    count[year] = count[year] ? count[year] + 1 : 1;
}
// Crée un tableau avec pour clé l'année et pour valeur le nombre d'entrées.
const entriesPerYear = [];

for (const [year, amount] of Object.entries(count)) {
    entriesPerYear.push({
        'year' : parseYear(year),
        'amount' : amount
    })
}

// Défini les dimensions et marges du graphe
const margin = { top: 0, right: 0, bottom: 20, left: 30 },
    width = parseInt(d3.select('.graph-container').style('width'), 10) - margin.left - margin.right,
    height = parseInt(d3.select('.graph-container').style('height'), 10) - margin.top - margin.bottom;

// Ajoute le svg au parent
const svg = d3.select(".graph-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);



// Ajoute l'axe X --> it is a date format
const x = d3.scaleTime()
    .domain(d3.extent(dateYearData, d => d))
    .range([0, width]);
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

// Add Y axis
const y = d3.scaleLinear()
    .domain([0, d3.max(entriesPerYear, d => d.amount)])
    .range([height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

// Add the area
svg.append("path")
    .datum(entriesPerYear)
    .attr("fill", "#cce5df")
    .attr("stroke", "#69b3a2")
    .attr("stroke-width", 1.5)
    .attr("d", d3.area()
        .x(d => x(d.year))
        .y0(y(0))
        .y1(d => y(d.amount))
    )
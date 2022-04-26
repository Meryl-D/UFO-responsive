import * as d3 from 'd3';
import { maxAmountRounded, entriesPerYear, dateYearData } from "/src/js/ufoData.js";

/**--------------------------------
 Graphe du nombre d'entrées par an
 --------------------------------*/
d3.formatDefaultLocale('fr_FR');

// Défini les dimensions et marges du graphe
const margin = { top: 10, right: 15, bottom: 20, left: 35 },
    width = parseInt(d3.select('.graph-container').style('width'), 10) - margin.left - margin.right,
    height = parseInt(d3.select('.graph-container').style('height'), 10) - margin.top - margin.bottom;

// Ajoute le svg au parent
const svg = d3.select(".graph-container")
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
    .domain([0, maxAmountRounded])
    .range([height, 0]);

svg.append("g")
    .call(d3.axisLeft(y).tickValues(y.ticks(4).concat(maxAmountRounded)));

// Ajoute le graphe
svg.append("path")
    .datum(entriesPerYear)
    .attr("fill", "#1BAFB1")
    .attr("stroke", "#0E5758")
    .attr("stroke-width", 1.5)
    .attr("d", d3.area()
        .x(d => x(d.year))
        .y0(y(0))
        .y1(d => y(d.amount))
    )
import * as d3 from 'd3';
import { maxAmountRounded, entriesPerYear, dateYearData, parseYear, shape } from "/src/js/ufoData.js";

/**--------------------------------
 Changement dynamique du titre
 --------------------------------*/
//  const shapeCaps = shape.toUpperCase();
//  console.log(shapeCaps);

// d3.select(".movie h2 em")
//     .text(`${shapeCaps}`);


/**--------------------------------
 Graphe du nombre d'entrées par an
 --------------------------------*/
d3.formatDefaultLocale('fr_FR');

// Défini les dimensions et marges du graphe
const margin = { top: 7, right: 12, bottom: 16, left: 29 },
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
    .domain([0, maxAmountRounded])
    .range([height, 0]);

svg.append("g")
    .call(d3.axisLeft(y).tickValues(y.ticks(4).concat(maxAmountRounded)));

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

const exempleData = [{
    title: "E.T. the Extra-Terrestrial",
    releaseDate: parseYear("1982"),
    duration: "1h55m",
    synopsis: "Un enfant prend son courage à deux mains et décide d'aider un ami extra-terrestre à s'échapper de la Terre pour rentrer sur sa planète natale.",
    director: "Steven Spielberg"
}]

svg.selectAll("myLine")
    .data(exempleData)
    .enter()
    .append("line")
    .attr("x1", d => x(d.releaseDate))
    .attr("x2", d => x(d.releaseDate))
    .attr("y1", d => y(maxAmountRounded / 2))
    .attr("y2", y(0))
    .attr("stroke", "#fff");

svg.selectAll(".text")
    .data(exempleData)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => x(d.releaseDate))
    .attr("y", d => y(maxAmountRounded / 2 + 60))
    //.attr("dy", ".75em")
    .attr("text-anchor", "middle")
    .attr("fill", "#fff")
    .attr("font-size", ".7em")
    .text(d => d.title);
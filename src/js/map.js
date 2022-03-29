import * as d3 from 'd3';
import { ufoData } from "/src/js/ufoData.js";

// Crée le svg
const svg = d3.select("#map")
    .append('svg')
    .attr('width', 800)
    .attr('height', 500);

const width = +svg.attr("width"),
    height = +svg.attr("height");

// Charge les données externes
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(mapData => {

    // Filtre les données
    const usaArray = mapData.features.filter(d => d.properties.name == "USA") // utilisé pour le dessin de la carte
    const usa = usaArray[0]; // juste l'objet, pour centrer sur les USA via fitSize
    const borderingCountries = mapData.features.filter(d => d.properties.name == 'Canada' || d.properties.name == 'Mexico')

    // Carte et projection
    let projection = d3.geoMercator().fitSize([width, height], usa);

    // Dessine la carte des USA
    svg.append("g")
        .selectAll("path")
        .data(usaArray)
        .enter()
        .append("path")
        .attr("fill", "#232D58")
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .style("stroke", "none")

    // Dessine la carte des pays limitrophes
    svg.append("g")
        .selectAll("path")
        .data(borderingCountries)
        .enter()
        .append("path")
        .attr("fill", "#1D2649")
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .style("stroke", "none")
})

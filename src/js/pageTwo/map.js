import * as d3 from 'd3';
import { ufoData } from "/src/js/ufoData.js";

/**--------------------------
 Carte de chaleur
 --------------------------*/
const width = parseInt(d3.select('#map').style('width'), 10)
const height = parseInt(d3.select('#map').style('height'), 10)

// Crée le svg
const svg = d3.select("#map")
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// Charge les données externes
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(mapData => {

    // Filtre les données
    const usa = mapData.features.filter(d => d.properties.name == "USA") // utilisé pour le dessin de la carte
    const borderingCountries = mapData.features.filter(d => d.properties.name == 'Canada' || d.properties.name == 'Mexico')

    // Carte et projection
    let projection = d3.geoMercator().fitSize([width, height], usa[0]); // seul l'objet est accepté

    // Dessine la carte des USA
    svg.append("g")
        .selectAll("path")
        .data(usa)
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

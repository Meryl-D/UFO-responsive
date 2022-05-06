import * as d3 from 'd3';
import { shapeData, randSightings } from "/src/js/ufoData.js";
import L from 'leaflet';
import 'leaflet.heat';
import alienIcon from '/assets/img/alien-pin-shadow.png';

/**--------------------------
 Carte géographique
 --------------------------*/
const map = L.map('map', {
    zoomSnap: 0.25
}).setView([51, -145], 3.5);

const mapLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
    minZoom: 3.5,
}).addTo(map);


// défini les limites de la carte.
const bounds = map.getBounds();
console.log(bounds);

// défini les limites de la carte et l'animation quand l'utilisateur arrive au bord.
map.setMaxBounds(bounds);
map.on('drag', function () {
    map.panInsideBounds(bounds, { animate: true });
});

// enlève le zoom par défaut (situé en haut à gauche) et le remplace par un zoom en bas à droite.
map.zoomControl.remove();

L.control.zoom({
    position: 'bottomright'
}).addTo(map);


/**--------------------------
 Marqueurs et popups
 --------------------------*/
const alienPin = L.icon({
    iconUrl: alienIcon,

    iconSize:     [23, 30], // size of the icon
    iconAnchor:   [12, 29], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
});

// Ajoute les marqueurs
randSightings.forEach(sighting => {
    let marker = L.marker([sighting.latitude, sighting.longitude], {icon: alienPin}).addTo(map);
    marker.bindPopup(`\"${sighting.comments}\"`);
})


/**--------------------------
 Couche heatmap
 --------------------------*/
const heatMapArray = [];

shapeData.forEach(d => {
    let heatMapPoint = {
        lat: d.latitude,
        lon: d.longitude
    };

    heatMapArray.push(heatMapPoint);
});

const heatMap = L.heatLayer(heatMapArray, {
    radius: 15,
    blur: 10,
    minOpacity: 0.15,
    gradient: {0.1: '#FF33B1', 0.5: '#16F2F2', 0.7: '#A0FF00'}
}).addTo(map);
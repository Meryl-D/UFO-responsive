import allUfoData from '/data/ufo-sighting/complete.csv';
import * as d3 from 'd3';

export const shape = 'circle';


/*-----------------------------------------
 Nettoyage et mise en place des données
-----------------------------------------*/

// nettoie une première fois les données
const cleanedData = allUfoData.filter(d => 
    d.shape != null && 
    d.comments != null && 
    d.latitude != null &&
    d.longitude != null &&
    d.country === 'us'
)

const orderByOccurrence = (data, property) => {
    let counts = {};

    data.forEach(object => {
        if(!counts[object[property]]) counts[object[property]] = 0;
        counts[object[property]]++;
    });

    return Object.entries(counts).sort((a,b) => b[1]-a[1]);
}

// permet de voir quelles formes sont les plus populaires
orderByOccurrence(cleanedData, 'shape');

//  Sélectionne les données pour le top 5 des formes.
export const ufoData = cleanedData.filter(d => 
    d.shape === 'light' || 
    d.shape === 'circle' || 
    d.shape === 'triangle' || 
    d.shape === 'unknown' || 
    d.shape === 'fireball'
)


/*--------------------------------------------------------
 Filtrage des données pour le graphe d'entrées par année
--------------------------------------------------------*/

// Retransforme les chaines en date et formatte la date.
const parseTime = d3.timeParse('%m/%d/%Y %H:%M');
const dateFormat = d3.timeFormat('%Y');
const parseYear = d3.timeParse('%Y');

// Ne prend que les entrées avec la forme définie au préalable (sera déterminée par un clic de l'utilisateur)
export const shapeData = ufoData.filter(d => d.shape == shape);

// Fait un tableau de dates pour pouvoir ensuite les compter.
const stringYearData = shapeData.map(d => dateFormat(parseTime(d.datetime)));
export const dateYearData = stringYearData.map(d => parseYear(d));

// Crée un objet avec les années comme propriétés et le nombre d'entrées comme valeurs.
const count = {};

for (const year of stringYearData) {
    count[year] = count[year] ? count[year] + 1 : 1;
}

// Crée un tableau avec pour clé l'année et pour valeur le nombre d'entrées.
export const entriesPerYear = [];

for (const [year, amount] of Object.entries(count)) {
    entriesPerYear.push({
        'year' : parseYear(year),
        'amount' : amount
    })
}

// défini le nombre d'entrées max.
export const maxAmountRounded = Math.ceil(d3.max(Object.values(count)) / 100) * 100;
import * as d3 from 'd3';
import ufoData from '../data/ufo-sighting/complete.csv';

const noEmptyData = ufoData.filter(d => d.shape !== null && d.comments !== null && d.country === 'us')

const orderByOccurrence = (data, property) => {
    let counts = {};

    data.forEach(value => {
        if(!counts[value[property]]) counts[value[property]] = 0;
        counts[value[property]]++;
    });
    console.log(counts);
    // return counts;


    return Object.entries(counts).sort((a,b) => b[1]-a[1]);
}

const shapeFrequency = orderByOccurrence(noEmptyData, 'shape');
console.log(shapeFrequency);
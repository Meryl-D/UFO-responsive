import allUfoData from '/data/ufo-sighting/complete.csv';

// nettoie une première fois les données
const cleanedData = allUfoData.filter(d => 
    d.shape !== null && 
    d.comments !== null && 
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
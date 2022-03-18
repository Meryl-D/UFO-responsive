# VisualDon | E.T. où es-tu ?

## Wireframe
https://www.figma.com/file/QrFxMZ8hBlbmSt66Qh2uM9/UFO?node-id=0%3A1

## Thématique

### Contexte
Nous avons choisi 2 jeux de données :
* dataset d'IMDB - https://datasets.imdbws.com. Ces données ont été créées par IMDB pour répertorier les films sur la plateforme.
* UFO Sightings - https://www.kaggle.com/NUFORC/ufo-sightings. L'organisation américaine National UFO Reporting Center (NUFORC) a récoltée ces données pour les analyser.

### Description
* dataset d'IMDB - il y a plusieurs dataset différents (titre, équipe, épisode, etc.). Il sont tous au format TSV. Nous allons principalement nous intéresser au dataset title.basics. Celui-ci contient les données suivantes :
  * tconst - id
  * titleType - format (e.g. film, série, épisode, etc.)
  * primaryTitle - titre le plus utilisé (promotionnel)
  * originalTitle - titre original
  * isAdult - indique si c'est un film pour adulte ou non
  * startYear - date de sortie
  * endYear - date de fin pour les séries
  * runtimeMinutes – temps
  * genres - genre du média

* UFO Sightings - format CSV
  * datetime - heure à laquelle l'événement s'est produit
  * city - ville
  * state - état
  * country - pays
  * shape - forme de l'OVNI
  * duration(seconds) - durée de l'apparition (secondes)
  * duration(hours/minutes) - durée de l'apparition (heures/minutes)
  * comments - description de l'événement par la personne qui l'a vue
  * datePosted - date à laquel l'utilisateur a posté sur le site du NUFORC
  * latitude - latitude

### But
Une partie de la population mondiale, en particulier les américains, sont fascinés par les OVNIs.  Nous sommes curieuses de découvrir si les descriptions que les personnes ont fait correspondent à l’OVNI d’un film en particulier, par exemple la forme. Ainsi, la sortie du film et l’observation réelle pourraient avoir un lien. Il serait intéressant également de voir s'il y a plus de gens qui ont vu des OVNIs après la sortie d'un film sur le sujet.

### Références
Pour les données IMDB il y a, bien entendu, la plateforme elle-même. En ce qui concerne UFO Sightings, nous avons trouvé une carte interactive https://www.arcgis.com/apps/webappviewer/index.html?id=ddda71d5211f47e782b12f3f8d06246e.

# Scrapping firecenter for helping OSM mapping

Récupération des centres de secours pour aider à cartographier dans OpenStreetMap

![Screenshot](/img/capture-ecran-viewer_1.png)

En bleu les données scrappées, en rouge les données OSM (point ou way).

## But

Aider à la saisie des centres de secours dans OSM.

## Fichiers

Attention les géolocalisation sont imprécises, résultat du géocodate la position n'est là qu'à titre indicatif, il faut impérativement valider la présence du centre de secours en observation directe (l'idéal) ou avec l'ortho-photo.

* CSV : https://github.com/eric-pommereau/scrap-french-fire-center/raw/master/datas/sdis_centers_final_csv.csv
* Shapefile : https://github.com/eric-pommereau/scrap-french-fire-center/raw/master/datas/sdis_centers_final_shape.zip
* GeoJson : https://github.com/eric-pommereau/scrap-french-fire-center/raw/master/datas/sdis_centers_2006_10_12.geojson
* SQL dump postgreSQL : https://github.com/eric-pommereau/scrap-french-fire-center/raw/master/sql/dump_sdis_center.sql

## Différentes appellations

Source : http://www.forum-pompier.com/sujet31121.html

* CPI: Centre de Première Intervention
* CS: Centre de Secours
* CSP: Centre de Secours Principal
* CPIR: Centre de Première Intervention Rural
* CPII: Centre de Première Intervention Intégré
* CI: Centre d'Intervention
* CA: Centre Avancé
* CIS: Centre d'Incendie et de Secours
* CIP: Centre d'Intervention Principal

## Liens

* Anuaire SDIS (pompiercenter) : https://www.pompiercenter.com/annuaire-sdis.php
* Page OSM Tag:amenity=fire_station : http://wiki.openstreetmap.org/wiki/FR:Tag:amenity%3Dfire_station


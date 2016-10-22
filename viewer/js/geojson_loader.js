var geojsonCircleAnnuSDISOptions = {radius : 6, fillColor : "", color : "blue", weight : 2, opacity : 1, fillOpacity : 0.1};

function loadGeoJsonAnnuaireLayer(map) {
    $.ajax({
        url : './datas/sdis_centers_2016_10_12.geojson',
        context : {
            'map' : map
        }
    }).done(function(datas) {
        context = $(this);
        featureGroup = context[0].featureGroup;
        map = context[0].map;

        featureGroup = L.geoJSON( jQuery.parseJSON(datas), {
            pointToLayer : function(feature, latlng) {
                return L.circleMarker(latlng, geojsonCircleAnnuSDISOptions);
            }, 
            onEachFeature: function(feature, layer) {
                if (feature.properties && feature.properties.adresse) {
                    layer.bindPopup(
                        feature.properties.nom_dept + '<br />' +
                        feature.properties.groupement + '<br />' +
                        feature.properties.centre + '<br />' + 
                        feature.properties.adresse + '<br /><br />' +
                        "type de géocodage : " + feature.properties.result_type 
                    );
                }
            }
        }).addTo(map);
    });
}

function loadGeoJsonTopLayer(map) {
    $.ajax({
        url : './datas/cs_top.geojson',
        context : {
            'map' : map
        }
    }).done(function(datas) {
        var geojsonMarkerOptions = {
            radius : 6,
            fillColor : "",
            color : "green",
            weight : 2,
            opacity : 1,
            fillOpacity : 0.1
        };

        var layerAnnuaire = L.geoJSON( jQuery.parseJSON(datas), {
            pointToLayer : function(feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }, 
            onEachFeature: function(feature, layer) {
                if (feature.properties && feature.properties.adresse) {
                    layer.bindPopup(
                        feature.properties.nature + '<br />' +
                        feature.properties.origine
                    );
                }
            }
        }).addTo(map);        
    });
}
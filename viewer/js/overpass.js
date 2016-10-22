var SW_lat = '47.879512';
var SW_lng = '-5.5178833';
var NE_lat = '49.7138246';
var NE_lng = '1.532592773';

// 46.773730730079414, -6.822509765625001, 48.98382212608505, -0.5712890625000001
var tplRequest = '[out:json][timeout:25];(' + 'node["amenity"="fire_station"]({SW_lat}, {SW_lng}, {NE_lat}, {NE_lng});' + 'way["amenity"="fire_station"]({SW_lat}, {SW_lng}, {NE_lat}, {NE_lng});' + 'relation["amenity"="fire_station"]({SW_lat}, {SW_lng}, {NE_lat}, {NE_lng});' + ');out body;>;out skel qt;';

var defaultCircleOptions = { 
    radius : 6, fillColor : "", color : "red", weight : 2, opacity : 1, fillOpacity : 0.1
};

var pointCircleOptions = { 
    radius : 10, fillColor : "blue", color : "red", weight : 2, opacity : 1, fillOpacity : 0.2
};

var wayCircleOptions = { 
    radius : 10, fillColor : "bleue", color : "red", weight : 2, opacity : 1, fillOpacity : 0.2
};


/**
 * @param {L.Map} map
 * @param {L.FeatureGroup} featureGroup
 */
function addOverpassApiGroupLayer(map, featureGroup) {

    featureGroup.clearLayers();

    var endpoint = 'http://overpass-api.de/api/interpreter?';
    //var endpoint = './datas/sample-bretagne.json';
    var bounds = map.getBounds();
    SW_lat = bounds.getSouth(),
    SW_lng = bounds.getWest();
    NE_lat = bounds.getNorth(),
    NE_lng = bounds.getEast();

    // Handle current bbox
    var request = tplRequest.replace('{SW_lat}', SW_lat, 'g').replace('{SW_lng}', SW_lng, 'g').replace('{NE_lat}', NE_lat, 'g').replace('{NE_lng}', NE_lng, 'g');

    $.ajax({
        type : "POST",
        crossDomain : true,
        url : endpoint,
        data : request,
        dataType : 'json',
        context : {
            'featureGroup' : featureGroup,
            'map' : map
        }
    }).done(function(datas) {
        // console.log(datas.elements);
        context = $(this);
        featureGroup = context[0].featureGroup;
        map = context[0].map;
        
        for (var i = 0; i < datas.elements.length; i++) {

            element = datas.elements[i];

            if (element.type === 'node' && element.tags != undefined && element.tags.amenity === 'fire_station') {
                circle = L.circleMarker(L.latLng(element.lat, element.lon), pointCircleOptions);
                var popupText = generateOSMPopup(element);
                featureGroup.addLayer(circle.bindPopup(popupText));
            } else if (element.type === 'way' && element.tags != undefined && element.tags.amenity === 'fire_station') {
                
                polygon = way2polygon(element,datas.elements);
                featureGroup.addLayer(polygon);
                
                circle = L.circleMarker(polygon.getBounds().getCenter(), wayCircleOptions);
                var popupText = generateOSMPopup(element);
                featureGroup.addLayer(circle.bindPopup(popupText));
            }
        }
    });

}

/**
 * Récupérer le node correspondant au nodeID
 * 
 * @param {Object} nodeID
 * @param {Object} elements
 */
function getNode(nodeID, elements) {
    for (var i = 0; i < elements.length; i++) {
        if(elements[i].id === nodeID) return elements[i];
    }
    return false;
}

/**
 * Reconstituer un polygon à partir d'un way
 * 
 * @param {Object} way
 * @param {Object} elements
 */
function way2polygon(way, elements) {
    
    // Parcourir les nodes du way (nodes)
    // console.log(way, elements);
    var aLatLng = [];
    for (var i = 0; i < way.nodes.length; i++) {
        nodeID = way.nodes[i];
        // console.log(nodeID);
        node = getNode(nodeID, elements);
        aLatLng.push([node.lat, node.lon]);
    }
    return L.polygon(aLatLng);
}

/**
 * Itérer sur tous les tags de l'élément
 * 
 * @param {Object} element
 */
function generateOSMPopup(element) {
    // console.log(element);
    var popup = '';
    popup += element.type + ' : <a href="http://www.openstreetmap.org/' + element.type + '/' + element.id + '">' + element.id + '</a><br /><br />';
    
    for (tag in element.tags) {
        popup += tag + '=' + element.tags[tag] + '<br />';
    }
    
    return popup;
}

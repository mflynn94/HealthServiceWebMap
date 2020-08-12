

// Script contains most functions used within the project for adding controls, layers, or providing additional functionality to the map.


// Add base maps
function define_basemaps(basemap_name, basemap_style_string, ) {
    return basemap_name = L.mapboxGL({
    style: 'https://s3-eu-west-1.amazonaws.com/tiles.os.uk/v2/styles/open-zoomstack-'+ basemap_style_string + '/style.json',
    accessToken: 'no-token'
    });
}


// Function which alters the default style of the Marker Cluster Icons. 
// Create different size of icons depending on the number of features within the cluster
// New tags are created and are designed within the CSS file

function changeClusterIcon(cluster, service_string) {
    var childCount = cluster.getChildCount()
    var icon_size;
    var c = ' marker-cluster-';
    if (childCount < 10) {
        c += 'small ' + service_string;
        icon_size = new L.Point(32,32)
    } 
    else if (childCount < 100) {
        c += 'medium ' + service_string;
        icon_size = new L.Point(40,40)
    } 
    else {
        c += 'large ' + service_string;
        icon_size = new L.Point(45,45)
    }
    return L.divIcon({ html: '<div><b><span>' + childCount + '</span></div>', 
    className: 'marker-cluster' + c, iconSize: icon_size });
}

// Function which defines the cluster groups. 
// As above, this changes per service

function define_clusterGroups (group_name, service) {
    return group_name = L.markerClusterGroup({
        spiderfyOnMaxZoom: true, 
        showCoverageOnHover: false, 
        iconCreateFunction: function (cluster) {
            return changeClusterIcon(cluster, service)}
        })
};
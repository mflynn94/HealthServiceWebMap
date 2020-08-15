

// Script contains most functions used within the project for adding controls, layers, or providing additional functionality to the map.


// FUNCTION TO ADD BASEMAPS 
function defineBasemaps(basemapStyleString) {
    var basemap = L.mapboxGL({
    style: 'https://s3-eu-west-1.amazonaws.com/tiles.os.uk/v2/styles/open-zoomstack-'+ basemapStyleString + '/style.json',
    accessToken: 'no-token'
    });
    return basemap;
}


// Function which alters the default style of the Marker Cluster Icons. 
// Create different size of icons depending on the number of features within the cluster
// New tags are created and are designed within the CSS file

function changeClusterIcon(cluster, serviceString) {
    var clusterAmount = cluster.getChildCount()
    var iconSize;
    var cssClass = ' marker-cluster-';
    if (clusterAmount < 10) {
        cssClass += 'small ' + serviceString;
        iconSize = new L.Point(32,32)
    } 
    else if (clusterAmount < 100) {
        cssClass += 'medium ' + serviceString;
        iconSize = new L.Point(40,40)
    } 
    else {
        cssClass += 'large ' + serviceString;
        iconSize = new L.Point(45,45)
    }
    return L.divIcon({ html: '<div><b><span>' + clusterAmount + '</span></div>', 
    className: 'marker-cluster' + cssClass, iconSize: iconSize });
}

// Function which defines the cluster groups. 
// As above, this changes per service

function defineClusterGroups (layer, service) {
        var layer = L.markerClusterGroup({
        spiderfyOnMaxZoom: true, 
        showCoverageOnHover: false, 
        iconCreateFunction: function (cluster) {
            return changeClusterIcon(cluster, service)}
        })
        return layer;
};


function buttonToggleSidebar() {
    if (sidebar.isVisible() == true) {
        $("#sidebar").hide().fadeIn('slow');
    } else {
        sidebar.open();
    }
    sidebar.setContent(sidebarDefaultContent)
    };

function buttonToggleSidebarInfo() {
    if (sidebar.isVisible() == true) {
        $("#sidebar").hide().fadeIn('slow');
    } else {
        sidebar.open();
    }
    sidebar.setContent("Information and Sources will be listed here")
    };

    var userLocation;




// Create a function for saving the sidebar content as a PDF
// This is to enable users to save details of the services they may attend
function saveAsPDF(Name) {
    var opt = {
        margin:       1,
        filename:     Name + '.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

    var element = document.getElementById('sidebar');
    
    var elementHTML = element.outerHTML;
    var element2 = elementHTML.replace("Save as PDF", '');
    
    html2pdf().set(opt).from(element2).save()
}


  
function filterData (service, fp, layer) {
        if (service == Dentists) {
            if (fp.Saturday == fp.Saturday) layer.addTo(dentistsSaturday)
        }
        else if (service == Pharmacies) {
            if (fp.Saturday == fp.Saturday) layer.addTo(pharmaciesSaturday);
            for (i in pharmacyServiceList) {if (fp.Services == fp.Services && fp.Services.includes(pharmacyServiceList[i])) layer.addTo(pharmacyServiceLayers[i]);}
        }
        else if (service == Opticians) {if (fp.Saturday == fp.Saturday) layer.addTo(opticiansSaturday);}
        else if (service == Hospitals) {
            AE = fp['A&E'];
            if (AE == AE) layer.addTo(hospitalsAandE);
        }
        else if (service == SHClinics) {
            for (i in shServiceList) {if (fp.Services == fp.Services && fp.Services.includes(shServiceList[i])) layer.addTo(shServiceLayers[i]);}
        }    
};


// create a function for styling points and adding them to the map
function addIcon(figureURL) {
    return L.icon({
        iconUrl: figureURL,
        iconSize: [30, 30],
        iconAnchor: [15,15],
        popupAnchor: [0, -15]
    });
};

// create a function for adding larger icons to the map
function bigIcon(figureURLBig) {
    return L.icon({
        iconUrl: figureURLBig,
        iconSize: [40, 40],
        iconAnchor: [20,20],
        popupAnchor: [0, -15]
    });
};

    var highlightedIcon = L.icon({
        iconUrl: "MapFigures/GPs_FA_highlight.png",
        iconSize: [40, 40],
        iconAnchor: [20,20],
        popupAnchor: [0, -15]
    });

// Create a function to set map view based on a specific feature
function setMapView(e) {
    if (map.getZoom() < 13) {
        map.setView(e.latlng,13)
    } else {
        map.setView(e.latlng, map.getZoom())
    }
}

// create custom options for pop up information
var popUpCustomOptions ={'minWidth': '200','className' : 'custom'}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function addPanel(panelId, panelName){
    if(document.getElementById(panelId) == null){
        return sidebar.addPanel(panelName)
    };
}


// FUNCTION FOR ADDING ALL THE DATASETS ****
function addGeoJSONData (service, figure, figureBig, figureHighlight, layerGroup, paneId, panelId, panelName) {
        geojsonLayer = L.geoJSON(service, {
        
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: addIcon(figure)});
        },

        onEachFeature: function(feature, layer) {
           
           var fp = feature.properties;
            layer.bindPopup(setPopUpContent(fp, panelId) , popUpCustomOptions);

        
            layer.on('mouseover', function(e) {
                if ((e.target._icon.currentSrc).includes(figure)) {
                    e.target.setIcon(bigIcon(figureBig));//marker object is overwritten in the for loop each time                
                } else {}
            }),
        
            layer.on('mouseout', function(e) {
                //console.log(e.target._icon)
                if ((e.target._icon.currentSrc).includes(figureBig)) {
                    e.target.setIcon(addIcon(figure));//marker object is overwritten in the for loop each time                
                } else {}
            }),
            
            layer.on('click', function (e) { 
               
                //gpsGeojson.resetStyle(layer);
                //e.target.setIcon(addIcon(figure));
                if ((e.target._icon.currentSrc).includes(figureHighlight)) {
                    e.target.setIcon(bigIcon(figureBig))
                    console.log(e.target._icon)
                    //e.target.setIcon(addIcon(figure));
                } else { 
                    
                    gpsGeojson.eachLayer(function(layer){
                        gpsGeojson.resetStyle(layer);
                        layer.setIcon(addIcon(figure))});
                    e.target.setIcon(bigIcon(figureHighlight));};
                
                clearSidebar();
                var sidebarDiv = document.getElementById("sidebar");
                
                addPanel(panelId, panelName);
                sidebar.enablePanel('click');

                if (hasClass(sidebarDiv,'collapsed')) {
                    this.openPopup();
                } else {this.closePopup(),sidebar.open(panelId), $("#" + panelId).hide().fadeIn('slow')};
                
                updateSidebar(fp, figure, paneId);

                setMapView(e)});
            
            filterData(service, fp, layer)
        }
    
            
    }).addTo(layerGroup);
    return geojsonLayer
}


// FUNCTION WHICH CHANGES THE DEFAULT DESIGN ON THE BASEMAP CONTROL

function designBasemapControl() {
    var customControl = document.getElementsByClassName("leaflet-control-layers-toggle")[0];
    customControl.innerHTML = "<div class=control-content><i class='fa fa-map fa-1x' aria-hidden='true'></i></div>";
    document.getElementsByClassName("leaflet-control-layers-list")[0].style.textAlign = "left";
    
    radioInputs = document.getElementsByTagName("input")
    for (var i in radioInputs) {
        if(radioInputs[i].type == 'radio') {
            radioInputs[i].style.float = "left";
        } else {}
    }
};


// FUNCTION WHICH CHANGES THE DEFAULT DESIGN ON THE SERVICE LAYER CONTROLS

function designServiceFilter() {
    var filter = document.getElementsByClassName("leaflet-right")[0];
    var filterLayer = filter.getElementsByClassName("leaflet-control-layers-toggle")[0]
    filterLayer.innerHTML = "<div class = control-content-filter>Filter results</div>";
    filterLayer.style.width = "142px";
    filterLayer.style.height = "30px";
    filterLayer.style.fontSize = "1.1em";
    filterLayer.style.color= "navy";
};


/* Create a function that is performed when one of the service buttons is clicked, in the side bar or in the legend control
   this initially will ensure the map is not blurred out (as it is in the beginning)
   */

function addLayer(serviceLayer, serviceControl, panelName, panelId) {
            
    var mapPane = document.getElementsByClassName("leaflet-pane leaflet-map-pane");
    mapPane[0].style.filter = 'blur(0px)';
    mapPane[0].style.webkitfilter = 'blur(0px)';
    
    var layerControlList = [dentistControl, opticiansControl, pharmaciesControl, hospitalsControl, shClinicsControl];
    
    map.eachLayer(function (layer) {
        if ((layer !== lc._layer) && (layer !== outdoorBasemap) && (layer !== nightBasemap) && (layer !== lightBasemap) && (layer !== roadBasemap)) {
        map.removeLayer(layer)
        }
    })

    sidebar.close();
    var control;
    for (control in layerControlList) {
        map.removeControl(layerControlList[control]);
    }

    map.addLayer(serviceLayer);

    if (serviceControl) {
        serviceControl.addTo(map);
        designServiceFilter()
    }

    
   return;
};


function clearSidebar () {
    var panelIdList = ['gpPanel', 'dentistPanel', 'opticiansPanel', 'pharmaciesPanel', 'hospitalsPanel', 'shClinicsPanel']
    var sidebarStatus = document.getElementById("sidebar");

    for (i in panelIdList) {
        if(document.getElementById(panelIdList[i]) != null){
            sidebar.removePanel(panelIdList[i]);

        } else {}
        }
    
    if (hasClass(sidebarStatus,'collapsed')) {}
    else { sidebar.open('home') };
    }




// CREATE FUNCTIONS FOR THE DROP DOWN SERVICE BUTTON
// Content inspired by W3 tutorial on dropdown boxes.
// On click of each services, run the same function that is used for the service buttons on the sidebar

function addServiceDropdown() {
    var div = L.DomUtil.create('div', 'Service Dropdown');
    div.innerHTML = "<div class='dropdown'>" +
        "<button onclick='myFunction()' class='dropbtn'>Change Service</button>" +
        "<div id='myDropdown' class='dropdown-content'>" +
        "<a href='#' onClick='addLayer(gpsLayer, null, panelContentGPs, " + '"gpPanel"' + ")'>GPs</a>" +
        "<a href='#' onClick='addLayer(dentistsLayer, dentistControl, panelContentDentists, " + '"dentistPanel"' + ")'>Dentists</a>" +
        "<a href='#' onClick='addLayer(opticiansLayer, opticiansControl, panelContentOpticians, " + '"opticiansPanel"' + ")'>Opticians</a>" +
        "<a href='#' onClick='addLayer(pharmaciesLayer, pharmaciesControl, panelContentPharmacies, " + '"pharmaciesPanel"' + ")'>Pharmacies</a>" +
        "<a href='#' onClick='addLayer(hospitalsLayer, hospitalsControl, panelContentHospitals, " + '"hospitalsPanel"' + ")'>Hospitals</a>" +
        "<a href='#' onClick='addLayer(shClinicsLayer, shClinicsControl, panelContentSHClinic, " + '"shClinicsPanel"' + ")'>SH Clinics</a></div></div></div>" 
        return div;
}

/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    }

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
        }
        }
    }
}


// FUNCTIONS TO REMOVE AND ADD THE GEOCODE MARKERS WHEN MAKING A SEARCH

function removeGeocodeMarker() {
    // if the layer exists and the map has it, remove it
    if (geocoderMarker && map.hasLayer(geocoderMarker)) { 
        map.removeLayer(geocoderMarker);
    }
}

function addGeocodeMarker(e) {

    if (geocoderMarker) {removeGeocodeMarker()};

    console.log(e.geocode);
    searchLatlng = e.geocode.center
    geocoderMarker = L.marker(searchLatlng).addTo(map);
    geocoderMarker.bindTooltip(e.geocode.html).openTooltip();
    map.setView(e.geocode.center, 15);
}






// SET DESIGN OF THE INFO BUTTON CONTROL 

/*
function designInfoButtonControl() {
    
    var filter = document.getElementsByClassName("leaflet-bottom")[0];
    var filterLayer = filter.getElementsByClassName("easy-button-container")[0];
    var filterLayer2 = filter.getElementsByClassName("easy-button-button")[0];
    
    filterLayer.style.paddingLeft = "5px"; 
    filterLayer.style.paddingBottom = "5px"; 
    filterLayer.style.border = "none";

    filterLayer2.style.borderRadius = "20px";
    filterLayer2.style.border = "1px solid rgba(0,0,0,0.2)";
    filterLayer2.boxShadow = "0 1px 3px rgba(0,0,0,0.4)";
    filterLayer2.style.paddingLeft = "5px";
    filterLayer2.style.paddingBottom = "5px";
    
}
*/

/*
    // store user coordinates
function onLocationfound(e) {
    layerList = [];

    for (i in gpsLayer._featureGroup._layers) {
        //console.log(gpsLayer._featureGroup._layers[i]);
        layerList.push(gpsLayer._featureGroup._layers[i])
    }
    console.log(layerList);
    userLocation = e.latlng;
    console.log(userLocation);
    
    var closestPoints = L.GeometryUtil.nClosestLayers(map, layerList, userLocation, 3)
    console.log(closestPoints);

    for (i in closestPoints) {
        console.log(closestPoints[i].e.Name)
    }
}*/


/*// test 
function test (layer) {
    GPs_layer.eachLayer(function(layer){
        if(layer.feature.properties.Website){
            GPs_layer.removeLayer(layer)
            GPs_layer.refreshClusters()
        }
    })
}*/

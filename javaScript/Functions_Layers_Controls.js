

/*
Student Number: 2485907
Date started: 05/08/2020
Status: Completed
Script Purpose:  Contains functions for adding the extra functionality and interactivity for map layers, controls and geographical data points                
*/


/** FUNCTIONS TO CREATE ALL THE REQUIRED LAYERS      **/

// FUNCTION TO RETRIEVE THE OS BASE MAPS
// uses mapbox GL plugin

function defineBasemaps(basemapStyleString) {
    var basemap = L.mapboxGL({         // retrieve OS basemap using mapboxGL plugon
    style: 'https://s3-eu-west-1.amazonaws.com/tiles.os.uk/v2/styles/open-zoomstack-'+ basemapStyleString + '/style.json',
    accessToken: 'no-token'
    });
    return basemap;
}

    // FUNCTION TO ALTER THE STYLE OF THE MARKER CLUSTERS BASED ON SIZE AND SERVICE
    // Create different size of icons depending on the number of features within the cluster
    // Each classes design can be found in the style.CSS file
    // Uses leaflet-market-cluster plugin

function changeClusterIcon(cluster, serviceString) {
    var iconSize;
    var cssClass = ' marker-cluster-';
    var clusterAmount = cluster.getChildCount()             // retrieve number of features in clusters

    if (clusterAmount < 10) {                               // if cluster is less than 10
        cssClass += 'small ' + serviceString;               // create small service css class
        iconSize = new L.Point(32,32)                       // create small icon
    } 
    else if (clusterAmount < 100) {                         // if cluster is between 10 and 100
        cssClass += 'medium ' + serviceString;              // create medium service css class
        iconSize = new L.Point(40,40)                       // create medium icon
    } 
    else {                                                  // if cluster is over 100
        cssClass += 'large ' + serviceString;               // create large service css class
        iconSize = new L.Point(45,45)                       // create large point
    }
    return L.divIcon({ html: '<div><b><span>' + clusterAmount + '</span></div>', 
    className: 'marker-cluster' + cssClass, iconSize: iconSize });          // create new cluster icon depending on the resulting css class and icon size
}

    // FUNCTION TO DEFINE LAYER GROUPS AS CLUSTERS
    // Used when defining each layer, including sub categories as layers
function defineClusterGroups (service) {
        var layer = L.markerClusterGroup({                  
        spiderfyOnMaxZoom: true,                            // ensures spiderfy feature is enabled
        showCoverageOnHover: false,                         // don't show bounding polygons
        iconCreateFunction: function (cluster) {            // change the icon to defined styles based on the service
            return changeClusterIcon(cluster, service)}
        })
        return layer;                                       // return layer group
};





/**  FUNCTIONS USED FOR THE MAPS CONTROLS     **/


    // FUNCTION WHICH CHANGES THE DEFAULT DESIGN ON THE BASEMAP CONTROL

function designBasemapControl() {
    // store relevant classes in variables
    var customControl = document.getElementsByClassName("leaflet-control-layers-toggle")[0];
    
    // edit the current style and html of the filter
    customControl.innerHTML = "<div class=control-content><i class='fa fa-map fa-1x' aria-hidden='true'></i></div>";
    document.getElementsByClassName("leaflet-control-layers-list")[0].style.textAlign = "left";
    
    // loop through map radio inputs to change alignment of radio boxes
    radioInputs = document.getElementsByTagName("input")
    for (var i in radioInputs) {
        if(radioInputs[i].type == 'radio') {
            radioInputs[i].style.float = "left";
        } else {}
    }
};


    // FUNCTION WHICH CHANGES THE DEFAULT DESIGN ON THE SERVICE LAYER CONTROLS

function designServiceFilter() {
    // store relevant classes in variables
    var filter = document.getElementsByClassName("leaflet-right")[0];
    var filterLayer = filter.getElementsByClassName("leaflet-control-layers-toggle")[0]

    // edit the current style and html of the filter
    filterLayer.innerHTML = "<div class = control-content-filter>Filter results</div>";
    filterLayer.style.width = "142px";
    filterLayer.style.height = "30px";
    filterLayer.style.fontSize = "13px";
    filterLayer.style.color= "navy";
};


    //   FUNCTION PERFORMED TO ADD A LAYER AND ITS CORRESPONDING CONTROL
    //   used within the dropdown control and on the sidebar buttons

function addLayer(serviceLayer, serviceControl, serviceString) {
    
    // define a list of possible controls
    var control;
    var layerControlList = [dentistControl, opticiansControl, pharmaciesControl, hospitalsControl, shClinicsControl]; 
    
    // remove all layers execpt for the basemap layers and location layer
    map.eachLayer(function (layer) {
        if ( (layer !== lc._layer) && (layer !== outdoorBasemap) && (layer !== nightBasemap) && (layer !== lightBasemap) && (layer !== roadBasemap)) {
        map.removeLayer(layer)
        }
    });
   
    for (control in layerControlList) {
        map.removeControl(layerControlList[control]);  // remove all controls
    }

    if (serviceControl) {   //check if the service has a control (as GPs do not)
        serviceControl.addTo(map);  // add control to map
        designServiceFilter();   // alter the filter from leaflets default design settings
    }

    map.addLayer(serviceLayer);  //add the required service to the map
    var dropdownName = document.getElementById("dropdown-name");   
    dropdownName.innerHTML = serviceString;

    sidebar.close();  // close sidebar
    return;
};


    // FUNCTIONS FOR THE DROPDOWN SERVICE BUTTONs
    // Following 3 functions sourced and adapted from W3 tutorial on dropdown boxes (w3, 2020).
    // https://www.w3schools.com/howto/howto_js_dropdown.asp.  Accessed August 2020.
    // On click of each services, run the same function that is used for the service buttons on the sidebar. Add layer and remove other layers.

function addServiceDropdown() {
    var div = L.DomUtil.create('div', 'Service Dropdown');                                      // Create a new leaflet control div
    div.innerHTML = "<div class='dropdown'>" +                                                  // Set divs html
        "<button onclick='toggleDropdown()' class='dropbtn'><div id='dropdown-name'></div>Change Service&nbsp;&nbsp;<i class='fas fa-mouse-pointer'></i></button>" +          // on click of button - show the list options
        "<div id='myDropdown' class='dropdown-content'>" +
        "<a href='#' onClick='addLayer(gpsLayer, null, " + '"GPs -"' + ")'>GPs</a>" +           // onclick of each button, perform the AddLayer function for that service
        "<a href='#' onClick='addLayer(dentistsLayer, dentistControl, " + '"Dentists -"' + ")'>Dentists</a>" +
        "<a href='#' onClick='addLayer(opticiansLayer, opticiansControl, " + '"Opticians -"' + ")'>Opticians</a>" +
        "<a href='#' onClick='addLayer(pharmaciesLayer, pharmaciesControl, " + '"Pharmacies -"' + ")'>Pharmacies</a>" +
        "<a href='#' onClick='addLayer(hospitalsLayer, hospitalsControl, " + '"Hospitals -"' + ")'>Hospitals</a>" +
        "<a href='#' onClick='addLayer(shClinicsLayer, shClinicsControl, " + '"SH Clinics -"' + ")'>SH Clinics</a></div></div></div>" 
        return div;
}

 // When the user clicks on the button, toggle between hiding and showing the dropdown content 
function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");                    // show all classes of the element 'myDropdown'
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {                                            // if user clicks NOT on the dropbtn class
        var dropdowns = document.getElementsByClassName("dropdown-content");            // retrieve dropdown-content div
        var i;
        for (i = 0; i < dropdowns.length; i++) {                                        // for each dropdown item in dropdown-content
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {                              // if item class display is show
                openDropdown.classList.remove('show');                                  // hide it
            }
        }
    }
}



    // FUNCTIONS TO REMOVE AND ADD THE GEOCODE MARKERS WHEN MAKING A SEARCH

var geocoderMarker;                                             // define global variable

// Function to add a new geocoder marker
function addGeocodeMarker(e) {
    removeGeocodeMarker();                                      // remove any exisiting geocoder marker  
    var searchLatlng = e.geocode.center                         // Store latlng of search in variable
    geocoderMarker = L.marker(searchLatlng).addTo(map);         // add a marker to the map at this point
    geocoderMarker.bindTooltip(e.geocode.html).openTooltip();   // add a label of location
    map.setView(e.geocode.center, 15);                          // set the map's view on the marker at zoom level 15
    return geocoderMarker;
}

// function to remove geocode marker
function removeGeocodeMarker() {
    
    if (geocoderMarker && map.hasLayer(geocoderMarker)) {      // if the layer exists and the map has it, remove it
        map.removeLayer(geocoderMarker);
    }
}





/* ALL FUNCTIONS REQUIRED WHEN REQUESTING THE GEOJSON DATASETS      */


    //  FUNCTION TO FILTER DATASETS AND ADD POINTS TO THE RELEVANT LAYER GROUPS  
    //  used in addGeojsonData
    //  fp refers to feature.properties, which can only be referenced when adding the data

function filterData (service, fp, layer) {
    // define variables for loading in the data and filtering it appropriately
    var pharmacyServiceList = ['Emergency Contraception','Free Condoms','Minor Ailments Scheme','Needle Exchange','Nicotine Replacement Therapy','Palliative Care Network','Supervised Buprenorphine Service','Supervised Methadone Supply','Treatment For Impetigo','Treatment for Urinary Tract Infection']
    var pharmacyServiceLayers = [pharmaciesEC,pharmaciesFC,pharmaciesMAS,pharmaciesNE,pharmaciesNRT,pharmaciesPCN,pharmaciesSBS,pharmaciesSMS,pharmaciesTfI,pharmaciesTUTI]
    var shServiceList = ['Contraception', 'Counselling and Support Services','Drop-in', 'Emergency Contraception', 'Family Planning', 'Free Condoms', 'Gender Identity', 'GUM Clinic', 'Hepatitis', 'HIV Counselling', 'Men Who Have Sex With Men', 'Pregnancy Testing', 'Psychosexual Service', 'Sexual Assault or Rape', 'Termination of Pregnancy and Referral', 'Testing for HIV', 'Testing for Sexually Transmitted Infections', 'Young People']
    var shServiceLayers = [shClinicsCont, shClinicsCSS, shClinicsDrop, shClinicsEC, shClinicsFP, shClinicsFC, shClinicsGI, shClinicsGUM, shClinicsHep, shClinicsHV, shClinicsMM,shClinicsPT,shClinicsPS, shClinicsSR, shClinicsTOPAR, shClinicsTHV, shClinicsTSTI, shClinicsYP]
                                                                           // define AE variable for hospitals

    if (service == Dentists) {                                                                      //  if service is dentists
        if (fp.Saturday == fp.Saturday) layer.addTo(dentistsSaturday)                               //  if Saturday in feature properties is non NaN, add to correct layer group
    }
    else if (service == Pharmacies) {                                                               //  if service is pharmacies
        if (fp.Saturday == fp.Saturday) layer.addTo(pharmaciesSaturday);                            //  if Saturday is not NaN, add to group
        if (fp.Sunday == fp.Sunday) layer.addTo(pharmaciesSunday);          
        for (i in pharmacyServiceList) {                                                            // for each pharmacy service
            if (fp.Services == fp.Services && fp.Services.includes(pharmacyServiceList[i])) {       // if pharamcy services are non NaN, and includes the specific service
                layer.addTo(pharmacyServiceLayers[i])}                                              // add to relevant layer
        }
    }
    else if (service == Opticians) {                                                                // if service is Opticians
        if (fp.Saturday == fp.Saturday) layer.addTo(opticiansSaturday);
        if (fp.Sunday == fp.Sunday) layer.addTo(opticiansSunday);
    }
    
    else if (service == Hospitals) {                                                                // if service is hospitals
        if (fp.Services == fp.Services) layer.addTo(hospitalsAandE);                                                  // if it is an A&E, add to relevant layer
    }

    else if (service == SHClinics) {                                                                // if service is an SH Clinic
        for (i in shServiceList) {
            if (fp.Services == fp.Services && fp.Services.includes(shServiceList[i])) {             // for each service, if it is in the services list
                layer.addTo(shServiceLayers[i]);                                                    // add to relevant group
            }
        }
    }    
};


    // FUNCTION SETS MAP VIEW ON SPECIFIC FEATURE
    // used in addGeoJSONData

function setMapView(e) {                                    
    if (map.getZoom() < 13) {                                   // if zoom level is less than 13
        map.setView(e.latlng,13)                                // set view at latlng and zoom level to 13
    } else {                                                    // if zoom is more than 13
        map.setView(e.latlng, map.getZoom())                    // set view at latlng and current zoom level
    }
}


    // FUNCTION TO CHECK THE CLASS OF AN ELEMENT
    // code taken directly from https://stackoverflow.com/questions/36860914/toggle-leaflet-sidebar-v2
    // used in project to check whether the sidebar is open or closed (has a collapsed class)
    // used in addGeoJSONData

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}


    // ICONS 

    // FUNCTION ADDS ICON TO THE MAP

function addIcon(figureURL) {
    return L.icon({
        iconUrl: figureURL,
        iconSize: [30, 30],
        iconAnchor: [15,15],
        popupAnchor: [0, -15]
    });
};

    //  FUNCTION ADDS LARGER ICON TO THE MAP

function addBigIcon(figureURLBig) {
    return L.icon({
        iconUrl: figureURLBig,
        iconSize: [40, 40],
        iconAnchor: [20,20],
        popupAnchor: [0, -15]
    });
};

    // FUNCTION TO SET THE ICON TO LARGE ICON
    // used in addGeoJSONData

function setBigIcon (e, figure, figureBig) {
    var iconSrc = e.target._icon.currentSrc;                // store current url of figure in variable
    if ((iconSrc).includes(figure)) {                       // if icon is the small figure (& not highlighted)
        e.target.setIcon(addBigIcon(figureBig));            // set the big icon               
    };
};

    // FUNCTION TO SET THE ICON BACK TO SMALL ICON
    // used in addGeoJSONData

function setSmallIcon(e, figure, figureBig) {
    var iconSrc = e.target._icon.currentSrc;                // store current url of figure in variable
    if ((iconSrc).includes(figureBig)) {                    // if icon source is the large figure (& not highlighted)
        e.target.setIcon(addIcon(figure));                  // set the small icon        
    };
};

    // FUNCTION WHICH RESETS LAYER STYLES
    // restores original icon in each layer
    // used in clearSidebar() and on map click

function resetLayerStyles() {
    // create list of geojson layers
    var geojsonList = [gpsGeojson, dentistsGeojson, pharmaciesGeojson, opticiansGeojson, hospitalsGeojson, shClinicsGeojson]
    var figureList = [gpDefaultFigure, dentistDefaultFigure, pharmaciesDefaultFigure, opticiansDefaultFigure, hospitalsDefaultFigure, shClinicsDefaultFigure]
    for (key in geojsonList) {                              
        geojsonList[key].eachLayer(function(layer){   // for each layer      
            layer.setIcon(addIcon(figureList[key]))   // set default icon
        });
    }
}   
        
    // FUNCTION TO EITHER ADD HIGHLIGHT FOR FEATURE
    // used in add GeoJSON Data

function setHighlight(e, figureHighlight) {                                                                           
    e.target.setIcon(addBigIcon(figureHighlight));          // set icon to highlighted figure
};




/*// test 
function test (layer) {
    GPs_layer.eachLayer(function(layer){
        if(layer.feature.properties.Website){
            GPs_layer.removeLayer(layer)
            GPs_layer.refreshClusters()
        }
    })
}*/

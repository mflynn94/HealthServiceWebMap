
/*
Student Number: 2485907
Date started: 18/07/2020
Status: Completed
Script Purpose:     Main javaScript file for the web map. It is responsible for everything that can be viewed on the web page. 
                    It creates the layers, initialises the map, sidebar & controls, and reads the geographical data. 
                    All additional functions used in initialisation of the layers, map controls and and data is found in Function_Layers_Controls.js  
                    All additional functions used in relation to the sidebar or pop up content is found in Functions_Sidebar_Popups.js           
*/

/*  ESTABLISH BASE MAPS
    Uses defineBasemaps() function from Functions_Layers_Controls.js
    Create basemaps for Ordnance Surveys Light, Night, Outdoor and Road Basemap. */

var lightBasemap = defineBasemaps('light');
var nightBasemap = defineBasemaps('night');
var outdoorBasemap = defineBasemaps('outdoor');
var roadBasemap = defineBasemaps('road');


/*  CREATE LAYER GROUPS 
    Uses defineClusterGrup function from Functions_Layers_Controls.js
    These will include each service and each sub category for services to enable filtering via layer controls */

var gpsLayer = defineClusterGroups('gp'),
    
    dentistsLayer = defineClusterGroups('dentist'), 
    dentistsSaturday = defineClusterGroups('dentist'),
    
    opticiansLayer = defineClusterGroups('optician'),
    opticiansSaturday = defineClusterGroups('optician'), 
    opticiansSunday = defineClusterGroups('optician'),

    pharmaciesLayer = defineClusterGroups('pharmacy'),
    pharmaciesSaturday = defineClusterGroups('pharmacy'), 
    pharmaciesSunday = defineClusterGroups('pharmacy'), 
    pharmaciesEC = defineClusterGroups('pharmacy'),
    pharmaciesFC = defineClusterGroups('pharmacy'),
    pharmaciesMAS = defineClusterGroups('pharmacy'),
    pharmaciesNE = defineClusterGroups('pharmacy'),
    pharmaciesNRT = defineClusterGroups('pharmacy'),
    pharmaciesPCN = defineClusterGroups('pharmacy'),
    pharmaciesSBS = defineClusterGroups('pharmacy'),
    pharmaciesSMS = defineClusterGroups('pharmacy'),pharmaciesTfI = defineClusterGroups('pharmacy'),pharmaciesTUTI = defineClusterGroups('pharmacy'),

    shClinicsLayer = defineClusterGroups('shclinic'),
    shClinicsCont = defineClusterGroups('shclinic'),
    shClinicsCSS = defineClusterGroups('shclinic'),
    shClinicsDrop = defineClusterGroups('shclinic'),
    shClinicsEC = defineClusterGroups('shclinic'),
    shClinicsFP = defineClusterGroups('shclinic'),
    shClinicsFC = defineClusterGroups('shclinic'),
    shClinicsGI = defineClusterGroups('shclinic'),
    shClinicsGUM = defineClusterGroups('shclinic'),
    shClinicsHep = defineClusterGroups('shclinic'),
    shClinicsHV = defineClusterGroups('shclinic'),
    shClinicsMM = defineClusterGroups('shclinic'),
    shClinicsPT = defineClusterGroups('shclinic'),
    shClinicsPS = defineClusterGroups('shclinic'),
    shClinicsSR = defineClusterGroups('shclinic'),
    shClinicsTOPAR = defineClusterGroups('shclinic'),
    shClinicsTHV = defineClusterGroups('shclinic'),
    shClinicsTSTI = defineClusterGroups('shclinic'),
    shClinicsYP = defineClusterGroups('shclinic'),

    hospitalsLayer = defineClusterGroups('hospital'),
    hospitalsAandE = defineClusterGroups('hospital');



/*  DEFINE DICTIONARIES CONTAINING EACH LAYER GROUP, TO BE USED FOR CREATING THE LAYER CONTROLS
    Dictionary keys correspond to the name that will be shown on the control of the map. They value contains the layer group. */

var baseMaps = {                                         // store base maps 
    "Light": lightBasemap,
    "Night": nightBasemap,
    "Outdoors": outdoorBasemap,
    "Road" : roadBasemap
};

var dentistFilterLayers = {                              // store separate dentist layers
"<b>All</b>": dentistsLayer,
"<i>Open Saturdays</i>": dentistsSaturday
}

var opticianFilterLayers = {                             // store separate dentist layers
    "All": opticiansLayer,
    "<i>Open Saturdays</i>": opticiansSaturday,
    "<i>Open Sundays</i>": opticiansSunday
}

var pharmaciesFilterLayers = {                           // store separate pharmacy layers
    "<b>All</b>": pharmaciesLayer, 
    "<i>Open Saturdays</i>": pharmaciesSaturday,
    "<i>Open Sundays</i>": pharmaciesSunday,
    "Emergency Contraception": pharmaciesEC,
    "Free Condoms": pharmaciesFC,
    "Minor Ailments Scheme": pharmaciesMAS,
    "Needle Exchange": pharmaciesNE,
    "Nicotine Replacement Therapy": pharmaciesNRT,
    "Palliative Care Network": pharmaciesPCN,
    'Supervised Buprenorphine Service': pharmaciesSBS,
    "Supervised Methadone Supply": pharmaciesSMS,
    "Treatment for Impetigo": pharmaciesTfI,
    "Treatment for Urinary Tract Infection":pharmaciesTUTI
}

var hospitalsFilterLayers = {                            // store separate hospital layers
    "<b>All</b>": hospitalsLayer,
    "A&E and Minor Injuries" : hospitalsAandE,
}

var shClinicsFilterLayers = {                           // store separate sh clinic layers
    "<b>All</b>": shClinicsLayer,
    "Contraception": shClinicsCont,
    "Counselling and Support Services": shClinicsCSS,
    "Drop-in": shClinicsDrop,
    "Emergency Contraception": shClinicsEC,
    "Family Planning": shClinicsFP,
    "Free Condoms": shClinicsFC,
    "Gender Identity": shClinicsGI,
    "GUM Clinic": shClinicsGUM,
    "Hepatitis": shClinicsHep,
    "HIV Counselling": shClinicsHV,
    "Men Who Have Sex With Men": shClinicsMM,
    "Pregnancy Testing": shClinicsPT,
    "Psychosexual Service": shClinicsPS,
    "Sexual Assault or Rape" : shClinicsSR,
    "Termination of Pregnancy and Referral": shClinicsTOPAR,
    "Testing for HIV": shClinicsTHV,
    "Testing for STIs": shClinicsTSTI,
    "Young People": shClinicsYP
}


/*  DEFINE CONTROLS FOR BASEMAPS AND EACH OF THE SEPARATE LAYERS
    Uses Leaflets in built control feature  */

var basemapControl = L.control.layers(baseMaps, null, {position: 'bottomleft'});            // Positioned at bottom left of the map
var dentistControl = L.control.layers(dentistFilterLayers, null);                           // Control uses default settings of top right and collapsed, added via drop down control or sidebar button
var opticiansControl = L.control.layers(opticianFilterLayers, null);                        // ""
var pharmaciesControl = L.control.layers(pharmaciesFilterLayers, null);                     // ""
var hospitalsControl = L.control.layers(hospitalsFilterLayers, null);                       // ""
var shClinicsControl = L.control.layers(shClinicsFilterLayers, null);                       // ""


/* DEFINE VARIABLES FOR THE DEFAULT ICONS TO BE USED ON THE MAP */

var gpDefaultFigure = 'Images/GPs_FA_30.png'
var dentistDefaultFigure = 'Images/Dentists_FA_30.png'
var pharmaciesDefaultFigure = 'Images/Pharmacies_FA_30.png'
var opticiansDefaultFigure = 'Images/Opticians_FA_30.png'
var hospitalsDefaultFigure = 'Images/Hospitals_FA_30.png'
var shClinicsDefaultFigure = 'Images/SHClinics_FA_30.png'




/*  INITIALISE MAP */
    
var map = L.map('map', {
    center: [ 55.8652, -4.45 ],                                         // set initial view to Glasgow area
    zoom: 11,                                                           // set initial zoom to 11
    minZoom: 7,                                                         // set min zoom to 7
    maxZoom: 20,                                                        // set max zoom to 20
    maxBounds: [[ 49.84 , -8.74 ], [ 60.9, 1.96 ]],                     // establish max bounds
    layers: [outdoorBasemap]                                            // initialise map with just the OS outdoors basemap
});



/*  INITIALISE SIDEBAR
    Functionality for dynamic sidebar content found in Functions_sidebar_popups.js
    */

var sidebar = L.control.sidebar({
    autopan: false,                 // does not pan map on open and close
    closeButton: true,              // option for user to close sidebar
    container: 'sidebar',           // id 
    position: 'left',               // appears at left side of map
}).addTo(map);

//  Set up initial sidebar 
sidebar.addPanel(panelContent);             // add home panel
sidebar.addPanel(clearSidebarButton);       // add clear button
sidebar.disablePanel('click')               // disable clear button while there is nothing to clear
sidebar.addPanel(panelContentInfo);         // add information panel

// Set a timeout on the sidebar so that it appears just after page load        
setTimeout(function () {
    sidebar.open('home');
}, 500)  



/* ADD ALL CONTROLS TO THE MAP      */

// ADD SCALE BAR
L.control.scale({
    position: 'bottomright'
}).addTo(map);

// ADD ZOOM CONTROL
map.zoomControl.setPosition('bottomright'); 

// ADD ATTRIBUTION
map.attributionControl.addAttribution('Contains OS data &copy; Crown copyright and database rights 2018'); // add attribution to the map

// ADD BASEMAP LAYER CONTROL

basemapControl.addTo(map);     // Basemap control added to map
designBasemapControl();        // alter default design of the basemap control


// ADD GEOCODER SEARCH BAR CONTROL

var geocoder = L.Control.geocoder({
    position: 'topleft',                            //  place in top left of map
    defaultMarkGeocode: false,                      //  disable default marker
    placeholder: 'Search location or postcode...'   //  text that shows on use
}).addTo(map);

geocoder.on('markgeocode', function(e) {            // action performed when a search is made
    addGeocodeMarker(e);                            // remove any previous marker and add a new one
})

// ADD DROPDOWN FOR USERS TO CHANGE SERVICES
// **drop down contains functions for adding all layers and their corresponding controls**

var serviceDropdown = L.control({position: 'topright'});
serviceDropdown.onAdd = function (map) {return addServiceDropdown()}
serviceDropdown.addTo(map);





// ADD USER LOCATION CONTROL

var lc = L.control.locate({
    position:'topleft',                        //  place at top left of map
}).addTo(map);          


    /* DEFINE MAP ON CLICK INTERACTION     */

map.on('click', function(e){        // on click of the map
    resetLayerStyles();             // reset layer styles to ensure no markers are highlighted
    removeGeocodeMarker();          // remove a geocoder marker if one is present
})



/*  LOAD ALL DATA AND ADD TO VARIOUS LAYER GROUPS
    set icons for services and each features mouseover, mouseout and click functionality. */

//  function for adding all the datasets ****    

function addGeoJSONData (service, figure, figureBig, figureHighlight, layerGroup, faIcon, serviceName) {
    geojsonLayer = L.geoJSON(service, {                                             // retrieve geoJSON
        
        pointToLayer: function (feature, latlng) {                                  // add each point to a layer, with its default marker
            return L.marker(latlng, {icon: addIcon(figure) });                      // set the figure,
        },                         

        onEachFeature: function(feature, layer) {                                   // for each point                  // store the sidebar div in a variable
            var fp = feature.properties;                                            // store feature properties as fp
            filterData(service, fp, layer)                                          // add the feature to separate relevant layer groups
            layer.bindPopup(setPopUpContent(fp) , popUpCustomOptions);              // Set pop up content for feature
            layer.on('mouseover', function(e) {setBigIcon(e, figure, figureBig)}),  // On mouseover, make icon larger
            layer.on('mouseout', function(e) {setSmallIcon(e, figure, figureBig)}), // On mouseover, make icon smaller    
            layer.on('click', function (e) {                                        // on click of feature                                                       
                                                                                                        
                updateSidebar(fp, figure, faIcon, serviceName);                     // Add sidebar panel if it doesn't exist, and updates the sidebar with the relevant content for this feature
                openPopupOrRefreshSidebar(layer);                                   // If sidebar is open, show content there only. If not, open the pop up and the sidebar remains closed.
                setHighlight(e, figureHighlight);                                   // Highlight or remove highlight depending on initial state
                setMapView(e);                                                      // Zoom and centre on the feature
            })
        }   
    }).addTo(layerGroup);       // add all features to the main layer group
    return geojsonLayer
}

// run the addGeoJSONData function for each of the services

var gpsGeojson = addGeoJSONData (GPs, gpDefaultFigure, 'Images/GPs_FA.png', 'Images/GPs_FA_highlight.png',gpsLayer, "<i class='fa fa-user-md fa-lg'></i>", "General Practictioner")
var dentistsGeojson = addGeoJSONData (Dentists, dentistDefaultFigure, 'Images/Dentists_FA.png', 'Images/Dentists_FA_highlight.png', dentistsLayer, "<i class='fas fa-tooth fa-lg'></i>", "Dentist")
var pharmaciesGeojson = addGeoJSONData (Pharmacies, pharmaciesDefaultFigure, 'Images/Pharmacies_FA.png', 'Images/Pharmacies_FA_highlight.png', pharmaciesLayer, "<i class='far fa-plus-square fa-lg'></i>", "Pharmacy")
var opticiansGeojson = addGeoJSONData (Opticians, opticiansDefaultFigure, 'Images/Opticians_FA.png', 'Images/Opticians_FA_highlight.png', opticiansLayer, "<i class='fas fa-glasses fa-lg'></i>", "Optician")
var hospitalsGeojson = addGeoJSONData (Hospitals, hospitalsDefaultFigure, 'Images/Hospitals_FA.png', 'Images/Hospitals_FA_highlight.png', hospitalsLayer, "<i class='far fa-hospital fa-lg'></i>", "Hospital")
var shClinicsGeojson = addGeoJSONData (SHClinics, shClinicsDefaultFigure, 'Images/SHClinics_FA.png', 'Images/SHClinics_FA_highlight.png', shClinicsLayer, "<i class='fas fa-venus-mars fa-lg'></i>", "Sexual Health Clinic")


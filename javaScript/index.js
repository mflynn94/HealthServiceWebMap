

        /*  ESTABLISH BASE MAPS USING defineBasemaps() FUNCTION DEFINED IN FUNCTIONS.JS.
            Create basemaps for Ordnance Surveys Light, Night, Outdoor and Road Basemap. */
    
        var lightBasemap = defineBasemaps('light');
        var nightBasemap = defineBasemaps('night');
        var outdoorBasemap = defineBasemaps('outdoor');
        var roadBasemap = defineBasemaps('road');


        /*  CREATE LAYER GROUPS 
            Uses defineClusterGrup function from functions.js
            These will include each service and each sub category for services to enable filtering via layer controls */
        
        var gpsLayer = defineClusterGroups(gpsLayer,'gp'),
            
            dentistsLayer = defineClusterGroups(dentistsLayer,'dentist'), dentistsSaturday = defineClusterGroups(dentistsSaturday,'dentist'),
            
            opticiansLayer = defineClusterGroups(opticiansLayer,'optician'), opticiansSaturday = defineClusterGroups(opticiansSaturday,'optician'), opticiansSunday = defineClusterGroups(opticiansSunday,'optician'),

            pharmaciesLayer = defineClusterGroups(pharmaciesLayer,'pharmacy'),
            pharmaciesSaturday = defineClusterGroups(pharmaciesSaturday,'pharmacy'), pharmaciesSunday = defineClusterGroups(pharmaciesSunday,'pharmacy'), pharmaciesEC = defineClusterGroups(pharmaciesEC,'pharmacy'),pharmaciesFC = defineClusterGroups(pharmaciesFC,'pharmacy'),pharmaciesMAS = defineClusterGroups(pharmaciesMAS,'pharmacy'),
            pharmaciesNE = defineClusterGroups(pharmaciesNE,'pharmacy'),pharmaciesNRT = defineClusterGroups(pharmaciesNRT,'pharmacy'),pharmaciesPCN = defineClusterGroups(pharmaciesPCN,'pharmacy'),
            pharmaciesSBS = defineClusterGroups(pharmaciesSBS,'pharmacy'),pharmaciesSMS = defineClusterGroups(pharmaciesSMS,'pharmacy'),pharmaciesTfI = defineClusterGroups(pharmaciesTfI,'pharmacy'),pharmaciesTUTI = defineClusterGroups(pharmaciesTUTI,'pharmacy'),

            shClinicsLayer = defineClusterGroups(shClinicsLayer,'shclinic'),
            shClinicsCont = defineClusterGroups(shClinicsCont,'shclinic'),shClinicsCSS = defineClusterGroups(shClinicsCSS,'shclinic'),shClinicsDrop = defineClusterGroups(shClinicsDrop,'shclinic'),shClinicsEC = defineClusterGroups(shClinicsEC,'shclinic'),
            shClinicsFP = defineClusterGroups(shClinicsFP,'shclinic'),shClinicsFC = defineClusterGroups(shClinicsFC,'shclinic'),shClinicsGI = defineClusterGroups(shClinicsGI,'shclinic'),shClinicsGUM = defineClusterGroups(shClinicsGUM,'shclinic'),
            shClinicsHep = defineClusterGroups(shClinicsHep,'shclinic'),shClinicsHV = defineClusterGroups(shClinicsHV,'shclinic'),shClinicsMM = defineClusterGroups(shClinicsMM,'shclinic'),shClinicsPT = defineClusterGroups(shClinicsPT,'shclinic'),
            shClinicsPS = defineClusterGroups(shClinicsPS,'shclinic'),shClinicsSR = defineClusterGroups(shClinicsSR,'shclinic'),shClinicsTOPAR = defineClusterGroups(shClinicsTOPAR,'shclinic'),shClinicsTHV = defineClusterGroups(shClinicsTHV,'shclinic'),
            shClinicsTSTI = defineClusterGroups(shClinicsTSTI,'shclinic'),shClinicsYP = defineClusterGroups(shClinicsYP,'shclinic'),

            hospitalsLayer = defineClusterGroups(hospitalsLayer,'hospital'),hospitalsAandE = defineClusterGroups(hospitalsAandE,'hospital');



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
            "Accidents & Emergency and Minor Injuries Units" : hospitalsAandE   
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



        /*  ADD SIDEBAR TO THE MAP
            initialise sidebar
            exlude invdividual service panes off 
            all sidebar settings and content information can be found in SidebarContent.js
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


        // ADD ZOOM CONTROL
        map.zoomControl.setPosition('bottomright'); 

        // ADD ATTRIBUTION
        map.attributionControl.addAttribution('Contains OS data &copy; Crown copyright and database rights 2018'); // add attribution to the map
        
        // ADD BASEMAP LAYER CONTROL

        basemapControl.addTo(map);     // Basemap control added to map
        designBasemapControl();        // alter default design of the basemap control
    

        // ADD DROPDOWN FOR USERS TO CHANGE SERVICES
        // **drop down contains functions for adding all layers and their corresponding controls**
        // relevant functions can be found in functions.js

        var serviceDropdown = L.control({position: 'topright'});
        serviceDropdown.onAdd = function (map) {return addServiceDropdown()}
        serviceDropdown.addTo(map);
    
        
        // ADD USER LOCATION CONTROL

        var lc = L.control.locate({
            position:'bottomright',                        //  place at bottom right of map
        }).addTo(map);          
        

        // ADD GEOCODER SEARCH BAR CONTROL
        
        var geocoder = L.Control.geocoder({
            position: 'topleft',                            //  place in top left of map
            defaultMarkGeocode: false,                      //  disable default marker
            placeholder: 'Search location or postcode...'   //  text that shows on use
        }).addTo(map);
        
        geocoder.on('markgeocode', function(e) {            // action performed when a search is made
            addGeocodeMarker(e);                            // remove any previous marker and add a new one
        })
        
        
            /* DEFINE MAP ON CLICK INTERACTION     */

        map.on('click', function(e){        // on click of the map
            resetLayerStyles();             // reset layer styles to ensure no markers are highlighted
            removeGeocodeMarker();          // remove a geocoder marker if one is present
        })


        
        /*  LOAD ALL DATA AND ADD TO VARIOUS LAYER GROUPS
            set icons for services and each features mouseover, mouseout and click functionality. */

        //  function for adding all the datasets ****    

        function addGeoJSONData (service, figure, figureBig, figureHighlight, layerGroup, paneId, panelId, panelName) {
            geojsonLayer = L.geoJSON(service, {                                             // retrieve geoJSON
                
                pointToLayer: function (feature, latlng) {                                  // add each point to a layer, with its default marker
                    return L.marker(latlng, {icon: addIcon(figure) });                      // set the figure,
                },                         

                onEachFeature: function(feature, layer) {                                   // for each point                  // store the sidebar div in a variable
                    var fp = feature.properties;                                            // store feature properties as fp
                    filterData(service, fp, layer)                                          // add the feature to separate relevant layer groups
                    layer.bindPopup(setPopUpContent(fp, panelId) , popUpCustomOptions);     // Set pop up content for feature
                    layer.on('mouseover', function(e) {setBigIcon(e, figure, figureBig)}),  // On mouseover, make icon larger
                    layer.on('mouseout', function(e) {setSmallIcon(e, figure, figureBig)}), // On mouseover, make icon smaller    
                    layer.on('click', function (e) {                                        // on click of feature                                                       
                        clearSidebar();                                                     // Clear the sidebar                                        
                        updateSidebar(fp, figure, paneId, panelId, panelName);              // Adds panel if it doesn't exist, and updates the sidebar with the relevant content for this feature
                        openPopupOrRefreshSidebar(layer, panelId);                          // If sidebar is open, show content there only. If not, open the pop up and the sidebar remains closed.
                        setHighlight(e, figureHighlight);                // Highlight or remove highlight depending on initial state
                        setMapView(e);                                                      // Zoom and centre on the feature
                    })
                }   
            }).addTo(layerGroup);       // add all features to the main layer group
            return geojsonLayer
        }

        // run the addGeoJSONData function for each of the services

        var gpsGeojson = addGeoJSONData (GPs, gpDefaultFigure, 'Images/GPs_FA.png', 'Images/GPs_FA_highlight.png',gpsLayer, 'gpPanelContent', 'gpPanel', panelContentGPs)
        var dentistsGeojson = addGeoJSONData (Dentists, dentistDefaultFigure, 'Images/Dentists_FA.png', 'Images/Dentists_FA_highlight.png', dentistsLayer, 'dentistPanelContent', 'dentistPanel', panelContentDentists)
        var pharmaciesGeojson = addGeoJSONData (Pharmacies, pharmaciesDefaultFigure, 'Images/Pharmacies_FA.png', 'Images/Pharmacies_FA_highlight.png', pharmaciesLayer, 'pharmaciesPanelContent', 'pharmaciesPanel', panelContentPharmacies)
        var opticiansGeojson = addGeoJSONData (Opticians, opticiansDefaultFigure, 'Images/Opticians_FA.png', 'Images/Opticians_FA_highlight.png', opticiansLayer, 'opticiansPanelContent', 'opticiansPanel', panelContentOpticians)
        var hospitalsGeojson = addGeoJSONData (Hospitals, hospitalsDefaultFigure, 'Images/Hospitals_FA.png', 'Images/Hospitals_FA_highlight.png', hospitalsLayer, 'hospitalsPanelContent', 'hospitalsPanel', panelContentHospitals)
        var shClinicsGeojson = addGeoJSONData (SHClinics, shClinicsDefaultFigure, 'Images/SHClinics_FA.png', 'Images/SHClinics_FA_highlight.png', shClinicsLayer, 'shClinicsPanelContent', 'shClinicsPanel', panelContentSHClinic)
        
  
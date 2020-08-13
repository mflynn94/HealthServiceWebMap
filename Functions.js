

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
        sidebar.show();
    }
    sidebar.setContent(sidebarDefaultContent)
    };


// store user coordinates
function onLocationfound(e) {
    var userLocation = e.latlng;
    console.log(userLocation);
}

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

// create custom options for pop up information
var popUpCustomOptions =
    {
    'maxWidth': '200',
    'className' : 'custom'
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
function bigIcon(figureURL) {
    return L.icon({
        iconUrl: figureURL,
        iconSize: [40, 40],
        iconAnchor: [20,20],
        popupAnchor: [0, -15]
    });
};


// Create a function to set map view based on a specific feature
function setMapView(e) {
    if (map.getZoom() < 13) {
        map.setView(e.latlng,13)
    } else {
        map.setView(e.latlng, map.getZoom())
    }
}

function addGeoJSONData (service, figure, layerGroup) {
    L.geoJSON(service, {
        
        onEachFeature: function(feature, layer) {
            var fp = feature.properties;
            layer.bindPopup(setPopUpContent(fp) , popUpCustomOptions);
            layer.on('click', function (e) { updateSidebar(fp,figure), this.openPopup(), setMapView(e)});
            
            layer.on('mouseover', function(e) {
                e.target.setIcon(bigIcon(figure));//marker object is overwritten in the for loop each time                
            });
        
            layer.on('mouseout', function(e) {
                    e.target.setIcon(addIcon(figure));//marker object is overwritten in the for loop each time                
                });
            
            return filterData(service, fp, layer)
        },
            pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: addIcon(figure)});
        }
    }).addTo(layerGroup);

}



// FUNCTION WHICH CHANGES THE DEFAULT DESIGN ON THE BASEMAP CONTROL

function designBasemapControl() {
    var customControl = document.getElementsByClassName("leaflet-control-layers-toggle")[0];
    customControl.innerHTML = "<div class=control-content><i class='fa fa-map fa-lg' aria-hidden='true'></i></div>";
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

function addLayer(serviceLayer, serviceControl) {
            
    var mapPane = document.getElementsByClassName("leaflet-pane leaflet-map-pane");
    mapPane[0].style.filter = 'blur(0px)';
    mapPane[0].style.webkitfilter = 'blur(0px)';

    sidebar.hide();
    
    var layerControlList = [dentistControl, opticiansControl, pharmaciesControl, hospitalsControl, shClinicsControl];
    
    map.eachLayer(function (layer) {
        if ((layer !== lc._layer) && (layer !== outdoorBasemap) && (layer !== nightBasemap) && (layer !== lightBasemap) && (layer !== roadBasemap)) {
        map.removeLayer(layer)
        }
    })

    var control;
    for (control in layerControlList) {
        map.removeControl(layerControlList[control]);
    }

    map.addLayer(serviceLayer);

    if (serviceControl) {
        serviceControl.addTo(map);
        designServiceFilter()
    }

    
    console.log(map.getCenter());   
};



// test 
function test (layer) {
    GPs_layer.eachLayer(function(layer){
        if(layer.feature.properties.Website){
            GPs_layer.removeLayer(layer)
            GPs_layer.refreshClusters()
        }
    })
}



// Create functions for the drop down service button
// Content inspired by W3 tutorial on dropdown boxes.
// On click of each services, run the same function that is used for the service buttons on the sidebar

function addServiceDropdown() {
    var div = L.DomUtil.create('div', 'Service Dropdown');
    div.innerHTML = "<div class='dropdown'>" +
        "<button onclick='myFunction()' class='dropbtn'>Change Service</button>" +
        "<div id='myDropdown' class='dropdown-content'>" +
        "<a href='#' onClick='addLayer(gpsLayer)'>GPs</a>" +
        "<a href='#' onClick='addLayer(dentistsLayer, dentistControl)'>Dentists</a>" +
        "<a href='#' onClick='addLayer(opticiansLayer, opticiansControl)'>Opticians</a>" +
        "<a href='#' onClick='addLayer(pharmaciesLayer, pharmaciesControl)'>Pharmacies</a>" +
        "<a href='#' onClick='addLayer(hospitalsLayer, hospitalsControl)'>Hospitals</a>" +
        "<a href='#' onClick='addLayer(shClinicsLayer, shClinicsControl)'>SH Clinics</a></div></div></div>" 
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





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

function define_clusterGroups (layer, service) {
        var layer = L.markerClusterGroup({
        spiderfyOnMaxZoom: true, 
        showCoverageOnHover: false, 
        iconCreateFunction: function (cluster) {
            return changeClusterIcon(cluster, service)}
        })
        return layer;
};


function button_toggleSidebar() {
    if (sidebar.isVisible() == true) {
        $("#sidebar").hide().fadeIn('slow');
    } else {
        sidebar.show();
    }
    sidebar.setContent(sidebar_default_content)
    };


// store user coordinates
function onLocationfound(e) {
    var user_location = e.latlng;
    console.log(user_location);
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
var popUp_customOptions =
    {
    'maxWidth': '200',
    'className' : 'custom'
    }


  
function filter_data (service, fp, layer) {
        if (service == Dentists) {
            if (fp.Saturday == fp.Saturday) layer.addTo(Dentists_Saturday)
        }

        else if (service == Pharmacies) {
            if (fp.Saturday == fp.Saturday) layer.addTo(Pharmacies_Saturday);
            for (i in Pharmacy_Service_list) {if (fp.Services == fp.Services && fp.Services.includes(Pharmacy_Service_list[i])) layer.addTo(Pharmacy_Service_layers[i]);}
        }
        
        else if (service == Opticians) {if (fp.Saturday == fp.Saturday) layer.addTo(Opticians_Saturday);}

        else if (service == Hospitals) {
            AE = fp['A&E'];
            if (AE == AE) layer.addTo(Hospitals_AandE);
        }

        else if (service == SHClinics) {
            for (i in SH_Service_list) {if (fp.Services == fp.Services && fp.Services.includes(SH_Service_list[i])) layer.addTo(SH_Service_layers[i]);}
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
function setmapview(e) {
    if (map.getZoom() < 13) {
        map.setView(e.latlng,13)
    } else {
        map.setView(e.latlng, map.getZoom())
    }
}

function add_geoJSONData (service, figure, layer_group) {
    L.geoJSON(service, {
        
        onEachFeature: function(feature, layer) {
            var fp = feature.properties;
            layer.bindPopup(setPopUpContent(fp) , popUp_customOptions);
            layer.on('click', function (e) { updateSidebar(fp,figure), this.openPopup(), setmapview(e)});
            
            layer.on('mouseover', function(e) {
                e.target.setIcon(bigIcon(figure));//marker object is overwritten in the for loop each time                
            });
        
            layer.on('mouseout', function(e) {
                    e.target.setIcon(addIcon(figure));//marker object is overwritten in the for loop each time                
                });
            
            return filter_data(service, fp, layer)
        },
            pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: addIcon(figure)});
        }
    }).addTo(layer_group);

}


/* Create a function that is performed when one of the service buttons is clicked, in the side bar or in the legend control
   this initially will ensure the map is not blurred out (as it is in the beginning)
   */

function addLayer(servicelayer, Control) {
            
    var map_pane = document.getElementsByClassName("leaflet-pane leaflet-map-pane");
    map_pane[0].style.filter = 'blur(0px)';
    map_pane[0].style.webkitfilter = 'blur(0px)';

    sidebar.hide();
    
    var layer_control_list = [DentistControl, OpticiansControl, PharmaciesControl, HospitalsControl, SHClinicsControl];
    
    map.eachLayer(function (layer) {
        if ((layer !== lc._layer) && (layer !== outdoor_basemap) && (layer !== night_basemap) && (layer !== light_basemap) && (layer !== road_basemap)) {
        map.removeLayer(layer)
        }
    })

    var control;
    for (control in layer_control_list) {
        map.removeControl(layer_control_list[control]);
    }

    map.addLayer(servicelayer);

    if (Control) {
        Control.addTo(map); 
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
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = "<div class='dropdown'>" +
        "<button onclick='myFunction()' class='dropbtn'>Change Service</button>" +
        "<div id='myDropdown' class='dropdown-content'>" +
        "<a href='#' onClick='test()'>GPs</a>" +
        "<a href='#' onClick='addLayer(Dentists_layer, DentistControl)'>Dentists</a>" +
        "<a href='#' onClick='addLayer(Opticians_layer, OpticiansControl)'>Opticians</a>" +
        "<a href='#' onClick='addLayer(Pharmacies_layer, PharmaciesControl)'>Pharmacies</a>" +
        "<a href='#' onClick='addLayer(Hospitals_layer, HospitalsControl)'>Hospitals</a>" +
        "<a href='#' onClick='addLayer(SHClinics_layer, SHClinicsControl)'>SH Clinics</a></div></div></div>" 
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



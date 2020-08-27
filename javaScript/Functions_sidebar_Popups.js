
   
/*
 THIS SCRIPT CONTAINS THE FUNCTIONS USED FOR UPDATING AND CLEARING THE SIDEBAR. 
*/

// define global variables to be used for the sidebar and pop up content
var sidebarString;
var popupString;

// create custom options for pop up information
var popUpCustomOptions ={'minWidth': '200','className' : 'custom'}


// DEFINE DEFAULT SIDEBAR CONTENT
// Content includes buttons which perform the addLayer function defined in functions.js
var sidebarDefaultContent = 
                            "<h2>Search for your local health services \
                            </h2><div class ='line'></div>\
                            <span style='padding-top:40px'><h4>A new and engaging way to search for your nearest NHS Scotland Health Services within the Greater Glasgow and Clyde area.</h4></span>\
                            <p> Please choose the service you are looking for today. <h2></h2></p>\
                            <p><div class ='line'></div><p> <h2></h2>\
                            <div class = 'Allbuttons'><button type='button' class=btn onclick='addLayer(gpsLayer, null, " + '"GPs -"' + ")'><img src='Images/GPs_FA_30.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;GPs</span></button>\
                            \
                            <button type='button' class=btn onclick='addLayer(dentistsLayer, dentistControl, " + '"Dentists -"' + ")'><img src='Images/Dentists_FA_30.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;Dentists</button>\
                            \
                            <button type='button' class=btn onclick='addLayer(opticiansLayer, opticiansControl, " + '"Opticians -"' + ")'><img src='Images/Opticians_FA_30.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;Opticians</button>\
                            \
                            <button type='button' class=btn onclick='addLayer(pharmaciesLayer, pharmaciesControl, " + '"Pharmacies -"' + ")'><img src='Images/Pharmacies_FA_30.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;Pharmacies</button>\
                            \
                            <button type='button' class=btn onclick='addLayer(hospitalsLayer, hospitalsControl, " + '"Hospitals -"' + ")'><img src='Images/Hospitals_FA_30.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;Hospitals</button>\
                            \
                            <button type='button' class=btn onclick='addLayer(shClinicsLayer, shClinicsControl, " + '"SH Clinics -"' + ")'><div class='sidebar-text-sections'><img src='Images/SHClinics_FA_30.png' style='vertical-align:middle' width='30' height ='30'><span style = 'font-size: 12px'>&nbsp&nbsp;Sexual Health &nbsp;&nbsp;Clinics</span></button>\
                            <p></div> <p><h2></h2><div class ='line'></div>\
                            \
                            <br><h3>How to..</h3>\
                            <div class=sidebar-instructions><div class='sidebar-number'>1.</div> &nbsp;Select a service above&nbsp;&nbsp; <i class='fas fa-arrow-up fa-lg'></i>\
                            <p><div class='sidebar-number'>2.</div> &nbsp;Zoom in, press the &nbsp;<i class='fa fa-map-marker fa-2x'></i>&nbsp; button, or type in your postcode using the &nbsp;&nbsp;<i class='fas fa-search fa-lg'></i> \
                            <p><div class='sidebar-number'>3.</div> &nbsp;Choose a location to view more details&nbsp; <img src='Images/GPs_FA_30.png' style='vertical-align:middle' width='30' height ='30'>\
                            <p>Click &nbsp;&nbsp;<i class='fa fa-info fa-2x'></i> &nbsp;&nbsp;if you would like more information...\
                            <p>Or come back here &nbsp; &nbsp;<i class='fa fa-home fa-2x'></i>&nbsp;&nbsp; if you get lost &nbsp;<i class='far fa-smile-beam'></i></div><br>"
                            

// CREATE ALL POTENTIAL SIDEBAR PANELS

var panelContent = {
    id: 'home',                     // UID, used to access the panel
    tab: '<i class="fa fa-home fa-lg"></i>',  // Uses relevant font awesome icon
    pane: "<div id='homePanelContent'>" + sidebarDefaultContent + "</div>",        // home tab uses the sidebars default content
    title: 'Health Service Finder',              // pane header
    position: 'top'                  // Place at top of sidebar
};


// button to clear sidebar content if a search has been made
var clearSidebarButton = {
    id: 'click',                     // UID, used to access the panel
    tab: '<i class="far fa-times-circle"></i>',  // Uses relevant font awesome icon
    button: function (event) { clearSelection() },        // clears sidebar on click
    title: 'Clear selection',
    position: 'bottom'                  // Place at bottom of sidebar
};

var serviceSidebar = {
    id: 'servicePanel',                     // UID, used to access the panel
    tab: '<div id="sidebarIcon"></div>',  // Uses relevant font awesome icon
    pane: "<div id='servicePanelContent'></div>",        // to be dynamically updated on click of feature
    title: '<div id="serviceName"></div>',        // pane header
    position: 'top'                  // Place at top of sidebar
};


var infoContent = "<h3>Me \
</h3><div class ='line'></div>\
<p>I'm a Masters student in Geoinformation Technology and Cartography at the University of Glasgow, and I have designed this interactive map as part of my thesis. It aims to create an engaging way for users to search for their local health services.</p>\
<p> Currently the system only features locations in Greater Glasgow and Clyde, but hopefully this will be expanded in the future.</p>\
<p> The code and data for this project can be viewed at my <a href='https://github.com/mflynn94/HealthServiceWebMap'target=_blank>Github </a>\
<p><br> <h3>Data sources</h3><div class ='line'></div>\
<p>All data used was retrieved from various NHS sources in June 2020. These include:\
 <li> <a href='https://www.nhsinform.scot/scotlands-service-directory' target=_blank>NHS Inform's Scotland Service Directory</a></li>\
 <li> <a href='https://www.opendata.nhs.scot/' target=_blank>NHS Open Data Portal</a></li>\
 <li> <a href='https://www.isdscotland.org/#:~:text=The%20Information%20Services%20Division%20(ISD,robust%20planning%20and%20decision%20making.' target=_blank>Public Health Scotland's ISD</a></li>\
 <br>All 4 basemaps used are Ordnance Survey (2020) Zoomstack vector tiles\
 <br><br><p> <h3>Leaflet + Extras</h3><div class ='line'></div>\
 <p>The map was created using the open source JavaScript library <a href='https://leafletjs.com/'>Leaflet</a>. <br><br>Much of the extra functionality was achieved by using some great open-source plugins and libraries. These include: </p>\
 <li> <a href='https://github.com/mapbox/Mapbox-gl-leaflet' target=_blank>Mapbox-gl-leaflet</a></li>\
 <li> <a href='https://github.com/Leaflet/Leaflet.markercluster' target=_blank>Leaflet-marker-cluster</a></li>\
 <li> <a href='https://github.com/noerw/Leaflet-sidebar-v2' target=_blank>Leaflet-sidebar-v2</a></li>\
 <li> <a href='https://github.com/domoritz/Leaflet-locatecontrol' target=_blank>Leaflet-locatecontrol</a></li>\
 <li> <a href='https://github.com/perliedman/Leaflet-control-geocoder' target=_blank>Leaflet-control-geocoder</a></li>\
 <li> <a href='https://github.com/eKoopmans/Html2pdf.js' target=_blank>Html2pdf</a></li>\
 <li> <a href='https://fontawesome.com/' target=_blank>Font Awesome</a></li><br><br>"


var panelContentInfo = {
    id: 'infoPanel',                     // UID, used to access the panel
    tab: '<i class="fa fa-info fa-lg"></i>',  // Uses relevant font awesome icon
    pane: infoContent,        // Contains information on sources and references
    title: 'Information',        // pane header
    position: 'bottom'                  // Place at bottom of sidebar
};



// FUNCTION WHICH CREATES THE SIDEBAR'S CONTENT
// dynamically changes based on the feature properties of the service, and whether the property has valid data entries (not NaN)
// Generally, if it does not exist or is empty (NaN), the corresponding variable for that attribute will be filled with an empty string.
// relevant html and css is added to ensure the correct formatting of the text within the sidebar


function createSidebarContent(fp, figure) {
    
    // define all variables to be used in the sidebar content. This will vary from service to service, so many coniderations to be given

    // Define the Name variable. If the feature has a property called NHSInformName, use that. If not, use the Name property.
    if(fp.NHSInformName && fp.NHSInformName == fp.NHSInformName) {
        var Name = "<h2><div class='Title'>" + fp.NHSInformName + "</div><div class = 'rightImage'><img src=" +figure+ " style='vertical-align:middle; float:right' width='30' height ='30'></div><br><br></h2><div class ='line'></div></div>"
    } else if (fp.Name == fp.Name) {
        Name = "<h2><div class='Title'>" + fp.Name + "</div><div class='rightImage'><img src=" +figure+ " style='vertical-align:middle; float:right' width='30' height ='30'></div></h2><br><br><div class ='line'></div>"
    } else {
        Name = "<h2><div class='Title'>" + fp.DispenserName + "</div><div class='rightImage'><img src=" +figure+ " style='vertical-align:middle; float:right' width='30' height ='30'></div></h2><br><br><div class ='line'></div>"
    }


    // Define the Address variable. If the feature has a property called Address 2, and it is not NaN, include this. Do the same for Address 3. If not, just use Address1.
    var Address;
    if(fp.Address2 && fp.Address2 == fp.Address2) {
        Address =   fp.Address1 + "<br>" + fp.Address2
    } else if (fp.Address3 && fp.Address3 == fp.Address3) {
        Address =   fp.Address1 + "<br>" + fp.Address2 + "<br>" + fp.Address3
    }
    else {
        Address = fp.Address1
    }
    
    // Define full address, using Address variable and the postcode property
    var fullAddress =  "<div class='sidebar-text-sections'><i class='fa fa-map-marker fa-3x' aria-hidden='true'></i>" +
                    "<div class = sidebar-text-right><span style=''><b><br>Address<br></b>" + 
                    Address + 
                    "<br>" +
                    fp.Postcode + 
                    "</div></div></span><br><div class ='line'></div><br>" 


    // Define the Telephone variable. If the telephone property is non NaN, include this and a link to call. If not, leave the telephone variable empty.
    var Telephone;
    if (fp.Telephone && fp.Telephone == fp.Telephone) {
        Telephone = "<div class='sidebar-text-sections'><i class='fa fa-phone fa-2x' aria-hidden='true'></i> <div class = sidebar-text-right><span style=''><b>Telephone</b><br> <a href=tel:" + ((fp.Telephone).replace(/\s+/g, ''))+ ">" + fp.Telephone+"</a></div><span></div><br>" +
        "<div class ='line'></div><br>"
    } else {
        Telephone = ''
    }

    // Define services offered
    // Check if the services property exists and that it is not equal to NaN
    // replace the python new line values (\n) values with an html line break (<br>)

    var Services;
    if (fp.Services && fp.Services == fp.Services) {
        fp.Services = fp.Services.replace(/\n/g,"<br>");
        Services = "<div class=sidebar-text-lunch><b>Services Offered</b></div><dl>" + fp.Services + "</dl><br><div class ='line'></div><br>"
    } else {
        Services = '';
    }


    // Define the OpeningTimes variable. Create lists for the OpeningTimes properties, empty variables and for strings of the opening times days.
    
    var OpeningTimes = "<div class=sidebar-text-lunch><b>Opening Times</b></div><dl>";
    var Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday;
    var days = [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
    var daysOfWeek = [fp.Sunday, fp.Monday, fp.Tuesday, fp.Wednesday, fp.Thursday, fp.Friday, fp.Saturday];
    var stringDays= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    // for each day of the week property, if it exists, define the equivalent day variable from the other list, with the the string variable and the property value.
    // if it does not exist, define that day's variable as an empty string
    // add the result to the Opening Times variable, so that each day will be added in sequence.
    for (var property in daysOfWeek) {   
        if (daysOfWeek[property]) {
                 days[property] = "<dt>" + stringDays[property] + ":</dt> <dd>" + daysOfWeek[property] + "</dd>" 
        } else {
            days[property] = ''
        }
        OpeningTimes = OpeningTimes + days[property]
    }


    // Check if there is extra opening times information (by checking the property is not equal to NaN). If there is, add this to the Opening Times string.
    // If there isn't, check to see if there was any other information added to this string other than the title, by checking it is over 50 characters.
    // If not, define the OpeningTimes variable as empty, so that no information is shown in the sidebar.
    if (fp.ExtraOTInfo && fp.ExtraOTInfo == fp.ExtraOTInfo) {
        if (fp.ExtraOTInfo.includes("-")) {
            fp.ExtraOTInfo = fp.ExtraOTInfo.replace("-"," - ");
        }
        OpeningTimes = OpeningTimes + "</dl><div class=sidebar-text-lunch><b>" + fp.ExtraOTInfo + "</div><br><div class ='line'></div><br>"
    } else if (OpeningTimes.length > 60) {
        OpeningTimes = OpeningTimes + "</dl><br><div class ='line'></div><br>"
    } else {
        OpeningTimes = ''
    }

    // Define the Website variable.
    // Check if the property exists, and check that it is not NaN.
    // Define the variable with the website link included within the text.
    //If it doesn't exist or is NaN, leave as an empty string.
    var Website;
    if (fp.Website && fp.Website == fp.Website) {
        Website = "<div class='sidebar-text-sections'><i class='fa fa-globe fa-2x' aria-hidden='true'></i> <div class = sidebar-text-right><b>Website</b><br><a href=" + fp.Website + " target=_blank>Visit Website</a></div></div>"  + 
        "<br><div class ='line'></div><br>"
    } else {
        Website = ''
    }

    // Define email, check if it exists and is not NaN
    var Email;
    if (fp.Email && fp.Email == fp.Email) {
        Email = "<div class='sidebar-text-sections'><i class='fa fa-envelope fa-lg' aria-hidden='true'></i> <div class = sidebar-text-right><span style=''><b>Email</b><br>" + fp.Email + "</span></div></div>"  + 
        "<br><div class ='line'></div><br>"
    } else {
        Email = ''
    }

    // Define WA, check if it exists and is not NaN
    var WA;
    if (fp.WA && fp.WA == fp.WA) {
        WA = "<div class='sidebar-text-sections'><i class='fa fa-wheelchair fa-2x' aria-hidden='true'></i> <div class = sidebar-text-right><span style=''><b>Wheelchair Accessible</b></span></div></div>"  + 
        "<br><div class ='line'></div><br>"
    } else {
        WA = ''
    }

    // Define the directions variable with a link to the Google Directions property
    var Directions = "<div class='sidebar-text-sections'><i class='fa fa-compass fa-2x' aria-hidden='true'></i> <div class = sidebar-text-right><b>Directions</b><br><a href=" + fp.GoogleDirections+ " target=_blank>Get Directions</a></div></div>" +
                    "<br><div class ='line'></div><br>"

    /*                  
    // Define the pdf download link which will open in a new window
    var pdfDownload = "<div class='sidebar-text-sections'><i class='fa fa-download fa-2x' aria-hidden='true'></i> <div class = sidebar-text-right><span style=''><a href='#' " + "<span onClick='saveAsPDF(" + '"' + fp.Name + '"' + ")'>Save as PDF</span></a></span></div></div>" +
                        "<br><div class ='line'></div><br>"
    */
    
    // Create the full string for adding to the sidebar on click
    sidebarString = Name + fullAddress + Telephone + Services + OpeningTimes + Website + Email + Directions + WA 
    return sidebarString;
};



// FUNCTION WHICH CREATES THE POP UP CONTENT
// similar to above, content is dynamically created based on feature properties
// relevant html and css added
var testPanel = 'servicePanel'

function setPopUpContent(fp) {

    // Define the Name variable. If the feature has a property called NHSInformName, use that. If not, use the Name property.
    // For pharmacies, some have no name in the name column and so for those, use Dispenser name.
    if(fp.NHSInformName && fp.NHSInformName == fp.NHSInformName) {
        var Name = "<div class=box></div><h3>" + fp.NHSInformName + "</h3><div class ='line'></div><br>"
    } else if (fp.Name == fp.Name) {
        Name = "<div class=box></div><h3>" + fp.Name + "</h3><div class ='line'></div><br>"
    } else {
        Name = "<div class=box></div><h3>" + fp.DispenserName + "</h3><div class ='line'></div><br>"
    }

    if (fp.Telephone && fp.Telephone == fp.Telephone) {
        var Telephone = "<br><br><a href=tel:" + ((fp.Telephone).replace(/\s+/g, ''))+ ">" + fp.Telephone+"</a><br>"     // removes spaces within the telephone number when adding a link
    } else {
        Telephone = ''
    }

    popupString = Name + fp.Address1 + "<br>" + fp.Postcode + Telephone + 
    "<br><a href='#' " + "<span onClick='sidebar.open("  + '"' + testPanel + '"' +  "), map.closePopup()'><b>More details...</b></span></a><br><br><div class=line></div>"
    
    return popupString
}


// FUNCTION TO CREATE THE SIDEBAR CONTENT FOR THE SELECTED FEATURE ON THE MAP

function updateSidebar(fp,figure, faIcon, serviceName) {
    clearSelection();                                               // clear sidebar
    sidebar.enablePanel('click'); 

   if(document.getElementById("servicePanel") == null){             // check whether a sidebar panel for this service 
    sidebar.addPanel(serviceSidebar)                                // add the panel to the sidebar
};

createSidebarContent(fp,figure);                                    // create the string based on the selected feature
var panelContent = document.getElementById("servicePanelContent");  // retrieve the container for the relevant paneID
panelContent.innerHTML = sidebarString


var sidebarIcon = document.getElementById("sidebarIcon")            // Retrieve the id of the panel and change the icon
sidebarIcon.innerHTML = faIcon

var serviceTitle = document.getElementById("serviceName")           // Retrieve id of the Title and change it to service name
serviceTitle.innerHTML = serviceName
}


// FUNCTION TO CLEAR SIDEBAR AND MAP SELECTION
function clearSelection () {
    map.closePopup();               //  Close any pop ups
    resetLayerStyles();             //  Reset styles

    //define the list of possible panel id's to be removed
    
    var sidebarStatus = document.getElementById("sidebar");             // access the sidebar element

    
        if(document.getElementById("servicePanel") != null){            // check if the panel id is not null (is present on the sidebar)
            sidebar.removePanel("servicePanel");                        // remove panel
        } else {} 
    
    if (hasClass(sidebarStatus,'collapsed')) {}                         // if sidebar is closed, do nothing
    else { sidebar.open('home') };                                      // if the sidebar is open, open the home tab

    sidebar.disablePanel('click');                                      // disable clear button on sidebar
}



    // FUNCTION TO DECIDE WHETHER TO OPEN POP UP ON CLICK OF FEATURE
    // used in addGeoJSONData()   

function openPopupOrRefreshSidebar(layer) {
    var sidebarDiv = document.getElementById("sidebar");        
    if (hasClass(sidebarDiv,'collapsed')) {                 // if sidebar is collapsed
        layer.openPopup();                                  // open pop up
    } else {                                                // if it is open
        layer.closePopup(),                                 // ensure pop up is closed
        sidebar.open("servicePanel"),                              // open relevant sidebar panel
        $("#" +"servicePanel").hide().fadeIn('slow')              // add fade effect
    };
}
    

/*
// FUNCTION TO SAVE SIDEBAR CONTENT AS PDF
// Uses html2pdf plugin
// This is to enable users to save details of the services they may attend
function saveAsPDF(Name) {
    var opt = {
        margin:       1,
        filename:     Name + '.pdf',                                   // Add name of service to file output
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 1 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

    var sidebarElement = document.getElementById('servicePanelContent');           // retrieve sidebar div
    
    var elementHTML = sidebarElement.outerHTML;
    var finalOutput = elementHTML.replace("Save as PDF", '');          // remove save as pdf statement from html
    console.log(sidebarString);
    html2pdf().from(sidebarElement).set(opt).save()   
    //html2pdf(sidebarString, {return: true});                    // set the options and download element as pdf
}
*/
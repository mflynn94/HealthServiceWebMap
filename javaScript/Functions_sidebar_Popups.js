
   
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
                            <h4>Welcome to a new and engaging way to search for your nearest NHS Scotland Health Services.</h4>\
                            <p> Please choose the service you are looking for today. Explore the map and click on locations to find out more information. </p>\
                            <p><div class ='line'></div><p>\
                            <div class = 'Allbuttons'><button type='button' class=btn onclick='addLayer(gpsLayer, null, panelContentGPs, " + '"gpPanel"' + ")'><img src='Images/GPs_FA_30.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;GPs</span></button>\
                            \
                            <button type='button' class=btn onclick='addLayer(dentistsLayer, dentistControl, panelContentDentists, " + '"dentistPanel"' + ")'><img src='Images/Dentists_FA_30.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;Dentists</button>\
                            \
                            <button type='button' class=btn onclick='addLayer(opticiansLayer, opticiansControl, panelContentOpticians, " + '"opticiansPanel"' + ")'><img src='Images/Opticians_FA_30.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;Opticians</button>\
                            \
                            <button type='button' class=btn onclick='addLayer(pharmaciesLayer, pharmaciesControl, panelContentPharmacies, " + '"pharmaciesPanel"' + ")'><img src='Images/Pharmacies_FA_30.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;Pharmacies</button>\
                            \
                            <button type='button' class=btn onclick='addLayer(hospitalsLayer, hospitalsControl, panelContentHospitals, " + '"hospitalsPanel"' + ")'><img src='Images/Hospitals_FA_30.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;Hospitals</button>\
                            \
                            <button type='button' class=btn onclick='addLayer(shClinicsLayer, shClinicsControl, panelContentSHClinic, " + '"shClinicsPanel"' + ")'><div class='sidebar-text-sections'><img src='Images/SHClinics_FA_30.png' style='vertical-align:middle' width='30' height ='30'><span style = 'font-size: 12px'>&nbsp&nbsp;Sexual Health &nbsp;&nbsp;Clinics</span></button>\
                            <p></div><div class ='line'></div>"
                            

// CREATE ALL POTENTIAL SIDEBAR PANELS

var panelContent = {
    id: 'home',                     // UID, used to access the panel
    tab: '<i class="fa fa-home fa-lg"></i>',  // Uses relevant font awesome icon
    pane: "<div id='homePanelContent'>" + sidebarDefaultContent + "</div>",        // home tab uses the sidebars default content
    title: 'Health Service Finder',              // pane header
    position: 'top'                  // Place at top of sidebar
};


var panelContentGPs = {
    id: 'gpPanel',                              // UID, used to access the panel
    tab: '<i class="fa fa-user-md fa-lg"</i>',  // Uses relevant font awesome icon
    pane: "<div id='gpPanelContent'>'Click on a location to view information here'</div>",        // to be dynamically updated on click of feature
    title: 'General Practioner',        // pane header
    position: 'top'                  // Place at top of sidebar
};

var panelContentDentists = {
    id: 'dentistPanel',                     // UID, used to access the panel
    tab: '<i class="fas fa-tooth fa-lg"></i>',  // Uses relevant font awesome icon
    pane: "<div id='dentistPanelContent'>'Click on a location to view information here'</div>",        // to be dynamically updated on click of feature
    title: 'Dentist',               // pane header
    position: 'top'                  // Place at top of sidebar
};


var panelContentPharmacies = {
    id: 'pharmaciesPanel',                     // UID, used to access the panel
    tab: '<i class="far fa-plus-square fa-lg"></i>',  // Uses relevant font awesome icon
    pane: "<div id='pharmaciesPanelContent'>'Click on a location to view information here'</div>",        // to be dynamically updated on click of feature
    title: 'Pharmacy',        // pane header
    position: 'top'                  // Place at top of sidebar
};


var panelContentOpticians = {
    id: 'opticiansPanel',                     // UID, used to access the panel
    tab: '<i class="fas fa-glasses fa-lg"></i>',  // Uses relevant font awesome icon
    pane: "<div id='opticiansPanelContent'>'Click on a location to view information here'</div>",        // to be dynamically updated on click of feature
    title: 'Optician',        // pane header
    position: 'top'                  // Place at top of sidebar
};

var panelContentHospitals = {
    id: 'hospitalsPanel',                     // UID, used to access the panel
    tab: '<i class="far fa-hospital fa-lg"></i>',  // Uses relevant font awesome icon
    pane: "<div id='hospitalsPanelContent'>'Click on a location to view information here'</div>",        // to be dynamically updated on click of feature
    title: 'Hospital',        // pane header
    position: 'top'                  // Place at top of sidebar
};

var panelContentSHClinic = {
    id: 'shClinicsPanel',                     // UID, used to access the panel
    tab: '<i class="fas fa-venus-mars fa-lg"></i>',  // Uses relevant font awesome icon
    pane: "<div id='shClinicsPanelContent'>'Click on a location to view information here'</div>",        // to be dynamically updated on click of feature
    title: 'Sexual Health Clinic',        // pane header
    position: 'top'                  // Place at top of sidebar
};

// button to clear sidebar content if a search has been made
var clearSidebarButton = {
    id: 'click',                     // UID, used to access the panel
    tab: '<i class="far fa-times-circle"></i>',  // Uses relevant font awesome icon
    button: function (event) { clearSidebar() },        // clears sidebar on click
    title: 'Clear selection',
    position: 'bottom'                  // Place at bottom of sidebar
};

var panelContentInfo = {
    id: 'infoPanel',                     // UID, used to access the panel
    tab: '<i class="fa fa-info fa-lg"></i>',  // Uses relevant font awesome icon
    pane: "<div id='infoPanelContent'>Information and Sources will be listed here</div>",        // Contains information on sources and references
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
        var Name = "<h2><div class='Title'><div class='leftTitle'>" + fp.NHSInformName + "</div><div class = 'rightImage'><img src=" +figure+ " style='vertical-align:middle; float:right' width='30' height ='30'></div></h2><div class ='line'></div></div>"
    } else if (fp.Name == fp.Name) {
        Name = "<h2><div class='Title'>" + fp.Name + "</div><div class='rightImage'><img src=" +figure+ " style='vertical-align:middle; float:right' width='30' height ='30'></div></h2><br><br><div class ='line'></div>"
    } else {
        Name = "<h2>" + fp.DispenserName + "<img src=" +figure+ " style='vertical-align:middle; float:right' width='30' height ='30'></h2><div class ='line'></div>"
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
    if (fp.Telephone == fp.Telephone) {
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

    // Define the pdf download link which will open in a new window
    var pdfDownload = "<div class='sidebar-text-sections'><i class='fa fa-download fa-2x' aria-hidden='true'></i> <div class = sidebar-text-right><span style=''><a href='#sidebar' " + "<span onClick='saveAsPDF(" + '"' + fp.Name + '"' + ")'>Save as PDF</span></a></span></div></div>" +
                        "<br><div class ='line'></div><br>"

    
    // Create the full string for adding to the sidebar on click
    sidebarString = Name + fullAddress + Telephone + Services + OpeningTimes + Website + Email + Directions + WA + pdfDownload
    return sidebarString;
};



// FUNCTION WHICH CREATES THE POP UP CONTENT
// similar to above, content is dynamically created based on feature properties
// relevant html and css added

function setPopUpContent(fp, panelId) {

    // Define the Name variable. If the feature has a property called NHSInformName, use that. If not, use the Name property.
    // For pharmacies, some have no name in the name column and so for those, use Dispenser name.
    if(fp.NHSInformName && fp.NHSInformName == fp.NHSInformName) {
        var Name = "<div class=box></div><h3>" + fp.NHSInformName + "</h3><div class ='line'></div><br>"
    } else if (fp.Name == fp.Name) {
        Name = "<div class=box></div><h3>" + fp.Name + "</h3><div class ='line'></div><br>"
    } else {
        Name = "<div class=box></div><h3>" + fp.DispenserName + "</h3><div class ='line'></div><br>"
    }

    if (fp.Telephone == fp.Telephone) {
        fp.Telephone = fp.Telephone .replace(/-/g," ")         // replace any "-" within phone numbers with blank spaces
        var Telephone = "<br><br><a href=tel:" + ((fp.Telephone).replace(/\s+/g, ''))+ ">" + fp.Telephone+"</a><br>"     // removes spaces within the telephone number when adding a link
    } else {
        Telephone = ''
    }

    popupString = Name + fp.Address1 + "<br>" + fp.Postcode + Telephone + 
    "<br><a href='#' " + "<span onClick='sidebar.open("  + '"' + panelId + '"' +  ")'><b>More details...</b></span></a><br><br><div class=line></div>"
    
    return popupString
}


// FUNCTION TO CREATE THE SIDEBAR CONTENT FOR THE SELECTED FEATURE ON THE MAP

function updateSidebar(fp,figure, paneId, panelId, panelName) {
    sidebar.enablePanel('click'); 

    if(document.getElementById(panelId) == null){           // check whether a sidebar panel for thsi ser
        sidebar.addPanel(panelName)                         // add the panel to the sidebar
    };

    createSidebarContent(fp,figure);                        // create the string based on the selected feature
    var panelContent = document.getElementById(paneId);     // retrieve the container for the relevant paneID
    panelContent.innerHTML = sidebarString                  // set the content of the pane as the dynamically created sidebarString

}


// FUNCTION TO CLEAR SIDEBAR AND MAP SELECTION
function clearSidebar () {
    map.closePopup();               //  Close any pop ups
    resetLayerStyles();             //  Reset styles

    //define the list of possible panel id's to be removed
    var panelIdList = ['gpPanel', 'dentistPanel', 'opticiansPanel', 'pharmaciesPanel', 'hospitalsPanel', 'shClinicsPanel']
    
    var sidebarStatus = document.getElementById("sidebar");             //access the sidebar element

    for (i in panelIdList) {
        if(document.getElementById(panelIdList[i]) != null){            // check if the panel id is not null (is present on the sidebar)
            sidebar.removePanel(panelIdList[i]);                        // remove panel
        } else {} }
    
    if (hasClass(sidebarStatus,'collapsed')) {}                         // if sidebar is closed, do nothing
    else { sidebar.open('home') };                                      // if the sidebar is open, open the home tab
}


    // FUNCTION TO DECIDE WHETHER TO OPEN POP UP ON CLICK OF FEATURE
    // used in addGeoJSONData()   

function openPopupOrRefreshSidebar(layer, panelId) {
    var sidebarDiv = document.getElementById("sidebar");        
    if (hasClass(sidebarDiv,'collapsed')) {                 // if sidebar is collapsed
        layer.openPopup();                                  // open pop up
    } else {                                                // if it is open
        layer.closePopup(),                                 // ensure pop up is closed
        sidebar.open(panelId),                              // open relevant sidebar panel
        $("#" + panelId).hide().fadeIn('slow')              // add fade effect
    };
}
    


// FUNCTION TO SAVE SIDEBAR CONTENT AS PDF
// Uses html2pdf plugin
// This is to enable users to save details of the services they may attend
function saveAsPDF(Name) {
    var opt = {
        margin:       1,
        filename:     Name + '.pdf',                                   // Add name of service to file output
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

    var sidebarElement = document.getElementById('sidebar');           // retrieve sidebar div
    
    var elementHTML = sidebarElement.outerHTML;
    var finalOutput = elementHTML.replace("Save as PDF", '');          // remove save as pdf statement from html
    
    html2pdf().set(opt).from(finalOutput).save()                       // set the options and download element as pdf
}


   
/*
 THIS SCRIPT CONTAINS THE FUNCTIONS USED FOR CREATING THE SIDEBAR AND POP UP CONTENT. 
 As the data varies between the different services, for example, the content within the sidebar and pop ups can vary a large amount.
 Therefore, many if statements had to be used for each possible attribute a service could have. 
 Generally, if it does not exist or is empty (NaN), the corresponding variable for that attribute will be filled with an empty string.
*/

var Sidebar_String;
var Popup_string;

var sidebar_default_content = "<div class = 'box top'></div> \
                            <h1>Find your local Health Services \
                            </h1><div class ='line'></div>\
                            <h4>Welcome to a new and engaging way to search for your nearest NHS Scotland Health Services.</h4>\
                            <p> Please choose the service you are looking for today. Explore the map and click on locations to find out more information. </p>\
                            <p><hr>\
                            <div class = 'Allbuttons'><button type='button' class=btn onclick='addLayer(GPs_layer)'><img src='MapFigures/GPs.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;GPs</span></button>\
                            \
                            <button type='button' class=btn onclick='addLayer(Dentists_layer, DentistControl)'><img src='MapFigures/Dentists2.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;Dentists</button>\
                            \
                            <button type='button' class=btn onclick='addLayer(Opticians_layer, OpticiansControl)'><img src='MapFigures/Opticians2.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;Opticians</button>\
                            \
                            <button type='button' class=btn onclick='addLayer(Pharmacies_layer, PharmaciesControl)'><img src='MapFigures/Pharmacies.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;Pharmacies</button>\
                            \
                            <button type='button' class=btn onclick='addLayer(Hospitals_layer, HospitalsControl)'><img src='MapFigures/Hospitals.png' style='vertical-align:middle' width='30' height ='30'>&nbsp;&nbsp;&nbsp;Hospitals</button>\
                            \
                            <button type='button' class=btn onclick='addLayer(SHClinics_layer, SHClinicsControl)'><div class='test'><img src='MapFigures/SHClinics.png' style='vertical-align:middle' width='30' height ='30'><span style = 'font-size: 14px'>&nbsp&nbsp;Sexual Health &nbsp;&nbsp;Clinics</span></button>\
                            <p></div><hr>"
                            

function createSidebarContent(fp, figure) {
    
    // define all variables to be used in the sidebar content. This will vary from service to service, so many coniderations to be given

    // Define the Name variable. If the feature has a property called NHSInformName, use that. If not, use the Name property.
    if(fp.NHSInformName && fp.NHSInformName == fp.NHSInformName) {
        var Name = "<div class = 'box top'></div><h2>" + fp.NHSInformName + "<img src=" +figure+ " style='vertical-align:middle; float:right' width='30' height ='30'></h2><div class ='line'></div>"
    } else if (fp.Name == fp.Name) {
        Name = "<div class = 'box top'></div><h2>" + fp.Name + "<img src=" +figure+ " style='vertical-align:middle; float:right' width='30' height ='30'></h2><div class ='line'></div>"
    } else {
        Name = "<div class = 'box top'></div><h2>" + fp.DispenserName + "<img src=" +figure+ " style='vertical-align:middle; float:right' width='30' height ='30'></h2><div class ='line'></div>"
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
    var fullAddress =  "<div class='test'><i class='fa fa-map-marker fa-3x' aria-hidden='true'></i>" +
                    "<div class = sidetext><span style=''><b><br>Address<br></b>" + 
                    Address + 
                    "<br>" +
                    fp.Postcode + 
                    "</div></div></span><br><div class ='line'></div><br>" 


    // Define the Telephone variable. If the telephone property is non NaN, include this and a link to call. If not, leave the telephone variable empty.
    var Telephone;
    if (fp.Telephone == fp.Telephone) {
        Telephone = "<div class='test'><i class='fa fa-phone fa-2x' aria-hidden='true'></i> <div class = sidetext><span style=''><b>Telephone</b><br> <a href=tel:" + ((fp.Telephone).replace(/\s+/g, ''))+ ">" + fp.Telephone+"</a></div><span></div><br>" +
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
        Services = "<div class=lunchtext><b>Services Offered</b></div><dl>" + fp.Services + "</dl><br><div class ='line'></div><br>"
    } else {
        Services = '';
    }


    // Define the OpeningTimes variable. Create lists for the OpeningTimes properties, empty variables and for strings of the opening times days.
    
    var OpeningTimes = "<div class=lunchtext><b>Opening Times</b></div><dl>";
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
        OpeningTimes = OpeningTimes + "</dl><div class=lunchtext><b>" + fp.ExtraOTInfo + "</div><br><div class ='line'></div><br>"
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
        Website = "<div class='test'><i class='fa fa-globe fa-2x' aria-hidden='true'></i> <div class = sidetext><span style=''><b>Website</b><br><a href=" + fp.Website + " target=_blank>Visit Website</a></span></div></div>"  + 
        "<br><div class ='line'></div><br>"
    } else {
        Website = ''
    }

    // Define the directions variable with a link to the Google Directions property
    var Directions = "<div class='test'><i class='fa fa-compass fa-2x' aria-hidden='true'></i> <div class = sidetext><span style=''><b>Directions</b><br><a href=" + fp.GoogleDirections+ " target=_blank>Get Directions</a><span></div></div>" +
                    "<br><div class ='line'></div><br>"

    // Define the pdf download link which will open in a new window
    var pdfDownload = "<div class='test'><i class='fa fa-download fa-2x' aria-hidden='true'></i> <div class = sidetext><span style=''><a href='#sidebar' " + "<span onClick='saveAsPDF(" + '"' + fp.Name + '"' + ")'>Save as PDF</span></a></span></div></div>" +
                        "<br><div class ='line'></div><br>"

    
    // Create the full string for adding to the sidebar on click
    Sidebar_String = Name + fullAddress + Telephone + Services + OpeningTimes + Website + Directions + pdfDownload

};



// Create a similar function for defining the pop up content

function setPopUpContent(fp) {

    // Define the Name variable. If the feature has a property called NHSInformName, use that. If not, use the Name property.
    // For pharmacies, some have no name in the name column and so for those, use Dispenser name.
    if(fp.NHSInformName && fp.NHSInformName == fp.NHSInformName) {
        var Name = "<h3>" + fp.NHSInformName + "</h3>"
    } else if (fp.Name == fp.Name) {
        Name = "<h3>" + fp.Name + "</h3><div class ='line'></div>"
    } else {
        Name = "<h3>" + fp.DispenserName + "</h3><div class ='line'></div>"
    }

    if (fp.Telephone == fp.Telephone) {
        
        fp.Telephone = fp.Telephone .replace(/-/g," ")
        var Telephone = "<a href=tel:" + ((fp.Telephone).replace(/\s+/g, ''))+ ">" + fp.Telephone+"</a><br>"
    } else {
        Telephone = ''
    }

    PopupString = "<div class=box></div>" + Name + fp.Address1 + "<br>" + fp.Postcode + "<br><br>" + Telephone + 
    "<br><a href='#' " + "<span onClick='openSidebar()'><b>More details...</b></span></a><br><br><div class=box></div>"
    
    return PopupString
}


function updateSidebar(fp,figure) {

    createSidebarContent(fp,figure);
    sidebar.setContent(Sidebar_String);

    if (sidebar.isVisible() == true) {
            $("#sidebar").hide().fadeIn('slow');
};
}

function openSidebar() {
    if (sidebar.isVisible() !== true) {
            sidebar.toggle();
        }
    }
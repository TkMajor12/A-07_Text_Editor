/*
* FILE:			 jQuery.cs
* PROJECT:		 A-07 Text Editor
* FIRST VERSION: 2022-12-09
* PROGRAMMER(s): Ethan Major, Caleb Brown
* DESCRIPTION:   This file contains all of the Ajax calls and jQuery logic for sending and recieving data to and from the server and manipulating areas of the DOM
*/
var jQueryXMLHttpRequest;
var selectedFile;
var exists = false;

$(document).ready(function () {
    // Retrieve all files from the directory
    LoadFilesFromDirectory();

    // Update file to load when the selection changes
    $("#file-names").on("change", function () {
        selectedFile = $(this).children("option:selected").val();
    });

    // Open the file when the open button is clicked
    $("#open-file").on("click", OpenFile);

    // Save the file when the save button is clicked
    $("#save-file").on("click", SaveFile);

    // Save the file with the new supplied filename
    $("#save-file-as").on("click", SaveFileAs);

    // Update the line and character count whenever the text changes
    $("#textEditor").on("input", GetCharAndLineCount);

    // Refresh the page to update the select list
    $("#refresh-filelist").on("click", function () {
        location.reload();
    });
});

// METHOD:      LoadFilesFromDirectory()
// DESCRIPTION: This method sends the directory containing the files as a JSON string to the server.
//              It then receives a JSON string back as a response containing all of the filenames currently in that directory
// PARAMETERS:  None
// RETURNS:		None
function LoadFilesFromDirectory() {
    var directory = "MyFiles";
    var jsonData = { directoryToLoad: directory };
    var jsonString = JSON.stringify(jsonData);

    // Make ajax call to populate the list in the client
    jQueryXMLHttpRequest = $.ajax({
        // Set config data for the Ajax call
        url: 'startPage.aspx/GetFileNames',
        type: 'POST',
        data: jsonString,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        // Success method to handle the response if it was successful
        success: function (data) {
            if (data != null && data.d != null) {
                var select = $('#file-names');
                // Parse JSON
                var response = $.parseJSON(data.d);

                // Iterate through JSON and add each item to the HTML selector
                $.each(response, function (index, fileName) {
                    select.append('<option value="' + fileName + '">' + fileName + '</option>');
                });
            }
        },
        // Fail method to handle the response if it was a failure
        fail: function () {
            alert("The call to the WebMethod failed!");
        }
    });
}

// METHOD:      SaveFile()
// DESCRIPTION: This method sends the filename to be saved as a JSON string and then receives a status message as a JSON string and alerts the user appropriately
// PARAMETERS:  None
// RETURNS:		None
function SaveFile() {
    var fileContent = $("#textEditor").val();
    // Format JSON
    var jsonData = { fileToSave: selectedFile, content: fileContent };
    var jsonString = JSON.stringify(jsonData);

    // Make ajax call to populate the list in the client
    jQueryXMLHttpRequest = $.ajax({
        url: 'startPage.aspx/SaveFile',
        type: 'POST',
        data: jsonString,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        // Success method to handle the response if it was successful
        success: function (data) {
            if (data != null && data.d != null) {
                // Parse JSON
                var response = JSON.parse(data.d);
                var message = "";

                // Update response message
                if (response == "Success") {
                    message = "Successfully saved file";
                }
                else {
                    message = "Sorry! There was an error saving the file. Please try again later.";
                }

                // Alert user
                alert(message);
            }
        },
        fail: function () {
            alert("Sorry! There was an error saving the file. Please try again later.");
        }
    });
}

// METHOD:      OpenFile()
// DESCRIPTION: This method sends the filename to be opened as a JSON string and then receives the content of that file back also as a JSON object.
//              This method then parses the JSON and writes all of the content in the text editor area
// PARAMETERS:  None
// RETURNS:		None
function OpenFile() {
    // Check to ensure the user has selected a file first
    if (selectedFile == null) {
        alert("Must select a file from the list first!");
    } else {
        // Format JSON
        var jsonData = { fileToOpen: selectedFile };
        var jsonString = JSON.stringify(jsonData);

        // Make ajax call to populate the list in the client
        jQueryXMLHttpRequest = $.ajax({
            url: 'startPage.aspx/OpenFileContents',
            type: 'POST',
            data: jsonString,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            // Success method to handle the response if it was successful
            success: function (data) {
                if (data != null && data.d != null) {
                    // Parse JSON
                    var response = $.parseJSON(data.d);
                    // Write the data to the editor window
                    document.getElementById("textEditor").value = response;
                }
            },
            fail: function () {
                document.getElementById("statusMessage").innerHTML = "Failed";
            }
        });
    }   
}

// METHOD:      SaveFileAs()
// DESCRIPTION: Retrieves the new filename from the input textbox and calls the SaveFile method with it to create and save as a new file
// PARAMETERS:  None
// RETURNS:		None
function SaveFileAs() {
    // Update the selected file to the new filename
    selectedFile = $("#new-filename").val();

    // Save the file
    SaveFile();
}

// METHOD:      GetCharAndLineCount()
// DESCRIPTION: This method calculates the current line and character count in the text editor area and updates the status message appropriately
// PARAMETERS:  None
// RETURNS:		None
function GetCharAndLineCount() {
    // Get the content currently in the editor
    var content = $("#textEditor").val();

    // Calculate character count
    var charCount = content.length;

    // Calculate line count
    var lineCount = content.split('\n').length;

    // Update status message
    document.getElementById("statusMessage").innerHTML = "Lines: " + lineCount + ", Character Count: " + charCount; 
}

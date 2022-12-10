var jQueryXMLHttpRequest;
var selectedFile;
var charCount;

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
});

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
                var response = $.parseJSON(data.d);

                $.each(response, function (index, fileName) {
                    select.append('<option value="' + fileName + '">' + fileName + '</option>');
                });
            }
        },
        // Fail method to handle the response if it was a failure
        fail: function () {
            document.getElementById("statusMessage").innerHTML = "The call to the WebMethod failed!";
        }
    });
}

function SaveFile() {
    var fileContent = $("#textEditor").val();

    var jsonData = { fileToSave: selectedFile, content: fileContent };
    var jsonString = JSON.stringify(jsonData);

    jQueryXMLHttpRequest = $.ajax({
        url: 'startPage.aspx/SaveFile',
        type: 'POST',
        data: jsonString,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            if (data != null && data.d != null) {
                var response = JSON.parse(data.d);
                var message = "";

                if (response == "Success") {
                    message = "Successfully saved file";
                }
                else {
                    message = "Sorry! There was an error saving the file. Please try again later.";
                }

                alert(message);
            }
        },
        fail: function () {
            alert("Sorry! There was an error saving the file. Please try again later.");
        }
    });
}

function OpenFile() {
    if (selectedFile == null) {
        alert("Must select a file from the list first!");
    } else {
        var jsonData = { fileToOpen: selectedFile };
        var jsonString = JSON.stringify(jsonData);

        jQueryXMLHttpRequest = $.ajax({
            url: 'startPage.aspx/OpenFileContents',
            type: 'POST',
            data: jsonString,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                if (data != null && data.d != null) {
                    var response = $.parseJSON(data.d);
                    document.getElementById("textEditor").value = response;
                }
            },
            fail: function () {
                document.getElementById("statusMessage").innerHTML = "Failed";
            }
        });
    }   
}

function SaveFileAs() {
    selectedFile = $("#new-filename").val();
    SaveFile();
    var select = $("#fileSelector");
    select.append('<option value="' + selectedFile + '">' + selectedFile + '</option>');
}

function GetCharAndLineCount() {
    var content = $("#textEditor").val();
    var charCount = content.length;
    var lineCount = content.split('\n').length;

    document.getElementById("statusMessage").innerHTML = "Lines " + lineCount + ", Character count " + charCount; 
}

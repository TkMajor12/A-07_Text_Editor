var jQueryXMLHttpRequest;

$(document).ready(function () {
    LoadFilesFromDirectory();
});

function LoadFilesFromDirectory() {

    directory = "MyFiles";
    var Directory = "";

    var jsonData = { directoryToLoad: directory };
    var jsonString = JSON.stringify(jsonData);

    jQueryXMLHttpRequest = $.ajax({
        url: 'startPage.aspx/GetFileNames',
        type: 'POST',
        data: jsonString,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var select = $('#file-names');
            $.each(data, function (index, fileName) {
                select.append('<option value="' + fileName + '">' + fileName + '</option>');
            });
        },
        fail: function () {
            document.getElementById("statusMessage").innerHTML = "The call to the WebMethod failed!";
        }
    });
}


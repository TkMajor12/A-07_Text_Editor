<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="startPage.aspx.cs" Inherits="WDD_Text_Editor.startPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>A-07 Text Editor (using jQuery and JSON)</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type = "text/javascript" src = "jQuery.js"></script>

    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <form runat="server">
        <div>
            <select id="file-names">
                <option value="">--Please select a file--</option>
            </select>
            <input type="button" id="open-file" value="Open File"/>
            <input type="button" id="save-file" value="Save"/>
        </div>
        <div>
            <textarea id="textEditor" class="textEditorStyle" ></textarea>
        </div>
        <div>
            <p id="statusMessage"></p>
        </div>
    </form>
</body>
</html>



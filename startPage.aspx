<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="startPage.aspx.cs" Inherits="WDD_Text_Editor.startPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>A-07 Text Editor (using jQuery and JSON)</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type = "text/javascript" src = "jQuery.js"></script>
</head>
<body>
    <form runat="server">
        <div>
            <select id="file-names">
                <option value="">--Please select a file--</option>
            </select>
        </div>
        <div>
            <p id="statusMessage"></p>
        </div>
    </form>
</body>
</html>



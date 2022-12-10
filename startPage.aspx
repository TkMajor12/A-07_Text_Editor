<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="startPage.aspx.cs" Inherits="WDD_Text_Editor.startPage" %>
<!DOCTYPE html>

<!--
* FILE:			 startPage.aspx
* PROJECT:		 A-07 Text Editor
* FIRST VERSION: 2022-12-09
* PROGRAMMER(s): Ethan Major, Caleb Brown
* DESCRIPTION:   This file contains all of the required controls for the text editor page
-->

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>A-07 Text Editor (using jQuery and JSON)</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type = "text/javascript" src = "jQuery.js"></script>
    <link rel="stylesheet" href="/resources/style.css" />
    <link rel="shortcut icon" type="image/x-icon" href="/resources/notepad.ico" />
</head>
<body>
    <form runat="server">
        <div>
            <h1>A-07 Text Editor</h1>
            <br />
            <select id="file-names">
                <option value="">--Please select a file--</option>
            </select>
            <input type="button" id="open-file" value="Open File"/>
            <input type="button" id="save-file" value="Save"/>
            <label for="new-filename">New Filename:</label>
            <input type="text" id="new-filename"/>
            <input type="button" id="save-file-as" value="Save As"/>
            <input type="button" id="refresh-filelist" value="Refresh" />
        </div>
        <div>
            <br />
        </div>
        <div>
            <textarea id="textEditor" class="textEditorStyle" spellcheck="false" ></textarea>
        </div>
        <div>
            <p id="statusMessage">Lines: 1, Character Count: 0</p>
        </div>
    </form>
</body>
</html>



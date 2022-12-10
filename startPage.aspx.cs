/*
* FILE:			 startPage.aspx.cs
* PROJECT:		 A-07 Text Editor
* FIRST VERSION: 2022-12-09
* PROGRAMMER(s): Ethan Major, Caleb Brown
* DESCRIPTION:   This file contains all the logic for handling the various Ajax calls sent by the client and packaging up responses as JSON objects
*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.IO;
using System.Diagnostics;
using Newtonsoft.Json;

namespace WDD_Text_Editor
{
    public partial class startPage : System.Web.UI.Page
    {
        private static String directory = String.Empty;

        // METHOD:      public static String GetFileNames(string directoryToLoad)
        // DESCRIPTION: This method receives the directory containing the files as a string.
        //              Then gathers all of the file information in it and sends it back to the client as JSON
        // PARAMETERS:  string directoryToLoad: Directory containing files
        // RETURNS:		Returns a JSON object string back to the client containing all of the file names
        [WebMethod]
        public static String GetFileNames(string directoryToLoad)
        {
            List<String> filenames = new List<String>();

            try
            {
                // Get the full path to the directory containing the files
                directory = HttpContext.Current.Server.MapPath(directoryToLoad);

                // Get all of the files in that directory
                String[] filesInDir = Directory.GetFiles(directory);
                
                foreach (String file in filesInDir)
                {
                    // Open a stream to each file
                    StreamReader reader = new StreamReader(file);
                    reader?.Peek();

                    // Check if the encoding on each file is ASCII
                    System.Text.Encoding encoding = reader.CurrentEncoding;

                    if (encoding.BodyName == "utf-8")
                    {
                        // If the file is ASCII, add it to the list
                        filenames?.Add(Path.GetFileName(file));
                    }

                    // Close the stream
                    reader?.Close();
                }
            }
            catch (Exception)
            {}

            // Return filenames as JSON
            return JsonConvert.SerializeObject(filenames, Formatting.Indented);
        }

        // METHOD:      public static String OpenFileContents(string fileToOpen)
        // DESCRIPTION: This method receives the name of the file the user is attempting to open as a string
        //              Then reads all of the data contained in the file and sends it back to the client as JSON
        // PARAMETERS:  string fileToOpen: Name of the file to open
        // RETURNS:		Returns a JSON object string back to the client containing all of the file data
        [WebMethod]
        public static String OpenFileContents(string fileToOpen)
        {
            String fileData = String.Empty;

            // Get full filepath
            String filepath = directory + @"\" + fileToOpen;

            try
            {
                // Check if the file still exists
                if (File.Exists(filepath))
                {
                    // Open a stream to read from
                    StreamReader sw = new StreamReader(filepath);

                    // Read all of the content in the file
                    fileData = sw?.ReadToEnd();

                    // Close the stream
                    sw?.Close();
                }
            }
            catch(Exception)
            {}

            // Return content as JSON
            return JsonConvert.SerializeObject(fileData);
        }

        // METHOD:      public static String SaveFile(string fileToSave, String content)
        // DESCRIPTION: This method receives the name of the file the user is attempting to save as a string and also receieves the content of the file as a string.
        //              This method then opens up a stream to the file with the given name and writes all of the data to it
        // PARAMETERS:  string fileToSave: Name of the file to save
        //              string content: Content to be written to the existing or new file
        // RETURNS:		Returns a JSON object string back to the client indicating the save status
        [WebMethod]
        public static String SaveFile(String fileToSave, String content)
        {
            String SaveStatus = String.Empty;

            // Get full filepath
            String filepath = directory + @"\" + fileToSave;

            try
            {
                // Open stream
                StreamWriter sw = new StreamWriter(filepath);

                // Write content to the file
                sw?.WriteLine(content);

                // Close stream
                sw?.Close();

                // Update save status
                SaveStatus = "Success";
            }
            catch(Exception)
            {
                SaveStatus = "Failure";
            }

            // Return status as JSON
            return JsonConvert.SerializeObject(SaveStatus);
        }
    }
}
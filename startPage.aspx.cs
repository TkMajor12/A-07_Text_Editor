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

        [WebMethod]
        public static String GetFileNames(string directoryToLoad)
        {
            List<String> filenames = new List<String>();

            try
            {
                directory = HttpContext.Current.Server.MapPath(directoryToLoad);
                String[] filesInDir = Directory.GetFiles(directory);
                
                foreach (String file in filesInDir)
                {
                    StreamReader reader = new StreamReader(file);
                    reader?.Peek();

                    System.Text.Encoding encoding = reader.CurrentEncoding;

                    if (encoding.BodyName == "utf-8")
                    {
                        filenames.Add(Path.GetFileName(file));
                    }

                    reader?.Close();
                }
            }
            catch (Exception)
            {

            }
            
            return JsonConvert.SerializeObject(filenames, Formatting.Indented);
        }

        [WebMethod]
        public static String OpenFileContents(string fileToOpen)
        {
            String fileData = String.Empty;
            String filepath = directory + @"\" + fileToOpen;

            try
            {
                if (File.Exists(filepath))
                {
                    StreamReader sw = new StreamReader(filepath);
                    fileData = sw?.ReadToEnd();
                    sw?.Close();
                }
            }
            catch(Exception)
            {

            }

            return JsonConvert.SerializeObject(fileData);
        }

        [WebMethod]
        public static String SaveFile(String fileToSave, String content)
        {
            String SaveStatus = String.Empty;
            String filepath = directory + @"\" + fileToSave;

            try
            {
                StreamWriter sw = new StreamWriter(filepath);
                sw?.WriteLine(content);
                sw?.Close();
                SaveStatus = "Success";
            }
            catch(Exception)
            {
                SaveStatus = "Failure";
            }

            return JsonConvert.SerializeObject(SaveStatus);
        }
    }
}
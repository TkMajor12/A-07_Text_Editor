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
        [WebMethod]
        public static String GetFileNames(string directoryToLoad)
        {
            String filepath = HttpContext.Current.Server.MapPath(directoryToLoad);
            String[] filesInDir = Directory.GetFiles(filepath);
            List<String> filenames = new List<String>();

            foreach(String file in filesInDir)
            {
                StreamReader reader = new StreamReader(file);
                reader.Peek();

                System.Text.Encoding encoding = reader.CurrentEncoding;

                if(encoding.BodyName == "utf-8")
                {
                    filenames.Add(Path.GetFileName(file));
                }
            }

            return JsonConvert.SerializeObject(filenames);
        }
    }
}
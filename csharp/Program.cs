using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography.Xml;
using System.Xml;

namespace XmlC14N
{
    class Program
    {
        private static List<string> xmlList = new List<string>
        {
            "<?xml version=\"1.0\" encoding=\"utf-8\"?><?xml-stylesheet   href=\"doc.xsl\"   type=\"text/xsl\"   ?><root><child><inner>123</inner></child></root>",
            "<?xml version=\"1.0\"?><root><child><MsInfo xmlns:t=\"test\" t:test=\"1\"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>",
            "<root xmlns=\"\"><child><inner>123</inner></child></root><?pi-without-data   ?><!-- one for the road -->",
            "<?xml version=\"1.0\"?><root><child id='\"id\"' Id=\"\"><!-- Comment --></child></root>"
        };
        static void Main(string[] args)
        {
            foreach (var xml in xmlList)
            {
                var xmlDocument = new XmlDocument();
                xmlDocument.LoadXml(xml);
                
                Console.WriteLine("===> ORIGINAL <====");
                Console.WriteLine(xmlDocument.InnerXml);
                
                Console.WriteLine("===> C14N <====");
                var transformXml = new XmlDsigExcC14NTransform();
                transformXml.LoadInput(xmlDocument);
                var stream = transformXml.GetOutput(typeof (Stream)) as Stream;
                var reader = new StreamReader(stream);
                Console.WriteLine(reader.ReadToEnd());

                Console.WriteLine("===> C14N#WithComments <====");
                transformXml = new XmlDsigExcC14NTransform(true);
                transformXml.LoadInput(xmlDocument);
                stream = transformXml.GetOutput(typeof(Stream)) as Stream;
                reader = new StreamReader(stream);
                Console.WriteLine(reader.ReadToEnd());
                Console.WriteLine();
            }
        }
    }
}

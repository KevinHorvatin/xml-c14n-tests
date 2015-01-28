## NodeJS XML canonicalization
This demonstrates xml-crypto's view on how XML should be canonicalized. 

## Run it
npm install
npm start

## Output
* Should leave spaces in pidata with values intact (xml-stylesheet should stay as-is)
--* ORIGINAL 
`````xml
 <?xml version="1.0" encoding="utf-8"?><?xml-stylesheet href="doc.xsl"   type="text/xsl"?><root><child><inner>123</inner></child></root>
`````
--* C14N 
`````xml
 <root><child><inner>123</inner></child></root>
`````

* Just remove the <?xml version>
--* ORIGINAL 
`````xml
 <?xml version="1.0"?><root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>
`````
--* C14N
`````xml
 <root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>
`````

* Just remove spaces in pidata without values, but retain the tag
--* ORIGINAL 
`````xml
 <root xmlns=""><child><inner>123</inner></child></root><?pi-without-data ?><!-- one for the road -->
`````
--* C14N
`````xml
 <root xmlns=""><child><inner>123</inner></child></root>
`````

* Remove comments in C14N but leave comments in C14N#WithComments
--* ORIGINAL 
`````xml
 <?xml version="1.0"?><root><child id="&quot;id&quot;" Id=""><!-- Comment --></child></root>
`````
--* C14N
`````xml
 <root><child id="&quot;id&quot;" Id=""><!-- Comment --></child></root>
`````

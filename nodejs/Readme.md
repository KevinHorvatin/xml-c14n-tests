## NodeJS XML canonicalization
This demonstrates xml-crypto's view on how XML should be canonicalized. 

## Run it
npm install
npm start

## Output
* ORIGINAL 
--* <?xml version="1.0" encoding="utf-8"?><?xml-stylesheet href="doc.xsl"   type="text/xsl"?><root><child><inner>123</inner></child></ro
ot>
* C14N 
--* <root><child><inner>123</inner></child></root>

* ORIGINAL 
--* <?xml version="1.0"?><root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</
CreationUTC></Metadata></MsInfo></child></root>
* C14N
--* <root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadat
a></MsInfo></child></root>

* ORIGINAL 
--* <root xmlns=""><child><inner>123</inner></child></root><?pi-without-data ?><!-- one for the road -->
* C14N
--* <root xmlns=""><child><inner>123</inner></child></root>

* ORIGINAL 
--* <?xml version="1.0"?><root><child id="&quot;id&quot;" Id=""><!-- Comment --></child></root>
* C14N
--* <root><child id="&quot;id&quot;" Id=""><!-- Comment --></child></root>

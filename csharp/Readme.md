## dotNet Canonicalization
This demonstrates how dotNet canonicalizes XML. 

## Build it
To build this use a VS2013 command prompt and type:

csc /out:c14n.exe program.cs

## Run it
c14n.exe


## Output
1. Should leave spaces in pidata with values intact

* ORIGINAL 
--* <?xml version="1.0" encoding="utf-8"?><?xml-stylesheet href="doc.xsl"   type="text/xsl"   ?><root><child><inner>123</inner></child></root>
* C14N 
--* <?xml-stylesheet href="doc.xsl"   type="text/xsl"   ?>
--<root><child><inner>123</inner></child></root>

* C14N#WithComments 
--* <?xml-stylesheet href="doc.xsl"   type="text/xsl"   ?>
--<root><child><inner>123</inner></child></root>

2. Just remove the <?xml version>
* ORIGINAL 
--*<?xml version="1.0"?><root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>
* C14N 
--*<root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>
* C14N#WithComments 
--*<root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>

3. Just remove the <?xml version>
* ORIGINAL 
--* <root xmlns=""><child><inner>123</inner></child></root><?pi-without-data ?><!-- one for the road -->
* C14N 
--* <root><child><inner>123</inner></child></root>
--<?pi-without-data?>
* C14N#WithComments 
--*<root><child><inner>123</inner></child></root>
--<?pi-without-data?>
--<!-- one for the road -->

4. Remove comments in C14N but leave comments in C14N#WithComments
* ORIGINAL 
--*<?xml version="1.0"?><root><child id="&quot;id&quot;" Id=""><!-- Comment --></child></root>
* C14N 
--*<root><child Id="" id="&quot;id&quot;"></child></root>
* C14N#WithComments 
--*<root><child Id="" id="&quot;id&quot;"><!-- Comment --></child></root>



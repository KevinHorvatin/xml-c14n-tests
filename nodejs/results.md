
> C14NTest@1.0.0 start C:\dev\c14n-tests\nodejs
> node index.js

## xml-crypto
* Leave xml-stylesheet in place and maintain spaces, remove xml version

    ORIGINAL
    ```xml
<?xml version="1.0" encoding="utf-8"?><?xml-stylesheet href="doc.xsl"   type="text/xsl"?><root><child><inner>123</inner></child></root>
    ```

    C14N EXPECTED
    ```xml
   <?xml-stylesheet   href="doc.xsl"   type="text/xsl"   ?>
<root><child><inner>123</inner></child></root>
    ```

    C14N ACTUAL
    ```xml
<root><child><inner>123</inner></child></root>
    ```

* Only remove xml version

    ORIGINAL
    ```xml
<?xml version="1.0"?><root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>
    ```

    C14N EXPECTED
    ```xml
   <root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>
    ```

    C14N ACTUAL
    ```xml
<root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>
    ```

* Leave pidata, remove comments (c14n), leave commments (c14n#withcomments)

    ORIGINAL
    ```xml
<root xmlns=""><child><inner>123</inner></child></root><?pi-without-data ?><!-- one for the road -->
    ```

    C14N EXPECTED
    ```xml
   <root xmlns=""><child><inner>123</inner></child></root><?pi-without-data?>
    ```

    C14N ACTUAL
    ```xml
<root xmlns=""><child><inner>123</inner></child></root>
    ```

* Remove comments (c14n), leave commments (c14n#withcomments)

    ORIGINAL
    ```xml
<?xml version="1.0"?><root><child id="&quot;id&quot;" Id=""><!-- Comment --></child></root>
    ```

    C14N EXPECTED
    ```xml
   <root><child id="&quot;id&quot;" Id=""></child></root>
    ```

    C14N ACTUAL
    ```xml
<root><child id="&quot;id&quot;" Id=""><!-- Comment --></child></root>
    ```

## xml-c14n
* Leave xml-stylesheet in place and maintain spaces, remove xml version

    ORIGINAL
    ```xml
<?xml version="1.0" encoding="utf-8"?><?xml-stylesheet href="doc.xsl"   type="text/xsl"?><root><child><inner>123</inner></child></root>
    ```

    C14N EXPECTED
    ```xml
   <?xml-stylesheet   href="doc.xsl"   type="text/xsl"   ?>
<root><child><inner>123</inner></child></root>
    ```

    C14N ACTUAL
    ```xml
<root><child><inner>123</inner></child></root>
    ```
     C14N#WithComments EXPECTED
    ```xml
   <?xml-stylesheet   href="doc.xsl"   type="text/xsl"   ?>
<root><child><inner>123</inner></child></root>
    ```

    C14N#WithComments ACTUAL
    ```xml
<root><child><inner>123</inner></child></root>
    ```

* Only remove xml version

    ORIGINAL
    ```xml
<?xml version="1.0"?><root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>
    ```

    C14N EXPECTED
    ```xml
   <root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>
    ```

    C14N ACTUAL
    ```xml
<root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>
    ```
    
    C14N#WithComments EXPECTED
    ```xml
   <root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>
    ```

    C14N#WithComments ACTUAL
    ```xml
<root><child><MsInfo xmlns:t="test" t:test="1"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>
    ```

* Leave pidata, remove comments (c14n), leave commments (c14n#withcomments)

    ORIGINAL
    ```xml
<root xmlns=""><child><inner>123</inner></child></root><?pi-without-data ?><!-- one for the road -->
    ```

    C14N EXPECTED
    ```xml
   <root xmlns=""><child><inner>123</inner></child></root><?pi-without-data?>
    ```

    C14N ACTUAL
    ```xml
<root><child><inner>123</inner></child></root>
    ```
    
    C14N#WithComments EXPECTED
    ```xml
   <root xmlns=""><child><inner>123</inner></child></root><?pi-without-data?><!-- one for the road -->
    ```

    C14N#WithComments ACTUAL
    ```xml
<root><child><inner>123</inner></child></root>
    ```

* Remove comments (c14n), leave commments (c14n#withcomments)

    ORIGINAL
    ```xml
<?xml version="1.0"?><root><child id="&quot;id&quot;" Id=""><!-- Comment --></child></root>
    ```

    C14N EXPECTED
    ```xml
   <root><child id="&quot;id&quot;" Id=""></child></root>
    ```

    C14N ACTUAL
    ```xml
<root><child Id="" id="&quot;id&quot;"></child></root>
    ```
    C14N#WithComments EXPECTED
    ```xml
   <root><child id="&quot;id&quot;" Id=""><!-- Comment --></child></root>
    ```

    C14N#WithComments ACTUAL
    ```xml
<root><child Id="" id="&quot;id&quot;"><!-- Comment --></child></root>
    ```

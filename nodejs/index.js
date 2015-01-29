var signedXml = require('xml-crypto').SignedXml
  , domParser = require('xmldom-fork-fixed').DOMParser
  , select = require('xpath.js')
  , xmlC14n = require('xml-c14n')()
  , Q = require('q')

var _ = require('underscore');


var xml = [
	{ 
	"summary": "Leave xml-stylesheet in place and maintain spaces, remove xml version",
        "original" : "<?xml version=\"1.0\" encoding=\"utf-8\"?><?xml-stylesheet   href=\"doc.xsl\"   type=\"text/xsl\"   ?><root><child><inner>123</inner></child></root>",
        "c14n" : "<?xml-stylesheet   href=\"doc.xsl\"   type=\"text/xsl\"   ?>\n<root><child><inner>123</inner></child></root>",
        "c14n#withcomments" : "<?xml-stylesheet   href=\"doc.xsl\"   type=\"text/xsl\"   ?>\n<root><child><inner>123</inner></child></root>"
	},
	{
	"summary": "Only remove xml version",
        "original": "<?xml version=\"1.0\"?><root><child><MsInfo xmlns:t=\"test\" t:test=\"1\"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>",
        "c14n": "<root><child><MsInfo xmlns:t=\"test\" t:test=\"1\"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>",
        "c14n#withcomments": "<root><child><MsInfo xmlns:t=\"test\" t:test=\"1\"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>"
	},
	{
	"summary": "Leave pidata, remove comments (c14n), leave commments (c14n#withcomments)",
	"original":"<root xmlns=\"\"><child><inner>123</inner></child></root><?pi-without-data   ?><!-- one for the road -->",
	"c14n":"<root xmlns=\"\"><child><inner>123</inner></child></root><?pi-without-data?>",
	"c14n#withcomments":"<root xmlns=\"\"><child><inner>123</inner></child></root><?pi-without-data?><!-- one for the road -->"
	},
	{
	"summary": "Remove comments (c14n), leave commments (c14n#withcomments)",
        "original": "<?xml version=\"1.0\"?><root><child id='\"id\"' Id=\"\"><!-- Comment --></child></root>",
        "c14n": "<root><child id=\"&quot;id&quot;\" Id=\"\"></child></root>",
        "c14n#withcomments": "<root><child id=\"&quot;id&quot;\" Id=\"\"><!-- Comment --></child></root>"	
	}
];

var xmlCrypto = function(xml) {
    var signXml = new signedXml();

    var doc = new domParser().parseFromString(xml.original);
    var elem = doc.documentElement;
    console.log('* '+xml.summary+'\n');
    console.log('    ORIGINAL');
    console.log('    ```xml');
    console.log(doc.toString());
    console.log('    ```\n');
    console.log('    C14N EXPECTED'); 
    console.log('    ```xml');
    console.log('   '+xml.c14n);
    console.log('    ```\n');
    console.log('    C14N ACTUAL'); 
    console.log('    ```xml');
    var c14nResult = signXml.getCanonXml({}, elem, { });
    console.log(c14nResult);
    console.log('    ```\n');
}

var c14n = function (value) {
	var deferred = Q.defer();
	var elem = value.elem;
	var xml = value.xml;
	var canonicalizer = xmlC14n.createCanonicaliser("http://www.w3.org/2001/10/xml-exc-c14n#");
	canonicalizer.canonicalise(elem, function(err, res) {
      		console.log('    C14N EXPECTED');
      		console.log('    ```xml');
      		console.log('   '+xml.c14n);
      		console.log('    ```\n');
      		console.log('    C14N ACTUAL'); 
      		console.log('    ```xml');
      		console.log('    '+res);
      		console.log('    ```\n');
		deferred.resolve( { 'elem':elem, 'xml': xml } );
	});
	return deferred.promise;
}
var c14nWithComments = function (value) {
	var deferred = Q.defer();
	var elem = value.elem;
	var xml = value.xml;

	var canonicalizer = xmlC14n.createCanonicaliser("http://www.w3.org/2001/10/xml-exc-c14n#WithComments");
	canonicalizer.canonicalise(elem, function(err, res) {
	         console.log('    C14N#WithComments EXPECTED'); 
	         console.log('    ```xml');
	         console.log('   '+xml['c14n#withcomments']);
	         console.log('    ```\n');
	         console.log('    C14N#WithComments ACTUAL'); 
	         console.log('    ```xml');
	         console.log('    '+res);
	         console.log('    ```\n');
		 deferred.resolve();
	});
	return deferred.promise;
}

var dummyFn = function( xml, doc, callback )
{
    console.log('* '+xml.summary+'\n');
    console.log('    ORIGINAL');
    console.log('    ```xml');
    console.log(doc.toString());
    console.log('    ```\n');
    callback();
}

var c14nHeader = function(xml) {
    var doc = new domParser().parseFromString(xml.original);
    var elem = doc.documentElement;

    var deferred = Q.defer();
    dummyFn ( xml, doc, function () {
	deferred.resolve( { 'elem':elem, 'xml': xml } );
    });
    return deferred.promise;
}

var xmlC14nFunc = function (xml) {
    c14nHeader(xml)
      .then(c14n)
      .then(c14nWithComments);
}

console.log('## xml-crypto');
_.each(xml, xmlCrypto);

console.log('## xml-c14n'); 
_.each(xml, xmlC14nFunc);


var signedXml = require('xml-crypto').SignedXml
  , domParser = require('xmldom-fork-fixed').DOMParser
  , select = require('xpath.js')

var _ = require('underscore');


var xml = [
            "<?xml version=\"1.0\" encoding=\"utf-8\"?><?xml-stylesheet   href=\"doc.xsl\"   type=\"text/xsl\"   ?><root><child><inner>123</inner></child></root>",
            "<?xml version=\"1.0\"?><root><child><MsInfo xmlns:t=\"test\" t:test=\"1\"><Metadata><Version>8.0</Version><CreationUTC>05/21/12 12:18:42</CreationUTC></Metadata></MsInfo></child></root>",
            "<root xmlns=\"\"><child><inner>123</inner></child></root><?pi-without-data   ?><!-- one for the road -->",
            "<?xml version=\"1.0\"?><root><child id='\"id\"' Id=\"\"><!-- Comment --></child></root>"
];

var writeStuff = function(xml) {
    var signXml = new signedXml();

    var doc = new domParser().parseFromString(xml);
    var elem = doc.documentElement;

    console.log('===> ORIGINAL <====');
    console.log(doc.toString());
    console.log('===> C14N <====');
    var c14nResult = signXml.getCanonXml({}, elem, { });
    console.log(c14nResult);
    console.log()
}

_.each(xml, writeStuff);



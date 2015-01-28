## Tracking down XML canonicalization mismatch

Using this page as my guide [W3 XML-c14n-examples](http://www.w3.org/TR/2001/REC-xml-c14n-20010315#Example-OutsideDoc/). I am comparing different libraries to see which are in compliance.

## Findings so far

	* .Net 
	--* using System.Security in .Net 4.5 works as expected
	* Nodejs 
	--* using xml-crypto - issues with pidata and comments

## Results are here

[.Net](csharp/)

[NodeJS](nodejs/)

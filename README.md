# ppt

Parser and writer for PowerPoint PPT files.  Pure-JS cleanroom implementation
from the Microsoft Open Specifications and related documents.

## Installation

In [nodejs](https://www.npmjs.org/package/ppt):

    npm install ppt 

## CLI Tool

The node module ships with a binary `ppt` that dumps the text content of a PPT
presentation.  The only argument is the file name:

```
$ ppt test.ppt
...
``` 

## Contributing

Due to the precarious nature of the Open Specifications Promise, it is very
important to ensure code is cleanroom.  Consult CONTRIBUTING.md

## License

Please consult the attached LICENSE file for details.  All rights not explicitly
granted by the Apache 2.0 license are reserved by the Original Author.

It is the opinion of the Original Author that this code conforms to the terms of
the Microsoft Open Specifications Promise, falling under the same terms as
OpenOffice (which is governed by the Apache License v2).  Given the vagaries of
the promise, the Original Author makes no legal claim that in fact end users are
protected from future actions.  It is highly recommended that, for commercial
uses, you consult a lawyer before proceeding.

## References

OSP-covered specifications:

 - [MS-PPT]: PowerPoint (.ppt) Binary File Format
 - [MS-ODRAW]: Office Drawing Binary File Format

## Badges

[![Build Status](https://travis-ci.org/SheetJS/js-ppt.svg?branch=master)](https://travis-ci.org/SheetJS/js-ppt)

[![Coverage Status](http://img.shields.io/coveralls/SheetJS/js-ppt/master.svg)](https://coveralls.io/r/SheetJS/js-ppt?branch=master)

[![Analytics](https://ga-beacon.appspot.com/UA-36810333-1/js-ppt/README?pixel)](https://ga-beacon.appspot.com/UA-36810333-1/js-ppt/README?pixel)

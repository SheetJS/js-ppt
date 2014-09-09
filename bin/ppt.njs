#!/usr/bin/env node
/* vim: set ts=2: */
var PPT = require('../');
var filename = process.argv[2];
var opts = {};

if(filename === "--dev") {
	opts.WTF = opts.dump = 1;
	filename = process.argv[3];
}

var w = PPT.readFile(filename, opts);
console.log(PPT.utils.to_text(w).join("\n"));

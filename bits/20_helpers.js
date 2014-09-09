if(typeof require !== 'undefined') {
	if(typeof CFB === 'undefined') CFB = require('cf'+'b');
	if(typeof cptable === 'undefined') cptable = require('code'+'page');
}
var parsenoop = function(blob, length) { throw new Error("n"); };
var parsenoop2 = function(blob, length) { blob.l += length; };

/* helper to read arrays of records */
function recordhopper(blob, cb, end, opts) {
	var filter = !!opts.records;
	while(blob.l < end) {
		var rh = parse_RecordHeader(blob);
		var R = RecordEnum[rh.Type];
		if(opts.dump) console.error(rh.Type.toString(16), R, blob.l - 8, rh.Length, blob.length);
		if(!R) R = RecordEnum[0x6969];
		if(filter && opts.records.indexOf(R.n) === -1 && opts.records.indexOf(rh.Type) === -1) { blob.l += rh.Length; continue; }
		var val = R.f(blob, rh.Length, opts);
		cb(R, val, rh.Length);
	}
}


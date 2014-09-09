/* all references based on [MS-PPT] v20140721 */
/* [MS-PPT] 2.2 Basic Types */

/* CString (UTF-16LE unicode string) */
function parse_CString(blob, length, opts) {
	var o = cptable.utils.decode(1200, blob.slice(blob.l, blob.l+length));
	blob.l += length;
	return o;
}

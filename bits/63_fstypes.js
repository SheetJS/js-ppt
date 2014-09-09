/* [MS-PPT] 2.3 File Structure Types */

/* [MS-PPT] 2.3.1 RecordHeader */
function parse_RecordHeader(blob) {
	var recverinst = blob.read_shift(2);
	var RecordType = blob.read_shift(2);
	var length = blob.read_shift(4);
	return { Type: RecordType, Length: length, Metadata: recverinst };
}

/* [MS-PPT] 2.3.2 CurrentUserAtom */
function parse_CurrentUserAtom(blob, length, opts) {
	blob.l += 8;
	var offset = blob.read_shift(4);
	blob.l += length - 12;
	return { offset: offset };
}

/* [MS-PPT] 2.3.3 UserEditAtom */
function parse_UserEditAtom(blob, length, opts) {
	var o = {};
	blob.l += 8;
	o.offsetLastEdit = blob.read_shift(4);
	o.offsetPersistDirectory = blob.read_shift(4);
	blob.l += length - 16;
	return o;
}

/* [MS-PPT] 2.3.4 PersistDirectoryAtom */
function parse_PersistDirectoryAtom(blob, length, opts) {
	var end = blob.l + length;
	var idcnt, pId, cPersist, cnt, i;
	var dir = [], dirobj, offsets;

	/* 2.3.5 PersistDirectoryEntry[] */
	while(blob.l < end) {
		idcnt = blob.read_shift(4);
		pId = idcnt & 0xFFFFF;
		cPersist = idcnt >>> 20;
		offsets = [];

		/* 2.3.6 PersistOffsetEntry[] */
		cnt = pId;
		for(i = 0; i < cPersist; ++i) dir[pId + i] = blob.read_shift(4);
	}
	return dir;
}


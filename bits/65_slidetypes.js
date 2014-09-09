/* [MS-PPT] 2.5 Slide Types */

/* [MS-PPT] 2.5.1 SlideContainer */
function parse_SlideContainer(blob, length, opts) {
	var o = {};
	recordhopper(blob, function rtslide(R, val) {
		switch(R.n) {
			case 'RT_SlideAtom': break;
			case 'RT_Drawing': o.drawing = val; break;
			case 'RT_ColorSchemeAtom': break;
			case 'RT_ProgTags': break;
			case 'RT_RoundTripContentMasterId12Atom': break;
			case 'RT_RoundTripCompositeMasterId12Atom': break;
			default: if(opts.WTF) throw R.n; break;
		}
	}, blob.l + length, opts);
	return o;
}

/* [MS-PPT] 2.5.3 MainMasterContainer */
function parse_MainMasterContainer(blob, length, opts) {
	var o = {};
	recordhopper(blob, function mmaster(R, val) {
		switch(R.n) {
			case 'RT_SlideAtom': break;
			case 'RT_ColorSchemeAtom': break;
			case 'RT_TextMasterStyleAtom': break;
			case 'RT_RoundTripOArtTextStyles12Atom': break;
			case 'RT_RoundTripTheme12Atom': break;
			case 'RT_RoundTripColorMapping12Atom': break;
			case 'RT_RoundTripContentMasterInfo12Atom': break;
			case 'RT_RoundTripNotesMasterTextStyles12Atom': break;
			case 'RT_RoundTripOriginalMainMasterId12Atom': break;
			case 'RT_RoundTripCompositeMasterId12Atom': break;
			case 'RT_Drawing': o.drawing = val; break;
			case 'RT_CString': break;
			default: if(opts.WTF) throw R.n; break;
		}
	}, blob.l + length, opts);
	return o;
}

/* [MS-PPT] 2.5.6 NotesContainer */
function parse_NotesContainer(blob, length, opts) {
	var o = {};
	recordhopper(blob, function notes(R, val) {
		switch(R.n) {
			case 'RT_NotesAtom': break;
			case 'RT_Drawing': o.drawing = val; break;
			case 'RT_ColorSchemeAtom': break;
			case 'RT_ProgTags': break;
			case 'RT_RoundTripTheme12Atom': break;
			case 'RT_RoundTripColorMapping12Atom': break;
			case 'RT_RoundTripNotesMasterTextStyles12Atom': break;
			default: if(opts.WTF) throw R.n; break;
		}
	}, blob.l + length, opts);
	return o;
}

/* [MS-PPT] 2.5.8 HandoutContainer */
function parse_HandoutContainer(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.5.10 SlideAtom */
function parse_SlideAtom(blob, length, opts) {
	var geom = blob.read_shift(4);
	var pt = [];
	for(var i = 0; i < 8; ++i) pt[i] = blob.read_shift(1);
	var masterIdRef = blob.read_shift(4);
	var notesIdRef = blob.read_shift(4);
	var slideFlags = blob.read_shift(2);
	blob.l += 2;
}

/* [MS-PPT] 2.5.12 NotesAtom */
function parse_NotesAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.5.13 DrawingContainer */
function parse_DrawingContainer(blob, length, opts) {
	var o;
	recordhopper(blob, function dc(R, val) {
		switch(R.n) {
			case 'OfficeArtDgContainer':
				o = val; break;
			default: if(opts.WTF) throw R.n; break;
		}
	}, blob.l + length, opts);
	return o;
}


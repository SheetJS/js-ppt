/* [MS-PPT] 2.4 Document Types */

/* [MS-PPT] 2.4.1 DocumentContainer */
function parse_DocumentContainer(blob, length, opts) {
	var o = { l: blob.l - 8 };
	recordhopper(blob, function doc(R, val, len) {
		switch(R.n) {
			case 'RT_DocumentAtom': break;
			case 'RT_Environment': break;
			case 'RT_DrawingGroup': break;
			case 'RT_SlideListWithText': o.slideList = val; break;
			case 'RT_List': break;
			case 'RT_HeadersFooters': blob.l -= len; break;
			case 'RT_HeadersFootersAtom': break;
			case 'RT_RoundTripCustomTableStyles12Atom': break;
			case 'RT_EndDocumentAtom': break;
			case 'RT_SlideShowDocInfoAtom': break;
			case 'RT_ExternalObjectList': break;
			default: if(opts.WTF) throw R.n; break;
		}
	}, blob.l + length, opts);
	return o;
}

/* [MS-PPT] 2.4.2 DocumentAtom */
function parse_DocumentAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.4.3 DrawingGroupContainer */
function parse_DrawingGroupContainer(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.4.4 DocInfoListContainer */
function parse_DocInfoListContainer(blob, length, opts) {
	recordhopper(blob, function dilist(R, val) {
		switch(R.n) {
			case 'RT_NotesTextViewInfo9': break;
			case 'RT_SlideViewInfo': break;
			case 'RT_ProgTags': break;
			case 'RT_NormalViewSetInfo9': break;
			case 'RT_OutlineViewInfo': break;
			case 'RT_SorterViewInfo': break;
			case 'RT_VbaInfo': break;
			default: if(opts.WTF) throw R.n; break;
		}
	}, blob.l + length, opts);
}

/* [MS-PPT] 2.4.10 VBAInfoContainer */
function parse_VBAInfoContainer(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.4.13 EndDocumentAtom */
function parse_EndDocumentAtom(blob, length) { if(length !== 0) throw "EndDocumentAtom length != 0"; }

/* [MS-PPT] 2.4.14.3 SlideListWithTextContainer */
function parse_SlideListWithTextContainer(blob, length, opts) {
	var o = [];
	recordhopper(blob, function slwt(R, val) {
		switch(R.n) {
			case 'RT_SlidePersistAtom': break;
			case 'RT_StyleTextPropAtom': break;
			case 'RT_TextHeaderAtom': break;
			case 'RT_TextSpecialInfoAtom': break;
			case 'RT_TextBytesAtom':
			case 'RT_TextCharsAtom':
				o.push(val); break;
			default: if(opts.WTF) throw R.n; break;
		}
	}, blob.l + length, opts);
	return o;
}

/* [MS-PPT] 2.4.14.5 SlidePersistAtom */
function parse_SlidePersistAtom(blob, length, opts) {
	var end = blob.l + length;
	var pId = blob.read_shift(4);
	blob.l += 4;
	var cTexts = blob.read_shift(4);
	var slideId = blob.read_shift(4);
	blob.l += 4;
	return { persistIdRef: pId, cTexts: cTexts, slideId: slideId };
}

/* [MS-PPT] 2.4.15.2 HeadersFootersAtom */
function parse_HeadersFootersAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.4.21.2 NormalViewSetInfoContainer */
function parse_NormalViewSetInfoContainer(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.4.21.4 NotesTextViewInfoContainer */
function parse_NotesTextViewInfoContainer(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.4.21.6 OutlineViewInfoContainer */
function parse_OutlineViewInfoContainer(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.4.21.13 SorterViewInfoContainer */
function parse_SorterViewInfoContainer(blob, length, opts) { blob.l += length; }


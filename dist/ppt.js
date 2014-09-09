/* ppt.js (C) 2014 SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
var PPT = {};
(function make_ppt(PPT) {
PPT.version = '0.0.2';
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

/* [MS-ODRAW] v20140721 */


/* [MS-ODRAW] 2.2.9 OfficeArtFOPT */
function parse_OfficeArtFOPT(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.10 OfficeArtSecondaryFOPT */
function parse_OfficeArtSecondaryFOPT(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.11 OfficeArtTertiaryFOPT */
function parse_OfficeArtTertiaryFOPT(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.12 OfficeArtDggContainer */
function parse_OfficeArtDggContainer(blob, length, opts) {
	recordhopper(blob, function oadggc(R, val) {
		switch(R.n) {
			default: if(opts.WTF) throw R.n; break;
		}
	}, blob.l + length, opts);
}

/* [MS-ODRAW] 2.2.13 OfficeArtDgContainer */
function parse_OfficeArtDgContainer(blob, length, opts) {
	var o = {};
	recordhopper(blob, function oadgc(R, val) {
		switch(R.n) {
			case 'OfficeArtFDG': break;
			case 'OfficeArtSpgrContainer': o.groupShape = val; break;
			case 'OfficeArtSpContainer': o.shape = val; break;
			default: if(opts.WTF) throw R.n; break;
		}
	}, blob.l + length, opts);
	return o;
}

/* [MS-ODRAW] 2.2.14 OfficeArtSpContainer */
function parse_OfficeArtSpContainer(blob, length, opts) {
	var o = {};
	recordhopper(blob, function oasc(R, val) {
		switch(R.n) {
			case 'OfficeArtChildAnchor': break;
			case 'OfficeArtClientAnchor': break;
			case 'OfficeArtClientData': break;
			case 'OfficeArtClientTextbox': o.clientTextbox = val; break;

			case 'OfficeArtFSPGR': break;
			case 'OfficeArtFSP': break;
			case 'OfficeArtFOPT': break;
			case 'OfficeArtTertiaryFOPT': break;
			default: if(opts.WTF) throw R.n; break;
		}
	}, blob.l + length, opts);
	return o;
}

/* [MS-ODRAW] 2.2.16 OfficeArtSpgrContainer */
function parse_OfficeArtSpgrContainer(blob, length, opts) {
	var o = [];
	recordhopper(blob, function oasgc(R, val) {
		switch(R.n) {
			case 'OfficeArtSpContainer':
			case 'OfficeArtSpgrContainer':
				o.push(val); break;
			default: if(opts.WTF) throw R.n; break;
		}
	}, blob.l + length, opts);
	return o;
}

/* [MS-ODRAW] 2.2.18 OfficeArtSolverContainer */
function parse_OfficeArtSolverContainer(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.20 OfficeArtBStoreContainer */
function parse_OfficeArtBStoreContainer(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.24 OfficeArtBlipEMF */
function parse_OfficeArtBlipEMF(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.25 OfficeArtBlipWMF */
function parse_OfficeArtBlipWMF(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.26 OfficeArtBlipPICT */
function parse_OfficeArtBlipPICT(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.27 OfficeArtBlipJPEG */
function parse_OfficeArtBlipJPEG(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.28 OfficeArtBlipPNG */
function parse_OfficeArtBlipPNG(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.29 OfficeArtBlipDIB */
function parse_OfficeArtBlipDIB(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.30 OfficeArtBlipTIFF */
function parse_OfficeArtBlipTIFF(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.32 OfficeArtFBSE */
function parse_OfficeArtFBSE(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.33 OfficeArtFDGSL */
function parse_OfficeArtFDGSL(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.34 OfficeArtFCalloutRule */
function parse_OfficeArtFCalloutRule(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.35 OfficeArtFArcRule */
function parse_OfficeArtFArcRule(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.36 OfficeArtFConnectorRule */
function parse_OfficeArtFConnectorRule(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.37 OfficeArtFPSPL */
function parse_OfficeArtFPSPL(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.38 OfficeArtFSPGR */
function parse_OfficeArtFSPGR(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.39 OfficeArtChildAnchor */
function parse_OfficeArtChildAnchor(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.40 OfficeArtFSP */
function parse_OfficeArtFSP(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.41 OfficeArtFRITContainer */
function parse_OfficeArtFRITContainer(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.42 OfficeArtFRIT */
function parse_OfficeArtFRIT(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.43 OfficeArtMRUContainer */
function parse_OfficeArtMRUContainer(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.45 OfficeArtSplitMenuColorContainer */
function parse_OfficeArtSplitMenuColorContainer(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.48 OfficeArtFDGGBlock */
function parse_OfficeArtFDGGBlock(blob, length, opts) { blob.l += length; }

/* [MS-ODRAW] 2.2.49 OfficeArtFDG */
function parse_OfficeArtFDG(blob, length, opts) {
	return { csp: blob.read_shift(4), spidCur: blob.read_shift(4) };
}

/* all references based on [MS-PPT] v20140721 */
/* [MS-PPT] 2.2 Basic Types */

/* CString (UTF-16LE unicode string) */
function parse_CString(blob, length, opts) {
	var o = cptable.utils.decode(1200, blob.slice(blob.l, blob.l+length));
	blob.l += length;
	return o;
}
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

/* [MS-PPT] 2.6 Slide Show Types */

/* [MS-PPT] 2.6.1 SlideShowDocInfoAtom */
function parse_SlideShowDocInfoAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.7 Shape Types */

/* [MS-PPT] 2.7.1 OfficeArtClientAnchor */
function parse_OfficeArtClientAnchor(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.7.3 OfficeArtClientData */
function parse_OfficeArtClientData(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.9 Basic Types */
/* [MS-PPT] 2.9.1 DocumentTextInfoContainer */
function parse_DocumentTextInfoContainer(blob, length, opts) {
	recordhopper(blob, function env(R, val) {
		switch(R.n) {
			case 'RT_Kinsoku': break;
			case 'RT_FontCollection': break;
			case 'RT_TextCharFormatExceptionAtom': break;
			case 'RT_TextParagraphFormatExceptionAtom': break;
			case 'RT_TextSpecialInfoDefaultAtom': break;
			case 'RT_TextMasterStyleAtom': break;
			default: if(opts.WTF) throw R.n; break;
		}
	}, blob.l + length, opts);
}

/* [MS-PPT] 2.9.2 KinsokuContainer */
function parse_KinsokuContainer(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.9.8 FontCollectionContainer */
function parse_FontCollectionContainer(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.9.13 TextCFExceptionAtom */
function parse_TextCFExceptionAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.9.19 TextPFExceptionAtom */
function parse_TextPFExceptionAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.9.28 DefaultRulerAtom */
function parse_DefaultRulerAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.9.29 TextRulerAtom */
function parse_TextRulerAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.9.31 TextSIExceptionAtom */
function parse_TextSIExceptionAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.9.35 TextMasterStyleAtom */
function parse_TextMasterStyleAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.9.41 TextHeaderAtom */
function parse_TextHeaderAtom(blob, length, opts) { return blob.read_shift(4); }

/* [MS-PPT] 2.9.42 TextCharsAtom */
var parse_TextCharsAtom = parse_CString;

/* [MS-PPT] 2.9.43 TextBytesAtom */
function parse_TextBytesAtom(blob, length, opts) {
	var o = [];
	for(var i=0; i!=length; ++i) o.push(String.fromCharCode(blob.read_shift(1)));
	return o.join("");
}

/* [MS-PPT] 2.9.47 SlideNumberMCAtom */
function parse_SlideNumberMCAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.9.44 StyleTextPropAtom */
function parse_StyleTextPropAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.9.50 DateTimeMCAtom */
function parse_DateTimeMCAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.9.51 GenericDateMCAtom */
function parse_GenericDateMCAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.9.54 TextSpecialInfoAtom */
function parse_TextSpecialInfoAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.9.76 OfficeArtClientTextbox */
function parse_OfficeArtClientTextbox(blob, length, opts) {
	var o = {t:""};
	recordhopper(blob, function oact(R, val) {
		switch(R.n) {
			case 'RT_TextBytesAtom':
			case 'RT_TextCharsAtom':
				o.t = val.replace(/\r/g,"\n");
				break;
			case 'RT_TextHeaderAtom': break;
			case 'RT_OutlineTextRefAtom':
			case 'RT_TextRulerAtom':
			case 'RT_MasterTextPropAtom':
			case 'RT_StyleTextPropAtom':
			case 'RT_TextBookmarkAtom':
			case 'RT_TextSpecialInfoAtom':
			case 'RT_SlideNumberMetaCharAtom':
			case 'RT_DateTimeMetaCharAtom':
			case 'RT_GenericDateMetaCharAtom':
			case 'RT_HeaderMetaCharAtom':
			case 'RT_FooterMetaCharAtom':
			case 'RT_RtfDateTimeMetaCharAtom':
			case 'RT_InteractiveInfo':
			case 'RT_TextInteractiveInfoAtom':
				break;
			default: if(opts.WTF) throw R.n; break;
		}
	}, blob.l + length, opts);
	return o;
}

/* [MS-PPT] 2.9.79 MasterTextPropAtom */
function parse_MasterTextPropAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.10 External Object Types */

/* [MS-PPT] 2.10.1 ExObjListContainer */
function parse_ExObjListContainer(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.10.3 ExObjListAtom */
function parse_ExObjListAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.11 Other Types */

/* [MS-PPT] 2.11.9 RoundTripColorMappingAtom */
function parse_RoundTripColorMappingAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.11.10 RoundTripCompositeMasterId12Atom */
function parse_RoundTripCompositeMasterId12Atom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.11.11 RoundTripContentMasterId12Atom */
function parse_RoundTripContentMasterId12Atom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.11.12 RoundTripContentMasterInfo12Atom */
function parse_RoundTripContentMasterInfo12Atom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.11.13 RoundTripCustomTableStyles12Atom */
function parse_RoundTripCustomTableStyles12Atom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.11.18 RoundTripNotesMasterTextStyles12Atom */
function parse_RoundTripNotesMasterTextStyles12Atom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.11.19 RoundTripOArtTextStyles12Atom */
function parse_RoundTripOArtTextStyles12Atom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.11.20 RoundTripOriginalMainMasterId12Atom */
function parse_RoundTripOriginalMainMasterId12Atom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.11.27 RoundTripThemeAtom */
function parse_RoundTripThemeAtom(blob, length, opts) { blob.l += length; }

/* [MS-PPT] 2.13.24 RecordType (other records are noted below) */
var RecordEnum = {
	0x03E8: { n:"RT_Document", f:parse_DocumentContainer },
	0x03E9: { n:"RT_DocumentAtom", f:parse_DocumentAtom },
	0x03EA: { n:"RT_EndDocumentAtom", f:parse_EndDocumentAtom },
	0x03EE: { n:"RT_Slide", f:parse_SlideContainer },
	0x03EF: { n:"RT_SlideAtom", f:parse_SlideAtom },
	0x03F0: { n:"RT_Notes", f:parse_NotesContainer },
	0x03F1: { n:"RT_NotesAtom", f:parse_NotesAtom },
	0x03F2: { n:"RT_Environment", f:parse_DocumentTextInfoContainer },
	0x03F3: { n:"RT_SlidePersistAtom", f:parse_SlidePersistAtom },
	0x03F8: { n:"RT_MainMaster", f:parse_MainMasterContainer },
	0x03F9: { n:"RT_SlideShowSlideInfoAtom", f:parsenoop },
	0x03FA: { n:"RT_SlideViewInfo", f:parse_SlideViewInfo$ },
	0x03FB: { n:"RT_GuideAtom", f:parsenoop },
	0x03FD: { n:"RT_ViewInfoAtom", f:parsenoop },
	0x03FE: { n:"RT_SlideViewInfoAtom", f:parsenoop },
	0x03FF: { n:"RT_VbaInfo", f:parse_VBAInfoContainer },
	0x0400: { n:"RT_VbaInfoAtom", f:parsenoop },
	0x0401: { n:"RT_SlideShowDocInfoAtom", f:parse_SlideShowDocInfoAtom },
	0x0402: { n:"RT_Summary", f:parsenoop },
	0x0406: { n:"RT_DocRoutingSlipAtom", f:parsenoop },
	0x0407: { n:"RT_OutlineViewInfo", f:parse_OutlineViewInfoContainer },
	0x0408: { n:"RT_SorterViewInfo", f:parse_SorterViewInfoContainer },
	0x0409: { n:"RT_ExternalObjectList", f:parse_ExObjListContainer },
	0x040A: { n:"RT_ExternalObjectListAtom", f:parse_ExObjListAtom },
	0x040B: { n:"RT_DrawingGroup", f:parse_DrawingGroupContainer },
	0x040C: { n:"RT_Drawing", f:parse_DrawingContainer },
	0x040D: { n:"RT_GridSpacing10Atom", f:parsenoop },
	0x040E: { n:"RT_RoundTripTheme12Atom", f:parse_RoundTripThemeAtom },
	0x040F: { n:"RT_RoundTripColorMapping12Atom", f:parse_RoundTripColorMappingAtom },
	0x0410: { n:"RT_NamedShows", f:parsenoop },
	0x0411: { n:"RT_NamedShow", f:parsenoop },
	0x0412: { n:"RT_NamedShowSlidesAtom", f:parsenoop },
	0x0413: { n:"RT_NotesTextViewInfo9", f:parse_NotesTextViewInfoContainer },
	0x0414: { n:"RT_NormalViewSetInfo9", f:parse_NormalViewSetInfoContainer },
	0x0415: { n:"RT_NormalViewSetInfo9Atom", f:parsenoop },
	0x041C: { n:"RT_RoundTripOriginalMainMasterId12Atom", f:parse_RoundTripOriginalMainMasterId12Atom },
	0x041D: { n:"RT_RoundTripCompositeMasterId12Atom", f:parse_RoundTripCompositeMasterId12Atom },
	0x041E: { n:"RT_RoundTripContentMasterInfo12Atom", f:parse_RoundTripContentMasterInfo12Atom },
	0x041F: { n:"RT_RoundTripShapeId12Atom", f:parsenoop },
	0x0420: { n:"RT_RoundTripHFPlaceholder12Atom", f:parsenoop },
	0x0422: { n:"RT_RoundTripContentMasterId12Atom", f:parse_RoundTripContentMasterId12Atom},
	0x0423: { n:"RT_RoundTripOArtTextStyles12Atom", f:parse_RoundTripOArtTextStyles12Atom},
	0x0424: { n:"RT_RoundTripHeaderFooterDefaults12Atom", f:parsenoop },
	0x0425: { n:"RT_RoundTripDocFlags12Atom", f:parsenoop },
	0x0426: { n:"RT_RoundTripShapeCheckSumForCL12Atom", f:parsenoop },
	0x0427: { n:"RT_RoundTripNotesMasterTextStyles12Atom", f:parse_RoundTripNotesMasterTextStyles12Atom },
	0x0428: { n:"RT_RoundTripCustomTableStyles12Atom", f:parse_RoundTripCustomTableStyles12Atom },
	0x07D0: { n:"RT_List", f:parse_DocInfoListContainer },
	0x07D5: { n:"RT_FontCollection", f:parse_FontCollectionContainer },
	0x07D6: { n:"RT_FontCollection10", f:parsenoop },
	0x07E3: { n:"RT_BookmarkCollection", f:parsenoop },
	0x07E4: { n:"RT_SoundCollection", f:parsenoop },
	0x07E5: { n:"RT_SoundCollectionAtom", f:parsenoop },
	0x07E6: { n:"RT_Sound", f:parsenoop },
	0x07E7: { n:"RT_SoundDataBlob", f:parsenoop },
	0x07E9: { n:"RT_BookmarkSeedAtom", f:parsenoop },
	0x07F0: { n:"RT_ColorSchemeAtom", f:parse_ColorSchemeAtom$ },
	0x07F8: { n:"RT_BlipCollection9", f:parsenoop },
	0x07F9: { n:"RT_BlipEntity9Atom", f:parsenoop },
	0x0BC1: { n:"RT_ExternalObjectRefAtom", f:parsenoop },
	0x0BC3: { n:"RT_PlaceholderAtom", f:parsenoop },
	0x0BDB: { n:"RT_ShapeAtom", f:parsenoop },
	0x0BDC: { n:"RT_ShapeFlags10Atom", f:parsenoop },
	0x0BDD: { n:"RT_RoundTripNewPlaceholderId12Atom", f:parsenoop },
	0x0F9E: { n:"RT_OutlineTextRefAtom", f:parsenoop2 },
	0x0F9F: { n:"RT_TextHeaderAtom", f:parse_TextHeaderAtom },
	0x0FA0: { n:"RT_TextCharsAtom", f:parse_TextCharsAtom },
	0x0FA1: { n:"RT_StyleTextPropAtom", f:parse_StyleTextPropAtom },
	0x0FA2: { n:"RT_MasterTextPropAtom", f:parse_MasterTextPropAtom },
	0x0FA3: { n:"RT_TextMasterStyleAtom", f:parse_TextMasterStyleAtom },
	0x0FA4: { n:"RT_TextCharFormatExceptionAtom", f:parse_TextCFExceptionAtom },
	0x0FA5: { n:"RT_TextParagraphFormatExceptionAtom", f:parse_TextPFExceptionAtom },
	0x0FA6: { n:"RT_TextRulerAtom", f:parse_TextRulerAtom },
	0x0FA7: { n:"RT_TextBookmarkAtom", f:parsenoop },
	0x0FA8: { n:"RT_TextBytesAtom", f:parse_TextBytesAtom },
	0x0FA9: { n:"RT_TextSpecialInfoDefaultAtom", f:parse_TextSIExceptionAtom },
	0x0FAA: { n:"RT_TextSpecialInfoAtom", f:parse_TextSpecialInfoAtom },
	0x0FAB: { n:"RT_DefaultRulerAtom", f:parsenoop },
	0x0FAC: { n:"RT_StyleTextProp9Atom", f:parsenoop },
	0x0FAD: { n:"RT_TextMasterStyle9Atom", f:parsenoop },
	0x0FAE: { n:"RT_OutlineTextProps9", f:parsenoop },
	0x0FAF: { n:"RT_OutlineTextPropsHeader9Atom", f:parsenoop },
	0x0FB0: { n:"RT_TextDefaults9Atom", f:parsenoop },
	0x0FB1: { n:"RT_StyleTextProp10Atom", f:parsenoop },
	0x0FB2: { n:"RT_TextMasterStyle10Atom", f:parsenoop },
	0x0FB3: { n:"RT_OutlineTextProps10", f:parsenoop },
	0x0FB4: { n:"RT_TextDefaults10Atom", f:parsenoop },
	0x0FB5: { n:"RT_OutlineTextProps11", f:parsenoop },
	0x0FB6: { n:"RT_StyleTextProp11Atom", f:parsenoop },
	0x0FB7: { n:"RT_FontEntityAtom", f:parsenoop },
	0x0FB8: { n:"RT_FontEmbedDataBlob", f:parsenoop },
	0x0FBA: { n:"RT_CString", f:parse_CString },
	0x0FC1: { n:"RT_MetaFile", f:parsenoop },
	0x0FC3: { n:"RT_ExternalOleObjectAtom", f:parsenoop },
	0x0FC8: { n:"RT_Kinsoku", f:parse_KinsokuContainer },
	0x0FC9: { n:"RT_Handout", f:parse_HandoutContainer },
	0x0FCC: { n:"RT_ExternalOleEmbed", f:parsenoop },
	0x0FCD: { n:"RT_ExternalOleEmbedAtom", f:parsenoop },
	0x0FCE: { n:"RT_ExternalOleLink", f:parsenoop },
	0x0FD0: { n:"RT_BookmarkEntityAtom", f:parsenoop },
	0x0FD1: { n:"RT_ExternalOleLinkAtom", f:parsenoop },
	0x0FD2: { n:"RT_KinsokuAtom", f:parsenoop },
	0x0FD3: { n:"RT_ExternalHyperlinkAtom", f:parsenoop },
	0x0FD7: { n:"RT_ExternalHyperlink", f:parsenoop },
	0x0FD8: { n:"RT_SlideNumberMetaCharAtom", f:parse_SlideNumberMCAtom },
	0x0FD9: { n:"RT_HeadersFooters", f:parse_HeadersFooters$ },
	0x0FDA: { n:"RT_HeadersFootersAtom", f:parse_HeadersFootersAtom },
	0x0FDF: { n:"RT_TextInteractiveInfoAtom", f:parsenoop },
	0x0FE4: { n:"RT_ExternalHyperlink9", f:parsenoop },
	0x0FE7: { n:"RT_RecolorInfoAtom", f:parsenoop },
	0x0FEE: { n:"RT_ExternalOleControl", f:parsenoop },
	0x0FF0: { n:"RT_SlideListWithText", f:parse_SlideListWithTextContainer },
	0x0FF1: { n:"RT_AnimationInfoAtom", f:parsenoop },
	0x0FF2: { n:"RT_InteractiveInfo", f:parsenoop },
	0x0FF3: { n:"RT_InteractiveInfoAtom", f:parsenoop },
	0x0FF5: { n:"RT_UserEditAtom", f:parse_UserEditAtom },
	0x0FF6: { n:"RT_CurrentUserAtom", f:parse_CurrentUserAtom },
	0x0FF7: { n:"RT_DateTimeMetaCharAtom", f:parse_DateTimeMCAtom },
	0x0FF8: { n:"RT_GenericDateMetaCharAtom", f:parse_GenericDateMCAtom },
	0x0FF9: { n:"RT_HeaderMetaCharAtom", f:parsenoop },
	0x0FFA: { n:"RT_FooterMetaCharAtom", f:parsenoop2 },
	0x0FFB: { n:"RT_ExternalOleControlAtom", f:parsenoop },
	0x1004: { n:"RT_ExternalMediaAtom", f:parsenoop },
	0x1005: { n:"RT_ExternalVideo", f:parsenoop },
	0x1006: { n:"RT_ExternalAviMovie", f:parsenoop },
	0x1007: { n:"RT_ExternalMciMovie", f:parsenoop },
	0x100D: { n:"RT_ExternalMidiAudio", f:parsenoop },
	0x100E: { n:"RT_ExternalCdAudio", f:parsenoop },
	0x100F: { n:"RT_ExternalWavAudioEmbedded", f:parsenoop },
	0x1010: { n:"RT_ExternalWavAudioLink", f:parsenoop },
	0x1011: { n:"RT_ExternalOleObjectStg", f:parse_ExternalOleObjectStg$ },
	0x1012: { n:"RT_ExternalCdAudioAtom", f:parsenoop },
	0x1013: { n:"RT_ExternalWavAudioEmbeddedAtom", f:parsenoop },
	0x1014: { n:"RT_AnimationInfo", f:parsenoop },
	0x1015: { n:"RT_RtfDateTimeMetaCharAtom", f:parsenoop },
	0x1018: { n:"RT_ExternalHyperlinkFlagsAtom", f:parsenoop },
	0x1388: { n:"RT_ProgTags", f:parse_ProgTags$ },
	0x1389: { n:"RT_ProgStringTag", f:parsenoop },
	0x138A: { n:"RT_ProgBinaryTag", f:parsenoop },
	0x138B: { n:"RT_BinaryTagDataBlob", f:parsenoop },
	0x1770: { n:"RT_PrintOptionsAtom", f:parsenoop },
	0x1772: { n:"RT_PersistDirectoryAtom", f:parse_PersistDirectoryAtom },
	0x177A: { n:"RT_PresentationAdvisorFlags9Atom", f:parsenoop },
	0x177B: { n:"RT_HtmlDocInfo9Atom", f:parsenoop },
	0x177C: { n:"RT_HtmlPublishInfoAtom", f:parsenoop },
	0x177D: { n:"RT_HtmlPublishInfo9", f:parsenoop },
	0x177E: { n:"RT_BroadcastDocInfo9", f:parsenoop },
	0x177F: { n:"RT_BroadcastDocInfo9Atom", f:parsenoop },
	0x1784: { n:"RT_EnvelopeFlags9Atom", f:parsenoop },
	0x1785: { n:"RT_EnvelopeData9Atom", f:parsenoop },
	0x2AFB: { n:"RT_VisualShapeAtom", f:parsenoop },
	0x2B00: { n:"RT_HashCodeAtom", f:parsenoop },
	0x2B01: { n:"RT_VisualPageAtom", f:parsenoop },
	0x2B02: { n:"RT_BuildList", f:parsenoop },
	0x2B03: { n:"RT_BuildAtom", f:parsenoop },
	0x2B04: { n:"RT_ChartBuild", f:parsenoop },
	0x2B05: { n:"RT_ChartBuildAtom", f:parsenoop },
	0x2B06: { n:"RT_DiagramBuild", f:parsenoop },
	0x2B07: { n:"RT_DiagramBuildAtom", f:parsenoop },
	0x2B08: { n:"RT_ParaBuild", f:parsenoop },
	0x2B09: { n:"RT_ParaBuildAtom", f:parsenoop },
	0x2B0A: { n:"RT_LevelInfoAtom", f:parsenoop },
	0x2B0B: { n:"RT_RoundTripAnimationAtom12Atom", f:parsenoop },
	0x2B0D: { n:"RT_RoundTripAnimationHashAtom12Atom", f:parsenoop },
	0x2EE0: { n:"RT_Comment10", f:parsenoop },
	0x2EE1: { n:"RT_Comment10Atom", f:parsenoop },
	0x2EE4: { n:"RT_CommentIndex10", f:parsenoop },
	0x2EE5: { n:"RT_CommentIndex10Atom", f:parsenoop },
	0x2EE6: { n:"RT_LinkedShape10Atom", f:parsenoop },
	0x2EE7: { n:"RT_LinkedSlide10Atom", f:parsenoop },
	0x2EEA: { n:"RT_SlideFlags10Atom", f:parsenoop },
	0x2EEB: { n:"RT_SlideTime10Atom", f:parsenoop },
	0x2EEC: { n:"RT_DiffTree10", f:parsenoop },
	0x2EED: { n:"RT_Diff10", f:parsenoop },
	0x2EEE: { n:"RT_Diff10Atom", f:parsenoop },
	0x2EEF: { n:"RT_SlideListTableSize10Atom", f:parsenoop },
	0x2EF0: { n:"RT_SlideListEntry10Atom", f:parsenoop },
	0x2EF1: { n:"RT_SlideListTable10", f:parsenoop },
	0x2F14: { n:"RT_CryptSession10Container", f:parsenoop },
	0x32C8: { n:"RT_FontEmbedFlags10Atom", f:parsenoop },
	0x36B0: { n:"RT_FilterPrivacyFlags10Atom", f:parsenoop },
	0x36B1: { n:"RT_DocToolbarStates10Atom", f:parsenoop },
	0x36B2: { n:"RT_PhotoAlbumInfo10Atom", f:parsenoop },
	0x36B3: { n:"RT_SmartTagStore11Container", f:parsenoop },
	0x3714: { n:"RT_RoundTripSlideSyncInfo12", f:parsenoop },
	0x3715: { n:"RT_RoundTripSlideSyncInfoAtom12", f:parsenoop },
	0x6969: { n:"RT_SheetJSAtom", f:parsenoop },
	0xF125: { n:"RT_TimeConditionContainer", f:parsenoop },
	0xF127: { n:"RT_TimeNode", f:parsenoop },
	0xF128: { n:"RT_TimeCondition", f:parsenoop },
	0xF129: { n:"RT_TimeModifier", f:parsenoop },
	0xF12A: { n:"RT_TimeBehaviorContainer", f:parsenoop },
	0xF12B: { n:"RT_TimeAnimateBehaviorContainer", f:parsenoop },
	0xF12C: { n:"RT_TimeColorBehaviorContainer", f:parsenoop },
	0xF12D: { n:"RT_TimeEffectBehaviorContainer", f:parsenoop },
	0xF12E: { n:"RT_TimeMotionBehaviorContainer", f:parsenoop },
	0xF12F: { n:"RT_TimeRotationBehaviorContainer", f:parsenoop },
	0xF130: { n:"RT_TimeScaleBehaviorContainer", f:parsenoop },
	0xF131: { n:"RT_TimeSetBehaviorContainer", f:parsenoop },
	0xF132: { n:"RT_TimeCommandBehaviorContainer", f:parsenoop },
	0xF133: { n:"RT_TimeBehavior", f:parsenoop },
	0xF134: { n:"RT_TimeAnimateBehavior", f:parsenoop },
	0xF135: { n:"RT_TimeColorBehavior", f:parsenoop },
	0xF136: { n:"RT_TimeEffectBehavior", f:parsenoop },
	0xF137: { n:"RT_TimeMotionBehavior", f:parsenoop },
	0xF138: { n:"RT_TimeRotationBehavior", f:parsenoop },
	0xF139: { n:"RT_TimeScaleBehavior", f:parsenoop },
	0xF13A: { n:"RT_TimeSetBehavior", f:parsenoop },
	0xF13B: { n:"RT_TimeCommandBehavior", f:parsenoop },
	0xF13C: { n:"RT_TimeClientVisualElement", f:parsenoop },
	0xF13D: { n:"RT_TimePropertyList", f:parsenoop },
	0xF13E: { n:"RT_TimeVariantList", f:parsenoop },
	0xF13F: { n:"RT_TimeAnimationValueList", f:parsenoop },
	0xF140: { n:"RT_TimeIterateData", f:parsenoop },
	0xF141: { n:"RT_TimeSequenceData", f:parsenoop },
	0xF142: { n:"RT_TimeVariant", f:parsenoop },
	0xF143: { n:"RT_TimeAnimationValue", f:parsenoop },
	0xF144: { n:"RT_TimeExtTimeNodeContainer", f:parsenoop },
	0xF145: { n:"RT_TimeSubEffectContainer", f:parsenoop },

	/* [MS-ODRAW] uses the same record format */
	0xF000: { n:"OfficeArtDggContainer", f:parse_OfficeArtDggContainer },
	0xF001: { n:"OfficeArtBStoreContainer", f:parse_OfficeArtBStoreContainer },
	0xF002: { n:"OfficeArtDgContainer", f:parse_OfficeArtDgContainer },
	0xF003: { n:"OfficeArtSpgrContainer", f:parse_OfficeArtSpgrContainer },
	0xF004: { n:"OfficeArtSpContainer", f:parse_OfficeArtSpContainer },
	0xF005: { n:"OfficeArtSolverContainer", f:parse_OfficeArtSolverContainer },
	0xF006: { n:"OfficeArtFDGGBlock", f:parse_OfficeArtFDGGBlock },
	0xF007: { n:"OfficeArtFBSE", f:parse_OfficeArtFBSE },
	0xF008: { n:"OfficeArtFDG", f:parse_OfficeArtFDG },
	0xF009: { n:"OfficeArtFSPGR", f:parse_OfficeArtFSPGR },
	0xF00A: { n:"OfficeArtFSP", f:parse_OfficeArtFSP },
	0xF00B: { n:"OfficeArtFOPT", f:parse_OfficeArtFOPT },
	0xF00F: { n:"OfficeArtChildAnchor", f:parse_OfficeArtChildAnchor },
	0xF012: { n:"OfficeArtFConnectorRule", f:parse_OfficeArtFConnectorRule },
	0xF014: { n:"OfficeArtFArcRule", f:parse_OfficeArtFArcRule },
	0xF017: { n:"OfficeArtFCalloutRule", f:parse_OfficeArtFCalloutRule },
	0xF01A: { n:"OfficeArtBlipEMF", f:parse_OfficeArtBlipEMF },
	0xF01B: { n:"OfficeArtBlipWMF", f:parse_OfficeArtBlipWMF },
	0xF01C: { n:"OfficeArtBlipPICT", f:parse_OfficeArtBlipPICT },
	0xF01D: { n:"OfficeArtBlipJPEG", f:parse_OfficeArtBlipJPEG },
	0xF01E: { n:"OfficeArtBlipPNG", f:parse_OfficeArtBlipPNG },
	0xF01F: { n:"OfficeArtBlipDIB", f:parse_OfficeArtBlipDIB },
	0xF029: { n:"OfficeArtBlipTIFF", f:parse_OfficeArtBlipTIFF },
	0xF118: { n:"OfficeArtFRITContainer", f:parse_OfficeArtFRITContainer },
	0xF119: { n:"OfficeArtFDGSL", f:parse_OfficeArtFDGSL },
	0xF11A: { n:"OfficeArtMRUContainer", f:parse_OfficeArtMRUContainer },
	0xF11D: { n:"OfficeArtFPSPL", f:parse_OfficeArtFPSPL },
	0xF11E: { n:"OfficeArtSplitMenuColorContainer", f:parse_OfficeArtSplitMenuColorContainer },
	0xF121: { n:"OfficeArtSecondaryFOPT", f:parse_OfficeArtSecondaryFOPT },
	0xF122: { n:"OfficeArtTertiaryFOPT", f:parse_OfficeArtTertiaryFOPT },

	/* [MS-ODRAW] assumes the host application defines these records */
	0xF00D: { n:"OfficeArtClientTextbox", f:parse_OfficeArtClientTextbox },
	0xF010: { n:"OfficeArtClientAnchor", f:parse_OfficeArtClientAnchor },
	0xF011: { n:"OfficeArtClientData", f:parse_OfficeArtClientData },

	0xFC1C: { n:"RT_MagicAtom", f:parsenoop }
};
function parse_SlideViewInfo$(blob, length, opts) { blob.l += length; }
function parse_ProgTags$(blob, length, opts) { blob.l += length; }
function parse_HeadersFooters$(blob, length, opts) { blob.l += length; }
function parse_ColorSchemeAtom$(blob, length, opts) { blob.l += length; }
function parse_ExternalOleObjectStg$(blob, length, opts) { blob.l += length; }

function process_ppt(ppt, opts) {
	opts = opts || {};

	/* 2.1.1 Current User Stream */
	var custream = ppt.find('Current User');
	var cublob = custream.content;

	/* 2.1.2 PowerPoint Document Stream */
	var pptstream = ppt.find('PowerPoint Document');
	var pptblob = pptstream.content;

	var cu, uea;
	
	/* Part 1.1 */
	recordhopper(cublob, function pptdoc1(R, val, len) {
		if(cu) throw "unexpected second RT_CurrentUserAtom in Current User stream";
		cu = val;
	}, cublob.length, {
		records: ['RT_CurrentUserAtom']
	});

	/* Part 1.2 */
	pptblob.l = cu.offset;

	/* Part 1.3 - 1.7 */
	var ueas = [], persists = [], state = 0;
	recordhopper(pptblob, function pptdoc2(R, val, len) {
		if(R.n === 'RT_UserEditAtom') {
			/* 1.3 */
			ueas.push(val);
			state = 1;
			/* 1.4 */
			pptblob.l = val.offsetPersistDirectory;
		} else {
			/* 1.5 */
			persists.push(val);
			/* 1.6 */
			pptblob.l = ueas[ueas.length-1].offsetLastEdit;
			if(pptblob.l === 0) pptblob.l = pptblob.length;
		}
	}, pptblob.length, {
		records: ['RT_PersistDirectoryAtom', 'RT_UserEditAtom']
	});

	if(opts.dump) {
		console.log(ueas);
		console.log(persists);
	}
	opts.persist = persists;

	var o = {
		slides: [],
		docs: []
	};

	/* second pass */
	pptblob.l = 0;
	recordhopper(pptblob, function pptdoc3(R, val, len) {
		switch(R.n) {
			case 'RT_Slide': o.slides.push(val); break;
			case 'RT_Document': o.docs.push(val); break;
			case 'RT_Notes': break;
			case 'RT_MainMaster': break;
			case 'RT_Handout': break;

			case 'RT_PersistDirectoryAtom': break;
			case 'RT_UserEditAtom': break;
			case 'RT_ExternalOleObjectStg': break;
			default: if(opts.WTF) throw R.n; break;
		}
	}, pptblob.length, opts);

	return o;
}

function readFile(filename, opts) {
	var ppt = CFB.read(filename, {type:'file'});
	return process_ppt(ppt, opts);
}

var to_text_d = function(docs) {
	var out = [];
	docs.forEach(function(d) {
		var o, i;
		try { o = d.slideList; } catch(e) { return; }
		for(i = 0; i != o.length; ++i) { out.push(o[i]); }
	});
	return out;
};

var to_text_s = function(slides) {
	var out = [];
	slides.forEach(function(s) {
		var o, i;
		try { o = s.drawing.groupShape; } catch(e) { return; }
		for(i = 0; i != o.length; ++i) {
			if(!o[i].clientTextbox) continue;
			out.push(o[i].clientTextbox.t);
		}
	});
	return out;
};

var to_text = function(pres) {
	if(pres.docs.length > 0 && pres.docs[0].slideList.length > 0) return to_text_d(pres.docs);
	else return to_text_s(pres.slides);
};

var utils = {
	to_text: to_text
};
PPT.parse_pptcfb = process_ppt;
PPT.readFile = readFile;
PPT.utils = utils;
})(typeof exports !== 'undefined' ? exports : PPT);

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


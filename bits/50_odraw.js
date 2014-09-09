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


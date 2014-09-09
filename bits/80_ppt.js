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


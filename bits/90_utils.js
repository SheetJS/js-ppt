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

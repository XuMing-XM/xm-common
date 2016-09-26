var data = {};
var useBindFuns = function(i,callback){
	data.__defineGetter__(i, function() {
	    return this["_" + i + "_"];
	});
	data.__defineSetter__(i, function(val) {
		if(callback){
			callback(val);
		}
	    this["_" + i + "_"] = val;
	});
	return data;
}
module.exports = useBindFuns;

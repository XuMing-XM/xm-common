var bindData = require("../modules/data-bind");
var _data = bindData("a",function(val){
	console.log(val);
});
_data.a = 1;
bindData("b",function(val){
	var h1 = document.querySelector("h1");
	h1.innerHTML = val;
});
bindData("c",function(val){
	var h1 = document.querySelector("h2");
	h1.innerHTML = val;
});
bindData("d",function(val){
	console.log("d");
});
_data.b = 2;
_data.c = 3;
setInterval(function(){
	_data.c++;
},1000);
setTimeout(function(){
	_data.b = "Hello World!";
},1000);
console.log(_data);
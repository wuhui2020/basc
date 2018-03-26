window.onload = function(){
	// console.log($().getId("box"))
	// $().getId("box").css("color","red").click(function(){
	// 	alert(this.html())
	// });
	// $().getId("box").setHtml("你好")
	// $().getTagname("p").setHtml("测试")
	// $().getTagname("p").css("color","blue").click(function(){
	// 	alert(this.innerHTML)
	// });;
	// console.log($("#box").css("color"))
	// console.log($("#box").css("fontSize"))

	// $("#box").click(function(){
	// 	alert($(this).html())
	// })

	// $("div").find("#divspan").css("color","red")
	// console.log(document.getElementById("drag-head"))
	// console.log($("#drag-head").element[0])
	$("#drag-head").drag($("#div-drag"));

	// $("#drag-head").element[0].onmousedown = function(e){

	// 	var e = e || window.e;
	// 	var _this = $(this).element[0];
	// 	// console.log(_this)
	// 	var thisParents = $("#div-drag").element[0];
	// 	var lx = e.clientX - thisParents.offsetLeft
	// 	var ly = e.clientY - thisParents.offsetTop
	// 	// console.log(_this.clientWidth)
	// 	document.onmouseover = function(e){
	// 		var e = e || window.e;
	// 		console.log(e.clientX - lx)
	// 		if(e.clientX - lx <= 0){
	// 			thisParents.style.left = 0 +"px"
	// 		}else if(e.clientX + _this.clientWidth -lx > window.innerWidth){
	// 			thisParents.style.left = window.innerWidth -_this.clientWidth +"px"
	// 		}else{
	// 			thisParents.style.left = e.clientX -lx +"px"
	// 		}

	// 		if(e.clientY - ly <= 0){
	// 			thisParents.style.top = 0 +"px"
	// 		}else if(e.clientY + _this.clientHeight -lx > window.innerHeight){
	// 			thisParents.style.top = window.innerHeight -_this.clientHeight +"px"
	// 		}else{
	// 			thisParents.style.top = e.clientY -lx +"px"
	// 		}
	// 	}
	// 	document.onmouseup = function(){
	// 		document.onmouseover = null;
	// 		document.onmouseup = null;
	// 	}
	// }
}
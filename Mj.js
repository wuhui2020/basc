$(function(){
	
	$("#box").on("click",function(){
		alert("box")
		$("#box1").off("click");
	})
	$("#box1").on("click",function(){
		alert("box1")
	});
	$("#box1").on("mouseover",function(){
		alert("mouse")
	});
})
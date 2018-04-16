window.onload = function(){
	// $("#p2").click(function(){
	// 	console.log($(this).index())
	// })

	$("#box").drag([$("#box .box_drag").getElement(0),$("#box .span_drag").getElement(0)]);
	$("#p2").click(function(){
		$("#box").removeClass("box1").removeClass("box").addClass("box2")
	})
}
window.onload = function(){
	
	// $("#div-drag").drag();
	addEvent($("#box"),"click",click)
	// removeEvent($("#box"),"click",click)
	
	var box = document.getElementById("box")
	// addEvent(box,'click',click);

	function click(){
		alert("点我")
	}
}
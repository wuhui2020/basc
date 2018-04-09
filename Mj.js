window.onload = function(){
	
	// $("#div-drag").drag();
	// addEvent($("#box"),"click",click)
	// removeEvent($("#box"),"click",click)
	
	var box = document.getElementById("box")
	// addEvent(box,'click',click);

	// function click(){
	// 	alert("点我")
	// }
	// $("#imgdiv").find("img").css("display","none");
	// $("#imgdiv").find("img").eq(0).css("display","block")
	// $("#imgdiv").find("img").eq(0).css("opacity","1")
	// $("#imgol").find("li").hover(function(){
	// 	alert(1)
	// },function(){
	// 	alert(2)
	// })
	
	$("#imgol").find("li").click(function(){
		console.log($(this).index())
			$("#imgdiv").find("img").css("display","none");
			$("#imgdiv").find("img").eq($(this).index()).css("display","block");
			$("#imgdiv").find("img").eq($(this).index()).css("opacity","1");
	})

	// ul = document.getElementById("imgol");
	// lis = ul.getElementsByTagName("li")
	// for(var i = 0; i < lis.length; i++){
	// 	lis[i].index = i;
	// 	lis[i].onmouseover = function(){
	// 		$("#imgdiv").find("img").css("display","none");
	// 		$("#imgdiv").find("img").eq(this.index).css("display","block");
	// 		$("#imgdiv").find("img").eq(this.index).css("opacity","1");
	// 	}
	// }
}
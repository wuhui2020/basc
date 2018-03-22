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
	$("#box").click(function(){
		alert($(this))
	})
	$("div").find("#divspan").css("color","red")
}
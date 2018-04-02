
$ = function(agrs){
	return new Basc(agrs);  //每次都new出一个新的对象
};

function Basc(agrs){
	this.element = [];//创建一个数组
	if(typeof(agrs) == "object"){
		this.element[0] = agrs;
		return this;
	}else if(typeof(agrs) == "string"){
		switch(agrs.charAt(0)){
			case "#":
				this.element.push( this.getId( agrs.substring(1) ) );
				return this;
			break;
			case ".":
				tags = this.getClass(agrs.substring(1));
				for(var i = 0; i < tags.length; i++){
					if(tags[i].className == agrs.substring(1)){
						this.element.push(tags[i])
					}
				};
				return this;
			break;
			default:
				tags = this.getTagname(agrs);
				for(var i = 0; i < tags.length; i++ ){
					this.element.push(tags[i]);
				};
				return this;
		}
	}
}

//获取ID
	Basc.prototype.getId = function(agrs){
		return document.getElementById(agrs);
	}
//获取Tagname
	Basc.prototype.getTagname = function(agrs,parentNode){
		var node = '';
		if(parentNode != undefined){
			node = parentNode;
		}else{
			node = document;
		}
		var temps = [];
		tags = node.getElementsByTagName(agrs);
		for(var i = 0; i < tags.length; i++ ){
			temps.push(tags[i]);
		}
		return temps;
	}
//获取className
	Basc.prototype.getClass = function(agrs,parentNode){
		var node = '';
		if(parentNode != undefined){
			node = parentNode;
		}else{
			node = document;
		}
		var temps = [];
		tags = node.getElementsByTagName('*');
		for(var i = 0; i < tags.length; i++){
			if(tags[i].className == agrs){
				temps.push(tags[i])
			}
		};
		return temps;
	}
//find查找元素
	Basc.prototype.find = function(elem){
		var childNode = [];
		switch(elem.charAt(0)){
			case "#":
				childNode.push(this.getId( elem.substring(1) ) );
			break;
			case ".":
				tags = this.getClass(elem.substring(1),this.element[i]);
				for(var i = 0; i < tags.length; i++ ){
					childNode.push(tags[i]);
				};
			break;
			default:
				tags = this.getTagname(elem,this.element[i]);
				for(var i = 0; i < tags.length; i++ ){
					childNode.push(tags[i]);
				};
			break;
		};
		this.element = childNode;
		return this;
	}

//设置和获取css样式
	Basc.prototype.css = function(attr,value){
		if(arguments.length == 1){
			for(var i = 0; i<this.element.length; i++){
				if(window.getComputedStyle){
					return getComputedStyle(this.element[i],null)[attr]; //W3C
				}else if(window.currentStyle){
					return currentStyle[attr];   //IE 
				}
			}
			return this;
		}else if(arguments.length == 2){
			for(var i = 0; i<this.element.length; i++){
				this.element[i].style[attr] = value;
			}
			return this;
		}
		
	}


//点击事件
	Basc.prototype.click = function(fn){
		for(var i = 0; i < this.element.length; i++ ){
			this.element[i].onclick = fn;
		}
		return this;
	}

//获取和设置html
	Basc.prototype.html = function(args){
		if(typeof(args) =="string" && args != undefined){
			for(var i = 0; i < this.element.length;i++){
				this.element[i].innerText = args
			}
		}else{
			for(var i = 0; i < this.element.length; i++){
				return this.element[i].innerHTML;
			}
		}
		return this.element;
	}

//现代事件绑定
function addEvent(obj,Events,func){
	for(var i = 0; i < obj.element.length; i++){
		// attachEvent()添加事件   //IE
		// detachEvent()删除事件
		// addEventListener       //W3C
		// removeEventListener
		if(obj.element[i].addEventListener){
			obj.element[i].addEventListener(Events,func,false);//false捕获
		}else if(obj.element[i].attachEvent){
			obj.element[i].attachEvent('on'+Events,func)
		}
	}
}
//删除现代事件绑定
function removeEvent(obj,Events,func){
	for(var i = 0; i < obj.element.length; i++){
		if(obj.element[i].removeEventListener){
			obj.element[i].removeEventListener(Events,func,false);//false捕获
		}else if(obj.element[i].detacEvent){
			obj.element[i].detacEvent('on'+Events,func)
		}
	}
}	

//拖拽	
// 		标准：　　阻止默认行为
// 　　 非标准ie：　　设置全局捕获setCapture()（跟事件的捕获不是一个概念）
	Basc.prototype.drag = function(){
		for(var i = 0; i < this.element.length; i++){
			this.element[i].onmousedown = function(){
				var _this = this;
				var e = getEvent(event);
				var lx = e.clientX - _this.offsetLeft
				var ly = e.clientY - _this.offsetTop
				if ( _this.setCapture ) {
	                _this.setCapture();
	            };
				document.onmousemove = function(){
					e = getEvent(event);
					if(e.clientX - lx <= 0){
						_this.style.left = 0 +"px"
					}else if(e.clientX + _this.clientWidth -lx > window.innerWidth){
						_this.style.left = window.innerWidth -_this.clientWidth +"px"
					}else{
						_this.style.left = e.clientX -lx +"px"
					}
					if(e.clientY - ly <= 0){
						_this.style.top = 0 +"px"
					}else if(e.clientY + _this.clientHeight -lx > window.innerHeight){
						_this.style.top = window.innerHeight -_this.clientHeight +"px"
					}else{
						_this.style.top = e.clientY -ly +"px"
					}
				};

				document.onmouseup = function(){
					this.onmousemove = null;
					this.onmouseup = null;
					if ( _this.releaseCapture ) {
                    	_this.releaseCapture();
                	}
				};	
				return false;
			}
		}
	}
//获取event对像
	function getEvent(event){
		return e =  event || window.event;
	};

//排序
	// Basc.prototype.sort = function(arr){
	// 	for(var i = 0;i < arr.length;i++){
	// 		for(var j = 0 ; j < arr.length - (1 + i); j++){
	// 			if(arr[j] > arr[j+1]){
	// 				var temp = arr[j]
	// 				arr[j] = arr[j+1]
	// 				arr[j+1] = temp;
	// 			}
	// 		}
	// 	};
	// 	return arr;
	// };

	function sort(arr){
		for(var i = 0;i < arr.length;i++){
			for(var j = 0 ; j < arr.length - (1 + i); j++){
				if(arr[j] > arr[j+1]){
					var temp = arr[j]
					arr[j] = arr[j+1]
					arr[j+1] = temp;
				}
			}
		};
		return arr;
	}

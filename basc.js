
$ = function(agrs){
	return new Basc(agrs);  //每次都new出一个新的对象
};

function Basc(agrs){
	this.element = [];//创建一个数组
	if(typeof(agrs) == "object"){
		this.element[0] = agrs;
		return this;
	}else if(typeof(agrs) == "string"){
		var machclass = [];
		var onlyclass = [];
		if(agrs.indexOf(" ") != -1){
			var element = agrs.split(" ");
			var childElement = [];
			var node = [];
			for(var i = 0; i < element.length; i++){
				if(node.length == 0){
					node.push(document);
				}
				switch(element[i].charAt(0)){
					case "#":
						childElement = [];                   
						childElement.push( this.getId( element[i].substring(1) ) );
						node = childElement;
					break;
					case ".":
						childElement = [];
						for(var k = 0; k < node.length; k++){
							tags = this.getClass(element[i].substring(1),node[k]);
							for(var j = 0; j < tags.length; j++){
								if(tags[j].className.replace(/(^\s*)|(\s*$)/g, "").indexOf(" ") != -1 ){
									var classArr = tags[i].className.replace(/(^\s*)|(\s*$)/g, "").split(" ");
									for(var j = 0; j < classArr.length; j++){
										if(classArr[j] == agrs.substring(1)){
											machclass.push(tags[i]);
										}
									};
									node = machclass;
								}else{
									if(tags[j].className == element[i].substring(1)){
										onlyclass.push(tags[j]);
									}
									node = onlyclass;
								};
							};
						}
						childElement = machclass.concat(onlyclass);
					break;
					default:
						childElement = [];
						for(var k = 0; k < node.length; k++){
							tags = this.getTagName(element[i],node[k]);
							for(var j = 0; j < tags.length; j++ ){
								childElement.push(tags[j]);
							};
						}
						node = childElement;
				}
			}
			this.element = childElement;
			return this;
		}else{
			switch(agrs.charAt(0)){
				case "#":                      
					this.element.push( this.getId( agrs.substring(1) ) );
					return this;
				break;
				case ".":
					tags = this.getClass(agrs.substring(1));
					for(var i = 0; i < tags.length; i++){
						if(tags[i].className.replace(/(^\s*)|(\s*$)/g, "").indexOf(" ") != -1 ){
							var classArr = tags[i].className.replace(/(^\s*)|(\s*$)/g, "").split(" ");
							for(var j = 0; j < classArr.length; j++){
								if(classArr[j] == agrs.substring(1)){
									machclass.push(tags[i]);
								}
							};
						}else{
							if(tags[i].className.replace(/(^\s*)|(\s*$)/g, "") == agrs.substring(1)){
								onlyclass.push(tags[i]);
							}
						};
					};
					this.element = machclass.concat(onlyclass);
					return this;
				break;
				default:
					tags = this.getTagName(agrs);
					for(var i = 0; i < tags.length; i++ ){
						this.element.push(tags[i]);
					};
					return this;
			}
		}
	}
};

//获取ID
Basc.prototype.getId = function(agrs){
	var temps = document.getElementById(agrs);
	temps.index = 0;
	return temps;
};

//获取Tagname
Basc.prototype.getTagName = function(agrs,parentNode){
	var node = '';
	parentNode != undefined?node = parentNode:node = document;
	var temps = [];
	var tags = node.getElementsByTagName(agrs);
	for(var i = 0; i < tags.length; i++ ){
		tags[i].index = i;
		temps.push(tags[i]);
	}
	return temps;
};

//获取className
Basc.prototype.getClass = function(agrs,parentNode){
	var node = '';
	parentNode != undefined?node = parentNode:node = document;
	var temps = [];
	var machclass = [];
	var onlyclass = [];
	var tags = node.getElementsByTagName('*');
	for(var i = 0; i < tags.length; i++){
		if(tags[i].className.replace(/(^\s*)|(\s*$)/g, "").indexOf(" ") != -1 ){
			var classArr = tags[i].className.replace(/(^\s*)|(\s*$)/g, "").split(" ");
			for(var j = 0; j < classArr.length; j++){
				if(classArr[j] == agrs){
					tags[i].index = i;
					machclass.push(tags[i]);
				}
			};
		}else{
			if(tags[i].className.replace(/(^\s*)|(\s*$)/g, "") == agrs){
				tags[i].index = i;
				onlyclass.push(tags[i]);
			}
		};
	};
	temps = machclass.concat(onlyclass);
	return temps;
};

//find查找元素
Basc.prototype.find = function(elem){
	var childNode = [];
	for(var i = 0; i < this.element.length; i++){
		switch(elem.charAt(0)){
			case "#":
				var tags = this.getId( elem.substring(1) );
				childNode.push(tags);
			break;
			case ".":
				var tags = this.getClass(elem.substring(1),this.element[i]);
				for(var i = 0; i < tags.length; i++ ){
					childNode.push(tags[i]);
				};
			break;
			default:
				var tags = this.getTagName(elem,this.element[i]);
				for(var i = 0; i < tags.length; i++ ){
					childNode.push(tags[i]);
				};
				return this;
			break;
		};
	}
	this.element = childNode;
	return this;
};

//获取父级元素
Basc.prototype.parentNode = function(){
	for(var i = 0; i < this.element.length; i++){
		parentNode = this.element[i].parentNode;
	}
	return parentNode;
};

//获取父级元素所有子节点
Basc.prototype.childNodes = function(){
	var temp = []
	for(var i = 0; i < this.parentNode().childNodes.length; i++){
		if(this.parentNode().childNodes[i].tagName != undefined){
			temp.push(this.parentNode().childNodes[i])
		}
	}
	this.element = temp;
	return this;
};

//获取第几个元素 并返当前元素
Basc.prototype.getElement = function(num){
	return this.element[num];
};

//获取第几个元素 并返回Basc对像
Basc.prototype.eq = function(num){
	var temp = this.element[num]
	this.element =[];
	this.element.push(temp);
	return this;
};

//获取元素索引
Basc.prototype.index = function(){
	// for(var i = 0; i < this.element.length; i++){
		return this.element[0].index;
	// }
	
};

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
};

//添加css
Basc.prototype.addClass = function(classname){
	for(var i = 0; i < this.element.length; i++){
		if(!this.element[i].className.match(new RegExp('(\s*|^)'+classname+'(\s*|$)','g'))){
			this.element[i].className += " "+classname;
		}
	}
	return this
};

//点击事件
Basc.prototype.click = function(fn){
	for(var i = 0; i < this.element.length; i++ ){
		this.element[i].onclick = fn;
	}
	return this;
};

//点击事件
Basc.prototype.mouseover = function(fn){
	for(var i = 0; i < this.element.length; i++ ){
		this.element[i].onmouseover = fn;
	}
	return this;
};

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
};

//封装hover
Basc.prototype.hover =function(fn,fn1){
	addEvent(this,"mouseover",fn);
	addEvent(this,"mouseout",fn1);
};

//封装show
Basc.prototype.show =function(){
	for(var i = 0; i < this.element.length; i++){
		this.element[i].style.display = "block";
	}
};

//封装hide
Basc.prototype.hide =function(){
	for(var i = 0; i < this.element.length; i++){
		this.element[i].style.display = "none";
	}
};

//现代事件绑定
function addEvent(obj,Events,func){
	// for(var i = 0; i < obj.element.length; i++){
		// attachEvent()添加事件   //IE
		// detachEvent()删除事件
		// addEventListener       //W3C
		// removeEventListener
		if(obj.addEventListener){
			obj.addEventListener(Events,func,false);//false捕获
		}else if(obj.element[i].attachEvent){
			obj.attachEvent('on'+Events,func)
		}
	// }
};
//删除现代事件绑定
function removeEvent(obj,Events,func){
	// for(var i = 0; i < obj.element.length; i++){
		if(obj.removeEventListener){
			obj.removeEventListener(Events,func,false);//false捕获
		}else if(obj.detacEvent){
			obj.detacEvent('on'+Events,func)
		}
	// }
};	

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
	
//排序
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
};

Basc.prototype.extend = function(fnName,func){
	Basc.prototype[fnName] = func;
}


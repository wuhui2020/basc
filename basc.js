;$ = function(agrs){
	return new Basc(agrs);  //每次都new出一个新的对象
};

//检测浏览器版本
(function(us){
	window.browser;
	var Browser;
	//这只测试了IE10
	( Browser = us.match( /Chrome\/(.*)Edge\/([\d.]*)+/) )?browser="您使用的浏览器是Edge,版本为:"+Browser[2]:
	( Browser = us.match( /QQBrowser\/+([\d.]*)+/) )?browser="您使用的浏览器是QQBrowser,版本为:"+Browser[1]:
	( Browser = us.match( /Chrome\/+([\d.]*)+/) )?browser="您使用的浏览器是Chrome,版本为:"+Browser[1]:
	( Browser = us.match( /Firefox\/+([\d.]*)+/) )?browser="您使用的浏览器是Firefox,版本为:"+Browser[1]:0;
})(navigator.userAgent)

function Basc(agrs){
	this.element = [];//创建一个数组
	if(typeof(agrs) == "object"){
		this.element[0] = agrs;
		return this;
	}else if(typeof(agrs) == "string"){
		var machclass = [];
		var onlyclass = [];
		if(agrs.indexOf(" ") != -1){
			var elements = agrs.split(" ");
			var childElement = [];
			var node = [];
			for(var i = 0; i < elements.length; i++){
				if(node.length == 0){
					node.push(document);
				}
				switch(elements[i].charAt(0)){
					case "#":
						childElement = [];                   
						childElement.push( this.getId( elements[i].substring(1) ) );
						node = childElement;
					break;
					case ".":
						childElement = [];
						for(var k = 0; k < node.length; k++){
							tags = this.getClass(elements[i].substring(1),node[k]);
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
									if(tags[j].className == elements[i].substring(1)){
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
							tags = this.getTagName(elements[i],node[k]);
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
	}else if(typeof agrs == 'function'){
		this.onload(agrs);
	}
};

Basc.prototype.onload = function(func){
	window.onload = function(){
		func();
	}
}

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
	if(num < 0 || num > this.element.length){
		return null;
	};
	return this.element[num];
};

//获取第几个元素 并返回Basc对像
Basc.prototype.eq = function(num){
	if(num < 0 || num > this.element.length){
		return null;
	};
	var temp = this.element[num]
	this.element =[];
	this.element.push(temp);
	return this;
};

//获取数组中第一元素
Basc.prototype.first = function(){
	var temp = this.element[0];
	this.element = [];
	this.element.push(temp);
	return this;
}

//获取数组中最后一个元素
Basc.prototype.last = function(){
	var temp = this.element[this.element.length - 1];
	this.element = [];
	this.element.push(temp);
	return this;
}

//获取元素索引
Basc.prototype.index = function(){
	return this.element[0].index;
};

//设置和获取css样式
Basc.prototype.css = function(attr,value){
	for(var i = 0; i<this.element.length; i++){
		if(arguments.length == 1){
			if(typeof(attr) == "string"){
				if(window.getComputedStyle){
					return getComputedStyle(this.element[i],null)[attr]; //W3C
				}else if(window.currentStyle){
					return currentStyle[attr];   //IE 
				}
			}else if(typeof(attr) == "object"){
				for(_i in attr){
					this.element[i].style[_i] = attr[_i];
				}
			}
		}else if(arguments.length == 2){
			this.element[i].style[attr] = value;
		}
	}
	return this;
};

//设置和获取属性
Basc.prototype.attr = function(attr,value){
	for(var i = 0; i<this.element.length; i++){
		if(arguments.length == 1){
			this.element[i].getAttribute(attr);
		}else if(arguments.length == 2){
			this.element[i].setAttribute(attr,value);
		}
	}
	return this;
};

//添加class
Basc.prototype.addClass = function(classname){
	for(var i = 0; i < this.element.length; i++){
		if(!this.element[i].className.match(new RegExp('(\s*|^)'+classname+'(\s*|$)','g'))){
			this.element[i].className += " "+classname;
		}
	}
	return this;
};

//删除class
Basc.prototype.removeClass = function(classname){
	for(var i = 0; i < this.element.length; i++){
		if(this.element[i].className.match(new RegExp('(\s*|^)'+classname+'(\s*|$)','g'))){
			this.element[i].className = this.element[i].className.replace(classname,'')
		}
	}
	return this
}
//点击事件
Basc.prototype.click = function(func){
	for(var i = 0; i < this.element.length; i++ ){
		this.element[i].onclick = func;
	}
	return this;
};

//点击事件
Basc.prototype.mouseover = function(func){
	for(var i = 0; i < this.element.length; i++ ){
		this.element[i].onmouseover = func;
	}
	return this;
};

//获取和设置html、标签和文字
Basc.prototype.html = function(args){
	for(var i = 0; i < this.element.length;i++){
		if(typeof(args) =="string" && args != undefined){
			this.element[i].innerHTML = args
		}else{
			return this.element[i].innerHTML;
		}
	}
	return this;
};

//获取和设置text、纯文本
Basc.prototype.text = function(args){
	for(var i = 0; i < this.element.length;i++){
		if(typeof(args) =="string" && args != undefined){
			this.element[i].innerText = args
		}else{
			return this.element[i].innerText;
		}
	}
	return this;
};

//获取input值
Basc.prototype.val = function(){
	for(var i = 0; i < this.element.length;i++){
		return this.element[i].value;
	}
};

//向目标元素内后面追加元素
Basc.prototype.append = function(elements){
	 if(elements.charAt(0) == "<" && elements.charAt(elements.length-1) == ">" && elements.length > 3){
	 	for(var i = 0; i < this.element.length; i++){
	 		if(trim(this.element[i].innerHTML) != ""){
	 			this.element[i].innerHTML = trim(this.element[i].innerHTML) + elements;
	 		}else{
	 			this.element[i].innerHTML = elements;
	 		}
		}
	 }else{
	 	console.error(elements)
	 }
	return this;
}

//向目标元素内前面追加元素
Basc.prototype.prepend = function(elements){
	 if(elements.charAt(0) == "<" && elements.charAt(elements.length-1) == ">" && elements.length > 3){
	 	for(var i = 0; i < this.element.length; i++){
	 		if(trim(this.element[i].innerHTML) != ""){
	 			this.element[i].innerHTML =  elements + trim(this.element[i].innerHTML);
	 		}else{
	 			this.element[i].innerHTML = elements;
	 		}
		}
	 }else{
	 	console.error(elements)
	 }
	return this;
}

//封装hover
Basc.prototype.hover = function(func,func1){
	for(var i = 0; i < this.element.length; i++){
		addEvent(this.element[i],"mouseover",func);
		addEvent(this.element[i],"mouseout",func1);
	}
	return this;
};

//封装show
Basc.prototype.show = function(){
	for(var i = 0; i < this.element.length; i++){
		this.element[i].style.display = "block";
	}
	return this;
};

//封装hide
Basc.prototype.hide = function(){
	for(var i = 0; i < this.element.length; i++){
		this.element[i].style.display = "none";
	}
	return this;
};

//获取元素宽度、包括边框
Basc.prototype.offsetWidth = function(){
	for(var i = 0; i < this.element.length; i++){
		return this.element[i].offsetWidth;
	}
	// return this;
};
//获取元素高度、包括边框
Basc.prototype.offsetHeight = function(){
	for(var i = 0; i < this.element.length; i++){
		return this.element[i].offsetHeight;
	}
	// return this;
};

//获取元素宽度、不包括边框
Basc.prototype.width = function(){
	for(var i = 0; i < this.element.length; i++){
		return this.element[i].clientWidth;
	}
};
//获取元素高度、不包括边框
Basc.prototype.height = function(){
	for(var i = 0; i < this.element.length; i++){
		return this.element[i].clientHeight;
	}
};

//获取元素宽度、不包括边框
Basc.prototype.clientWidth = function(){
	for(var i = 0; i < this.element.length; i++){
		return this.element[i].clientWidth;
	}
};
//获取元素高度、不包括边框
Basc.prototype.clientHeight = function(){
	for(var i = 0; i < this.element.length; i++){
		return this.element[i].clientHeight;
	}
};

//事件绑定 
Basc.prototype.on = function(Events,func){
	for(var i = 0; i < this.element.length; i++){
		this.element[i]['on'+Events] = func;
	}
	return this;
}
//解除事件绑定
Basc.prototype.off = function(Events){
	for(var i = 0; i < this.element.length; i++){
		this.element[i]['on'+Events] = '';
	}
	return this;
}


	

//==================================小方法----START===============================================	
//现代事件绑定
function addEvent(obj,Events,fn){
	// attachEvent()添加事件  detachEvent()删除事件 //IE
	// addEventListener  removeEventListener     //W3C
	if(obj.addEventListener){
		obj.addEventListener(Events,fn,false);//false捕获
	}else if(obj.attachEvent){
		obj.attachEvent('on'+Events,fn)
	}
};

//删除现代事件绑定
function removeEvent(obj,Events,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(Events,fn,false);//false捕获
	}else if(obj.detacEvent){
		obj.detacEvent('on'+Events,fn)
	}
};

//获取event对像
function getEvent(event){
	return e =  event || window.event;
};

//居中显示
function cneter(obj){
	var docEleCli = document.documentElement;
	obj.element[0].style.left = ( docEleCli.clientWidth - obj.width() )/2 + "px";
	obj.element[0].style.top = ( docEleCli.clientHeight - obj.height() )/2 + "px";
}

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

//去掉前后空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,"");
}

//==================================小方法----END===============================================	


//扩展方法
Basc.prototype.extend = function(fnName,func){
	Basc.prototype[fnName] = func;
}



$ = function(agrs){
	return new Basc(agrs);  //每次都new出一个新的对象
};


function Basc(agrs){
	this.element = [];//创建一个数组
	if(typeof(agrs) == "object"){
		this.element.push(agrs);
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

//设置css样式
	Basc.prototype.css = function(attr,value){
		for(var i = 0; i<this.element.length; i++){
			this.element[i].style[attr] = value;
		}
		return this;
	}

//点击事件
	Basc.prototype.click = function(fn){
		for(var i = 0; i < this.element.length; i++ ){
			this.element[i].onclick = fn;
		}
		return this;
	}

//获取html
	Basc.prototype.html = function(){
		console.log(this)
		for(var i = 0; i < this.element.length; i++){
			return this.element[i].innerHTML;
		}
		return this.element;
	}
//设置html
	Basc.prototype.setHtml = function(text){
		for(var i = 0; i < this.element.length;i++){
			this.element[i].innerText = text
		}
		return this;
	}
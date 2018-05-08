Basc.prototype.extend("drag",function(){
	var tagname = arguments;//arguments是传过来的参数;
	for(var i = 0; i < this.element.length; i++){
		addEvent(this.element[i],"mousedown",down);
		function down(){
			var _this = this;
			var e = getEvent(event);
			var lx = e.clientX - _this.offsetLeft
			var ly = e.clientY - _this.offsetTop
			//setCapture可以将鼠标事件锁定在指定的元素上，当元素捕获了鼠标事件后，该事件只能作用在当前元素上
			//releaseCapture()可以为指定的元素解除事件锁定。它们俩必须成对使用
			if ( _this.setCapture ) {
                _this.setCapture();
            };
            var flag = false;
            for(var i = 0; i < tagname.length; i++){
            	if(tagname[i].tagName == e.target.tagName){
            		flag = true;
            		break;
            	}
            }
            if(flag){
				addEvent(document,"mousemove",move);
				addEvent(document,"mouseup",up);
            }
			function move(){
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
			}	
			function up(){
				removeEvent(document,"mousemove",move);
				removeEvent(document,"mouseup",up);
				//releaseCapture()可以为指定的元素解除事件锁定
				if ( _this.releaseCapture ) {
                	_this.releaseCapture();
            	}
			}
			return false;
		}
	}
})

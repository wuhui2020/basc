Basc.prototype.extend("drag",function(tags){
	var tagname = tags;
	for(var i = 0; i < this.element.length; i++){
		
		addEvent(this.element[i],"mousedown",down);
		function down(){
			var _this = this;
			var e = getEvent(event);
			var lx = e.clientX - _this.offsetLeft
			var ly = e.clientY - _this.offsetTop
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
				if ( _this.releaseCapture ) {
                	_this.releaseCapture();
            	}
			}
			return false;
		}
	}
})

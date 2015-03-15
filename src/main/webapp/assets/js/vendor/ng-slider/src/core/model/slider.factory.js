(function(angular){
  'use strict';

  angular.module('ngSlider').factory('slider', ['sliderPointer', 'sliderConstants', 'sliderUtils', function(SliderPointer, sliderConstants, utils) {

    function Slider() {
      return this.init.apply(this, arguments);
    }

    Slider.prototype.init = function(inputNode, templateNode, settings){   
      this.settings = settings;            
      this.inputNode = inputNode;
      this.inputNode.addClass("ng-hide");

      this.settings.interval = this.settings.to-this.settings.from;
      
      if(this.settings.calculate && angular.isFunction(this.settings.calculate))
        this.nice = this.settings.calculate;

      if(this.settings.onstatechange && angular.isFunction(this.settings.onstatechange))
        this.onstatechange = this.settings.onstatechange;

      this.is = {init: false};
      this.o = {};
      this.initValue = {};

      this.create(templateNode);

      return this;
    };

    Slider.prototype.create = function(templateNode){
      var self = this;

      this.domNode = templateNode;

      var divs = this.domNode.find('div');
      var is = this.domNode.find('i');      

      // set skin class
      //   if( this.settings.skin && this.settings.skin.length > 0 )
      //     this.setSkin( this.settings.skin );

      var pointer1 = angular.element(divs[1]);
      var pointer2 = angular.element(divs[2]);
      var pointerLabel1 = angular.element(divs[5]);
      var pointerLabel2 = angular.element(divs[6]);
      var indicator = angular.element(is[0]);
      var range = angular.element(is[2]);
      var indicator1 = angular.element(is[3]);
      var indicator2 = angular.element(is[4]);
      var indicator3 = angular.element(is[5]);

      var off = utils.offset(this.domNode);

      var offset = {
        left: off.left,
        top: off.top,
        width: this.domNode[0].clientWidth,
        height: this.domNode[0].clientHeight
      };      

      this.sizes = { 
        domWidth: this.domNode[0].clientWidth,
        domHeight: this.domNode[0].clientHeight,
        domOffset: offset 
      };

      // find some objects
      angular.extend(this.o, {
        pointers: {},
        labels: { 0: { o : pointerLabel1 }, 1: { o : pointerLabel2 } },
        limits: { 0: angular.element(divs[3]), 1: angular.element(divs[4]) },
        indicators: { 0: indicator1, 1: indicator2, 2: indicator3 }
      });

      angular.extend(this.o.labels[0], {
        value: this.o.labels[0].o.find("span")
      });

      angular.extend(this.o.labels[1], {
        value: this.o.labels[1].o.find("span")
      });

      if( !self.settings.value.split(";")[1] ) {
        this.settings.single = true;
      }

      var clickPtr;
      
      var pointers = [pointer1, pointer2];

      angular.forEach(pointers, function(pointer, key) {
        self.settings = angular.copy(self.settings);
        var value = self.settings.value.split(';')[key];
        if(value) {
          self.o.pointers[key] = new SliderPointer(pointer, key, self.settings.vertical, self);

          var prev = self.settings.value.split(';')[key-1];
          if( prev && parseInt(value, 10) < parseInt(prev, 10 )) value = prev;

          var value1 = value < self.settings.from ? self.settings.from : value;
          value1 = value > self.settings.to ? self.settings.to : value;

          self.o.pointers[key].set( value1, true );

          if (key === 0) {
            self.domNode.bind('mousedown', self.clickHandler.apply(self));
          }
        }
      });

      this.o.value = angular.element(this.domNode.find("i")[2]);      
      this.is.init = true;

      // CSS SKIN
      if (this.settings.css) {        
        indicator.css(this.settings.css.background ? this.settings.css.background : {});
        if (!this.o.pointers[1]) {
          indicator1.css(this.settings.css.before ? this.settings.css.before : {});
          indicator2.css(this.settings.css.default ? this.settings.css.default : {});  
          indicator3.css(this.settings.css.after ? this.settings.css.after : {});
        }
        
        range.css(this.settings.css.range ? this.settings.css.range : {});
        pointer1.css(this.settings.css.pointer ? this.settings.css.pointer : {});
        pointer2.css(this.settings.css.pointer ? this.settings.css.pointer : {});
      }

      angular.forEach(this.o.pointers, function(pointer, key){
        self.redraw(pointer);
      });

    };

    Slider.prototype.clickHandler = function() {
      var self = this;
      return function(evt) {
        if (self.disabled)
          return;
        var className = evt.target.className;
        var targetIdx = 0;

        if (className.indexOf('jslider-pointer-to') > 0) {
          targetIdx = 1;
        }

        var _off = utils.offset(self.domNode);

        var offset = {
          left: _off.left,
          top: _off.top,
          width: self.domNode[0].clientWidth,
          height: self.domNode[0].clientHeight
        };              

        var targetPtr = self.o.pointers[targetIdx];
        targetPtr._parent = {offset: offset, width: offset.width, height: offset.height};
        targetPtr._mousemove(evt);
        targetPtr.onmouseup();
      
        return false;
      };
    };

    Slider.prototype.disable = function(bool) {   
      this.disabled = bool;
    };    

    Slider.prototype.nice = function(value){
      return value;
    };

    Slider.prototype.onstatechange = function(){};

    Slider.prototype.limits = function(x, pointer){
      // smooth
      if(!this.settings.smooth){
        var step = this.settings.step*100 / ( this.settings.interval );
        x = Math.round( x/step ) * step;
      }

      var another = this.o.pointers[1-pointer.uid];
      if(another && pointer.uid && x < another.value.prc) x = another.value.prc;
      if(another && !pointer.uid && x > another.value.prc) x = another.value.prc;

      // base limit
      if(x < 0) x = 0;
      if(x > 100) x = 100;

      return Math.round(x*10) / 10;
    };    

    Slider.prototype.getPointers = function(){
      return this.o.pointers;
    };

    Slider.prototype.generateScale = function(){
      if (this.settings.scale && this.settings.scale.length > 0){
        var str = "";
        var s = this.settings.scale;
        // FIX Big Scale Failure #34
        // var prc = Math.round((100/(s.length-1))*10)/10;
        var prc = (100/(s.length-1)).toFixed(2);
        var position = this.settings.vertical ? 'top' : 'left';
        for(var i=0; i < s.length; i++){
          str += '<span style="'+ position + ': ' + i*prc + '%">' + ( s[i] != '|' ? '<ins>' + s[i] + '</ins>' : '' ) + '</span>';
        }
        return str;
      } else return "";

      return "";
    };

    Slider.prototype.onresize = function(){
      var self = this;

      this.sizes = {
        domWidth: this.domNode[0].clientWidth,
        domHeight: this.domNode[0].clientHeight,
        domOffset: {
          left: this.domNode[0].offsetLeft,
          top: this.domNode[0].offsetTop,
          width: this.domNode[0].clientWidth,
          height: this.domNode[0].clientHeight
        }
      };

      angular.forEach(this.o.pointers, function(ptr, key) {
        self.redraw(ptr);
      });
    };

    Slider.prototype.update = function(){
      this.onresize();
      this.drawScale();
    };    

    Slider.prototype.drawScale = function(scaleDiv){
      angular.forEach(angular.element(scaleDiv).find('ins'), function(scaleLabel, key) {
        scaleLabel.style.marginLeft = - scaleLabel.clientWidth / 2;
      });
    };    

    Slider.prototype.redraw = function( pointer ){      
      if(!this.is.init) {
        if(this.o.pointers[0] && !this.o.pointers[1]) {
          this.originValue = this.o.pointers[0].value.prc;
          this.o.indicators[0].css(!this.settings.vertical ? {left:0, width:this.o.pointers[0].value.prc + "%"} : {top:0, height:this.o.pointers[0].value.prc + "%"});
          this.o.indicators[1].css(!this.settings.vertical ? {left:this.o.pointers[0].value.prc + "%"} : {top:this.o.pointers[0].value.prc + "%"});
          this.o.indicators[2].css(!this.settings.vertical ? {left:this.o.pointers[0].value.prc + "%"} : {top:this.o.pointers[0].value.prc + "%"});
      }
        return false;
      }

      this.setValue();

      // redraw range line      
      if(this.o.pointers[0] && this.o.pointers[1]) {
        var newPos = !this.settings.vertical ? 
          { left: this.o.pointers[0].value.prc + "%", width: ( this.o.pointers[1].value.prc - this.o.pointers[0].value.prc ) + "%" }
          :
          { top: this.o.pointers[0].value.prc + "%", height: ( this.o.pointers[1].value.prc - this.o.pointers[0].value.prc ) + "%" };
        
        this.o.value.css(newPos);        
      }
      
      if(this.o.pointers[0] && !this.o.pointers[1]) {
        var newWidth = this.o.pointers[0].value.prc - this.originValue;
        if (newWidth >= 0) {
          this.o.indicators[2].css(!this.settings.vertical ? {width: newWidth + "%"} : {height: newWidth + "%"});
        }
        else {
          this.o.indicators[2].css(!this.settings.vertical ? {width: 0} : {height: 0});
        }

        if (this.o.pointers[0].value.prc < this.originValue) {
         this.o.indicators[0].css(!this.settings.vertical ? {width: this.o.pointers[0].value.prc + "%"} : {height: this.o.pointers[0].value.prc + "%"});
        }
        else {
          this.o.indicators[0].css(!this.settings.vertical ? {width: this.originValue + "%"} : {height: this.originValue + "%"});
        }        

      }      

      this.o.labels[pointer.uid].value.html(this.nice(pointer.value.origin));

      // redraw position of labels
      this.redrawLabels( pointer );
    };

    Slider.prototype.redrawLabels = function(pointer) {

      function setPosition(label, sizes, prc) {
        sizes.margin = -sizes.label/2;
        var domSize = !self.settings.vertical ? self.sizes.domWidth : self.sizes.domHeight;

        // left limit
        var label_left = sizes.border + sizes.margin;
        if(label_left < 0)
          sizes.margin -= label_left;

        // right limit
        if(sizes.border+sizes.label / 2 > domSize){
          sizes.margin = 0;
          sizes.right = true;
        } else
        sizes.right = false;

        if (!self.settings.vertical)        
          label.o.css({ left: prc + "%", marginLeft: sizes.margin+"px", right: "auto" });
        else
          label.o.css({ top: prc + "%", marginLeft: "20px", marginTop: sizes.margin, bottom: "auto" });
        if(sizes.right) {
          if (!self.settings.vertical)
            label.o.css({ left: "auto", right: 0 });
          else
            label.o.css({ top: "auto", bottom: 0 });
        }
        return sizes;
      }

      var self = this;
      var label = this.o.labels[pointer.uid];
      var prc = pointer.value.prc;      

      var sizes = {
        label: !self.settings.vertical ? label.o[0].offsetWidth : label.o[0].offsetHeight,
        right: false,
        border: (prc * (!self.settings.vertical ? this.sizes.domWidth: this.sizes.domHeight)) / 100
      };

      var another_label = null;
      var another = null;

      if (!this.settings.single && !this.settings.vertical){
        // glue if near;
        another = this.o.pointers[1-pointer.uid];
        another_label = this.o.labels[another.uid];

        switch(pointer.uid){
          case 0:
          if (sizes.border+sizes.label / 2 > another_label.o[0].offsetLeft-this.sizes.domOffset.left){
            another_label.o.css({ visibility: "hidden" });
            another_label.value.html(this.nice(another.value.origin));
            label.o.css({ visibility: "visible" });
            prc = (another.value.prc - prc) / 2 + prc;

            if(another.value.prc != pointer.value.prc){
              label.value.html(this.nice(pointer.value.origin) + "&nbsp;&ndash;&nbsp;" + this.nice(another.value.origin));
              sizes.label = label.o[0].offsetWidth;
              sizes.border = (prc * domSize) / 100;
            }
          } else {
            another_label.o.css({ visibility: "visible" });
          }
          break;
          case 1:
          if (sizes.border - sizes.label / 2 < another_label.o[0].offsetLeft - this.sizes.domOffset.left + another_label.o[0].offsetWidth){
            another_label.o.css({ visibility: "hidden" });
            another_label.value.html( this.nice(another.value.origin) );
            label.o.css({ visibility: "visible" });
            prc = ( prc - another.value.prc ) / 2 + another.value.prc;

            if( another.value.prc != pointer.value.prc ){
              label.value.html( this.nice(another.value.origin) + "&nbsp;&ndash;&nbsp;" + this.nice(pointer.value.origin) );
              sizes.label = label.o[0].offsetWidth;
              sizes.border = ( prc * domSize ) / 100;
            }
          } else {
            another_label.o.css({ visibility: "visible" });
          }
          break;
        }
      }

      sizes = setPosition(label, sizes, prc);

      var domSize = !self.settings.vertical ? self.sizes.domWidth : self.sizes.domHeight;

      /* draw second label */
      if(another_label){
        var sizes2 = {
          label: !self.settings.vertical ? another_label.o[0].offsetWidth: another_label.o[0].offsetHeight,
          right: false,
          border: (another.value.prc * this.sizes.domWidth) / 100
        };
        sizes = setPosition(another_label, sizes2, another.value.prc);
      }

      this.redrawLimits();
    };

    Slider.prototype.redrawLimits = function() {
      if (this.settings.limits) {

        var limits = [true, true];

        for(var key in this.o.pointers){

          if(!this.settings.single || key === 0){

            var pointer = this.o.pointers[key];
            var label = this.o.labels[pointer.uid];
            var label_left = label.o[0].offsetLeft - this.sizes.domOffset.left;

            var limit = this.o.limits[0];
            if(label_left < limit[0].clientWidth)
              limits[0] = false;

            limit = this.o.limits[1];
            if(label_left + label.o[0].clientWidth > this.sizes.domWidth - limit[0].clientWidth)
              limits[1] = false;
          }
        }

        for(var i=0; i < limits.length; i++){
          if(limits[i]) // TODO animate
            angular.element(this.o.limits[i]).addClass("animate-show");          
          else
            angular.element(this.o.limits[i]).addClass("animate-hidde");          
        }
      }
    };

    Slider.prototype.setValue = function(){
      var value = this.getValue();
      this.inputNode.attr("value", value);
      this.onstatechange.call(this, value, this.inputNode);
    };

    Slider.prototype.getValue = function(){
      if(!this.is.init) return false;
      var $this = this;

      var value = "";
      angular.forEach(this.o.pointers, function(pointer, key){
        if(pointer.value.prc !== undefined && !isNaN(pointer.value.prc)) 
          value += (key > 0 ? ";" : "") + $this.prcToValue(pointer.value.prc);
      });
      return value;
    };

    Slider.prototype.getPrcValue = function(){
      if(!this.is.init) return false;
      var $this = this;

      var value = "";
      // TODO remove jquery and see if % value is nice feature
      /*$.each(this.o.pointers, function(i){
        if(this.value.prc !== undefined && !isNaN(this.value.prc)) value += (i > 0 ? ";" : "") + this.value.prc;
      });*/
      return value;
    };

    Slider.prototype.prcToValue = function(prc){
      var value;
      if (this.settings.heterogeneity && this.settings.heterogeneity.length > 0){
        var h = this.settings.heterogeneity;

        var _start = 0;
        var _from = this.settings.from;

        for (var i=0; i <= h.length; i++){
          var v;
          if( h[i]) 
            v = h[i].split("/");
          else
            v = [100, this.settings.to];        

          if (prc >= _start && prc <= v[0]) {
            value = _from + ((prc-_start) * (v[1]-_from)) / (v[0]-_start);
          }

          _start = v[0];
          _from = v[1];
        }
      } 
      else {
        value = this.settings.from + (prc * this.settings.interval) / 100;
      }   

      return this.round(value);
    };

    Slider.prototype.valueToPrc = function(value, pointer){
      var prc;
      if (this.settings.heterogeneity && this.settings.heterogeneity.length > 0){
        var h = this.settings.heterogeneity;

        var _start = 0;
        var _from = this.settings.from;

        for (var i=0; i <= h.length; i++) {
          var v;
          if(h[i])
            v = h[i].split("/");
          else
            v = [100, this.settings.to];        

          if(value >= _from && value <= v[1]){
            prc = pointer.limits(_start + (value-_from)*(v[0]-_start)/(v[1]-_from));
          }

          _start = v[0]; _from = v[1];
        }

      } else {
        prc = pointer.limits((value-this.settings.from)*100/this.settings.interval);
      }

      return prc;
    };

    Slider.prototype.round = function(value){
      value = Math.round(value / this.settings.step) * this.settings.step;

      if(this.settings.round) 
        value = Math.round(value * Math.pow(10, this.settings.round)) / Math.pow(10, this.settings.round);
      else 
        value = Math.round(value);
      return value;
    };

    return Slider;

  }]);
}(angular));
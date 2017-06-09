define(["utils/utils"],function(a){var b=Backbone.View.extend({optionsDefault:{with_close:!0,title:null,placement:"top",container:"body",body:null},initialize:function(b){this.setElement(this._template()),this.uid=a.uid(),this.options=_.defaults(b||{},this.optionsDefault),this.options.container.parent().append(this.el),this.$title=this.$(".popover-title-label"),this.$close=this.$(".popover-close"),this.$body=this.$(".popover-content"),this.options.body&&this.append(this.options.body);var c=this;$("body").on("mousedown."+this.uid,function(a){c.visible&&!$(c.options.container).is(a.target)&&!$(c.el).is(a.target)&&0===$(c.el).has(a.target).length&&c.hide()})},render:function(){this.$title.html(this.options.title),this.$el.removeClass().addClass("ui-popover popover fade in").addClass(this.options.placement),this.$el.css(this._get_placement(this.options.placement));var a=this;this.options.with_close?this.$close.on("click",function(){a.hide()}).show():this.$close.off().hide()},title:function(a){void 0!==a&&(this.options.title=a,this.$title.html(a))},show:function(){this.render(),this.$el.show(),this.visible=!0},hide:function(){this.$el.hide(),this.visible=!1},append:function(a){this.$body.append(a)},empty:function(){this.$body.empty()},remove:function(){$("body").off("mousedown."+this.uid),this.$el.remove()},_get_placement:function(a){var b=this._get_width(this.$el),c=this.$el.height(),d=this.options.container,e=this._get_width(d),f=this._get_height(d),g=d.position(),h=left=0;if(-1!=["top","bottom"].indexOf(a))switch(left=g.left-b+(e+b)/2,a){case"top":h=g.top-c-5;break;case"bottom":h=g.top+f+5}else switch(h=g.top-c+(f+c)/2,a){case"right":left=g.left+e}return{top:h,left:left}},_get_width:function(a){return a.width()+parseInt(a.css("padding-left"))+parseInt(a.css("margin-left"))+parseInt(a.css("padding-right"))+parseInt(a.css("margin-right"))},_get_height:function(a){return a.height()+parseInt(a.css("padding-top"))+parseInt(a.css("padding-bottom"))},_template:function(){return'<div class="ui-popover popover fade in"><div class="arrow"/><div class="popover-title"><div class="popover-title-label"/><div class="popover-close fa fa-times-circle"/></div><div class="popover-content"/></div>'}});return{View:b}});
//# sourceMappingURL=../../../maps/mvc/ui/ui-popover.js.map
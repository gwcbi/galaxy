define(["utils/utils","mvc/ui/ui-options"],function(a,b){var c=b.BaseIcons.extend({initialize:function(a){a.type=a.display||"checkbox",a.multiple="checkbox"==a.type,b.BaseIcons.prototype.initialize.call(this,a)},_setValue:function(a){if(b.BaseIcons.prototype._setValue.call(this,a),void 0!==a&&null!==a&&this.header_index){var c=this,d=$.isArray(a)?a:[a];_.each(d,function(a){var b=c.header_index[a];_.each(b,function(a){c._setState(a,!0)})})}},_setState:function(a,b){var c=this.$(".button-"+a),d=this.$(".subgroup-"+a);c.data("is_expanded",b),b?(d.show(),c.removeClass("fa-plus-square").addClass("fa-minus-square")):(d.hide(),c.removeClass("fa-minus-square").addClass("fa-plus-square"))},_templateOptions:function(){function b(a,b){var c=a.find(".button-"+b);c.on("click",function(){d._setState(b,!c.data("is_expanded"))})}function c(e,f,g){g=g||[];for(i in f){var h=f[i],j=h.options&&h.options.length>0,k=g.slice(0);d.header_index[h.value]=k.slice(0);var l=$("<div/>");if(j){var m=a.uid(),n=$("<span/>").addClass("button-"+m).addClass("ui-drilldown-button fa fa-plus-square"),o=$("<div/>").addClass("subgroup-"+m).addClass("ui-drilldown-subgroup");l.append($("<div/>").append(n).append(d._templateOption({label:h.name,value:h.value}))),k.push(m),c(o,h.options,k),l.append(o),b(l,m)}else l.append(d._templateOption({label:h.name,value:h.value}));e.append(l)}}var d=this;this.header_index={};var e=$("<div/>");return c(e,this.model.get("data")),e},_template:function(){return $("<div/>").addClass("ui-options-list drilldown-container").attr("id",this.model.id)}});return{View:c}});
//# sourceMappingURL=../../../maps/mvc/ui/ui-drilldown.js.map
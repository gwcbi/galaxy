define(["utils/utils","mvc/ui/ui-buttons"],function(a,b){var c=Backbone.View.extend({initialize:function(b){var c=this;this.model=b&&b.model||new Backbone.Model({visible:!0,data:[],id:a.uid(),error_text:"No options available.",wait_text:"Please wait...",multiple:!1,optional:!1,onchange:function(){}}).set(b),this.listenTo(this.model,"change:value",this._changeValue,this),this.listenTo(this.model,"change:wait",this._changeWait,this),this.listenTo(this.model,"change:data",this._changeData,this),this.listenTo(this.model,"change:visible",this._changeVisible,this),this.on("change",function(){c.model.get("onchange")(c.value())}),this.render()},render:function(){var a=this;this.$el.empty().removeClass().addClass("ui-options").append(this.$message=$("<div/>")).append(this.$menu=$("<div/>").addClass("ui-options-menu")).append(this.$options=$(this._template())),this.all_button=null,this.model.get("multiple")&&(this.all_button=new b.ButtonCheck({onclick:function(){a.$("input").prop("checked",0!==a.all_button.value()),a.value(a._getValue()),a.trigger("change")}}),this.$menu.append(this.all_button.$el)),this._changeData(),this._changeWait(),this._changeVisible()},update:function(a){this.model.set("data",a)},_changeData:function(){var a=this;this.$options.empty(),this._templateOptions?this.$options.append(this._templateOptions(this.model.get("data"))):_.each(this.model.get("data"),function(b){a.$options.append($(a._templateOption(b)).addClass("ui-option").tooltip({title:b.tooltip,placement:"bottom"}))});var a=this;this.$("input").on("change",function(){a.value(a._getValue()),a.trigger("change")}),this._changeValue(),this._changeWait()},_changeVisible:function(){this.$el[this.model.get("visible")?"show":"hide"]()},_changeWait:function(){this.model.get("wait")?0===this.length()&&(this._messageShow(this.model.get("wait_text"),"info"),this.$options.hide(),this.$menu.hide()):0===this.length()?(this._messageShow(this.model.get("error_text"),"danger"),this.$options.hide(),this.$menu.hide()):(this.$message.hide(),this.$options.css("display","inline-block"),this.$menu.show())},_changeValue:function(){this._setValue(this.model.get("value")),null!==this._getValue()||this.model.get("multiple")||this.model.get("optional")||this._setValue(this.first()),this.all_button&&this.all_button.value($.isArray(this._getValue())?this._getValue().length:0,this.length())},value:function(a){return void 0!==a&&this.model.set("value",a),this._getValue()},first:function(){var a=this.$("input").first();return a.length>0?a.val():null},wait:function(){this.model.set("wait",!0)},unwait:function(){this.model.set("wait",!1)},length:function(){return this.$(".ui-option").length},_setValue:function(a){var b=this;if(void 0!==a&&(this.$("input").prop("checked",!1),null!==a)){var c=$.isArray(a)?a:[a];_.each(c,function(a){b.$('input[value="'+a+'"]').first().prop("checked",!0)})}},_getValue:function(){var b=[];return this.$(":checked").each(function(){b.push($(this).val())}),a.isEmpty(b)?null:this.model.get("multiple")?b:b[0]},_messageShow:function(a,b){this.$message.show().removeClass().addClass("ui-message alert alert-"+b).html(a)},_template:function(){return $("<div/>").addClass("ui-options-list")}}),d=c.extend({_templateOption:function(b){var c=a.uid();return $("<div/>").addClass("ui-option").append($("<input/>").attr({id:c,type:this.model.get("type"),name:this.model.id,value:b.value})).append($("<label/>").addClass("ui-options-label").attr("for",c).html(b.label))}}),e={};e.View=d.extend({initialize:function(a){a.type="radio",d.prototype.initialize.call(this,a)}});var f={};f.View=d.extend({initialize:function(a){a.type="checkbox",a.multiple=!0,d.prototype.initialize.call(this,a)}});var g={};return g.View=c.extend({initialize:function(a){c.prototype.initialize.call(this,a)},_setValue:function(a){void 0!==a&&(this.$("input").prop("checked",!1),this.$("label").removeClass("active"),this.$('[value="'+a+'"]').prop("checked",!0).closest("label").addClass("active"))},_templateOption:function(a){var b=$("<label/>").addClass("btn btn-default");return a.icon&&b.append($("<i/>").addClass("fa").addClass(a.icon).addClass(!a.label&&"no-padding")),b.append($("<input/>").attr({type:"radio",name:this.model.id,value:a.value})),a.label&&b.append(a.label),b},_template:function(){return $("<div/>").addClass("btn-group ui-radiobutton").attr("data-toggle","buttons")}}),{Base:c,BaseIcons:d,Radio:e,RadioButton:g,Checkbox:f}});
//# sourceMappingURL=../../../maps/mvc/ui/ui-options.js.map
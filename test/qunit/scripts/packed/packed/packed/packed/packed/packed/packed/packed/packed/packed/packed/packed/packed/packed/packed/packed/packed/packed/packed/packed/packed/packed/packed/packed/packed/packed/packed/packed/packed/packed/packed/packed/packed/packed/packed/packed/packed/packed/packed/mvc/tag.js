define(["mvc/base-mvc","utils/localization"],function(a,b){var c=Backbone.View.extend(a.LoggableMixin).extend(a.HiddenUntilActivatedViewMixin).extend({tagName:"div",className:"tags-display",initialize:function(a){this.label=a.usePrompt===!1?"":'<label class="prompt">'+b("Tags")+"</label>",this.hiddenUntilActivated(a.$activator,a)},render:function(){var a=this;return this.$el.html(this._template()),this.$input().select2({placeholder:"Add tags",width:"100%",tags:function(){return a._getTagsUsed()}}),this._setUpBehaviors(),this},_template:function(){return[this.label,'<input class="tags-input" value="',this.tagsToCSV(),'" />'].join("")},tagsToCSV:function(){var a=this.model.get("tags");return!_.isArray(a)||_.isEmpty(a)?"":a.map(function(a){return _.escape(a)}).sort().join(",")},$input:function(){return this.$el.find("input.tags-input")},_getTagsUsed:function(){return Galaxy.user.get("tags_used")},_setUpBehaviors:function(){var a=this;this.$input().on("change",function(b){a.model.save({tags:b.val}),b.added&&a._addNewTagToTagsUsed(b.added.text+"")})},_addNewTagToTagsUsed:function(a){var b=Galaxy.user.get("tags_used");_.contains(b,a)||(b.push(a),b.sort(),Galaxy.user.set("tags_used",b))},remove:function(){this.$input.off(),this.stopListening(this.model),Backbone.View.prototype.remove.call(this)},toString:function(){return["TagsEditor(",this.model+"",")"].join("")}});return{TagsEditor:c}});
//# sourceMappingURL=../../maps/mvc/tag.js.map
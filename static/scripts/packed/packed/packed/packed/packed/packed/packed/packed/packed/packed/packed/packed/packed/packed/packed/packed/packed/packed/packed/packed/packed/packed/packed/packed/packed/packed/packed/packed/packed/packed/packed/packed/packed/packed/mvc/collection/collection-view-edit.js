define(["mvc/collection/collection-view","mvc/collection/collection-model","mvc/collection/collection-li-edit","mvc/base-mvc","mvc/tag","ui/fa-icon-button","utils/localization","ui/editable-text"],function(a,b,c,d,e,f,g){"use strict";var h=a.CollectionView,i=h.extend({DatasetDCEViewClass:c.DatasetDCEListItemEdit,NestedDCDCEViewClass:c.NestedDCDCEListItemEdit,initialize:function(a){h.prototype.initialize.call(this,a)},_setUpBehaviors:function(a){if(a=a||this.$el,h.prototype._setUpBehaviors.call(this,a),this.model&&Galaxy.user&&!Galaxy.user.isAnonymous()){this.tagsEditorShown=!0;var b=this,c="> .controls .name";a.find(c).attr("title",g("Click to rename collection")).tooltip({placement:"bottom"}).make_text_editable({on_finish:function(a){var d=b.model.get("name");a&&a!==d?(b.$el.find(c).text(a),b.model.save({name:a}).fail(function(){b.$el.find(c).text(b.model.previous("name"))})):b.$el.find(c).text(d)}}),this.tagsEditor=new e.TagsEditor({model:this.model,el:a.find(".tags-display"),onshowFirstTime:function(){this.render()},usePrompt:!1}),this.tagsEditor.toggle(!0)}},toString:function(){return"CollectionViewEdit("+(this.model?this.model.get("name"):"")+")"}}),j=i.extend({DatasetDCEViewClass:c.DatasetDCEListItemEdit,toString:function(){return"ListCollectionViewEdit("+(this.model?this.model.get("name"):"")+")"}}),k=j.extend({toString:function(){return"PairCollectionViewEdit("+(this.model?this.model.get("name"):"")+")"}}),l=k.extend({_setUpBehaviors:function(a){h.prototype._setUpBehaviors.call(this,a)},toString:function(){return"NestedPairCollectionViewEdit("+(this.model?this.model.get("name"):"")+")"}}),m=i.extend({NestedDCDCEViewClass:c.NestedDCDCEListItemEdit.extend({foldoutPanelClass:l}),toString:function(){return"ListOfPairsCollectionViewEdit("+(this.model?this.model.get("name"):"")+")"}}),n=i.extend({NestedDCDCEViewClass:c.NestedDCDCEListItemEdit.extend({foldoutPanelClass:l}),toString:function(){return"ListOfListsCollectionViewEdit("+(this.model?this.model.get("name"):"")+")"}});return{CollectionViewEdit:i,ListCollectionViewEdit:j,PairCollectionViewEdit:k,ListOfPairsCollectionViewEdit:m,ListOfListsCollectionViewEdit:n}});
//# sourceMappingURL=../../../maps/mvc/collection/collection-view-edit.js.map
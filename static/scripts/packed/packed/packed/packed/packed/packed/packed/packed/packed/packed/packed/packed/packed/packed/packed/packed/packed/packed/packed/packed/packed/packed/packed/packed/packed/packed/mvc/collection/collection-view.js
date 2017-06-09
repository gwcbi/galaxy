define(["mvc/list/list-view","mvc/collection/collection-model","mvc/collection/collection-li","mvc/base-mvc","utils/localization"],function(a,b,c,d,e){"use strict";var f="collections",g=a.ModelListPanel,h=g.extend({_logNamespace:f,className:g.prototype.className+" dataset-collection-panel",DatasetDCEViewClass:c.DatasetDCEListItemView,NestedDCDCEViewClass:c.NestedDCDCEListItemView,modelCollectionKey:"elements",initialize:function(a){g.prototype.initialize.call(this,a),this.linkTarget=a.linkTarget||"_blank",this.hasUser=a.hasUser,this.panelStack=[],this.parentName=a.parentName,this.foldoutStyle=a.foldoutStyle||"foldout"},_queueNewRender:function(a,b){b=void 0===b?this.fxSpeed:b;var c=this;c.log("_queueNewRender:",a,b),c._swapNewRender(a),c.trigger("rendered",c)},_filterCollection:function(){return this.model.getVisibleContents()},_getItemViewClass:function(a){switch(a.get("element_type")){case"hda":return this.DatasetDCEViewClass;case"dataset_collection":return this.NestedDCDCEViewClass}throw new TypeError("Unknown element type:",a.get("element_type"))},_getItemViewOptions:function(a){var b=g.prototype._getItemViewOptions.call(this,a);return _.extend(b,{linkTarget:this.linkTarget,hasUser:this.hasUser,foldoutStyle:this.foldoutStyle})},_setUpItemViewListeners:function(a){var b=this;return g.prototype._setUpItemViewListeners.call(b,a),b.listenTo(a,{"expanded:drilldown":function(a,b){this._expandDrilldownPanel(b)},"collapsed:drilldown":function(a,b){this._collapseDrilldownPanel(b)}}),this},_expandDrilldownPanel:function(a){this.panelStack.push(a),this.$("> .controls").add(this.$list()).hide(),a.parentName=this.model.get("name"),this.$el.append(a.render().$el)},_collapseDrilldownPanel:function(){this.panelStack.pop(),this.render()},events:{"click .navigation .back":"close"},close:function(){this.remove(),this.trigger("close")},toString:function(){return"CollectionView("+(this.model?this.model.get("name"):"")+")"}});h.prototype.templates=function(){var a=d.wrapTemplate(['<div class="controls">','<div class="navigation">','<a class="back" href="javascript:void(0)">','<span class="fa fa-icon fa-angle-left"></span>',e("Back to "),"<%- view.parentName %>","</a>","</div>",'<div class="title">','<div class="name"><%- collection.name || collection.element_identifier %></div>','<div class="subtitle">','<% if( collection.collection_type === "list" ){ %>',e("a list of datasets"),'<% } else if( collection.collection_type === "paired" ){ %>',e("a pair of datasets"),'<% } else if( collection.collection_type === "list:paired" ){ %>',e("a list of paired datasets"),'<% } else if( collection.collection_type === "list:list" ){ %>',e("a list of dataset lists"),"<% } %>","</div>","</div>",'<div class="tags-display"></div>',"</div>"],"collection");return _.extend(_.clone(g.prototype.templates),{controls:a})}();var i=h.extend({DatasetDCEViewClass:c.DatasetDCEListItemView,toString:function(){return"ListCollectionView("+(this.model?this.model.get("name"):"")+")"}}),j=i.extend({toString:function(){return"PairCollectionView("+(this.model?this.model.get("name"):"")+")"}}),k=h.extend({NestedDCDCEViewClass:c.NestedDCDCEListItemView.extend({foldoutPanelClass:j}),toString:function(){return"ListOfPairsCollectionView("+(this.model?this.model.get("name"):"")+")"}}),l=h.extend({NestedDCDCEViewClass:c.NestedDCDCEListItemView.extend({foldoutPanelClass:j}),toString:function(){return"ListOfListsCollectionView("+(this.model?this.model.get("name"):"")+")"}});return{CollectionView:h,ListCollectionView:i,PairCollectionView:j,ListOfPairsCollectionView:k,ListOfListsCollectionView:l}});
//# sourceMappingURL=../../../maps/mvc/collection/collection-view.js.map
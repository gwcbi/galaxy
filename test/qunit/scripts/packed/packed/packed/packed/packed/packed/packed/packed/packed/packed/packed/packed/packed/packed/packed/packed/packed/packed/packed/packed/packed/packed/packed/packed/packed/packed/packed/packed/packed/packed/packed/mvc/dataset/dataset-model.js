define(["mvc/dataset/states","mvc/base-mvc","utils/localization"],function(a,b,c){"use strict";var d="dataset",e=b.SearchableModelMixin,f=Backbone.Model.extend(b.LoggableMixin).extend(b.mixin(e,{_logNamespace:d,defaults:{state:a.NEW,deleted:!1,purged:!1,name:"(unnamed dataset)",accessible:!0,data_type:"",file_ext:"",file_size:0,meta_files:[],misc_blurb:"",misc_info:"",tags:[]},initialize:function(b,c){this.debug(this+"(Dataset).initialize",b,c),this.get("accessible")||this.set("state",a.NOT_VIEWABLE),this.urls=this._generateUrls(),this._setUpListeners()},_generateUrls:function(){var a=this.get("id");if(!a)return{};var b={purge:"datasets/"+a+"/purge_async",display:"datasets/"+a+"/display/?preview=True",edit:"datasets/"+a+"/edit",download:"datasets/"+a+"/display?to_ext="+this.get("file_ext"),report_error:"dataset/errors?id="+a,rerun:"tool_runner/rerun?id="+a,show_params:"datasets/"+a+"/show_params",visualization:"visualization",meta_download:"dataset/get_metadata_file?hda_id="+a+"&metadata_name="};return _.each(b,function(a,c){b[c]=Galaxy.root+a}),this.urls=b,b},_setUpListeners:function(){this.on("change:state",function(a,b){this.log(this+" has changed state:",a,b),this.inReadyState()&&this.trigger("state:ready",a,b,this.previous("state"))}),this.on("change:id change:file_ext",function(){this._generateUrls()})},toJSON:function(){var a=Backbone.Model.prototype.toJSON.call(this);return _.extend(a,{urls:this.urls})},isDeletedOrPurged:function(){return this.get("deleted")||this.get("purged")},inReadyState:function(){var b=_.contains(a.READY_STATES,this.get("state"));return this.isDeletedOrPurged()||b},hasDetails:function(){return this.get("accessible")?this.has("annotation"):!0},hasData:function(){return this.get("file_size")>0},fetch:function(a){var b=this;return Backbone.Model.prototype.fetch.call(this,a).always(function(){b._generateUrls()})},parse:function(a,b){var c=Backbone.Model.prototype.parse.call(this,a,b);return c.create_time&&(c.create_time=new Date(c.create_time)),c.update_time&&(c.update_time=new Date(c.update_time)),c},save:function(a,b){return b=b||{},b.wait=_.isUndefined(b.wait)?!0:b.wait,Backbone.Model.prototype.save.call(this,a,b)},"delete":function(a){return this.get("deleted")?jQuery.when():this.save({deleted:!0},a)},undelete:function(a){return!this.get("deleted")||this.get("purged")?jQuery.when():this.save({deleted:!1},a)},purge:function(a){if(this.get("purged"))return jQuery.when();a=a||{},a.url=this.urls.purge;var b=this,d=jQuery.ajax(a);return d.done(function(){b.set({deleted:!0,purged:!0})}),d.fail(function(d){var e=c("Unable to purge dataset"),f="Removal of datasets by users is not allowed in this Galaxy instance";d.responseJSON&&d.responseJSON.error?e=d.responseJSON.error:-1!==d.responseText.indexOf(f)&&(e=f),d.responseText=e,b.trigger("error",b,d,a,c(e),{error:e})}),d},searchAttributes:["name","file_ext","genome_build","misc_blurb","misc_info","annotation","tags"],searchAliases:{title:"name",format:"file_ext",database:"genome_build",blurb:"misc_blurb",description:"misc_blurb",info:"misc_info",tag:"tags"},toString:function(){var a=this.get("id")||"";return this.get("name")&&(a='"'+this.get("name")+'",'+a),"Dataset("+a+")"}})),g=Backbone.Collection.extend(b.LoggableMixin).extend({_logNamespace:d,model:f,urlRoot:Galaxy.root+"api/datasets",url:function(){return this.urlRoot},ids:function(){return this.map(function(a){return a.get("id")})},notReady:function(){return this.filter(function(a){return!a.inReadyState()})},haveDetails:function(){return this.all(function(a){return a.hasDetails()})},ajaxQueue:function(a,b){var c=jQuery.Deferred(),d=this.length,e=[];if(!d)return c.resolve([]),c;var f=this.chain().reverse().map(function(g,h){return function(){var i=a.call(g,b);i.done(function(a){c.notify({curr:h,total:d,response:a,model:g})}),i.always(function(a){e.push(a),f.length?f.shift()():c.resolve(e)})}}).value();return f.shift()(),c},matches:function(a){return this.filter(function(b){return b.matches(a)})},toString:function(){return["DatasetAssociationCollection(",this.length,")"].join("")}});return{DatasetAssociation:f,DatasetAssociationCollection:g}});
//# sourceMappingURL=../../../maps/mvc/dataset/dataset-model.js.map
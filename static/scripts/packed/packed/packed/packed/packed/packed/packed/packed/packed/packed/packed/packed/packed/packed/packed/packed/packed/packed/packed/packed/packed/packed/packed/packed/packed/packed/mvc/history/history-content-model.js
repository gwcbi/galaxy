define(["mvc/dataset/states","mvc/base-mvc","utils/localization"],function(){"use strict";var a={defaults:{history_id:null,history_content_type:null,hid:null,visible:!0},idAttribute:"type_id",hidden:function(){return!this.get("visible")},isVisible:function(a,b){var c=!0;return a||!this.get("deleted")&&!this.get("purged")||(c=!1),b||this.get("visible")||(c=!1),c},urlRoot:Galaxy.root+"api/histories/",url:function(){var a=this.urlRoot+this.get("history_id")+"/contents/"+this.get("history_content_type")+"s/"+this.get("id");return a},hide:function(a){return this.get("visible")?this.save({visible:!1},a):jQuery.when()},unhide:function(a){return this.get("visible")?jQuery.when():this.save({visible:!0},a)},toString:function(){return[this.get("type_id"),this.get("hid"),this.get("name")].join(":")}};return{HistoryContentMixin:a}});
//# sourceMappingURL=../../../maps/mvc/history/history-content-model.js.map
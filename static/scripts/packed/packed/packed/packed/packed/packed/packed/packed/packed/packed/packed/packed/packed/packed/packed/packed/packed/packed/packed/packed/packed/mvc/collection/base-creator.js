define([],function(){var a={_validationWarning:function(a,b){var c="validation-warning";"name"===a&&(a=this.$(".collection-name").add(this.$(".collection-name-prompt")),this.$(".collection-name").focus().select()),b?(a=a||this.$("."+c),a.removeClass(c)):a.addClass(c)},_changeHideOriginals:function(){this.hideOriginals=this.$(".hide-originals").prop("checked")},_changeName:function(){this._validationWarning("name",!!this._getName())},_nameCheckForEnter:function(a){13!==a.keyCode||this.blocking||this._clickCreate()},_getName:function(){return _.escape(this.$(".collection-name").val())},_clickMoreHelp:function(a){a.stopPropagation(),this.$(".main-help").addClass("expanded"),this.$(".more-help").hide()},_clickLessHelp:function(a){a.stopPropagation(),this.$(".main-help").removeClass("expanded"),this.$(".more-help").show()},_toggleHelp:function(a){a.stopPropagation(),this.$(".main-help").toggleClass("expanded"),this.$(".more-help").toggle()},_showAlert:function(a,b){b=b||"alert-danger",this.$(".main-help").hide(),this.$(".header .alert").attr("class","alert alert-dismissable").addClass(b).show().find(".alert-message").html(a)},_hideAlert:function(){this.$(".main-help").show(),this.$(".header .alert").hide()},_cancelCreate:function(){"function"==typeof this.oncancel&&this.oncancel.call(this)},_clickCreate:function(){var a=this._getName();a?this.blocking||this.createList(a):this._validationWarning("name")},_setUpCommonSettings:function(a){this.hideOriginals=a.defaultHideSourceItems||!1},_renderFooter:function(){var a=this,b=this.$(".footer").empty().html(this.templates.footer());return _.each(this.footerSettings,function(b,c){this.$(c).prop("checked",a[b])}),"function"==typeof this.oncancel&&this.$(".cancel-create.btn").show(),b},_creatorTemplates:{main:_.template(['<div class="header flex-row no-flex"></div>','<div class="middle flex-row flex-row-container"></div>','<div class="footer flex-row no-flex"></div>'].join(""))}};return{CollectionCreatorMixin:a}});
//# sourceMappingURL=../../../maps/mvc/collection/base-creator.js.map
!function(a){a([],function(){var a=jQuery;return function(){function b(a,b,c){return j({type:r.error,iconClass:l().iconClasses.error,message:a,optionsOverride:c,title:b})}function c(a,b,c){return j({type:r.info,iconClass:l().iconClasses.info,message:a,optionsOverride:c,title:b})}function d(a){o=a}function e(a,b,c){return j({type:r.success,iconClass:l().iconClasses.success,message:a,optionsOverride:c,title:b})}function f(a,b,c){return j({type:r.warning,iconClass:l().iconClasses.warning,message:a,optionsOverride:c,title:b})}function g(b){var c=l();return n||k(c),b&&0===a(":focus",b).length?void b[c.hideMethod]({duration:c.hideDuration,easing:c.hideEasing,complete:function(){m(b)}}):void(n.children().length&&n[c.hideMethod]({duration:c.hideDuration,easing:c.hideEasing,complete:function(){n.remove()}}))}function h(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",target:"body",closeHtml:"<button>&times;</button>",newestOnTop:!0}}function i(a){o&&o(a)}function j(b){function c(b){return!a(":focus",j).length||b?j[f.hideMethod]({duration:f.hideDuration,easing:f.hideEasing,complete:function(){m(j),f.onHidden&&f.onHidden(),s.state="hidden",s.endTime=new Date,i(s)}}):void 0}function d(){(f.timeOut>0||f.extendedTimeOut>0)&&(h=setTimeout(c,f.extendedTimeOut))}function e(){clearTimeout(h),j.stop(!0,!0)[f.showMethod]({duration:f.showDuration,easing:f.showEasing})}var f=l(),g=b.iconClass||f.iconClass;"undefined"!=typeof b.optionsOverride&&(f=a.extend(f,b.optionsOverride),g=b.optionsOverride.iconClass||g),q++,n=k(f);var h=null,j=a("<div/>"),o=a("<div/>"),p=a("<div/>"),r=a(f.closeHtml),s={toastId:q,state:"visible",startTime:new Date,options:f,map:b};return b.iconClass&&j.addClass(f.toastClass).addClass(g),b.title&&(o.append(b.title).addClass(f.titleClass),j.append(o)),b.message&&(p.append(b.message).addClass(f.messageClass),j.append(p)),f.closeButton&&(r.addClass("toast-close-button"),j.prepend(r)),j.hide(),f.newestOnTop?n.prepend(j):n.append(j),j[f.showMethod]({duration:f.showDuration,easing:f.showEasing,complete:f.onShown}),f.timeOut>0&&(h=setTimeout(c,f.timeOut)),j.hover(e,d),!f.onclick&&f.tapToDismiss&&j.click(c),f.closeButton&&r&&r.click(function(a){a.stopPropagation(),c(!0)}),f.onclick&&j.click(function(){f.onclick(),c()}),i(s),f.debug&&console&&console.log(s),j}function k(b){return b||(b=l()),n=a("#"+b.containerId),n.length?n:(n=a("<div/>").attr("id",b.containerId).addClass(b.positionClass),n.appendTo(a(b.target)),n)}function l(){return a.extend({},h(),s.options)}function m(a){n||(n=k()),a.is(":visible")||(a.remove(),a=null,0===n.children().length&&n.remove())}var n,o,p="2.0.1",q=0,r={error:"error",info:"info",success:"success",warning:"warning"},s={clear:g,error:b,getContainer:k,info:c,options:{},subscribe:d,success:e,version:p,warning:f};return s}()})}("function"==typeof define&&define.amd?define:function(a,b){"undefined"!=typeof module&&module.exports?module.exports=b(require(a[0])):window.toastr=b(window.jQuery)});
//# sourceMappingURL=../../maps/libs/toastr.js.map
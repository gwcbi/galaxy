!function(){$.jQTouch=function(a){function b(a){void 0!==window.console&&F.debug===!0&&console.warn(a)}function c(a){"string"==typeof a.selector&&"string"==typeof a.name&&O.push(a)}function d(a){"string"==typeof a.name&&"function"==typeof a.isSupported&&"function"==typeof a.fn&&N.push(a)}function e(a,b){D.unshift({page:a,animation:b,hash:"#"+a.attr("id"),id:a.attr("id")})}function f(a){var c=$(a.target);c.is(I.join(", "))||(c=$(a.target).closest(I.join(", "))),c&&c.attr("href")&&!c.isExternalLink()?(b("Need to prevent default click behavior."),a.preventDefault()):b("No need to prevent default click behavior."),$.support.touch?b("Not converting click to a tap event because touch handler is on the job."):(b("Converting click event to a tap event because touch handlers are not present or off."),$(a.target).trigger("tap",a))}function g(a,c,d,f){function g(){var b=K;$.support.animationEvents&&d&&F.useAnimations?(a.unbind("webkitAnimationEnd",g),a.removeClass(i+" out inmotion"),i&&c.removeClass(i),B.removeClass("animating animating3d"),F.trackScrollPositions===!0&&(c.css("top",-c.data("lastScroll")),setTimeout(function(){c.css("top",0),window.scroll(0,c.data("lastScroll")),$(".scroll",c).each(function(){this.scrollTop=-$(this).data("lastScroll")})},0))):(a.removeClass(i+" out inmotion"),i&&c.removeClass(i),b+=260),setTimeout(function(){c.removeClass("in"),window.scroll(0,0)},b),a.unselect(),c.trigger("pageAnimationEnd",{direction:"in",animation:d,back:f}),a.trigger("pageAnimationEnd",{direction:"out",animation:d,back:f})}if(f=f?f:!1,void 0===c||0===c.length)return $.fn.unselect(),b("Target element is missing."),!1;if(c.hasClass("current"))return $.fn.unselect(),b("You are already on the page you are trying to navigate to."),!1;if($(":focus").trigger("blur"),a.trigger("pageAnimationStart",{direction:"out",back:f}),c.trigger("pageAnimationStart",{direction:"in",back:f}),$.support.animationEvents&&d&&F.useAnimations){!$.support.transform3d&&d.is3d&&(b("Did not detect support for 3d animations, falling back to "+F.defaultAnimation+"."),d.name=F.defaultAnimation);var i=d.name,j=d.is3d?"animating3d":"";f&&(i=i.replace(/left|right|up|down|in|out/,h)),b("finalAnimationName is "+i+"."),a.bind("webkitAnimationEnd",g),B.addClass("animating "+j);var k=window.pageYOffset;F.trackScrollPositions===!0&&c.css("top",window.pageYOffset-(c.data("lastScroll")||0)),c.addClass(i+" in current"),a.removeClass("current").addClass(i+" out inmotion"),F.trackScrollPositions===!0&&(a.data("lastScroll",k),$(".scroll",a).each(function(){$(this).data("lastScroll",this.scrollTop)}))}else c.addClass("current in"),a.removeClass("current"),g();return G=c,f?D.shift():e(G,d),r(G.attr("id")),!0}function h(a){var b={up:"down",down:"up",left:"right",right:"left","in":"out",out:"in"};return b[a]||a}function i(){return H}function j(){D.length<1&&b("History is empty."),1===D.length&&(b("You are on the first panel."),window.history.go(-1));var a=D[0],c=D[1];return g(a.page,c.page,a.animation,!0)?J:(b("Could not go back."),!1)}function k(a,c){var d=D[0].page;if("string"==typeof c)for(var e=0,f=O.length;f>e;e++)if(O[e].name===c){c=O[e];break}if("string"==typeof a){var h=$(a);if(h.length<1)return void t(a,{animation:c});a=h}return g(d,a,c)?J:(b("Could not animate pages."),!1)}function l(){return location.hash===D[0].hash?(b("We are on the right panel."),!0):""===location.hash?(j(),!0):D[1]&&location.hash===D[1].hash?(j(),!0):(b("Could not find ID in history, just forwarding to DOM element."),void k($(location.hash),F.defaultAnimation))}function m(){if(F.preloadImages)for(var a=F.preloadImages.length-1;a>=0;a--)(new Image).src=F.preloadImages[a];var b=F.addGlossToIcon?"":"-precomposed";F.icon&&(P+='<link rel="apple-touch-icon'+b+'" href="'+F.icon+'" />'),F.icon4&&(P+='<link rel="apple-touch-icon'+b+'" sizes="114x114" href="'+F.icon4+'" />'),F.startupScreen&&(P+='<link rel="apple-touch-startup-image" href="'+F.startupScreen+'" />'),F.fixedViewport&&(P+='<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>'),F.fullScreen&&(P+='<meta name="apple-mobile-web-app-capable" content="yes" />',F.statusBar&&(P+='<meta name="apple-mobile-web-app-status-bar-style" content="'+F.statusBar+'" />')),P&&C.prepend(P)}function n(){$.fn.isExternalLink=function(){var a=$(this);return"_blank"===a.attr("target")||"external"===a.attr("rel")||a.is('a[href^="http://maps.google.com"], a[href^="mailto:"], a[href^="tel:"], a[href^="javascript:"], a[href*="youtube.com/v"], a[href*="youtube.com/watch"]')},$.fn.makeActive=function(){return $(this).addClass("active")},$.fn.unselect=function(a){a?a.removeClass("active"):$(".active").removeClass("active")}}function o(a){for(var c,d=0,e=O.length;e>d;d++)if(a.is(O[d].selector)){c=O[d];break}return c||(b("Animation could not be found. Using "+F.defaultAnimation+"."),c=F.defaultAnimation),c}function p(a,b){var c=null,d=document.createElement("div");return d.innerHTML=a,$(d).children().each(function(){var a=$(this);a.attr("id")||a.attr("id","page-"+ ++E),$("#"+a.attr("id")).remove(),B.append(a),B.trigger("pageInserted",{page:a}),(a.hasClass("current")||!c)&&(c=a)}),null!==c?(k(c,b),c):!1}function q(){scrollTo(0,0),H=90===Math.abs(window.orientation)?"landscape":"portrait",B.removeClass("portrait landscape").addClass(H).trigger("turn",{orientation:H})}function r(a){F.updateHash&&(location.hash="#"+a.replace(/^#/,""))}function s(){$.support||($.support={}),$.support.animationEvents="undefined"!=typeof window.WebKitAnimationEvent,$.support.touch="undefined"!=typeof window.TouchEvent&&window.navigator.userAgent.indexOf("Mobile")>-1&&F.useFastTouch,$.support.transform3d=w(),$.support.ios5=x(),$.support.touch||b("This device does not support touch interaction, or it has been deactivated by the developer. Some features might be unavailable."),$.support.transform3d||b("This device does not support 3d animation. 2d animations will be used instead.");for(var a=0,g=L.length;g>a;a++){var h=L[a];$.isFunction(h)&&$.extend(J,h(J))}for(var i=0,j=M.length;j>i;i++)d(M[i]);A();for(var m=0,n=Q.animations.length;n>m;m++){var o=Q.animations[m];void 0!==F[o.name+"Selector"]&&(o.selector=F[o.name+"Selector"]),c(o)}I.push(F.touchSelector),I.push(F.backSelector),I.push(F.submitSelector),$(I.join(", ")).css("-webkit-touch-callout","none"),B=$("#jqt");var p=[];0===B.length&&(b('Could not find an element with the id "jqt", so the body id has been set to "jqt". If you are having any problems, wrapping your panels in a div with the id "jqt" might help.'),B=$(document.body).attr("id","jqt")),$.support.transform3d&&p.push("supports3d"),F.useTouchScroll&&p.push($.support.ios5?"touchscroll":"autoscroll"),F.fullScreenClass&&window.navigator.standalone===!0&&p.push(F.fullScreenClass,F.statusBar),B.addClass(p.join(" ")).bind("click",f).bind("orientationchange",q).bind("submit",u).bind("tap",z).bind($.support.touch?"touchstart":"mousedown",y).trigger("orientationchange"),$(window).bind("hashchange",l);var s=location.hash;G=0===$("#jqt > .current").length?$("#jqt > *:first-child").addClass("current"):$("#jqt > .current"),r(G.attr("id")),e(G),1===$(s).length&&k(s)}function t(a,b){var c={data:null,method:"GET",animation:null,callback:null,$referrer:null},d=$.extend({},c,b);"#"!==a?$.ajax({url:a,data:d.data,type:d.method,success:function(a){var b=p(a,d.animation);b&&("GET"===d.method&&F.cacheGetRequests===!0&&d.$referrer&&d.$referrer.attr("href","#"+b.attr("id")),d.callback&&d.callback(!0))},error:function(){d.$referrer&&d.$referrer.unselect(),d.callback&&d.callback(!1)}}):d.$referrer&&d.$referrer.unselect()}function u(a,b){$(":focus").trigger("blur"),a.preventDefault();var c="string"==typeof a?$(a).eq(0):$(a.target?a.target:a);return c.length&&c.is(F.formSelector)&&c.attr("action")?(t(c.attr("action"),{data:c.serialize(),method:c.attr("method")||"POST",animation:o(c),callback:b}),!1):!0}function v(a){var c=a.closest("form");return 0!==c.length?(b("About to submit parent form."),c.trigger("submit"),!1):(b("No parent form found."),!0)}function w(){var a,c,d,e,f;return a=document.getElementsByTagName("head")[0],c=document.body,d=document.createElement("style"),d.textContent="@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-webkit-transform-3d){#jqt-3dtest{height:3px}}",e=document.createElement("div"),e.id="jqt-3dtest",a.appendChild(d),c.appendChild(e),f=3===e.offsetHeight,d.parentNode.removeChild(d),e.parentNode.removeChild(e),b("Support for 3d transforms: "+f+"."),f}function x(){var a=!1,b=/OS (\d+)(_\d+)* like Mac OS X/i,c=window.navigator.userAgent;return b.test(c)&&(a=b.exec(c)[1]>=5),a}function y(a){var b=$(a.target),c=I.join(", ");b.is(c)||(b=b.closest(c)),b.length&&b.attr("href")&&b.addClass("active"),b.on($.support.touch?"touchmove":"mousemove",function(){b.removeClass("active")}),b.on("touchend",function(){b.unbind("touchmove mousemove")})}function z(a){if(a.isDefaultPrevented())return!0;var c=$(a.target);if(c.is(I.join(", "))||(c=c.closest(I.join(", "))),!c.length||!c.attr("href"))return b("Could not find a link related to tapped element."),!0;for(var d=c.attr("target"),e=c.prop("hash"),f=c.attr("href"),g={e:a,$el:c,target:d,hash:e,href:f,jQTSettings:F},h=0,i=N.length;i>h;h++){var j=N[h],k=j.isSupported(a,g);if(k){var l=j.fn(a,g);return l}}}function A(){d({name:"external-link",isSupported:function(a,b){return b.$el.isExternalLink()},fn:function(a,b){return b.$el.unselect(),!0}}),d({name:"back-selector",isSupported:function(a,b){return b.$el.is(b.jQTSettings.backSelector)},fn:function(a,b){j(b.hash)}}),d({name:"submit-selector",isSupported:function(a,b){return b.$el.is(b.jQTSettings.submitSelector)},fn:function(a,b){v(b.$el)}}),d({name:"webapp",isSupported:function(a,b){return"_webapp"===b.target},fn:function(a,b){return window.location=b.href,!1}}),d({name:"no-op",isSupported:function(a,b){return"#"===b.href},fn:function(a,b){return b.$el.unselect(),!0}}),d({name:"standard",isSupported:function(a,b){return b.hash&&"#"!==b.hash},fn:function(a,b){var c=o(b.$el);return b.$el.addClass("active"),k($(b.hash).data("referrer",b.$el),c,b.$el.hasClass("reverse")),!1}}),d({name:"external",isSupported:function(){return!0},fn:function(a,b){var c=o(b.$el);return b.$el.addClass("loading active"),t(b.$el.attr("href"),{animation:c,callback:function(){b.$el.removeClass("loading"),setTimeout($.fn.unselect,250,b.$el)},$referrer:b.$el}),!1}})}var B,C=$("head"),D=[],E=0,F={},G="",H="portrait",I=[],J={},K=100,L=$.jQTouch.prototype.extensions,M=$.jQTouch.prototype.tapHandlers,N=[],O=[],P="",Q={addGlossToIcon:!0,backSelector:".back, .cancel, .goback",cacheGetRequests:!0,debug:!0,defaultAnimation:"slideleft",fixedViewport:!0,formSelector:"form",fullScreen:!0,fullScreenClass:"fullscreen",icon:null,icon4:null,preloadImages:!1,starter:$(document).ready,startupScreen:null,statusBar:"default",submitSelector:".submit",touchSelector:"a, .touch",trackScrollPositions:!0,updateHash:!0,useAnimations:!0,useFastTouch:!0,useTouchScroll:!0,animations:[{name:"cubeleft",selector:".cubeleft, .cube",is3d:!0},{name:"cuberight",selector:".cuberight",is3d:!0},{name:"dissolve",selector:".dissolve"},{name:"fade",selector:".fade"},{name:"flipleft",selector:".flipleft, .flip",is3d:!0},{name:"flipright",selector:".flipright",is3d:!0},{name:"pop",selector:".pop",is3d:!0},{name:"swapleft",selector:".swapleft, .swap",is3d:!0},{name:"swapright",selector:".swapright",is3d:!0},{name:"slidedown",selector:".slidedown"},{name:"slideright",selector:".slideright"},{name:"slideup",selector:".slideup"},{name:"slideleft",selector:".slideleft, .slide, #jqt > * > ul li a"}]};return F=$.extend({},Q,a),m(a),n(),J={addAnimation:c,animations:O,getOrientation:i,goBack:j,insertPages:p,goTo:k,history:D,settings:F,submitForm:u},F.starter(s),J},$.jQTouch.prototype.extensions=[],$.jQTouch.prototype.tapHandlers=[],$.jQTouch.addExtension=function(a){$.jQTouch.prototype.extensions.push(a)},$.jQTouch.addTapHandler=function(a){$.jQTouch.prototype.tapHandlers.push(a)}}();
//# sourceMappingURL=../../../maps/libs/jquery/jqtouch.js.map
define(["jquery"],function(a){"use_strict";function b(a,b,d,e,f,g,h,i,j){void 0===f&&(f=30),void 0===h&&(h=4),c("#"+a).click(function(){if(!(c("#renaming-active").length>0)){var a,k=c("#"+b),l=k.text();a=g?c("<textarea></textarea>").attr({rows:h,cols:f}).text(c.trim(l)):c("<input type='text'></input>").attr({value:c.trim(l),size:f}),a.attr("id","renaming-active"),a.blur(function(){c(this).remove(),k.show(),j&&j(a)}),a.keyup(function(f){if(27===f.keyCode)c(this).trigger("blur");else if(13===f.keyCode){var g={};g[e]=c(this).val(),c(this).trigger("blur"),c.ajax({url:d,data:g,error:function(){alert("Text editing for elt "+b+" failed")},success:function(b){""!==b?k.text(b):k.html("<em>None</em>"),j&&j(a)}})}}),i&&i(a),k.hide(),a.insertAfter(k),a.focus(),a.select()}})}var c=a;return b});
//# sourceMappingURL=../../maps/utils/async-save-text.js.map
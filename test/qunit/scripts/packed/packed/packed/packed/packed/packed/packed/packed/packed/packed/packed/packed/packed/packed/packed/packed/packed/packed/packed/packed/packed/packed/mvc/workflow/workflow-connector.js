define([],function(){function a(a,b){this.canvas=null,this.dragging=!1,this.inner_color="#FFFFFF",this.outer_color="#D8B365",a&&b&&this.connect(a,b)}return $.extend(a.prototype,{connect:function(a,b){this.handle1=a,this.handle1&&this.handle1.connect(this),this.handle2=b,this.handle2&&this.handle2.connect(this)},destroy:function(){this.handle1&&this.handle1.disconnect(this),this.handle2&&this.handle2.disconnect(this),$(this.canvas).remove()},destroyIfInvalid:function(){this.handle1&&this.handle2&&!this.handle2.attachable(this.handle1)&&this.destroy()},redraw:function(){var a=$("#canvas-container");this.canvas||(this.canvas=document.createElement("canvas"),a.append($(this.canvas)),this.dragging&&(this.canvas.style.zIndex="300"));var b=function(b){return $(b).offset().left-a.offset().left},c=function(b){return $(b).offset().top-a.offset().top};if(this.handle1&&this.handle2){var d=b(this.handle1.element)+5,e=c(this.handle1.element)+5,f=b(this.handle2.element)+5,g=c(this.handle2.element)+5,h=100,i=Math.min(d,f),j=Math.max(d,f),k=Math.min(e,g),l=Math.max(e,g),m=Math.min(Math.max(Math.abs(l-k)/2,100),300),n=i-h,o=k-h,p=j-i+2*h,q=l-k+2*h;this.canvas.style.left=n+"px",this.canvas.style.top=o+"px",this.canvas.setAttribute("width",p),this.canvas.setAttribute("height",q),d-=n,e-=o,f-=n,g-=o;var r=(this.canvas.getContext("2d"),null),s=null,t=1;if(this.handle1&&this.handle1.isMappedOver()){var r=[-6,-3,0,3,6];t=5}else var r=[0];if(this.handle2&&this.handle2.isMappedOver()){var s=[-6,-3,0,3,6];t=5}else var s=[0];for(var u=this,v=0;t>v;v++){var w=5,x=7;(r.length>1||s.length>1)&&(w=1,x=3),u.draw_outlined_curve(d,e,f,g,m,w,x,r[v%r.length],s[v%s.length])}}},draw_outlined_curve:function(a,b,c,d,e,f,g,h,i){var h=h||0,i=i||0,j=this.canvas.getContext("2d");j.lineCap="round",j.strokeStyle=this.outer_color,j.lineWidth=g,j.beginPath(),j.moveTo(a,b+h),j.bezierCurveTo(a+e,b+h,c-e,d+i,c,d+i),j.stroke(),j.strokeStyle=this.inner_color,j.lineWidth=f,j.beginPath(),j.moveTo(a,b+h),j.bezierCurveTo(a+e,b+h,c-e,d+i,c,d+i),j.stroke()}}),a});
//# sourceMappingURL=../../../maps/mvc/workflow/workflow-connector.js.map
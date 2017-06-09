require(["utils/utils"],function(a){a.cssLoadFile("static/style/circster.css")}),define(["libs/underscore","libs/d3","viz/visualization","utils/config","mvc/ui/icon-button","libs/farbtastic"],function(a,b,c,d,e){var f=Backbone.Model.extend({is_visible:function(a){var b=a.getBoundingClientRect(),c=$("svg")[0].getBoundingClientRect();return b.right<0||b.left>c.right||b.bottom<0||b.top>c.bottom?!1:!0}}),g={drawTicks:function(a,b,c,d,e){var f=a.append("g").selectAll("g").data(b).enter().append("g").selectAll("g").data(c).enter().append("g").attr("class","tick").attr("transform",function(a){return"rotate("+(180*a.angle/Math.PI-90)+")translate("+a.radius+",0)"}),g=[],h=[],i=function(a){return a.angle>Math.PI?"end":null};return e?(g=[0,0,0,-4],h=[4,0,"",".35em"],i=null):(g=[1,0,4,0],h=[0,4,".35em",""]),f.append("line").attr("x1",g[0]).attr("y1",g[1]).attr("x2",g[2]).attr("y1",g[3]).style("stroke","#000"),f.append("text").attr("x",h[0]).attr("y",h[1]).attr("dx",h[2]).attr("dy",h[3]).attr("text-anchor",i).attr("transform",d).text(function(a){return a.label})},formatNum:function(a,b){if(void 0===b&&(b=2),null===a)return null;var c=null;if(Math.abs(a)<1)c=a.toPrecision(b);else{var d=Math.round(a.toPrecision(b));a=Math.abs(a),1e3>a?c=d:1e6>a?c=Math.round((d/1e3).toPrecision(3)).toFixed(0)+"K":1e9>a&&(c=Math.round((d/1e6).toPrecision(3)).toFixed(0)+"M")}return c}},h=Backbone.Model.extend({}),i=Backbone.View.extend({className:"circster",initialize:function(a){this.genome=a.genome,this.label_arc_height=50,this.scale=1,this.circular_views=null,this.chords_views=null,this.model.get("drawables").on("add",this.add_track,this),this.model.get("drawables").on("remove",this.remove_track,this);var b=this.model.get("config");b.get("arc_dataset_height").on("change:value",this.update_track_bounds,this),b.get("track_gap").on("change:value",this.update_track_bounds,this)},get_circular_tracks:function(){return this.model.get("drawables").filter(function(a){return"DiagonalHeatmapTrack"!==a.get("track_type")})},get_chord_tracks:function(){return this.model.get("drawables").filter(function(a){return"DiagonalHeatmapTrack"===a.get("track_type")})},get_tracks_bounds:function(){var c=this.get_circular_tracks(),d=this.model.get("config").get_value("arc_dataset_height"),e=this.model.get("config").get_value("track_gap"),f=Math.min(this.$el.width(),this.$el.height())-20,g=f/2-c.length*(d+e)+e-this.label_arc_height,h=b.range(g,f/2,d+e);return a.map(h,function(a){return[a,a+d]})},render:function(){var a=this,c=a.$el.width(),d=a.$el.height(),e=this.get_circular_tracks(),f=this.get_chord_tracks(),g=a.model.get("config").get_value("total_gap"),i=this.get_tracks_bounds(),j=b.select(a.$el[0]).append("svg").attr("width",c).attr("height",d).attr("pointer-events","all").append("svg:g").call(b.behavior.zoom().on("zoom",function(){var c=b.event.scale;j.attr("transform","translate("+b.event.translate+") scale("+c+")"),a.scale!==c&&(a.zoom_drag_timeout&&clearTimeout(a.zoom_drag_timeout),a.zoom_drag_timeout=setTimeout(function(){},400))})).attr("transform","translate("+c/2+","+d/2+")").append("svg:g").attr("class","tracks");this.circular_views=e.map(function(b,c){var d=new m({el:j.append("g")[0],track:b,radius_bounds:i[c],genome:a.genome,total_gap:g});return d.render(),d}),this.chords_views=f.map(function(b){var c=new n({el:j.append("g")[0],track:b,radius_bounds:i[0],genome:a.genome,total_gap:g});return c.render(),c});var l=this.circular_views[this.circular_views.length-1].radius_bounds[1],o=[l,l+this.label_arc_height];this.label_track_view=new k({el:j.append("g")[0],track:new h,radius_bounds:o,genome:a.genome,total_gap:g}),this.label_track_view.render()},add_track:function(c){var d=this.model.get("config").get_value("total_gap");if("DiagonalHeatmapTrack"===c.get("track_type")){var e=this.circular_views[0].radius_bounds,f=new n({el:b.select("g.tracks").append("g")[0],track:c,radius_bounds:e,genome:this.genome,total_gap:d});f.render(),this.chords_views.push(f)}else{var g=this.get_tracks_bounds();a.each(this.circular_views,function(a,b){a.update_radius_bounds(g[b])}),a.each(this.chords_views,function(a){a.update_radius_bounds(g[0])});var h=this.circular_views.length,i=new m({el:b.select("g.tracks").append("g")[0],track:c,radius_bounds:g[h],genome:this.genome,total_gap:d});i.render(),this.circular_views.push(i)}},remove_track:function(b,c,d){var e=this.circular_views[d.index];this.circular_views.splice(d.index,1),e.$el.remove();var f=this.get_tracks_bounds();a.each(this.circular_views,function(a,b){a.update_radius_bounds(f[b])})},update_track_bounds:function(){var b=this.get_tracks_bounds();a.each(this.circular_views,function(a,c){a.update_radius_bounds(b[c])}),a.each(this.chords_views,function(a){a.update_radius_bounds(b[0])})}}),j=Backbone.View.extend({tagName:"g",initialize:function(a){this.bg_stroke="#ddd",this.loading_bg_fill="#ffc",this.bg_fill="#ddd",this.total_gap=a.total_gap,this.track=a.track,this.radius_bounds=a.radius_bounds,this.genome=a.genome,this.chroms_layout=this._chroms_layout(),this.data_bounds=[],this.scale=1,this.parent_elt=b.select(this.$el[0])},get_fill_color:function(){var a=this.track.get("config").get_value("block_color");return a||(a=this.track.get("config").get_value("color")),a},render:function(){var a=this.parent_elt,c=this.chroms_layout,d=b.svg.arc().innerRadius(this.radius_bounds[0]).outerRadius(this.radius_bounds[1]),e=a.selectAll("g").data(c).enter().append("svg:g"),f=e.append("path").attr("d",d).attr("class","chrom-background").style("stroke",this.bg_stroke).style("fill",this.loading_bg_fill);f.append("title").text(function(a){return a.data.chrom});var g=this,h=g.track.get("data_manager"),i=h?h.data_is_ready():!0;$.when(i).then(function(){$.when(g._render_data(a)).then(function(){f.style("fill",g.bg_fill),g.render_labels()})})},render_labels:function(){},update_radius_bounds:function(a){this.radius_bounds=a;var c=b.svg.arc().innerRadius(this.radius_bounds[0]).outerRadius(this.radius_bounds[1]);this.parent_elt.selectAll("g>path.chrom-background").transition().duration(1e3).attr("d",c),this._transition_chrom_data(),this._transition_labels()},update_scale:function(c){var d=this.scale;if(this.scale=c,!(d>=c)){var e=this,g=new f;return this.parent_elt.selectAll("path.chrom-data").filter(function(){return g.is_visible(this)}).each(function(){var d,f=b.select(this),g=f.attr("chrom"),h=e.genome.get_chrom_region(g),i=e.track.get("data_manager");i.can_get_more_detailed_data(h)&&(d=e.track.get("data_manager").get_more_detailed_data(h,"Coverage",0,c),$.when(d).then(function(b){f.remove(),e._update_data_bounds();var c=a.find(e.chroms_layout,function(a){return a.data.chrom===g}),d=e.get_fill_color();e._render_chrom_data(e.parent_elt,c,b).style("stroke",d).style("fill",d)}))}),e}},_transition_chrom_data:function(){var c=this.track,d=this.chroms_layout,e=this.parent_elt.selectAll("g>path.chrom-data"),f=e[0].length;if(f>0){var g=this;$.when(c.get("data_manager").get_genome_wide_data(this.genome)).then(function(f){var h=a.reject(a.map(f,function(a,b){var c=null,e=g._get_path_function(d[b],a);return e&&(c=e(a.data)),c}),function(a){return null===a}),i=c.get("config").get_value("color");e.each(function(a,c){b.select(this).transition().duration(1e3).style("stroke",i).style("fill",i).attr("d",h[c])})})}},_transition_labels:function(){},_update_data_bounds:function(a){this.data_bounds;this.data_bounds=a||this.get_data_bounds(this.track.get("data_manager").get_genome_wide_data(this.genome)),this._transition_chrom_data()},_render_data:function(b){var c=this,d=this.chroms_layout,e=this.track,f=$.Deferred();return $.when(e.get("data_manager").get_genome_wide_data(this.genome)).then(function(g){c.data_bounds=c.get_data_bounds(g),e.get("config").set_value("min_value",c.data_bounds[0],{silent:!0}),e.get("config").set_value("max_value",c.data_bounds[1],{silent:!0}),layout_and_data=a.zip(d,g),chroms_data_layout=a.map(layout_and_data,function(a){var d=a[0],e=a[1];return c._render_chrom_data(b,d,e)});var h=c.get_fill_color();c.parent_elt.selectAll("path.chrom-data").style("stroke",h).style("fill",h),f.resolve(b)}),f},_render_chrom_data:function(){},_get_path_function:function(){},_chroms_layout:function(){var c=this.genome.get_chroms_info(),d=b.layout.pie().value(function(a){return a.len}).sort(null),e=d(c),f=2*Math.PI*this.total_gap/c.length,g=a.map(e,function(a){var b=a.endAngle-f;return a.endAngle=b>a.startAngle?b:a.startAngle,a});return g}}),k=j.extend({initialize:function(a){j.prototype.initialize.call(this,a),this.innerRadius=this.radius_bounds[0],this.radius_bounds[0]=this.radius_bounds[1],this.bg_stroke="#fff",this.bg_fill="#fff",this.min_arc_len=.05},_render_data:function(c){var d=this,e=c.selectAll("g");e.selectAll("path").attr("id",function(a){return"label-"+a.data.chrom}),e.append("svg:text").filter(function(a){return a.endAngle-a.startAngle>d.min_arc_len}).attr("text-anchor","middle").append("svg:textPath").attr("class","chrom-label").attr("xlink:href",function(a){return"#label-"+a.data.chrom}).attr("startOffset","25%").text(function(a){return a.data.chrom});var f=function(a){var c=(a.endAngle-a.startAngle)/a.value,e=b.range(0,a.value,25e6).map(function(b,e){return{radius:d.innerRadius,angle:b*c+a.startAngle,label:0===e?0:e%3?null:d.formatNum(b)}});return e.length<4&&(e[e.length-1].label=d.formatNum(Math.round((e[e.length-1].angle-a.startAngle)/c))),e},g=function(a){return a.angle>Math.PI?"rotate(180)translate(-16)":null},h=a.filter(this.chroms_layout,function(a){return a.endAngle-a.startAngle>d.min_arc_len});this.drawTicks(this.parent_elt,h,f,g)}});a.extend(k.prototype,g);var l=j.extend({initialize:function(a){j.prototype.initialize.call(this,a);var b=this.track.get("config");b.get("min_value").on("change:value",this._update_min_max,this),b.get("max_value").on("change:value",this._update_min_max,this),b.get("color").on("change:value",this._transition_chrom_data,this)},_update_min_max:function(){var a=this.track.get("config"),b=[a.get_value("min_value"),a.get_value("max_value")];this._update_data_bounds(b),this.parent_elt.selectAll(".min_max").text(function(a,c){return b[c]})},_quantile:function(a,c){return a.sort(b.ascending),b.quantile(a,c)},_render_chrom_data:function(a,b,c){var d=this._get_path_function(b,c);if(!d)return null;var e=a.datum(c.data),f=e.append("path").attr("class","chrom-data").attr("chrom",b.data.chrom).attr("d",d);return f},_get_path_function:function(a,c){if("string"==typeof c||!c.data||0===c.data.length)return null;var d=b.scale.linear().domain(this.data_bounds).range(this.radius_bounds).clamp(!0),e=b.scale.linear().domain([0,c.data.length]).range([a.startAngle,a.endAngle]),f=b.svg.line.radial().interpolate("linear").radius(function(a){return d(a[1])}).angle(function(a,b){return e(b)});return b.svg.area.radial().interpolate(f.interpolate()).innerRadius(d(0)).outerRadius(f.radius()).angle(f.angle())},render_labels:function(){var b=this,c=function(){return"rotate(90)"},e=this.drawTicks(this.parent_elt,[this.chroms_layout[0]],this._data_bounds_ticks_fn(),c,!0).classed("min_max",!0);a.each(e,function(a){$(a).click(function(){var a=new d.ConfigSettingCollectionView({collection:b.track.get("config")});a.render_in_modal("Configure Track")})})},_transition_labels:function(){if(0!==this.data_bounds.length){var b=this,c=a.filter(this.chroms_layout,function(a){return a.endAngle-a.startAngle>.08}),d=a.filter(c,function(a,b){return b%3===0}),e=a.flatten(a.map(d,function(a){return b._data_bounds_ticks_fn()(a)}));this.parent_elt.selectAll("g.tick").data(e).transition().attr("transform",function(a){return"rotate("+(180*a.angle/Math.PI-90)+")translate("+a.radius+",0)"})}},_data_bounds_ticks_fn:function(){var a=this;return visibleChroms=0,function(b){return[{radius:a.radius_bounds[0],angle:b.startAngle,label:a.formatNum(a.data_bounds[0])},{radius:a.radius_bounds[1],angle:b.startAngle,label:a.formatNum(a.data_bounds[1])}]}},get_data_bounds:function(){}});a.extend(l.prototype,g);var m=l.extend({get_data_bounds:function(b){var c=a.flatten(a.map(b,function(b){return b?a.map(b.data,function(a){return parseInt(a[1],10)||0}):0}));return[a.min(c),this._quantile(c,.98)||a.max(c)]}}),n=j.extend({render:function(){var c=this;$.when(c.track.get("data_manager").data_is_ready()).then(function(){$.when(c.track.get("data_manager").get_genome_wide_data(c.genome)).then(function(d){var e=[],f=c.genome.get_chroms_info();a.each(d,function(b,d){var g=f[d].chrom,h=a.map(b.data,function(a){var b=c._get_region_angle(g,a[1]),d=c._get_region_angle(a[3],a[4]);return{source:{startAngle:b,endAngle:b+.01},target:{startAngle:d,endAngle:d+.01}}});e=e.concat(h)}),c.parent_elt.append("g").attr("class","chord").selectAll("path").data(e).enter().append("path").style("fill",c.get_fill_color()).attr("d",b.svg.chord().radius(c.radius_bounds[0])).style("opacity",1)})})},update_radius_bounds:function(a){this.radius_bounds=a,this.parent_elt.selectAll("path").transition().attr("d",b.svg.chord().radius(this.radius_bounds[0]))},_get_region_angle:function(b,c){var d=a.find(this.chroms_layout,function(a){return a.data.chrom===b});return d.endAngle-(d.endAngle-d.startAngle)*(d.data.len-c)/d.data.len}}),o=Backbone.View.extend({initialize:function(){var a=new c.Genome(galaxy_config.app.genome),b=new c.GenomeVisualization(galaxy_config.app.viz_config);b.get("config").add([{key:"arc_dataset_height",label:"Arc Dataset Height",type:"int",value:25,view:"circster"},{key:"track_gap",label:"Gap Between Tracks",type:"int",value:5,view:"circster"},{key:"total_gap",label:"Gap [0-1]",type:"float",value:.4,view:"circster",hidden:!0}]);var f=new i({el:$("#center .unified-panel-body"),genome:a,model:b});f.render(),$("#center .unified-panel-header-inner").append(galaxy_config.app.viz_config.title+" "+galaxy_config.app.viz_config.dbkey);var g=e.create_icon_buttons_menu([{icon_class:"plus-button",title:"Add tracks",on_click:function(){c.select_datasets(Galaxy.root+"visualization/list_current_history_datasets",Galaxy.root+"api/datasets",b.get("dbkey"),function(a){b.add_tracks(a)})}},{icon_class:"gear",title:"Settings",on_click:function(){var a=new d.ConfigSettingCollectionView({collection:b.get("config")});a.render_in_modal("Configure Visualization")}},{icon_class:"disk--arrow",title:"Save",on_click:function(){Galaxy.modal.show({title:"Saving...",body:"progress"}),$.ajax({url:Galaxy.root+"visualization/save",type:"POST",dataType:"json",data:{id:b.get("vis_id"),title:b.get("title"),dbkey:b.get("dbkey"),type:"trackster",vis_json:JSON.stringify(b)}}).success(function(a){Galaxy.modal.hide(),b.set("vis_id",a.vis_id)}).error(function(){Galaxy.modal.show({title:"Could Not Save",body:"Could not save visualization. Please try again later.",buttons:{Cancel:function(){Galaxy.modal.hide()}}})})}},{icon_class:"cross-circle",title:"Close",on_click:function(){window.location=Galaxy.root+"visualization/list"}}],{tooltip_config:{placement:"bottom"}});g.$el.attr("style","float: right"),$("#center .unified-panel-header-inner").append(g.$el),$(".menu-button").tooltip({placement:"bottom"})}});return{GalaxyApp:o}});
//# sourceMappingURL=../../maps/viz/circster.js.map
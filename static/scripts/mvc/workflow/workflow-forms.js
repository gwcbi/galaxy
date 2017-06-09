define(["utils/utils","mvc/form/form-view","mvc/tool/tool-form-base"],function(a,b,c){var d=Backbone.View.extend({initialize:function(a){this.form=new b(a)}}),e=Backbone.View.extend({initialize:function(b){var d=this;this.workflow=b.workflow,this.node=b.node,this.node?(this.post_job_actions=this.node.post_job_actions||{},a.deepeach(b.inputs,function(b){b.type&&(-1!=["data","data_collection"].indexOf(b.type)?(b.type="hidden",b.info="Data input '"+b.name+"' ("+a.textify(b.extensions)+")",b.value={__class__:"RuntimeValue"}):b.fixed||(b.collapsible_value={__class__:"RuntimeValue"},b.is_workflow=b.options&&0==b.options.length||-1!=["integer","float"].indexOf(b.type)))}),a.deepeach(b.inputs,function(a){"conditional"==a.type&&(a.test_param.collapsible_value=void 0)}),this._makeSections(b),this.form=new c(a.merge(b,{text_enable:"Set in Advance",text_disable:"Set at Runtime",narrow:!0,initial_errors:!0,sustain_version:!0,cls:"ui-portlet-narrow",postchange:function(b,c){var e=c.model.attributes,f={tool_id:e.id,tool_version:e.version,type:"tool",inputs:$.extend(!0,{},c.data.create())};Galaxy.emit.debug("tool-form-workflow::postchange()","Sending current state.",f),a.request({type:"POST",url:Galaxy.root+"api/workflows/build_module",data:f,success:function(a){c.update(a.config_form),c.errors(a.config_form),d.node.update_field_data(a),Galaxy.emit.debug("tool-form-workflow::postchange()","Received new model.",a),b.resolve()},error:function(a){Galaxy.emit.debug("tool-form-workflow::postchange()","Refresh request failed.",a),b.reject()}})}}))):Galaxy.emit.debug("tool-form-workflow::initialize()","Node not found in workflow.")},_makeSections:function(a){var b=a.inputs,c=a.datatypes,d=this.node.output_terminals&&Object.keys(this.node.output_terminals)[0];if(d){b.push({name:"pja__"+d+"__EmailAction",label:"Email notification",type:"boolean",value:String(Boolean(this.post_job_actions["EmailAction"+d])),ignore:"false",help:"An email notification will be sent when the job has completed.",payload:{host:window.location.host}}),b.push({name:"pja__"+d+"__DeleteIntermediatesAction",label:"Output cleanup",type:"boolean",value:String(Boolean(this.post_job_actions["DeleteIntermediatesAction"+d])),ignore:"false",help:"Upon completion of this step, delete non-starred outputs from completed workflow steps if they are no longer required as inputs."});for(var e in this.node.output_terminals)b.push(this._makeSection(e,c))}},_makeSection:function(a,b){function c(b,e){e=e||[],e.push(b);for(var f in b.inputs){var g=b.inputs[f],h=g.action;if(h){if(g.name="pja__"+a+"__"+g.action,g.pja_arg&&(g.name+="__"+g.pja_arg),g.payload)for(var i in g.payload){var j=g.payload[i];g.payload[g.name+"__"+i]=j,delete j}var k=d.post_job_actions[g.action+a];if(k){for(var l in e)e[l].expanded=!0;g.value=g.pja_arg?k.action_arguments&&k.action_arguments[g.pja_arg]||g.value:"true"}}g.inputs&&c(g,e.slice(0))}}var d=this,e=[],f=[];for(key in b)e.push({0:b[key],1:b[key]});for(key in this.node.input_terminals)f.push(this.node.input_terminals[key].name);e.sort(function(a,b){return a.label>b.label?1:a.label<b.label?-1:0}),e.unshift({0:"Sequences",1:"Sequences"}),e.unshift({0:"Roadmaps",1:"Roadmaps"}),e.unshift({0:"Leave unchanged",1:"__empty__"});var g={title:"Configure Output: '"+a+"'",type:"section",flat:!0,inputs:[{label:"Label",type:"text",value:(output=this.node.getWorkflowOutput(a))&&output.label||"",help:"This will provide a short name to describe the output - this must be unique across workflows.",onchange:function(b){d.workflow.attemptUpdateOutputLabel(d.node,a,b)}},{action:"RenameDatasetAction",pja_arg:"newname",label:"Rename dataset",type:"text",value:"",ignore:"",help:'This action will rename the output dataset. Click <a href="https://wiki.galaxyproject.org/Learn/AdvancedWorkflow/Variables">here</a> for more information. Valid inputs are: <strong>'+f.join(", ")+"</strong>."},{action:"ChangeDatatypeAction",pja_arg:"newtype",label:"Change datatype",type:"select",ignore:"__empty__",value:"__empty__",options:e,help:"This action will change the datatype of the output to the indicated value."},{action:"TagDatasetAction",pja_arg:"tags",label:"Tags",type:"text",value:"",ignore:"",help:"This action will set tags for the dataset."},{title:"Assign columns",type:"section",flat:!0,inputs:[{action:"ColumnSetAction",pja_arg:"chromCol",label:"Chrom column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",pja_arg:"startCol",label:"Start column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",pja_arg:"endCol",label:"End column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",pja_arg:"strandCol",label:"Strand column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",pja_arg:"nameCol",label:"Name column",type:"integer",value:"",ignore:""}],help:"This action will set column assignments in the output dataset. Blank fields are ignored."}]};return c(g),g}});return{Default:d,Tool:e}});
//# sourceMappingURL=../../../maps/mvc/workflow/workflow-forms.js.map
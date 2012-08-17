/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//Global variable
var $active, $content;
var photos_arr = [];
function ChangeColor(tableRow, highlight){
    
    if (highlight)
    {
      
      //tableRow.style.backgroundColor = '#dcfac9';
      tableRow.style.backgroundColor = '#CCC';
    }
    else
    {
      tableRow.style.backgroundColor = 'white';
    }
    
}

db=$.couch.db("opendig");
var field_passed;      
var square_passed;

function create_db_doc(doc,general_info,desc_info,levels,pails,stratigraphies){
	
	//Creating a doc object
	if(!doc){
	alert('doc is null');
	doc= new Object;
	}
	//filling the general information
	doc.start_date=general_info[0];
	doc.end_date=general_info[1];
	doc.field=general_info[2];
	doc.square=general_info[3];
	doc.code=general_info[4];
	doc.locus=general_info[5];
	doc.supervisor=general_info[6];
	doc.designation=general_info[7];
	doc.reason=general_info[8];
	doc.top_separation=general_info[9];
	doc.bottom_separation=general_info[10];
	doc.stratigraphy_remarks=general_info[11];
	doc.age=general_info[12];
	doc.top_plan=general_info[13];
	doc.draw_balks=general_info[14];
	
	//filling description object
	doc.earth_description= {
		'munsel' : desc_info[0],
		'texture' : desc_info[1],
		'shape_a' : desc_info[2], 
		};
	doc.earth_description['shape_sr']=desc_info[3];
	doc.earth_description['shape_r']=desc_info[4];
	doc.earth_description['shape_as']=desc_info[5];
	doc.earth_description['hardness']=desc_info[6];
	doc.earth_description['compactness_description_1']=desc_info[7];
	doc.earth_description['compactness_description_2']=desc_info[8];
	doc.earth_description['wetness_description']=desc_info[9];
	doc.earth_description['structure']=desc_info[10];
	doc.earth_description['length']=desc_info[11];
	doc.earth_description['width']=desc_info[12];
	doc.earth_description['lower_depth']=desc_info[13];
	doc.earth_description['upper_depth']=desc_info[14];
	doc.earth_description['direction']=desc_info[15];
	doc.earth_description['slope']=desc_info[16];
	doc.earth_description['pebbles']=desc_info[17];
	doc.earth_description['cobbles']=desc_info[18];
	doc.earth_description['boulders']=desc_info[19];
	doc.earth_description['stone_distribution']=desc_info[20];
	
	//filling levels info
	var num_levels=levels.length/3;
	var counter=0;
	var temp_arr=[ ];
	doc.levels=temp_arr;
	for(var i=0;i<num_levels;i++){
		doc.levels.push(
							{'location' : levels[counter++],
							'top_level' : levels[counter++],
							'bottom_level' : levels[counter++],
			});
		}
	//filling pails info
	var num_pails=pails.length/8;
	counter=0;
	var temp_arr2=[ ];
	doc.pails=temp_arr2;
	for(var i=0;i<num_pails;i++){
		doc.pails.push(
		{'pail_date' : pails[counter++],
		'pail_number' : pails[counter++],
		'baskets' : pails[counter++],
		'diagnostic_count' : pails[counter++],
		'publish' : pails[counter++],
		'total_count' : pails[counter++],
		'pottery_location' : pails[counter++],
		'pottery_comments' : pails[counter++],
		})
		
		}
		//filling stratigraphies info
	var num_stratigraphies=stratigraphies.length/3;
	var counter=0;
	var temp_arr2=[ ];
	doc.stratigraphies=temp_arr2 ;
	for(var i=0;i<num_stratigraphies;i++){
		doc.stratigraphies.push({'is_related' : stratigraphies[counter++],
		'related' : stratigraphies[counter++],
		'related_locus' : stratigraphies[counter++],
		})
		}
	
		return doc;
	
	
	}

function display_fields(){
    db.view("Opendig_v2/byfield", {
        
        success: function(data){
            
            for(i in data.rows){
                var change;
                if(data.rows[i].key != change){
                    change=data.rows[i].key;
                    
                    $("#field.nav").append("<li><a href='#' class='goto' id='"+data.rows[i].key+"'>"+data.rows[i].key+"</a></li>"); 
                }
                
                
            }
            $("#field.nav").append("<li><a href='#' class='add'>Add Information</a></li>");
            $("#field.nav").append("<li><a href='index.html' id='home'>Home</a></li>");
            
        },
        
        error: function(status){
          alert("the status is "+status+" in display fields");  
        },
        reduce: false
       
        
        
    });
    
}

function display_squares(id){
    db.view("Opendig_v2/bysquare",{
        success: function(data){
            for(i in data.rows){
                var change;
                if(data.rows[i].value==id && data.rows[i].key != change){
                 change=data.rows[i].key;   
                    $("#field2.nav").append("<li><a href='#' class='goto2' id='"+data.rows[i].key+"'>"+data.rows[i].key+"</a></li>");
                }
                 
            }
            $("#field2.nav").append("<li><a href='#' class='add'>Add Information</a></li>");
            $("#field2.nav").append("<li><a href='index.html' id='home'>Home</a></li>");
        },
        error: function(status){
          alert("the status is "+status+" in display squares");  
        },
        reduce:false
        
    });
}
// need modify !!
function display_locus(sq, fd){
    db.view("Opendig_v2/bylocuscode",{
        success: function(data){
            
            var change1;
            var change2="";
            
            for(i in data.rows){
                
                  if(data.rows[i].value[0]==sq && data.rows[i].value[1]==fd && (data.rows[i].key[0] != change1 || data.rows[i].key[1] != change2)){
                       
                       change1=data.rows[i].key[0]; 
                       change2=data.rows[i].key[1];
                       $("#field3.nav").append("<li><a href='#' class='goto3' id='"+data.rows[i].key[0]+' '+data.rows[i].key[1]+"'>"+data.rows[i].key[0]+data.rows[i].key[1]+"</a></li>");
                }
                 
            }
            $("#field3.nav").append("<li><a href='#' class='add'>Add Information</a></li>");
            $("#field3.nav").append("<li><a href='index.html' id='home'>Home</a></li>");
        },
        error: function(status){
          alert("the status is "+status+" in display locus");  
        },
        reduce:false
        
    });
}

function display_table(sq,fd,id){
    
    db.view("Opendig_v2/byshowtable",{
        success: function(data){
            var code_and_locus= id.split(' ');
            var code=code_and_locus[0];
            var locus_type=code_and_locus[1];
            var start_date;
            var end_date;
            $("#tab0").append("<h1>Summary for square "+sq+"</h1>");
            $("#tab0").append("<h2>To view locus details, click on the corresponding row</h2>");
            $("#tab0").append("<table id='table_info'><tr align='left'><th>Locus</th><th>Dates</th><th>Types</th><th>Designation</th><th>Period</th></tr></table>");
            for(i in data.rows){                
                if(data.rows[i].key[1]==fd && data.rows[i].key[2]==sq){
                  start_date=data.rows[i].value[0].split('-');
                  end_date=data.rows[i].value[1].split('-');
                 //alert(data.rows[i].key[0]+' '+data.rows[i].key[3]);
                    $("#table_info").append("<tr align='left' id='num1_"+data.rows[i].value[4]+"' class='table_row' onmouseover='ChangeColor(this, true);' onmouseout='ChangeColor(this, false);'><a href=#><td>"+data.rows[i].key[0]+"</td><td>"+start_date[0]+" - "+end_date[0]+"</td><td>"+data.rows[i].key[3]+"</td><td>"+data.rows[i].value[2]+"</td><td>"+data.rows[i].value[3]+"</td></a></tr>");
                    
                }
                 
            }
            $("#tab0").append("<br/> ");
        },
        error: function(status){
          alert("the status is "+status+" in display the table");  
        },
        reduce:false
        
    });
}

function display_identification_info(id){
    db.view("Opendig_v2/bygeneral_info",{
        
        success: function(data){
            $("#tab1").append("<h2>Identification</h2>");
            $("#tab1").append("<fieldset><table id='id_table'></table></fieldset> ");
            var key=id.split('_');
            var test=1;
            for(i in data.rows){
                if(test==1){
                    test=0;
                    //alert(key[1]);
                }
                
                
                if(data.rows[i].key==key[1]){
                    $("#id_table").append("<tr><td>Start Date</td><td><input class='general_info_updated' value='"+data.rows[i].value[0]+"'/></td></tr><tr><td>End Date</td><td><input class='general_info_updated' value='"+data.rows[i].value[1]+"'/></td></tr><tr><td>Site</td><td>Umayri</td></tr><tr><td>Field</td><td><input class='general_info_updated' value='"+data.rows[i].value[2]+"'/></td></tr><tr><td>Square</td><td><input class='general_info_updated' value='"+data.rows[i].value[3]+"'/></td></tr><tr><td>Code</td><td><input class='general_info_updated' value='"+data.rows[i].value[4]+"'/></td></tr><tr><td>Locus_type</td><td><input class='general_info_updated' value='"+data.rows[i].value[5]+"'/></td></tr><tr><td>Supervisor</td><td><input class='general_info_updated' value='"+data.rows[i].value[6]+"'/></td></tr><tr><td>Designation</td><td><input class='general_info_updated' value='"+data.rows[i].value[7]+"'/></td></tr><tr><td>Reason</td><td><input class='general_info_updated' value='"+data.rows[i].value[8]+"'/></td></tr><tr><td>Top Separability</td><td><input class='general_info_updated' value='"+data.rows[i].value[9]+"'/></td></tr><tr><td>Bottom Separability</td><td><input class='general_info_updated' value='"+data.rows[i].value[10]+"'/></td></tr><tr><td>Interpretation</td><td></td></tr><tr><td>Stratigraphy</td><td><input class='general_info_updated' value='"+data.rows[i].value[11]+"'/></td></tr><tr><td>Locus date</td><td><input class='general_info_updated' value='"+data.rows[i].value[12]+"'/></td></tr><tr><td>Top Plans</td><td><input class='general_info_updated' value='"+data.rows[i].value[13]+"'/></td></tr><tr><td>Draw balks</td><td><input class='general_info_' value='"+data.rows[i].value[14]+"'/></td></tr><tr><td><a href='#' class='next1'>Next</a></td><td></td></tr>");
                }
            }
            
        },
        error: function(status){
            $("#tab1").append("<p>The status is "+status+" in displaying general information</p>");
            
        },
        reduce: false
        
    });
}
function add_general_information(){
	$("#tab1").empty();
	$("#tab1").append("<h2>Add Identification Information</h2>");
	$("#tab1").append("<fieldset><table id='id_table_add'></table></fieldset> ");
	$("#id_table_add").append("<tr><td>Start Date</td><td><input id='startdate_add' class='general_info_added'/></td></tr><tr><td>End Date</td><td><input id='enddate_add' class='general_info_added'/></td></tr><tr><td>Site</td><td>Umayri</td></tr><tr><td>Field</td><td><input id='field_add' class='general_info_added'/></td></tr><tr><td>Square</td><td><input id='square_add' class='general_info_added'/></td></tr><tr><td>Code</td><td><input id='code_add' class='general_info_added'/></td></tr><tr><td>Locus_type</td><td><input id='Locus_type_add' class='general_info_added'/></td></tr><tr><td>Supervisor</td><td><input id='supervisor_add' class='general_info_added'/></td></tr><tr><td>Designation</td><td><input id='designation_add' class='general_info_added'/></td></tr><tr><td>Reason</td><td><input id='reason_add' class='general_info_added'/></td></tr><tr><td>Top Separability</td><td><input id='topseparability_add' class='general_info_added'/></td></tr><tr><td>Bottom Separability</td><td><input id='bottomseparability_add' class='general_info_added'/></td></tr><tr><td>Interpretation</td><td></td></tr><tr><td>Stratigraphy</td><td><input id='stratigraphy_add' class='general_info_added'/></td></tr><tr><td>Locus date</td><td><input id='locusdate_add' class='general_info_added'/></td></tr><tr><td>Top Plans</td><td><input id='topplans_add' class='general_info_added'/></td></tr><tr><td>Draw balks</td><td><input id='drawbalks_add' class='general_info_added'/></td></tr><tr><td><a href='#' class='next1'>Next</a></td><td></td></tr>");
	}
function display_description_info(id){
    db.view("Opendig_v2/bydescription",{
        success: function(data){
            
        $("#tab2").append("<h2>Description</h2>");
        $("#tab2").append("<table id='table_description'></table> ");
        var key=id.split('_');
       
        for(i in data.rows){
            
            if(data.rows[i].key==key[1]){
                
                $("#table_description").append("<tr><td>Munsel</td><td><input class='desc_info_updated' value='"+data.rows[i].value[0]+"'/></td></tr><tr><td>Texture</td><td><input class='desc_info_updated' value='"+data.rows[i].value[1]+"'/></td></tr><tr><td>Shape A</td><td><input class='desc_info_updated' value='"+data.rows[i].value[2]+"'/></td></tr><tr><td>Shape S</td><td><input class='desc_info_updated' value='"+data.rows[i].value[3]+"'/></td></tr><tr><td>Shape R</td><td><input class='desc_info_updated' value='"+data.rows[i].value[4]+"'/></td></tr><tr><td>Shape AS</td><td><input class='desc_info_updated' value='"+data.rows[i].value[5]+"'/></td></tr><tr><td>Hardness</td><td><input class='desc_info_updated' value='"+data.rows[i].value[6]+"'/></td></tr><tr><td>Compactness Description 1</td><td><input class='desc_info_updated' value='"+data.rows[i].value[7]+"'/></td></tr><tr><td>Compactness Description 2</td><td><input class='desc_info_updated' value='"+data.rows[i].value[8]+"'/></td></tr><tr><td>Wetness Description</td><td><input class='desc_info_updated' value='"+data.rows[i].value[9]+"'/></td></tr><tr><td>Structure</td><td><input class='desc_info_updated' value='"+data.rows[i].value[10]+"'/></td></tr><tr><td>Measurements</td><td></td></tr><tr><td>Length</td><td><input class='desc_info_updated' value='"+data.rows[i].value[11]+"'/></td></tr><tr><td>Width</td><td><input class='desc_info_updated' value='"+data.rows[i].value[12]+"'/></td></tr><tr><td>Lower Depth</td><td><input class='desc_info_updated' value='"+data.rows[i].value[13]+"'/></td></tr><tr><td>Upper depth</td><td><input class='desc_info_updated' value='"+data.rows[i].value[14]+"'/></td></tr><tr><td>Direction</td><td><input class='desc_info_updated' value='"+data.rows[i].value[15]+"'/></td></tr><tr><td>Slope</td><td><input class='desc_info_updated' value='"+data.rows[i].value[16]+"'/></td></tr><tr><td>Pebbles</td><td><input class='desc_info_updated' value='"+data.rows[i].value[17]+"'/></td></tr><tr><td>Cobbles</td><td><input class='desc_info_updated' value='"+data.rows[i].value[18]+"'/></td></tr><tr><td>Boulders</td><td><input class='desc_info_updated' value='"+data.rows[i].value[19]+"'/></td></tr><tr><td>Munsel</td><td><input class='desc_info_updated' value='"+data.rows[i].value[20]+"'/></td></tr>");
            }
        }
            
        },
        error: function(status){
            $("#tab2").append("<p>The status is "+status+" in displaying description information</p>");
        },
        reduce: false
    });
    
}
function add_description_info(){
	$("#tab2").empty();
	$("#tab2").append("<h2>Add Description Information</h2>");
    $("#tab2").append("<table id='table_description_add'></table> ");
	$("#table_description_add").append("<tr><td>Munsel</td><td><input id='munsel_add' class='desc_info_added'/></td></tr><tr><td>Texture</td><td><input id='texture_add' class='desc_info_added'/></td></tr><tr><td>Shape A</td><td><input id='shapea_add' class='desc_info_added'/></td></tr><tr><td>Shape S</td><td><input id='shapes_add' class='desc_info_added'/></td></tr><tr><td>Shape R</td><td><input id='shaper_add' class='desc_info_added'/></td></tr><tr><td>Shape AS</td><td><input id='shapeas_add' class='desc_info_added'/></td></tr><tr><td>Hardness</td><td><input id='hardness_add' class='desc_info_added'/></td></tr><tr><td>Compactness Description 1</td><td><input id='compactness1_add' class='desc_info_added'/></td></tr><tr><td>Compactness Description 2</td><td><input id='compactness2_add' class='desc_info_added'/></td></tr><tr><td>Wetness Description</td><td><input id='wetnessdescription_add' class='desc_info_added'/></td></tr><tr><td>Structure</td><td><input id='structure_add' class='desc_info_added'/></td></tr><tr><td>Measurements</td><td></td></tr><tr><td>Length</td><td><input id='length_add' class='desc_info_added'/></td></tr><tr><td>Width</td><td><input id='width_add' class='desc_info_added'/></td></tr><tr><td>Lower Depth</td><td><input id='lowerdepth_add' class='desc_info_added'/></td></tr><tr><td>Upper depth</td><td><input id='upperdepth_add' class='desc_info_added'/></td></tr><tr><td>Direction</td><td><input id='direction_add' class='desc_info_added'/></td></tr><tr><td>Slope</td><td><input id='slope_add' class='desc_info_added'/></td></tr><tr><td>Pebbles</td><td><input id='pebbles_add' class='desc_info_added'/></td></tr><tr><td>Cobbles</td><td><input id='cobbles_add' class='desc_info_added'/></td></tr><tr><td>Boulders</td><td><input id='boulders_add' class='desc_info_added'/></td></tr><tr><td>Munsel</td><td><input id='munsel2_add' class='desc_info_added'/></td></tr><tr><td><a href='#' class='next2'>Next</a></td><td></td></tr>");
	
}
function display_levels_info(id){
    db.view("Opendig_v2/bylevels",{
        success: function(data){
            
        $("#tab3").append("<h2>Levels</h2>");
        $("#tab3").append("<table id='table_levels'></table> ");
        $("#table_levels").append("<tr><th></th><th>Location</th><th>Top level</th><th>Bottom level</th></tr>");
        var key=id.split('_');
       
        for(i in data.rows){
            
            if(data.rows[i].key==key[1]){
                //alert('The length is '+data.rows[i].value[1].location);
                for(j=0;j<data.rows[i].value.length;j++){
                    if(data.rows[i].value[j].top_level=="" || data.rows[i].value[j].top_level==null || data.rows[i].value[j].bottom_level=="" || data.rows[i].value[j].top_level==null){
                        data.rows[i].value[j].top_level=="no level";  
                        data.rows[i].value[j].bottom_level=="no level"; 
                    }
                      
                        
                    $("#table_levels").append("<tr><td><input type='radio' class='delete_row' id='levels_"+j+"_"+data.rows[i].key+"'/></td><td><input class='levels_updated' value='"+data.rows[i].value[j].location+"'/></td><td><input class='levels_updated' value='"+data.rows[i].value[j].top_level+"'/></td><td><input class='levels_updated' value='"+data.rows[i].value[j].bottom_level+"'/></td></tr>");
					
                }
                $("#tab3").append("<input type='button' class='add_row' id='table_levels_update_row' value='Add row'/><br/>");
				$("#tab3").append("<a href='#' class='next3'>Next</a>");
            }
        }
            
        },
        error: function(status){
            $("#tab3").append("<p>The status is "+status+" in displaying levels information</p>");
        },
        reduce: false
    });
    
}
function add_levels_info(){
	$("#tab3").empty();
	$("#tab3").append("<h2>Levels</h2>");
    $("#tab3").append("<table id='table_levels_add'></table> ");
    $("#table_levels_add").append("<tr><th>Location</th><th>Top level</th><th>Bottom level</th></tr>");
    $("#table_levels_add").append("<tr><td><input class='levels_added'/></td><td><input class='levels_added'/></td><td><input class='levels_added'/></td></tr>");
    $("#tab3").append("<input type='button' class='add_row' id='table_levels_add_row' value='Add row'/><br/>");
	$("#tab3").append("<a href='#' class='next3'>Next</a>");
}
function add_row(table_id){
	if(table_id=="table_levels_add_row"){
		$("#table_levels_add").append("<tr><td><input class='levels_added'/></td><td><input class='levels_added'/></td><td><input class='levels_added'/></td></tr>");
	}
	else if(table_id=="table_stratigraphies_add_row"){
		$("#table_stratigraphies_add").append("<tr><td><input class='stratigraphies_added'/></td><td><input class='stratigraphies_added'/></td></td><td><input class='stratigraphies_added'/></td></tr>");   
	}
	else if(table_id=="table_pails_add_row"){
		$("#table_pails_add").append("<tr><td><input class='pails_added'/></td><td><input class='pails_added'/></td><td><input class='pails_added'/></td><td><input class='pails_added'/></td><td><input class='pails_added'/></td><td><input class='pails_added'/></td><td><input class='pails_added'/></td><td><input class='pails_added'/></td></tr>");
	}
	else if(table_id=="table_levels_update_row"){
		$("#table_levels").append("<tr><td><input class='levels_updated'/></td><td><input class='levels_updated'/></td><td><input class='levels_updated'/></td></tr>");
	}
	else if(table_id=="table_stratigraphies_update_row"){
		$("#table_stratigraphies").append("<tr><td><input class='stratigraphies_updated'/></td><td><input class='stratigraphies_updated'/></td></td><td><input class='stratigraphies_updated'/></td></tr>");   
	}
	else if(table_id=="table_pails_update_row"){
		$("#table_pails").append("<tr><td><input class='pails_updated'/></td><td><input class='pails_updated'/></td><td><input class='pails_updated'/></td><td><input class='pails_updated'/></td><td><input class='pails_updated'/></td><td><input class='pails_updated'/></td><td><input class='pails_updated'/></td><td><input class='pails_updated'/></td></tr>");
	}
}
function display_stratigraphies_info(id){
    db.view("Opendig_v2/bystratigraphies",{
        success: function(data){
            
        $("#tab6").append("<h2>stratigraphies</h2>");
        $("#tab6").append("<table id='table_stratigraphies'></table> ");
        $("#table_stratigraphies").append("<tr><th>Type</th><th>Description</th><th>Related locus</th></tr>");
        var key=id.split('_');
       
        for(i in data.rows){
            
            if(data.rows[i].key==key[1]){
              
                for(j=0;j<data.rows[i].value.length;j++){
                      
                    $("#table_stratigraphies").append("<tr><td><input class='stratigraphies_updated' value='"+data.rows[i].value[j].is_related+"'/></td><td><input class='stratigraphies_updated' value='"+data.rows[i].value[j].related+"'/></td></td><td><input class='stratigraphies_updated' value='"+data.rows[i].value[j].related_locus+"'/></td></tr>");
                }
                
            }
        }
            $("#tab6").append("<input type='button' class='add_row' id='table_stratigraphies_update_row' value='Add row'/><br/>");
			$("#tab6").append("<a href='#' class='next6'>Next</a>");
        },
        error: function(status){
            $("#tab6").append("<p>The status is "+status+" in displaying stratigraphies information</p>");
        },
        reduce: false
    });
    
}

function add_stratigraphies_info(){
	$("#tab6").empty();
	$("#tab6").append("<h2>stratigraphies</h2>");
    $("#tab6").append("<table id='table_stratigraphies_add'></table> ");
    $("#table_stratigraphies_add").append("<tr><th>Type</th><th>Description</th><th>Related locus</th></tr>");
    $("#table_stratigraphies_add").append("<tr><td><input class='stratigraphies_added'/></td><td><input class='stratigraphies_added'/></td></td><td><input class='stratigraphies_added'/></td></tr>");   
	$("#tab6").append("<input type='button' class='add_row' id='table_stratigraphies_add_row' value='Add row'/><br/>");
	$("#tab6").append("<a href='#' class='next6'>Next</a>");
}
	

function display_pails_info(id){
    db.view("Opendig_v2/bypails",{
        success: function(data){
           
        $("#tab4").append("<h2>Pails</h2>");
        $("#tab4").append("<table id='table_pails'></table> ");
        $("#table_pails").append("<tr><th>Date</th><th>pail</th><th>Baskets</th><th>diagnostic</th><th>Publish</th><th>Total count</th><th>Location</th><th>Comment</th></tr>");
        var key=id.split('_');
       
        for(i in data.rows){
            
            if(data.rows[i].key==key[1]){
              
                for(j=0;j<data.rows[i].value.length;j++){
                                       
                    $("#table_pails").append("<tr><td><input class='pails_updated' value='"+data.rows[i].value[j].pail_date+"'/></td><td><input class='pails_updated' value='"+data.rows[i].value[j].pail_number+"'/></td><td><input class='pails_updated' value='"+data.rows[i].value[j].baskets+"'/></td><td><input class='pails_updated' value='"+data.rows[i].value[j].diagnostic_count+"'/></td><td><input class='pails_updated' value='"+data.rows[i].value[j].publish+"'/></td><td><input class='pails_updated' value='"+data.rows[i].value[j].total_count+"'/></td><td><input class='pails_updated' value='"+data.rows[i].value[j].pottery_location+"'/></td><td><input class='pails_updated' value='"+data.rows[i].value[j].pottery_comments+"'/></td></tr>");
                }
                
            }
        }
		$("#tab4").append("<input type='button' class='add_row' id='table_pails_update_row' value='Add row'/><br/>");
		$("#tab4").append("<a href='#' class='next4'>Next</a>");
            
        },
        error: function(status){
            $("#tab4").append("<p>The status is "+status+" in displaying pails information</p>");
        },
        reduce: false
    });
    
}

function add_pails_info(){
	$("#tab4").empty();
	$("#tab4").append("<h2>Pails</h2>");
    $("#tab4").append("<table id='table_pails_add'></table> ");
    $("#table_pails_add").append("<tr><th>Date</th><th>pail</th><th>Baskets</th><th>diagnostic</th><th>Publish</th><th>Total count</th><th>Location</th><th>Comment</th></tr>");
    $("#table_pails_add").append("<tr><td><input class='pails_added'/></td><td><input class='pails_added'/></td><td><input class='pails_added'/></td><td><input class='pails_added'/></td><td><input class='pails_added'/></td><td><input class='pails_added'/></td><td><input class='pails_added'/></td><td><input class='pails_added'/></td></tr>");
	$("#tab4").append("<input type='button' class='add_row' id='table_pails_update_row' value='Add row'/><br/>");
	$("#tab4").append("<a href='#' class='next4'>Next</a>");
}

function display_photos_info(id){
    db.view("Opendig_v2/byphotos",{
        success: function(data){
            
        //$("#photos_list").empty();
        var key=id.split('_');
       
        for(i in data.rows){
            
            if(data.rows[i].key==key[1]){
                              
                for(j=0;j<data.rows[i].value.length;j++){
                    
                    $("#photos_list").append('<li><a href="http://127.0.0.1/photos/5.jpg" rel="lightbox" ><img class="image" src="http://127.0.0.1/photos/5.jpg" /></a><p>'+data.rows[i].value[j].date+'</p></li>'); 
                   
                }
                             
            }
            
            
            
        }
            
        },
        error: function(status){
            $("#tab5").append("<p>The status is "+status+" in displaying photos information</p>");
        },
        reduce: false
    });
    
   
        
     
        
    
   
    
}

function display_artifacts_info(id){
	var index;
    db.view("Opendig_v2/byartifacts",{
        success: function(data){
           
        $("#tab7").append("<h2>Artifacts</h2>");
        $("#tab7").append("<table id='table_artifacts'></table> ");
        $("#table_artifacts").append("<tr><th>Registration</th><th>Description</th><th>Quantity</th><th>Certainty</th><th>Comment</th>");
        var key=id.split('_');
       
        for(i in data.rows){
           
            if(data.rows[i].key==key[1]){
				index=data.rows[i].key;
                for(j=0;j<data.rows[i].value.length;j++){
                                       
                    $("#table_artifacts").append("<tr><td><input class='artifacts_updated' value='"+data.rows[i].value[j].registration+"'/></td><td>description</td><td><input class='artifacts_updated' value='"+data.rows[i].value[j].count+"'/></td><td>Certainty</td><td><input class='artifacts_updated' value='"+data.rows[i].value[j].comments+"'/></td></tr>");
                }
                $("#tab7").append("<input value='Update information' type='button' class='update' id='"+index+"'/><br/>");
            }
        }
            
        },
        error: function(status){
            $("#tab7").append("<p>The status is "+status+" in displaying artifacts information</p>");
        },
        reduce: false
    });
    
}
function add_artifacts_info(){
	$("#tab7").empty();	
	$("#tab7").append("<h2>Artifacts</h2>");
	$("#tab7").append("<input value='Save information' type='button' id='save'/><br/>");
	
	}



/*function print_photos(id){
    display_photos_info(id);
    
    alert('outside'+photos_arr.length);
    for(j=0; j<photos_arr.length; j++){
        $("#photos_list").append('<li><a href="http://127.0.0.1/photos/5.jpg" rel="lightbox" ><img class="image" src="http://127.0.0.1/photos/5.jpg" /></a></li>');  
    }
}
*/


$(document).ready(function (){
    display_fields();
    
    $("a.goto").live('click', function(event) {  
    	$("#field").hide();
        display_squares(event.target.id);
	field_passed= event.target.id;   
    });
    
    $("a.goto2").live('click', function(event) { 
    	$("#field2").hide();
        display_locus(event.target.id, field_passed);
	square_passed= event.target.id;   
    });
     $("a.goto3").live('click', function(event) { 
        $("#tab0").empty();
        display_table(square_passed, field_passed, event.target.id);
         
         $('table.tap').each(function(){
             
        
            var $links = $(this).find('a');
            var $links2=$("#tab0");       
        
            $active = $links2.addClass('active');
        
            if($active.attr('href')!= undefined){
                $content=$($active.attr('href')); 
                $($active.attr('href')).show(); 
            }
            else{
                $content=$("#"+$active.attr('href')); 
                $("#"+$active.attr('id')).show();
            
        }
      
        
        // Hide the remaining content
        $links.not(':first').each(function () {
   
        
       if($(this).attr('href')!= undefined){
            $($(this).attr('href')).hide();
        }
        else{
            $("#"+$(this).attr('id')).hide();
        }
			
        
                                              });
                                              
        //TEST Active tabs
        /*for(i=0;i<$links.length;i++){
            if($links[i].getAttribute('Class') == 'active'){
                alert('active '+$links[i]);
            }
        }*/
                                        });
    });
    
    
    $('#table_info tr').live('click', function(event) { 
    //Displaying identification information
       $('#tab1').empty();
       
       var id=$(this).attr('id');
       display_identification_info(id);
//Code to move to another tab       
       $('table.tap').each(function(){        
            var $links = $(this).find('a');
            var $links2=$("#tab1");
            
            $active.removeClass('active');
            $active = $links2.addClass('active');
        
            if($active.attr('href')!= undefined){
                $content=$($active.attr('href')); 
                $($active.attr('href')).show(); 
            }
            else{
                $content=$("#"+$active.attr('href')); 
                $("#"+$active.attr('id')).show();
            
            }
            
            //TEST Active tabs
        for(i=0;i<$links.length;i++){
            if($links[i].getAttribute('href') != '#tab1'){
                $($links[i].getAttribute('href')).removeClass('active');
                $($links[i].getAttribute('href')).hide();
            }
        }
      

       
       });
//Code to move to another tab ends here
        $("#tab2").empty();
        display_description_info(id);
        $("#tab3").empty();
        display_levels_info(id);
        $("#tab6").empty();
        display_stratigraphies_info(id);        
        $("#tab4").empty();        
        display_pails_info(id);
        
        //alert('array size is: '+arr.length);
        //print_photos(id);
        /*$("#tab5").load(function(){
            alert('entered');
            display_photos_info(id);
            
        });*/
       $("#tab7").empty();
       display_artifacts_info(id);
        event.preventDefault();
    });
    
// Code when choosing add function
$("a.add").live('click', function(event) {  
    //add fields for the first tab  
		add_general_information();
		add_description_info();
		add_levels_info();
		add_stratigraphies_info();
		add_pails_info();
		add_artifacts_info();
    });
//This function deals with admin page, adds rows as needed
$("input.add_row").live('click',function(event){
var id=event.target.id;
add_row(id);
}); 
//This function deals with saving the information entered

$("#save").live('click', function(event){
	
	//array carrying general info inputs
	var general_info=[ ];
	$("input.general_info_added").each(function(){
			general_info.push($(this).val());
			
			});
	
	//array carrying description info inputs
	var desc_info=[ ];		
	$("input.desc_info_added").each(function(){
			desc_info.push($(this).val());
			
			});
	
	
	var levels= [ ];
		$('input.levels_added').each(function(){
			//alert($(this).val());
			levels.push($(this).val());
		});
		

	var stratigraphies= [ ];
		$('input.stratigraphies_added').each(function(){
			//alert($(this).val());
			stratigraphies.push($(this).val());
		});
		
	var pails= [ ];
		$('input.pails_added').each(function(){
			//alert($(this).val());
			pails.push($(this).val());
		});
		alert('save clicked');
		//Saving the document into the database
		db.saveDoc(create_db_doc(null, general_info, desc_info, levels, pails, stratigraphies),{
			success: function(){
				alert('Document saved successfully!');
				},
			error: function(status){
				alert('Problem in saving the doc to the database');				
				}
			
			
			});
	
		
	});
//This function deals with updating the document in couchdb
$("input.update").live('click',function(event){
var id= event.target.id;
alert('The doc id is: '+id);

//array carrying general info inputs
	var general_info=[ ];
	$("input.general_info_updated").each(function(){
			general_info.push($(this).val());
			
			});
	
	//array carrying description info inputs
	var desc_info=[ ];		
	$("input.desc_info_updated").each(function(){
			desc_info.push($(this).val());
			
			});
	
	
	var levels= [ ];
		$('input.levels_updated').each(function(){
			//alert($(this).val());
			levels.push($(this).val());
		});
		

	var stratigraphies= [ ];
		$('input.stratigraphies_updated').each(function(){
			//alert($(this).val());
			stratigraphies.push($(this).val());
		});
		
	var pails= [ ];
		$('input.pails_updated').each(function(){
			//alert($(this).val());
			pails.push($(this).val());
		});
		
		
		//Saving the document into the database
		db.openDoc(id,{
			success: function(doc){
				db.saveDoc(create_db_doc(doc, general_info, desc_info, levels, pails, stratigraphies),{
					success: function(){
						alert('Document updated successfully!');
					},
					error: function(status){
						alert('Problem in saving the doc to the database');				
					}			
				});
			},
			error: function(status){
				alert('problem in opening doc');
			}
		
		});
		
	
});
//this function deals with testing purposes only
$("input.print").live('click',function(event){
	//test print
		var general_info=[ ];
		
		$("input.general_info_added").each(function(){
			general_info.push($(this).val());
			
			});
		alert('general '+general_info.length);
		
		//var description_info=[ ];
		var desc_info=[ ];
		
		$("input.desc_info_added").each(function(){
			desc_info.push($(this).val());
			
			});
		alert('desc '+desc_info.length);
		
		
		var levels= [ ];
		$('input.levels_added').each(function(){
			//alert($(this).val());
			levels.push($(this).val());
		});
		alert('level '+levels.length);
		var stratigraphies= [ ];
		$('input.stratigraphies_added').each(function(){
			//alert($(this).val());
			stratigraphies.push($(this).val());
		});
		alert('strat '+stratigraphies.length);
		var pails= [ ];
		$('input.pails_added').each(function(){
			//alert($(this).val());
			pails.push($(this).val());
		});
		alert('pails '+pails.length);
});  

//When we want to delete a row
$("input.delete_row").live('click',function(event){
	id=event.target.id;
	alert('id of the row is: '+id);
	
	
	
	});



//Tab code

$('table.tap').each(function(){

// For each set of tabs, we want to keep track of
// which tab is active and it's associated content
var $links = $(this).find('a');
var $links3=("#tab1");
var $links2=$("#tab0");
// Use the first link as the initial active tab
$active = $links.first().addClass('active');
//$content = $($active.attr('href'));
if($active.attr('href')!= undefined){
   $content=$($active.attr('href')); 
}
else{
   $content=$("#"+$active.attr('id'));
}


// Hide the remaining content
$links.not(':first').each(function () {
    
    if($(this).attr('href')!= undefined){
        $($(this).attr('href')).hide();
    }
    else{
        $("#"+$(this).attr('id')).hide();
    }



});

// Bind the click event handler
$(this).on('click', 'a', function(e){
    

// Make the old tab inactive.
$active.removeClass('active');



if($active.attr('href')!= undefined){
   
   $($active.attr('href')).hide();
}
else{
   
 $("#"+$active.attr('id')).hide();
}


// Update the variables with the new link and content
$active = $(this);  

if($active.attr('href')!= undefined){
   $content=$($active.attr('href'));
   $($active.attr('href')).show();
}
else{
   $content=$("#"+$active.attr('id'));
   $("#"+$active.attr('id')).show();
}


$active.addClass('active');


//add the edit button on table tabs

if($active.attr('href')!= undefined){
   if($active.attr('href')=="#tab3" || $active.attr('href')=="#tab4" || $active.attr('href')=="#tab6"){
   		document.getElementById("edit_button").style.display= 'inline';
   	}
   	else{
   		document.getElementById("edit_button").style.display= 'none';
   		}
}
else{
	if($active.attr('id')=="tab3" || $active.attr('id')=="tab4" || $active.attr('id')=="tab6"){
   		document.getElementById("edit_button").style.display= 'inline';;
   	}
   	else{
   		document.getElementById("edit_button").style.display= 'none';
   		}
   
}

// Prevent the anchor's default click action
e.preventDefault();
});
				});




});



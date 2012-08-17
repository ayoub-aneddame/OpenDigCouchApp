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
            
            $("#field.nav").append("<li><a href='admin.html' id='admin'>Admin</a></li>");
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
             $("#field2.nav").append("<li><a href='admin.html' id='admin'>Admin</a></li>");
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
             $("#field3.nav").append("<li><a href='admin.html' id='admin'>Admin</a></li>");
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
                    $("#id_table").append("<tr><td>Start Date</td><td>"+data.rows[i].value[0]+"</td></tr><tr><td>End Date</td><td>"+data.rows[i].value[1]+"</td></tr><tr><td>Site</td><td>Umayri</td></tr><tr><td>Field</td><td>"+data.rows[i].value[2]+"</td></tr><tr><td>Square</td><td>"+data.rows[i].value[3]+"</td></tr><tr><td>Code</td><td>"+data.rows[i].value[4]+"</td></tr><tr><td>Locus_type</td><td>"+data.rows[i].value[5]+"</td><tr><td>Supervisor</td><td>"+data.rows[i].value[6]+"</td></tr><tr><td>Designation</td><td>"+data.rows[i].value[7]+"</td></tr><tr><td>Reason</td><td>"+data.rows[i].value[8]+"</td></tr><tr><td>Top Separability</td><td>"+data.rows[i].value[9]+"</td></tr><tr><td>Bottom Separability</td><td>"+data.rows[i].value[10]+"</td></tr><tr><td>Interpretation</td><td></td></tr><tr><td>Stratigraphy</td><td>"+data.rows[i].value[11]+"</td></tr><tr><td>Locus date</td><td>"+data.rows[i].value[12]+"</td></tr><tr><td>Top Plans</td><td>"+data.rows[i].value[13]+"</td></tr><tr><td>Draw balks</td><td>"+data.rows[i].value[14]+"</td></tr>");
                }
            }
            
        },
        error: function(status){
            $("#tab1").append("<p>The status is "+status+" in displaying general information</p>");
            
        },
        reduce: false
        
    });
}
function display_description_info(id){
    db.view("Opendig_v2/bydescription",{
        success: function(data){
            
        $("#tab2").append("<h2>Description</h2>");
        $("#tab2").append("<table id='table_description'></table> ");
        var key=id.split('_');
       
        for(i in data.rows){
            
            if(data.rows[i].key==key[1]){
                
                $("#table_description").append("<tr><td>Munsel</td><td>"+data.rows[i].value[0]+"</td></tr><tr><td>Texture</td><td>"+data.rows[i].value[1]+"</td></tr><tr><td>Shape A</td><td>"+data.rows[i].value[2]+"</td></tr><tr><td>Shape S</td><td>"+data.rows[i].value[3]+"</td></tr><tr><td>Shape R</td><td>"+data.rows[i].value[4]+"</td></tr><tr><td>Shape AS</td><td>"+data.rows[i].value[5]+"</td></tr><tr><td>Hardness</td><td>"+data.rows[i].value[6]+"</td></tr><tr><td>Compactness Description 1</td><td>"+data.rows[i].value[7]+"</td></tr><tr><td>Compactness Description 2</td><td>"+data.rows[i].value[8]+"</td></tr><tr><td>Wetness Description</td><td>"+data.rows[i].value[9]+"</td></tr><tr><td>Structure</td><td>"+data.rows[i].value[10]+"</td></tr><tr><td>Measurements</td><td></td></tr><tr><td>Length</td><td>"+data.rows[i].value[11]+"</td></tr><tr><td>Width</td><td>"+data.rows[i].value[12]+"</td></tr><tr><td>Lower Depth</td><td>"+data.rows[i].value[13]+"</td></tr><tr><td>Upper depth</td><td>"+data.rows[i].value[14]+"</td></tr><tr><td>Direction</td><td>"+data.rows[i].value[15]+"</td></tr><tr><td>Slope</td><td>"+data.rows[i].value[16]+"</td></tr><tr><td>Pebbles</td><td>"+data.rows[i].value[17]+"</td></tr><tr><td>Cobbles</td><td>"+data.rows[i].value[18]+"</td></tr><tr><td>Boulders</td><td>"+data.rows[i].value[19]+"</td></tr><tr><td>Munsel</td><td>"+data.rows[i].value[20]+"</td></tr>");
            }
        }
            
        },
        error: function(status){
            $("#tab2").append("<p>The status is "+status+" in displaying description information</p>");
        },
        reduce: false
    });
    
}
function display_levels_info(id){
    db.view("Opendig_v2/bylevels",{
        success: function(data){
            
        $("#tab3").append("<h2>Levels</h2>");
        $("#tab3").append("<table id='table_levels'></table> ");
        $("#table_levels").append("<tr><th>Location</th><th>Top level</th><th>Bottom level</th></tr>");
        var key=id.split('_');
       
        for(i in data.rows){
            
            if(data.rows[i].key==key[1]){
                //alert('The length is '+data.rows[i].value[1].location);
                for(j=0;j<data.rows[i].value.length;j++){
                    if(data.rows[i].value[j].top_level=="" || data.rows[i].value[j].top_level==null || data.rows[i].value[j].bottom_level=="" || data.rows[i].value[j].top_level==null){
                        data.rows[i].value[j].top_level=="no level";  
                        data.rows[i].value[j].bottom_level=="no level"; 
                    }
                      
                        
                    $("#table_levels").append("<tr><td>"+data.rows[i].value[j].location+"</td><td>"+data.rows[i].value[j].top_level+"</td><td>"+data.rows[i].value[j].bottom_level+"</td></tr>");
                }
                
            }
        }
            
        },
        error: function(status){
            $("#tab3").append("<p>The status is "+status+" in displaying levels information</p>");
        },
        reduce: false
    });
    
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
                      
                    $("#table_stratigraphies").append("<tr><td>"+data.rows[i].value[j].is_related+"</td><td>"+data.rows[i].value[j].related+"</td><td>"+data.rows[i].value[j].related_locus+"</td></tr>");
                }
                
            }
        }
            
        },
        error: function(status){
            $("#tab6").append("<p>The status is "+status+" in displaying stratigraphies information</p>");
        },
        reduce: false
    });
    
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
                                       
                    $("#table_pails").append("<tr><td>"+data.rows[i].value[j].pail_date+"</td><td>"+data.rows[i].value[j].pail_number+"</td><td>"+data.rows[i].value[j].baskets+"</td><td>"+data.rows[i].value[j].diagnostic_count+"</td><td>"+data.rows[i].value[j].publish+"</td><td>"+data.rows[i].value[j].total_count+"</td><td>"+data.rows[i].value[j].pottery_location+"</td><td>"+data.rows[i].value[j].pottery_comments+"</td></tr>");
                }
                
            }
        }
            
        },
        error: function(status){
            $("#tab4").append("<p>The status is "+status+" in displaying pails information</p>");
        },
        reduce: false
    });
    
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
    db.view("Opendig_v2/byartifacts",{
        success: function(data){
           
        $("#tab7").append("<h2>Artifacts</h2>");
        $("#tab7").append("<table id='table_artifacts'></table> ");
        $("#table_artifacts").append("<tr><th>Registration</th><th>Description</th><th>Quantity</th><th>Certainty</th><th>Comment</th>");
        var key=id.split('_');
       
        for(i in data.rows){
           
            if(data.rows[i].key==key[1]){
              
                for(j=0;j<data.rows[i].value.length;j++){
                                       
                    $("#table_artifacts").append("<tr><td>"+data.rows[i].value[j].registration+"</td><td>description</td><td>"+data.rows[i].value[j].count+"</td><td>Certainty</td><td>"+data.rows[i].value[j].comments+"</td></tr>");
                }
                
            }
        }
            
        },
        error: function(status){
            $("#tab7").append("<p>The status is "+status+" in displaying artifacts information</p>");
        },
        reduce: false
    });
    
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
    
//TEST
/*
if($active.attr('href')!= undefined){
   
   alert('FIRST active is '+$active.attr('href'));
}
else{
   
 alert('FIRST active is '+$active.attr('id'));
}
 */   


// Make the old tab inactive.
$active.removeClass('active');



if($active.attr('href')!= undefined){
   
   $($active.attr('href')).hide();
}
else{
   
 $("#"+$active.attr('id')).hide();
}


//TEST
/*
if($active.attr('href')!= undefined){
   
   alert('hiiiiii'+$active.attr('href'));
}
else{
   
 alert('hiiiiii'+$active.attr('id'));
}
*/




// Update the variables with the new link and content
$active = $(this);  


//TEST
/*
if($active.attr('href')!= undefined){
   
   alert("now "+$active.attr('href'));
}
else{
   
 alert("now "+$active.attr('id'));
}*/






//$content = $($(this).attr('href'));
if($active.attr('href')!= undefined){
   $content=$($active.attr('href'));
   $($active.attr('href')).show();
}
else{
   $content=$("#"+$active.attr('id'));
   $("#"+$active.attr('id')).show();
}


//$content =$(e.target.id);
// Make the tab active.
$active.addClass('active');
//$content.show();

// Prevent the anchor's default click action
e.preventDefault();
});
				});




});



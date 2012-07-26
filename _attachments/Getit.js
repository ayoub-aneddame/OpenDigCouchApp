/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//Global variable
var $active, $content;
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
    db.view("Opendig_v1/byfield", {
        
        success: function(data){
            
            for(i in data.rows){
                var change;
                if(data.rows[i].key != change){
                    change=data.rows[i].key;
                    
                    $("#field.nav").append("<li><a href='#' class='goto' id='"+data.rows[i].key+"'>"+data.rows[i].key+"</a></li>"); 
                }
                
                
            }
            
        },
        
        error: function(status){
          alert("the status is "+status+" in display fields");  
        },
        reduce: false
       
        
        
    });
    
}

function display_squares(id){
    db.view("Opendig_v1/bysquare",{
        success: function(data){
            for(i in data.rows){
                var change;
                if(data.rows[i].value==id && data.rows[i].key != change){
                 change=data.rows[i].key;   
                    $("#field2.nav").append("<li><a href='#' class='goto2' id='"+data.rows[i].key+"'>"+data.rows[i].key+"</a></li>");
                }
                 
            }
        },
        error: function(status){
          alert("the status is "+status+" in display squares");  
        },
        reduce:false
        
    });
}
// need modify !!
function display_locus(sq, fd){
    db.view("Opendig_v1/bylocuscode",{
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
        },
        error: function(status){
          alert("the status is "+status+" in display locus");  
        },
        reduce:false
        
    });
}

function display_table(sq,fd,id){
    
    db.view("Opendig_v1/byshowtable",{
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
    db.view("Opendig_v1/bygeneral_info",{
        
        success: function(data){
            $("#tab1").append("<fieldset><table id='id_table'></table></fieldset> ");
            var key=id.split('_');
            var test=1;
            for(i in data.rows){
                if(test==1){
                    test=0;
                    //alert(key[1]);
                }
                
                
                if(data.rows[i].key==key[1]){
                    $("#id_table").append("<tr><td>Start Date</td><td>"+data.rows[i].value.start_date+"</td></tr><tr><td>End Date</td><td>"+data.rows[i].value.end_date+"</td></tr><tr><td>Site</td><td>Umayri</td></tr><tr><td>Field</td><td>"+data.rows[i].value.field+"</td></tr><tr><td>Square</td><td>"+data.rows[i].value.square+"</td></tr><tr><td>Code</td><td>"+data.rows[i].value.code+"</td></tr><tr><td>Supervisor</td><td>"+data.rows[i].value.supervisor+"</td></tr><tr><td>Designation</td><td>"+data.rows[i].value.designation+"</td></tr><tr><td>Reason</td><td>"+data.rows[i].value.reason+"</td></tr><tr><td>Top Separability</td><td>"+data.rows[i].value.top_separation+"</td></tr><tr><td>Bottom Separability</td><td>"+data.rows[i].value.bottom_separation+"</td></tr><tr><td>Interpretation</td><td></td></tr><tr><td>Stratigraphy</td><td>"+data.rows[i].value.stratigraphy_remarks+"</td></tr><tr><td>Locus date</td><td>"+data.rows[i].value.age+"</td></tr><tr><td>Top Plans</td><td>"+data.rows[i].value.top_plan+"</td></tr><tr><td>Draw balks</td><td>"+data.rows[i].value.draw_balks+"</td></tr>");
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
    db.view("Opendig_v1/bydescription",{
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
            $("#tab1").append("<p>The status is "+status+" in displaying description information</p>");
        },
        reduce: false
    });
    
}


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
            var $links2=$("#tab2");
            
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
            if($links[i].getAttribute('href') != '#tab2'){
                $($links[i].getAttribute('href')).removeClass('active');
                $($links[i].getAttribute('href')).hide();
            }
        }
      

       
       });

        $("#tab2").empty();
        display_description_info(id);
      
    });
    

    








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



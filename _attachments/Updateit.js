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

function create_db_doc(general_info,desc_info,levels,pails,stratigraphies){
	
	//Creating a doc object 	
	doc= new Object;
	//filling the general information
	doc.start_date=general_info[0];
	doc.end_date=general_info[1];
	doc.field=general_info[2];
	doc.square=general_info[3];
	doc.code=general_info[4];
	doc.supervisor=general_info[5];
	doc.designation=general_info[6];
	doc.reason=general_info[7];
	doc.top_separation=general_info[8];
	doc.bottom_separation=general_info[9];
	doc.stratigraphy_remarks=general_info[10];
	doc.age=general_info[11];
	doc.top_plan=general_info[12];
	doc.draw_balks=general_info[13];
	
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
		doc.levels.push({'location' : levels[counter++],'top_level' : levels[counter++],	'bottom_level' : levels[counter++],
			});
		}
	
	alert('levels succeeded');
		return doc;
	
	
	}




$(document).ready(function (){
    
    
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



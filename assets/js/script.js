$('body').on('click','#submit_btn',function(e)
{
    var group = $(this).attr('data-selgroup');
    var func = $(this).attr('data-func');
    var _controller = "/controller/controller-"+$(this).attr('data-controller')+'.php';
    
    
    var spiner =`<div class="spinner-border " role="status" style=""  text-align:center;"><span class="sr-only">Loading...</span></div>`
   
    $(this).parent().children( ".loading-btn" ).css('display','inline-block');
    $(this).css('display','none');
    
   
    DataObj = FormToObj(group);
    console.log(DataObj);
    $('input[data-selgroup="'+group+'"]').parent().children( ".empty-error" ).css('display','none');
    // console.log(DataObj);
    jQuery.ajax({
      type: "POST",
      url: _controller,
      data:{ "callFunc": func,"data":JSON.stringify(DataObj) },
      success: function (result) 
        {
          console.log('Ajax Success :' + result)
          
         $('input[data-selgroup="'+group+'"]').parent().children( ".loading-btn" ).css('display','none');
         $('input[data-selgroup="'+group+'"]').css('display','inline-block');
           if(DataObj['person_name'] == "" && DataObj['person_email']  == "" && DataObj['person_phone']  == "" && DataObj['person_msg']  == "")
           {
            $('input[data-selgroup="'+group+'"]').parent().children( ".submit-btn" ).css('display','block');
            $('input[data-selgroup="'+group+'"]').parent().children( ".empty-error" ).css('display','inline-block');
           }
           else{
           
             var elm =  $('input[data-selgroup="'+group+'"]').parent().parent();
                    elm.children('.form-mail').css('display','none');
                    elm.children('.apriciate-msg').css('display','block' );
           }
           

          

        },
      error: function (request, error) 
        {
          alert("Ajax Eror: " + error);

          $(this).parent().children( ".loading-btn" ).css('display','none');
          $(this).css('display','inline-block');
      
        }
        
      });

   
});

function FormToObj(group)
{
  DataObj ={};
  $('input[data-group="' + group + '"]').each(function(e){

    DataObj[$(this).attr('data-key')] = $(this).val();
    console.log("dfjhskdjf");
   
  });

  return DataObj;
}



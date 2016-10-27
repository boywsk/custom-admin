var i=0;
$(function(){
	//上传头像
	 $('#headImg').click(function() {
	     $("#fileupload").trigger("click");
	})

	$('#fileupload').fileupload({
		 	autoUpload: true,
		 	dataType: "text",
	        done: function (e, data) {
				if(data.result.indexOf("错误:") > -1 ){
					alert(data.result);
				}else{
					$("#licenceImg").attr("value",data.result);
					$("#headImg").attr("src","../"+data.result);
	             
				}
	        },
		    fail: function(e, data) {
		    }
	 });
	
	 	 
	 $('input:radio[name="roleLevel"]').on('click',function(){
		 	$INPUT=$(this).parent().parent().parent().next();
			if($(this).val()=='2'){
				$INPUT.slideUp();
			}else if($(this).val()=='1'){
				$INPUT.slideDown();
			}
	 });
	 
	 $('.del').on('click',function(e){
		 $tr=$(this).parent().parent();
		 $.post('../user/delUser', { 'params': $(e.target).parent().attr('rev') }, function (msg) {
				 if(msg=="1"){
					 $tr.fadeOut('slow');
				 }
			
		 });
	 })
	
	 $('#exampleModal').on('show.bs.modal', function(event) {
			var button = $(event.relatedTarget) // Button that triggered the modal
			var recipient = button.data('whatever') // Extract info from data-* attributes
			// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
			// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
			var modal = $(this)
			modal.find('.modal-title').text(recipient)
			// modal.find('.modal-body input').val(recipient)
		})

		$('#sub').on('click', function() {
			$.ajax({
				type : "POST",
				url : "../user/save",
				data : $('#fm').serialize(),
				async : false,
				error : function(request) {
					alert("Connection error");
				},
				success : function(data) {
					$('#exampleModal').modal('hide');
					$('tbody').prepend('<tr id="add_'+i+'"></tr>');
					$('#add_'+i).html(data);
					i++;
					
					$('#fm').find('input[type!="radio"]').val('');
				}
			});
		})
		
		$('#exampleModal').on('hidden.bs.modal',function(e) {
			
				
		});
		
	 
})
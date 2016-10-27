var i=0;
	$(function(){
		
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
					url : "../c_config/save",
					data : $('#fm').serialize(),
					async : false,
					error : function(request) {
						alert("Connection error");
					},
					success : function(data) {
						$('#exampleModal').modal('hide');
						window.location.reload();
						//$('table').append('<tr id="add_'+i+'"></tr>');
						//$('#add_'+i).html(data);
						//i++;
					}
				});
			})
			
			$('#exampleModal').on('hidden.bs.modal',function(e) {
					
					
			});
		 
		 
	})
	
	function edit(obj){
	 		$.ajax({
				type : "POST",
				url : "../c_config/editConfig/"+obj,
				async : false,
				error : function(request) {
					alert("Connection error");
				},
				success : function(data) {
					$('.modal-body').html(data);
	                
				}
			});
	}
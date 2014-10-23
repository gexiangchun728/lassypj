$(document).ready(function () {
	$('.contact-num').mask("999-999-9999");
	$('.contact-list').on('click', ':button',function(){
		$(this).parent().find("input[type='text'].contact-name").addClass("hide");
		$(this).parent().find("span.contact-name").removeClass("hide").addClass("show").text($(this).parent().find("input[type='text'].contact-name").val());
		$(this).parent().find("input[type='text'].contact-num").addClass("hide");
		$(this).parent().find("span.contact-num").removeClass("hide").addClass("show").text($(this).parent().find("input[type='text'].contact-num").val());
		$(this).addClass("hide");
		$(this).parent().find("a.hide").removeClass("hide").addClass("show")
		var number = $(this).parent().parent().find('li').length+1;
		var index = $(this).parent().parent().find('li').index($(this).parent());
		$(this).parent().parent().append("<li><input type='text' class='contact-name' placeholder='Type name here...' value='' id='contactname-"+number+"' name='contactname-"+number+"'><span class='contact-name hide'></span><input type='text' class='contact-num' placeholder='Type Mobile Number...' value='' id='contactnum-"+number+"' name='contactnum-"+number+"'><span class='contact-num hide'></span><input type='button' class='btn btn-primary' value='Save &amp; Add New Contact' id='contactbtn-"+number+"'><a class='editlink-"+number+" hide'>Edit Contact</a></li>");
		$('.contact-num').mask("999-999-9999");
	});
	$('.contact-list').on('click', 'a', function(){
		$(this).parent().find('span.contact-name').removeClass('show').addClass('hide');
		$(this).parent().find("input[type='text'].contact-name").removeClass("hide");
		$(this).parent().find('span.contact-num').removeClass('show').addClass('hide');
		$(this).parent().find("input[type='text'].contact-num").removeClass("hide");
		$(this).removeClass("show").addClass("hide");
		$(this).parent().find("input[type='button'].hide").removeClass("hide");
		$(this).parent().parent().find('li:last').remove();
	});

});
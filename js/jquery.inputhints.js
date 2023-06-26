// jQuery Input Hints plugin
// Copyright (c) 2009 Rob Volk
// http://www.robvolk.com

jQuery.fn.inputHints=function() {
    // hides the input display text stored in the title on focus
    // and sets it on blur if the user hasn't changed it.

    // show the display text
    $(this).each(function(i) {
		if($(this).val() == '' || $(this).val() == 'http://'){
			if($(this).attr('data-hint') == 'password'){
				$(this).get(0).type = 'text';
			}
        	$(this).val($(this).attr('title'))
            	.addClass('hint');
		}
    });
	
	$('form').submit(function() {
		$('input.hint').each(function(i) {
			if($(this).val() == $(this).attr('title')){
				$(this).val('');
			}
		});
	});

    // hook up the blur & focus
    $(this).focus(function() {
		if($(this).attr('data-hint') == 'password'){
			$(this).get(0).type = 'password';
		}
        if ($(this).val() == $(this).attr('title'))
            $(this).val('').removeClass('hint');
    }).blur(function() {
        if ($(this).val() == ''){
			if($(this).attr('data-hint') == 'password'){
				$(this).get(0).type = 'text';
			}
            $(this).val($(this).attr('title')).addClass('hint');
			
		}
    });
};
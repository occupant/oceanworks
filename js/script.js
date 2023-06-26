$(function () {
	if($('#js-news').length){
		$('#js-news').ticker({
			speed: 0.30,
			fadeInSpeed: 600,
			titleText: 'Latest News'
		});
	}
});
if($('#tweets').length){

	var m_names = new Array("Jan", "Feb", "Mar", 
	"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
	"Oct", "Nov", "Dec");

	function formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + '' + ampm;
		return strTime;
	}

	$.getJSON("/scripts/get-tweets.php",
 		function(data){
			$.each(data, function(i,item){
				ct = item.text;
				mytime = item.created_at;
				var strtime = mytime.replace(/(\+\S+) (.*)/, '$2 $1')
				var mydate = new Date(Date.parse(strtime));
				var mytime = new Date(Date.parse(strtime)).toLocaleTimeString();

				var curr_date = mydate.getDate();
				var curr_month = mydate.getMonth();
				var curr_year = mydate.getFullYear();

				var curr_hour = mydate.getFullYear();

				ct = ct.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g,  '<a href="$&" target="_blank">$&</a>');
			    ct = ct.replace(/\s(@)(\w+)/g,    ' @<a href="http://twitter.com/$2" target="_blank">$2</a>');
			    ct = ct.replace(/\s(#)(\w+)/g,    ' #<a href="http://search.twitter.com/search?q=%23$2" target="_blank">$2</a>');
				$("#tweets").append('<li><h2>' + m_names[curr_month] + ' ' + curr_date + ', ' + curr_year + ' ' + formatAMPM(mydate) + '</h2>'+ct + "</li>");
 			});
		});

};

$(document).ready(function() {
	var hoverCheck = 0;
	$('input[title]').inputHints();
	$('#content-boxes a').hoverIntent(
		function(){
			hoverCheck = 1;
			$(this).attr('data-bg');
			$('#content-main').css({'background':'url(../images/bg/'+$(this).attr('data-bg')+'.jpg) no-repeat top center #000'});
			$('#home-overlay').show();
			$('#home-overlay div').hide();
			$('#home-overlay div#'+$(this).attr('data-bg')+'-overlay').show();
		},
		function(){
			hoverCheck = 0;
			setTimeout(function() {
				if(hoverCheck == 0){
					$('#content-main').css({'background':'url(../images/bg/oil-clean.jpg) no-repeat top center #000'});
					$('#home-overlay').hide();
					$('#home-overlay div').hide();
				}
			}, 400);
		}	
	);

	$('.newsletter-signup').click(function(){
		if($(this).css('display') != 'none'){
			$(this).hide();	
			$('#newsletter-form').fadeIn();
			showRecaptcha('myrecap');
		}
	});

	$('#newsletter-close').click(function(){
		$('#newsletter-form').fadeOut();
		$('.newsletter-signup').show();
	});
	
	$('#newsletter-form a').click(function(){
		$('#newsletter-form').hide();
		$('.newsletter-signup').fadeIn();
	});
	
	if($('#gallery').length){
		$(".gallery-image a").fancybox({
			'transitionIn'	:	'elastic',
			'transitionOut'	:	'elastic',
			'speedIn'		:	600, 
			'speedOut'		:	200, 
			'overlayShow'	:	true,
			'titlePosition'	:	'inside'
		});
	}
	
	if($("#contact-form").length){
		$("#contact-form").validate();	
	}
	if($("#newsletter-signup").length){
		$("#newsletter-signup").validate();	
	}
});
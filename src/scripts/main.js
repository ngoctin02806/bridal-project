// Main
$(document).ready(function () {
	// Phần Slider
	$('.home-slider .owl-carousel').owlCarousel({
		items: 1,
		nav: true,
		loop: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		navText: ['<img src="../img/navLeft.png" width="35" height="35"  />', '<img src="../img/navRight.png" width="35" height="35" />'],
	});
	// Phần Clients
	$('.home-clients .owl-carousel').owlCarousel({
		items: 1,
		nav: true,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			// breakpoint from 480 up
			480: {
				items: 2,
			},
			// breakpoint from 768 up
			768: {
				items: 4,
			},
			// breakpoint from 992 up
			992: {
				items: 6
			}
		}
	});

	//Customize-header
	var listItem = $('#header').html(); // Get html of list
	var nav = '<nav class="navbar navbar-expand-lg navbar-light header-nav">'
	+ '<a class="navbar-brand" href="#">'
	+ 	'<img src="./img/logo.png" alt="Logo">'
	+ '</a>' 
	+ '<button class="navbar-toggler header-mo-btn" type="button" data-toggle="collapse" data-target="#header-mo" aria-controls="header" 		aria-expanded="false" aria-label="Toggle navigation">' 
		+ '<span>' 
			+ '<img src="./img/menu.png" alt="list" />'
		+ '</span>' 
	+ '</button></nav>';
	var divElement = $('<div id="header-mo" class="collapse navbar-collapse"></div>') // Create a div element
	$('#header-mobile').append(nav).append(divElement); // Append nav and div element in #header-mobile element
	divElement.html(listItem); // Insert html of list into div element
});


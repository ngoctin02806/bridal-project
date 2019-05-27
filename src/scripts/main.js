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

	var check = true;
	var widthResize = $(window).width();
	if (widthResize <= 576) {
		custimizeInfoPartOfAboutUs(widthResize,check);
		check = false;
	}

	// Resize
	resizeImage();
	$(window).resize(function() {
		resizeImage();
	});
	// for(var i = 0; i < arrListImg.length; i++) {
	//  Example: Call DOM for element again,
	//	This is img element.
	// Syntax: $(element)
	// 	$(arrListImg[i]).css('height',heigthImg )
	// }

	// Collapse
	
});

function custimizeInfoPartOfAboutUs(widthResize, check) {
	if (check) {
		var content1 = $('#content-info-1').html();
		var content2 = $('#content-info-2').html();
		var newContent1 = '<div class="content-info-alter" id="content-info-id-1">' + content1 + '</div>';
		var newContent2 = '<div class="content-info-alter" id="content-info-id-2">' + content2 + '</div>';
		if (widthResize <= 576) {
			$('#content-1').append(newContent1);
			$('#content-2').append(newContent2);
			var divTotal = $('#home-us-total-id');
			divTotal.css('display', 'none');
			check = false;
		}
	}
	else {
		$('#content-info-id-1').remove();
		$('#content-info-id-2').remove();
		$('#home-us-total-id').css('display', 'flex');
		check = true;
	}
	return check;
}

//Resize Image
function resizeImage() {
	var arrListImg = $('.home-demo-dress-item-img figure img');
	var offsetWidthOfDiv = arrListImg[0].offsetWidth;
	var heigthImg = offsetWidthOfDiv * 3/2;
	$('.home-demo-dress-item-img figure img').css('height', heigthImg);
}

// Add click event
function onClickOptional(e) {
	$(e).addClass('actived');
}

// Remove class actived
function removeClass(arrElement) {
	arrElement.foreach((node) => {
		if ($(node).hasClass('actived')) {
			$(node).removeClass('actived');
			return node;
		}
	});
}

//addEventListener for button
function addEventForButton() {
	var arrButton = $('.home-demo-dress-item');
	arrButton.foreach((node) => {
		node.addEventListener('click', function(e) {
			$(node).on('show.bs.collapse', function(e) {
				if (!($(e).attr('class').hasClass('actived'))) {
					var nodePrev = removeClass(arrButton);
					$(nodePrev).collapse('hide');
					onClickOptional(e);
				}
			});
		});
	});
}
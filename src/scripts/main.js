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

	// Resize image of Wedding dress
	resizeImage('.home-demo-dress-item-img figure img', 1.5);
	// $(window).resize(function() {
	// 	resizeImage();
	// });
	// for(var i = 0; i < arrListImg.length; i++) {
	//  Example: Call DOM for element again,
	//	This is img element.
	// Syntax: $(element)
	// 	$(arrListImg[i]).css('height',heigthImg )
	// }

	// Collapse
	addEventForButton();
	// $('#home-demo-dress-id-1').click(function() {
	// 	$('.collapse-demo-dress').collapse('hide');
	// });

	// Show image
	showImageDevices();

	// Resize image of Library
	resizeImage('.home-library-img-item a figure img', 1);

	// Photoswipe
	openPhotoSwipe();
});

function openPhotoSwipe() {
	var pswpElement = document.querySelectorAll('.pswp')[0];

	// build items array
	var items = [
		{
			src: 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
			w: 964,
			h: 1024
		},
		{
			src: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg',
			w: 1024,
			h: 683
		}
	];
	
	// define options (if needed)
	var options = {
			// history & focus options are disabled on CodePen        
		history: false,
		focus: false,

		showAnimationDuration: 0,
		hideAnimationDuration: 0
		
	};
	
	var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
	gallery.init();
}

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
function resizeImage(selectorImg, offset) {
	var arrListImg = $(selectorImg);
	var offsetWidthOfDiv = arrListImg[0].offsetWidth;
	var heigthImg = offsetWidthOfDiv * offset;
	$(selectorImg).css('height', heigthImg);
}

// Add click event
function onClickOptional(e) {
	$(e).addClass('actived');
}

// Remove class actived
function removeClass(arrElement) {
	let pos = 0;
	arrElement.each((index, node) => {
		if ($(node).hasClass('actived')) {
			$(node).removeClass('actived');
			pos = index;
		}
	});
	return pos;
}

// Check class actived
function checkClassActived(arrBtn) {
	arrBtn.each(function(index, node) {
		if ($(node).hasClass('actived')) {
			return index;
		}
	});
}

// addEventListener for button
function addEventForButton() {
	let arrUrl = ['./item1.html', './item2.html', './item3.html', './item4.html'];
	let arrButton = $('.home-demo-dress-item');
	arrButton.each((index, node) => {
		let selectorStr = '#collapse-demo-dress-id-' + (index + 1);
		let event;
		$(node).on('click', function(e) {
			event = e;
			$(selectorStr).collapse('show');
		});
		$(selectorStr).on('show.bs.collapse', function() {
			let pos = removeClass(arrButton);
			if (!($(event.target).hasClass('actived'))) {
				$('#collapse-demo-dress-id-' + (pos + 1)).collapse('hide');
				onClickOptional(event.target);
				$('#see-more').children().attr('href', arrUrl[index]);
			}
		});
	});
}

// Show image on the devieces
function showImageDevices() {
	let arrListImage = $('.home-demo-dress-item-img');
	let shownImg1 = [];
	let shownImg2 = [];
	let shownImg3 = [];
	let shownImg4 = [];
	if ($(window).width() >= 768 && $(window).width() <= 991.98) {
		arrListImage.css('display', 'none');
		for(let i = 0; i < 6; i++) {
			shownImg1.push(arrListImage[i]);
			shownImg2.push(arrListImage[i + 12]);
			shownImg3.push(arrListImage[i + 24]);
			shownImg4.push(arrListImage[i + 36]);
		}

		shownImg1 = shownImg1.concat(shownImg2, shownImg3, shownImg4);

		for(let i = 0; i < shownImg1.length; i++) {
			$(shownImg1).css('display', 'block');
		}
	} else if ($(window).width() <= 767.98) {
		arrListImage.css('display', 'none');
		for(let i = 0; i < 4; i++) {
			shownImg1.push(arrListImage[i]);
			shownImg2.push(arrListImage[i + 12]);
			shownImg3.push(arrListImage[i + 24]);
			shownImg4.push(arrListImage[i + 36]);
		}
		
		shownImg1 = shownImg1.concat(shownImg2, shownImg3, shownImg4);

		for(let i = 0; i < shownImg1.length; i++) {
			$(shownImg1).css('display', 'block');
		}
	}
}
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
	clickShown();

	// Resize img of love story
	resizeImage('.home-love-story .row a figure img', 0.65);

	// Add animation for icon
	addAnimation('.home-services-item figure img');

	// Scroll to section
	srollToSection('.catalog-item');

	// Hover back to top
	$('#back-to-top-id img').hover(function() {
		$(this).addClass('heartBeat');
	}, function() {
		$(this).removeClass('heartBeat');
	});
});

// Get url of image item
function getUrlThumbnail(arrItem) {
	let items = [];
	for(let i = 0; i < arrItem.length; i++) {
		let imgObj = {
			src: $(arrItem[i]).attr('src'),
			w: arrItem[i].naturalWidth,
			h: arrItem[i].naturalHeight
		};
		items.push(imgObj);
	}
	return items;
}


// Photoswipe
function openPhotoSwipe(index, disableAnimation, fromURL) {
	var pswpElement = document.querySelectorAll('.pswp')[0];

	// build items array
	var items = [...getUrlThumbnail($('.home-library-img-item a figure img'))];
	
	// define options (if needed)
	var options = {
		index: index,
		bgOpacity: 0.9,
		indexIndicatorSep: ' - ',
		shareButtons: [
			{id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u=https://hinhanhdephd.com/wp-content/uploads/2016/02/anh-girl-xinh-full-hd-lam-hinh-nen-laptop-13.jpg'},
			{id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
			{id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'},
			{id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
		],
		showHideOpacity: true,
		pinchToClose: true,
		errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
		getDoubleTapZoom: function(isMouseClick, item) {

			// isMouseClick          - true if mouse, false if double-tap
			// item                  - slide object that is zoomed, usually current
			// item.initialZoomLevel - initial scale ratio of image
			//                         e.g. if viewport is 700px and image is 1400px,
			//                              initialZoomLevel will be 0.5
		
			if(isMouseClick) {
		
				// is mouse click on image or zoom icon
		
				// zoom to original
				return 0.7;
		
				// e.g. for 1400px image:
				// 0.5 - zooms to 700px
				// 2   - zooms to 2800px
		
			} else {
		
				// is double-tap
		
				// zoom to original if initial zoom is less than 0.7x,
				// otherwise to 1.5x, to make sure that double-tap gesture always zooms image
				return item.initialZoomLevel < 0.7 ? 1 : 1.5;
			}
		},
		getThumbBoundsFn: function(index) {

			// find thumbnail element
			var thumbnail = document.querySelectorAll('.home-library-img-item a figure img')[index];
		
			// get window scroll Y
			var pageYScroll = window.pageYOffset || document.documentElement.scrollTop; 
			// optionally get horizontal scroll
		
			// get position of element relative to viewport
			var rect = thumbnail.getBoundingClientRect(); 
		
			// w = width
			return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
		
		
			// Good guide on how to get element coordinates:
			// http://javascript.info/tutorial/coordinates
		},
		history: true,
		focus: false,
		showAnimationDuration: 333,
		hideAnimationDuration: 300
		
	};

	// initialise as usual
	var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

	// create variable that will store real size of viewport
	var realViewportWidth,
		useLargeImages = false,
		firstResize = true,
		imageSrcWillChange;

	// beforeResize event fires each time size of gallery viewport updates
	gallery.listen('beforeResize', function() {
		// gallery.viewportSize.x - width of PhotoSwipe viewport
		// gallery.viewportSize.y - height of PhotoSwipe viewport
		// window.devicePixelRatio - ratio between physical pixels and device independent pixels (Number)
		//                          1 (regular display), 2 (@2x, retina) ...


		// calculate real pixels when size changes
		realViewportWidth = gallery.viewportSize.x * window.devicePixelRatio;

		// Code below is needed if you want image to switch dynamically on window.resize

		// Find out if current images need to be changed
		if(useLargeImages && realViewportWidth < 1000) {
			useLargeImages = false;
			imageSrcWillChange = true;
		} else if(!useLargeImages && realViewportWidth >= 1000) {
			useLargeImages = true;
			imageSrcWillChange = true;
		}

		if(imageSrcWillChange && !firstResize) {
			gallery.invalidateCurrItems();
		}

		if(firstResize) {
			firstResize = false;
		}

		imageSrcWillChange = false;

	});


	// Note that init() method is called after gettingData event is bound
	gallery.init();
}

function clickShown() {
	$('.home-library-img-item').on('click', function() {
		let clicked = $(this);
		let index = clicked.attr('data-target');
		openPhotoSwipe(parseInt(index), true, true);
	});
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

// Add animation for icon
function addAnimation(selector) {
	let arrImg = $(selector);
	arrImg.hover(function() {
		let node = $(this);
		node.addClass('magictime vanishOut');
		setTimeout(function() {
			node.removeClass('vanishOut');
		}, 1000);
	})
}

// Remove class
function removeClassActived(selector, className) {
	$(selector).each(function() {
		if ($(this).hasClass(className)) {
			$(this).removeClass(className);
		}
	});
}

// Sroll to each section
function srollToSection(selector) {
	$(selector).on('click', function () {
		let target = $(this).attr('data-target');
		let childNode = $(this).children();
		removeClassActived(selector + ' a', 'actived-catalog');
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 500, function() {
			window.location.hash = target;
			$(childNode).addClass('actived-catalog');
		});
	});
}
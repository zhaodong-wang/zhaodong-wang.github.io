/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

/*-----------------------------------------------------------------------------------*/
/*  DYNAMIC EFFECTS
/*-----------------------------------------------------------------------------------*/

function flipDiv(obj) {
    if (typeof obj.attr('data-transform') == 'undefined') {
        obj.animate({ rotateX: '-150deg' }, 0);
        obj.animate({ rotateX: '0deg' }, 1500, 'easeOutBounce');
    }
}

function slideShowIterative(obj, numChild, duration, easing) {
    duration = duration || 1000;
    easing = easing || 'easeInOutCirc';
    var tempNumChild = numChild - 1;
    obj
    .delay(1500)
    .animate({translateY: '100%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '200%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '300%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '400%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '500%'}, duration, easing)
    .animate({translateY: '-100%'}, 0, 'linear')
    .delay(500)
    .animate({translateY: '0'}, duration, easing)
    .queue(function(next){
        slideShowIterative(obj, numChild);
        next();
    });
}

/*-----------------------------------------------------------------------------------*/
/*  SCROLL AND MOVE
/*-----------------------------------------------------------------------------------*/
function move(element, duration, easing, callback) {
    duration = duration || 1000;
    easing = easing || IScroll.utils.ease.elastic;
    scrollContent.scrollToElement(element, duration);
    // scrollAnimations();
}

/*-----------------------------------------------------------------------------------*/
/*  MENU EFFECTS
/*-----------------------------------------------------------------------------------*/

function toggleMenu() {
    var speed = 70;
    var animDuration = 500;
    var totalDelay;
    if ($('.nav-link-menu').hasClass('active')) {
    	$('nav ul')
    	    .queue(function(next){
    	        $('nav li').each(function(index){
    	            var that = $(this);
    	            setTimeout(function(){
    	                if (!that.hasClass('move-right')) {
    	                    that.addClass('move-right');
    	                };
    	            }, (numNavItem - index) * speed);
    	            totalDelay = index * speed + animDuration;
    	        });
                $('.nav-link-menu').removeClass('active');
                $('.nav-link-menu-inner').animate({'opacity': 1}, 800, 'easeOutCirc');
    	        next();
    	    })
    	    .delay(totalDelay)
    	    .queue(function(next){
    	        $(this).css({'display': 'none'});
    	        $('.fill').removeClass('active');
                $('.nav-link-menu-inner, .nav-link-menu-outer-before, .nav-link-menu-outer-after').animate({'background-color': '#333'}, 800, 'easeOutCirc');
    	        next();
    	    })
    	    .delay(500)
    	    .queue(function(next){
    	        $('nav').removeClass('active');
    	        next();
    	    });
    }
    else {
    	$('nav ul')
            .queue(function(next){
                $('.nav-link-menu-inner').animate({'opacity': 0}, { duration: 300, queue: false }, 'easeOutCirc');
                $('.nav-link-menu-inner, .nav-link-menu-outer-before, .nav-link-menu-outer-after').animate({'background-color': '#ccc'}, { duration: 800, queue: false }, 'easeOutCirc');
    	        $('.nav-link-menu, .fill, nav').addClass('active');
    	        next();
    	    })
    	    .queue(function(next){
    	        $(this).css({'display': 'block'});
    	        next();
    	    })
    	    .delay(500)
    	    .queue(function(next){
    	        $('nav li').each(function(index){
    	            var that = $(this);
    	            setTimeout(function(){
    	                if (that.hasClass('move-right')) {
    	                    that.removeClass('move-right');
    	                };
    	            }, index * speed);
    	        });
    	        next();
    	    });
    }
}

var scrollContent;
var numNavItem = 0;
var numSlideItem = 0;

function updateSizes(){
	var itemHeight = $('.scroll-words p').outerHeight(true);
	$('.scroll-words').css({'height': itemHeight});
	if ($('nav ul').css('display') == 'none') {
            $('nav li').addClass('move-right');
        }
}

$(window).resize(function(){
   updateSizes();
});

$(window).load(function(){
    // add iScroll object
    scrollContent = new IScroll('#scroll-content', {
        probeType: 3,
        mouseWheel: true,
        click: true
    });

    // scrollContent.on('scroll', scrollAnimations);
    // scrollContent.on('scrollEnd', scrollAnimations);

    updateSizes();

    setTimeout(function(){
    	$('.detail, .detail_info').removeClass('hide');
    }, 100);
    slideShowIterative($('.scroll-words p'), numSlideItem);
})

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

$(document).ready(function(){
	// get the number of menu items
    $('nav li').each(function(){
        numNavItem += 1;
    });
    // get the number of slide show items
    $('.scroll-words p').each(function(){
        numSlideItem += 1;
    });
    var tempNumsSlideItem = numSlideItem - 1;
    $('.scroll-words p').css({'top': '-'+ tempNumsSlideItem + '00%'});

    // device detection
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // toggle Menu
        $('.nav-link-menu').on('touchstart',toggleMenu);
        $('.mosaic').click(function(){
            $(this).toggleClass('active');
        });
    } else {
        $('.nav-link-menu').click(toggleMenu);
        $('.mosaic').hover(function(){
            $(this).toggleClass('active');
        });
    }



});

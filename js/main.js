/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

/*-----------------------------------------------------------------------------------*/
/*  DYNAMIC EFFECTS
/*-----------------------------------------------------------------------------------*/


function spinLoader() {
    $('.pre-loader-container')
    .queue(function(next){
        $(this).animate({ rotate: '180deg' }, 500, 'easeInOutQuart');
        next();
    })
    .delay(510)
    .queue(function(next){
        $(this).animate({ rotate: '0deg' }, 0);
        next();
    })
    .queue(function(next){
        spinLoader();
        next();
    });
}

function transformLoader() {
    $('.pre-loader-container').animate({ rotate: '30deg' }, 600, 'easeInOutQuart');
    $('.stick.left').css({
        '-webkit-transform': 'rotate(90deg) scaleX(1.380) translateX(-12px)',
        '-moz-transform': 'rotate(90deg) scaleX(1.380) translateX(-12px)',
        'transform': 'rotate(90deg) scaleX(1.380) translateX(-12px)'
    });
    $('.stick.top').css({
        '-webkit-transform': 'rotate(20.1deg) scaleX(1.300) translateX(7px)',
        '-moz-transform': 'rotate(20.1deg) scaleX(1.300) translateX(7px)',
        'transform': 'rotate(20.1deg) scaleX(1.300) translateX(7px)'
    });
    $('.stick.right').css({
        '-webkit-transform': 'rotate(-70.1deg) scaleX(0.960) translate(3px, 12px)',
        '-moz-transform': 'rotate(-70.1deg) scaleX(0.960) translate(3px, 12px)',
        'transform': 'rotate(-70.1deg) scaleX(0.960) translate(3px, 12px)'
    });
    $('.stick.left.inner').css({
        '-webkit-transform': 'rotate(70deg) scaleX(1.1) translateX(-12px) translateY(-6px)',
        '-moz-transform': 'rotate(70deg) scaleX(1.1) translateX(-12px) translateY(-6px)',
        'transform': 'rotate(70deg) scaleX(1.1) translateX(-12px) translateY(-6px)'
    });
    $('.stick.right.inner').css({
        '-webkit-transform': 'rotate(30deg) scaleX(0.7) translate(23px, 33px)',
        '-moz-transform': 'rotate(30deg) scaleX(0.7) translate(23px, 33px)',
        'transform': 'rotate(30deg) scaleX(0.7) translate(23px, 33px)'
    });
    $('.stick.top.inner').css({
        '-webkit-transform': 'rotate(-30deg) scaleX(0.95) translate(7px, 9px)',
        '-moz-transform': 'rotate(-30deg) scaleX(0.95) translate(7px, 9px)',
        'transform': 'rotate(-30deg) scaleX(0.95) translate(7px, 9px)'
    });
    $('.stick.bottom.inner').css({
        '-webkit-transform': 'rotate(-42deg) scaleX(0.5) translate(-43px, 29px)',
        '-moz-transform': 'rotate(-42deg) scaleX(0.5) translate(-43px, 29px)',
        'transform': 'rotate(-42deg) scaleX(0.5) translate(-43px, 29px)'
    });
}

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
    .animate({translateY: '100%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '200%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '300%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '400%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '500%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '600%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '700%'}, duration, easing)
    .animate({translateY: '0'}, 0, 'linear')
    .delay(500)
    .queue(function(next){
        slideShowIterative(obj, numChild);
        next();
    });
}

function pageTransition(obj, targetPage) {
    obj
    .queue(function(next){
        $('.cover-transition').css({
            'display': 'block'
        });
        next();
    })
    .queue(function(next){
        $('.cover-transition').animate({
            'opacity': 1
        }, 400);
        next();
    })
    .delay(400)
    .queue(function(next){
        window.location.href = targetPage;
        next();
    });
}


function addNextCircle(obj, duration) {
    duration = 500 || duration;
    var $circle = $('<div class="next-logo pulse"></div>');
    obj.before($circle);
    $circle.animate({
        'opacity': 0,
        'width': '100px',
        'height': '100px',
        'right': '90px',
        'bottom': '90px'
    }, duration, 'easeOutCirc');

    setTimeout(function __remove() {
        $circle.remove();
    }, duration);
}

function addFromCircle(obj, duration) {
    duration = 500 || duration;
    var $circle = $('<div class="circle from pulse"></div>');
    obj.before($circle);
    $circle.animate({
        'opacity': 0,
        'width': '100px',
        'height': '100px',
        'top': '-10px',
        'left': '-10px'
    }, duration, 'easeOutCirc');

    setTimeout(function __remove() {
        $circle.remove();
    }, duration);
}

function addToCircle(obj, duration) {
    duration = 500 || duration;
    var $circle = $('<div class="circle to pulse"></div>');
    obj.after($circle);
    $circle.animate({
        'opacity': 0,
        'width': '100px',
        'height': '100px',
        'bottom': '-10px',
        'left': '-10px'
    }, duration, 'easeOutCirc');

    setTimeout(function __remove() {
        $circle.remove();
    }, duration);
}

/*-----------------------------------------------------------------------------------*/
/*  SCROLL AND MOVE
/*-----------------------------------------------------------------------------------*/
function move(scrollContent, element, duration, easing, callback) {
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
    	        $('nav li, nav hr').each(function(index){
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
    	        $('nav li, nav hr').each(function(index){
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

var numNavItem = 0;
var numSlideItem = 0;
var winHeight;
var winWidth;

function updateSizes(){
    winHeight = $(window).height();
    winWidth = $(window).width();
	var itemHeight = $('.scroll-words p').outerHeight(true);
	$('.scroll-words').css({'height': itemHeight});
	if ($('nav ul').css('display') == 'none') {
            $('nav li, nav hr').addClass('move-right');
        }

    if (winWidth < 600) {
        $('.meta').css({'height': '200px'});
        $('.element').each(function(){
            var totalHeight = 0;
            totalHeight += $(this).children('.meta').outerHeight(true);
            totalHeight += $(this).children('.content').outerHeight(true);
            $(this).css({'height': totalHeight});
        })
    } else {
        $('.meta').each(function(){
            var tempHeight = $(this).next().outerHeight(true);
            $(this).css({'height': tempHeight});
            $(this).parent().css({'height': tempHeight});
        });
    }
}

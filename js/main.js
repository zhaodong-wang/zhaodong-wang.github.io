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


function addNextCircle(obj, duration, scale) {
    var duration = duration || 500;
    var scale = scale || 1.2;
    var $circle = $('<div class="next-logo pulse"></div>');
    obj.before($circle);
    var oldWidth = parseInt(obj.css('width'), 10);
    var oldHeight = parseInt(obj.css('height'), 10);
    var width = scale * oldWidth;
    var height = scale * oldHeight;
    var right = parseInt(obj.css('right'), 10) - (width - oldWidth)/2;
    var bottom = parseInt(obj.css('bottom'), 10) - (height - oldHeight)/2;
    $circle.animate({
        'opacity': 0,
        'width': width + 'px',
        'height': height + 'px',
        'right': right + 'px',
        'bottom': bottom + 'px'
    }, duration, 'easeOutCirc');

    setTimeout(function __remove() {
        $circle.remove();
    }, duration);
}

function addFromCircle(obj, duration, scale) {
    var duration = duration || 500;
    var scale = scale || 1.2;
    var $circle = $('<div class="circle from pulse"></div>');
    obj.before($circle);
    var oldWidth = parseInt(obj.css('width'), 10);
    var oldHeight = parseInt(obj.css('height'), 10);
    var width = scale * oldWidth;
    var height = scale * oldHeight;
    var top = - (height - oldHeight)/2;
    var left = - (width - oldWidth)/2;
    $circle.animate({
        'opacity': 0,
        'width': width + 'px',
        'height': height + 'px',
        'top': top + 'px',
        'left': left + 'px'
    }, duration, 'easeOutCirc');

    setTimeout(function __remove() {
        $circle.remove();
    }, duration);
}

function addToCircle(obj, duration, scale) {
    var duration = duration || 500;
    var scale = scale || 1.2;
    var $circle = $('<div class="circle to pulse"></div>');
    obj.before($circle);
    var oldWidth = parseInt(obj.css('width'), 10);
    var oldHeight = parseInt(obj.css('height'), 10);
    var width = scale * oldWidth;
    var height = scale * oldHeight;
    var bottom = - (height - oldHeight)/2;
    var left = - (width - oldWidth)/2;
    $circle.animate({
        'opacity': 0,
        'width': width + 'px',
        'height': height + 'px',
        'bottom': bottom + 'px',
        'left': left + 'px'
    }, duration, 'easeOutCirc');

    setTimeout(function __remove() {
        $circle.remove();
    }, duration);
}

function animateNumber(obj, endVal) {
    var startVal = obj.text();
    var currentVal = startVal;
    var iterval = setInterval(function ()
    {
        if (currentVal === endVal)
        {
            clearInterval(iterval);
        }
        else
        {
            currentVal++;
            obj.text(currentVal);
        }
    }, 100);
}

function animateStroke(obj, endPercent) {
    var startVal = parseInt(obj.css('width'), 10);
    var startPercent = Math.round(startVal / parseInt(obj.parent().css('width'), 10) * 2 * 100);
    var currentPercent = startPercent;
    if (currentPercent < parseInt(endPercent, 10)) {
        var endWidth = parseInt(endPercent, 10) / 2;
        obj.animate({width: endWidth + '%'}, {
            duration: 1000,
            easing: 'swing',
            progress: function(promiseAnim, progressNum, remainMs) {
                var currentPercent = Math.round(parseInt(endPercent, 10) * progressNum);
                obj.next().text(currentPercent + '%');
            }
        });
    };
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
    	                that.toggleClass('move-right');
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
    	                that.toggleClass('move-right');
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
        $('.element').not('#skill-main').each(function(){
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

$(document).ready(function(){
    // get the number of menu items
    $('nav li').each(function(){
        numNavItem += 1;
    });

    // device detection
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // toggle Menu
        $('.nav-link-menu').on('touchstart',toggleMenu);
        $('.next-logo').each(function(){
            $(this).on('touchstart', function(){
                addNextCircle($(this));
            });
        });
        $('.nav-home').each(function(){
            $(this).click(function(){
                $(this).queue(function(next){
                    $(this).toggleClass('active');
                    next();
                })
                .delay(700)
                .queue(function(next){
                    pageTransition($(this), 'index.html');
                    next();
                })
            });
        });
        $('.nav-education').each(function(){
            $(this).click(function(){
                $(this).queue(function(next){
                    $(this).toggleClass('active');
                    next();
                })
                .delay(700)
                .queue(function(next){
                    pageTransition($(this), 'education.html');
                    next();
                })
            });
        });
        $('.nav-projects').each(function(){
            $(this).click(function(){
                $(this).queue(function(next){
                    $(this).toggleClass('active');
                    next();
                })
                .delay(700)
                .queue(function(next){
                    pageTransition($(this), 'projects.html');
                    next();
                })
            });
        });
        $('.nav-publications').each(function(){
            $(this).click(function(){
                $(this).queue(function(next){
                    $(this).toggleClass('active');
                    next();
                })
                .delay(700)
                .queue(function(next){
                    pageTransition($(this), 'publications.html');
                    next();
                })
            });
        });
        $('.nav-skills').each(function(){
            $(this).click(function(){
                $(this).queue(function(next){
                    $(this).toggleClass('active');
                    next();
                })
                .delay(700)
                .queue(function(next){
                    pageTransition($(this), 'skills.html');
                    next();
                })
            });
        });
    } else {
        $('.nav-link-menu').click(toggleMenu);
        $('.next-logo').each(function(){
            $(this).mouseenter(function(){
                addNextCircle($(this));
            });
        });
        $('.left, .right').hover(function(){
            $(this).toggleClass('active');
        });
        $('.nav-home').each(function(){
            $(this).click(function(){
                pageTransition($(this), 'index.html');
            });
        });
        $('.nav-education').each(function(){
            $(this).click(function(){
                pageTransition($(this), 'education.html');
            });
        });
        $('.nav-projects').each(function(){
            $(this).click(function(){
                pageTransition($(this), 'projects.html');
            });
        });
        $('.nav-publications').each(function(){
            $(this).click(function(){
                pageTransition($(this), 'publications.html');
            });
        });
        $('.nav-skills').each(function(){
            $(this).click(function(){
                pageTransition($(this), 'skills.html');
            });
        });
    }
});

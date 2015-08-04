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
    .delay(500)
    .animate({'top': '-300%'}, duration, easing)
    .delay(500)
    .animate({'top': '-200%'}, duration, easing)
    .delay(500)
    .animate({'top': '-100%'}, duration, easing)
    .delay(500)
    .animate({'top': '0'}, duration, easing)
    .delay(500)
    .animate({'top': '100%'}, duration, easing)
    .animate({'top': '-' + numChild + '00%'}, 0, 'linear')
    .delay(500)
    .animate({'top': '-' + tempNumChild + '00%'}, duration, easing)
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
    	        next();
    	    })
    	    .delay(totalDelay)
    	    .queue(function(next){
    	        $(this).css({'display': 'none'});
    	        $('.nav-link-menu, .fill').removeClass('active');
    	        next();
    	    })
    	    .delay(500)
    	    .queue(function(next){
    	        $('nav').removeClass('active');
    	        $('.nav-link-menu-outer-before, .nav-link-menu-outer-after').removeAttr('style');
    	        next();
    	    });
    }
    else {
    	$('nav ul')
    		.queue(function(next){
    	        $('.nav-link-menu-outer-before, .nav-link-menu-outer-after').css({'borderColor': '#ccc'});
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
    	$('.detail').removeClass('hide');
    }, 100);
    slideShowIterative($('.scroll-words p'), numSlideItem + 1);
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
    numSlideItem -= 1;
    $('.scroll-words p').css({'top': '-'+ numSlideItem + '00%'});

    // menu items
    $('#menu-about').click(function(){
        move('#about', 0);
        toggleMenu();
    });
    $('#menu-edu').click(function(){
        move('#edu', 0);
        toggleMenu();
    });
    $('#menu-proj').click(function(){
        move('#project', 0);
        toggleMenu();
    });
    $('#menu-pub').click(function(){
        move('#pubs', 0);
        toggleMenu();
    });
    $('#menu-skills').click(function(){
        move('#skill', 0);
        toggleMenu();
    });
    $('#menu-contact').click(function(){
        move('#contact', 0);
        toggleMenu();
    });

    // device detection
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // toggle Menu
        $('.nav-link-menu').on('touchstart',toggleMenu);
    } else {
        $('.nav-link-menu').click(toggleMenu);
    }

});

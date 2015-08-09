/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

var scrollContentIndex;

$(window).resize(function(){
   updateSizes();
   if (!scrollContentIndex) scrollContentEdu.refresh();
});

$(window).load(function(){

    // add iScroll object
    scrollContentIndex = new IScroll('#scroll-content', {
        probeType: 3,
        mouseWheel: true,
        click: true
    });

    updateSizes();
    scrollContentIndex.refresh();
    // scrollContentIndex.on('scroll', scrollAnimations);
    // scrollContentIndex.on('scrollEnd', scrollAnimations);

    // fadeout preloader and show the main page
    $('body')
    .delay(2000)
    .queue(function(next){
        $('.pre-loader-container').clearQueue();
        $('.pre-loader-container').stop(true, false);
        next();
    })
    .delay(500)
    .queue(function(next){
        transformLoader();
        next();
    })
    .delay(1500)
    .queue(function(next){
        $('.pre-loader').css({
            'opacity': 0
        })
        $('.pre-loader-container').animate({scale: '0.7' }, 500, 'easeInOutQuart');
        next();
    })
    .delay(610)
    .queue(function(next){
        $('.pre-loader').fadeOut(0);
        next();
    })
    .queue(function(next){
        $('.detail, .detail_info').removeClass('hide');
        slideShowIterative($('.scroll-words p'), numSlideItem);
        next();
    });
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
    $('.scroll-words p').css({'top': '-'+ numSlideItem + '00%'});

    // device detection
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // toggle Menu
        $('.nav-link-menu').on('touchstart',toggleMenu);
        $('#education').click(function(){
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
        $('#projects').click(function(){
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
        $('#publications').click(function(){
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
        $('.next-logo').each(function(){
            $(this).on('touchstart', function(){
                addNextCircle($(this));
            });
        });
    } else {
        $('.nav-link-menu').click(toggleMenu);
        $('.mosaic').hover(function(){
            $(this).toggleClass('active');
        });
        $('#education').click(function(){
            pageTransition($(this), 'education.html');
        });
        $('#projects').click(function(){
            pageTransition($(this), 'projects.html');
        });
        $('#publications').click(function(){
            pageTransition($(this), 'publications.html');
        });
        $('.next-logo').each(function(){
            $(this).mouseenter(function(){
                addNextCircle($(this));
            });
        });
    }

    $('.pre-loader-container')
    .queue(function(next){
        $(this).animate({translateY: '50px'}, 0);
        next();
    })
    .queue(function(next){
        $(this).css({
            'opacity': 1
        });
        $(this).animate({translateY: '0px'}, 600, 'easeInOutCirc');
        next();
    })
    .queue(function(next){
        spinLoader();
        next();
    });

});

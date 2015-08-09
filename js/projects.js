/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

var scrollContentProj;

$(window).resize(function(){
   updateSizes();
   if (!scrollContentProj) scrollContentProj.refresh();
});

$(window).load(function(){
    // add iScroll object

    scrollContentProj = new IScroll('#scroll-content', {
        probeType: 3,
        mouseWheel: true,
        click: true
    });

    updateSizes();
    scrollContentProj.refresh();
    // scrollContentProj.on('scroll', scrollAnimations);
    // scrollContentProj.on('scrollEnd', scrollAnimations);


    // fadeout cover and show the main page
    $('.title-container, .sub-home, .next-logo').removeClass('hide');
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
        $('.circle.from').each(function(){
            $(this).on('touchstart', function(){
                addFromCircle($(this));
            });
        });
        $('.circle.to').each(function(){
            $(this).on('touchstart', function(){
                addToCircle($(this));
            });
        });
        $('.next-logo').each(function(){
            $(this).on('touchstart', function(){
                addNextCircle($(this));
            });
        });
    } else {
        $('.nav-link-menu').click(toggleMenu);
        $('.circle.from').each(function(){
            $(this).mouseenter(function(){
                addFromCircle($(this));
            });
        });
        $('.circle.to').each(function(){
            $(this).mouseenter(function(event){
                event.stopPropagation();
                addToCircle($(this));
            });
        });
        $('.next-logo').each(function(){
            $(this).mouseenter(function(){
                addNextCircle($(this));
            });
        });
    }
});

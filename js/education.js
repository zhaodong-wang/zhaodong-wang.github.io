/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

var scrollContentEdu;

$(window).resize(function(){
   updateSizes();
   if (!scrollContentEdu) scrollContentEdu.refresh();
});

$(window).load(function(){
    // add iScroll object

    scrollContentEdu = new IScroll('#scroll-content', {
        probeType: 3,
        mouseWheel: true,
        click: true
    });

    updateSizes();
    scrollContentEdu.refresh();
    // scrollContentEdu.on('scroll', scrollAnimations);
    // scrollContentEdu.on('scrollEnd', scrollAnimations);


    // fadeout cover and show the main page
    $('.title-container, .sub-home, .next-logo').removeClass('hide');
})

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

$(document).ready(function(){

    // device detection
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // toggle Menu
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
    } else {
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
    }
});

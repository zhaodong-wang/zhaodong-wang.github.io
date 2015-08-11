/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

var scrollContentPub;

$(window).resize(function(){
   updateSizes();
   if (!scrollContentPub) scrollContentPub.refresh();
});

$(window).load(function(){
    // add iScroll object

    scrollContentPub = new IScroll('#scroll-content', {
        probeType: 3,
        mouseWheel: true,
        click: true
    });

    updateSizes();
    scrollContentPub.refresh();
    // scrollContentPub.on('scroll', scrollAnimations);
    // scrollContentPub.on('scrollEnd', scrollAnimations);


    // fadeout cover and show the main page
    $('.title-container, .sub-home, .next-logo').removeClass('hide');
    setTimeout(function(){
        animateNumber($('#paper-counter'), 4);
        animateNumber($('#manu-counter'), 2);
        animateNumber($('#conf-counter'), 8);
    }, 500);
})

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

$(document).ready(function(){

    // device detection
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // toggle Menu
        $('.circle.to').each(function(){
            $(this).on('touchstart', function(){
                addToCircle($(this), 1000, 1.5);
            });
        });
    } else {
        $('.circle.to').each(function(){
            $(this).mouseenter(function(){
                addToCircle($(this), 1000, 1.5);
            });
        });
    }
});

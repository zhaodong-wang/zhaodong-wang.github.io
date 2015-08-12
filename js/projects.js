/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

function scrollAnimations() {
    commonScrollAnimations(this);
    ratio = this.y / $('#proj-home').height();
    $('.element').each(function(){
        if ($(this).offset().top < 100 || ifBottom) {
            animateCircleTo($(this).find('.circle.to'));
        };
    });
    if ($('#proj-home').next().offset().top > 0) {
        $('#proj-home').css({'background-position-y': -0.5 * this.y});
    };
}

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

    scrollContentProj.on('scroll', scrollAnimations);
    scrollContentProj.on('scrollEnd', scrollAnimations);
    startY = scrollContentProj.y;

    // fadeout cover and show the main page
    $('.title-container, .sub-home, .next-logo').removeClass('hide');
    scrollAnimations();
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
            $(this).mouseenter(function(){
                addToCircle($(this));
            });
        });
    }
});

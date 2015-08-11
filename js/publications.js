/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

var indexToLightUp;
var indexToLightUpTemp;

function scrollAnimations() {
    commonScrollAnimations(this);
    ratio = this.y / $('#proj-home').height();
    if ($('#papers').offset().top < 100 || ifBottom) {
        var minDistance = Number.POSITIVE_INFINITY;

        // get the index of closest item
        $('.element').each(function(i){
            var distTemp = Math.abs($(this).offset().top - 0.5 * $('#proj-home').height());
            if (distTemp <= minDistance) {
                minDistance = distTemp;
                indexToLightUp = i;
            }
        });

        // light up the item that is nearest to the center of the window
        $('.element').each(function(i){
            if (i == indexToLightUp) {
                if ((typeof indexToLightUpTemp == 'undefined') ||
                    (indexToLightUpTemp != indexToLightUp)) {
                    addToCircle($(this).find('.circle.to'), 700, 1.3);
                    indexToLightUpTemp = indexToLightUp;
                }
            }
        });
    }
}

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

    scrollAnimations();
    scrollContentPub.on('scroll', scrollAnimations);
    scrollContentPub.on('scrollEnd', scrollAnimations);
    startY = scrollContentPub.y;


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
    $('.circle.to').css({
        'opacity': 1,
        'bottom': 0
    });
    // device detection
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // toggle Menu
        $('.circle.to').each(function(){
            $(this).on('touchstart', function(){
                addToCircle($(this), 700, 1.3);
            });
        });
    } else {
        $('.circle.to').each(function(){
            $(this).mouseenter(function(){
                addToCircle($(this), 700, 1.3);
            });
        });
    }
});

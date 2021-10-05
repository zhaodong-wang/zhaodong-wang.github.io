/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

var indexToLightUp;
var indexToLightUpTemp;
var circlesToAnimated = [];

function scrollAnimations() {
    commonScrollAnimations(this);
    ratio = this.y / $('#proj-home').height();
    if ($('#pub-home').next().offset().top > 0) {
        $('#pub-home').css({'background-position-y': -0.5 * this.y});
    };
}

function scrollEndAnimations() {
    commonScrollAnimations(this);
    $('.element').each(function(i){
        if ($(this).offset().top < $('#pub-home').height() &&
            $(this).offset().top > - $(this).outerHeight(true)) {
            if (!circlesToAnimated[i]) {
                circlesToAnimated[i] = true;
                addToCircle($(this).find('.circle.to'), 700, 1.3);
                $(this).find('.temp div').each(function(i){
                    var height = $(this).height();
                    var width = parseInt($(this).width(), 10);
                    var obj = $(this);
                    $({ val: 0 }).delay(i * 25).animate({ val: width }, {
                        duration: 600,
                        easing: 'swing',
                        step: function (now) {
                            if (obj.hasClass('text-center')) {
                                obj.css({
                                    clip: 'rect(0, ' + (width/2 + now/2) + 'px, ' + height + 'px, ' + (width/2 - now/2) + 'px)'
                                })
                            } else {
                                obj.css({
                                    clip: 'rect(0, ' + now + 'px, ' + height + 'px, 0)'
                                })
                            };

                        }
                    });
                })
            };
        } else {
            if (circlesToAnimated[i]) {
                circlesToAnimated[i] = false;
                $(this).find('.temp div').each(function(i){
                    if ($(this).hasClass('text-center')) {
                        $(this).css({
                            clip: 'rect(0, ' + $(this).width()/2 + 'px, ' + $(this).height() + 'px, ' + $(this).width()/2 + 'px)'
                        });
                    } else {
                        $(this).css({clip: 'rect(0, 0px, ' + $(this).height() + 'px, 0)'});
                    }
                });
            };
        };
    });
}

var scrollContentPub;

$(window).resize(function(){
    updateSizes();
    if (!scrollContentPub) scrollContentPub.refresh();
    $('.temp').remove();
    copyTexts($('.element .publication').children().not('.temp'));
    copyTexts($('.title h1').not('.temp'), "center");
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

    scrollContentPub.on('scroll', scrollAnimations);
    scrollContentPub.on('scrollEnd', scrollEndAnimations);
    startY = scrollContentPub.y;

    copyTexts($('.element .publication').children().not('.temp'));
    copyTexts($('.title h1').not('.temp'), "center");
    // fadeout cover and show the main page
    $('body')
    .queue(function(next){
        $('.title-container, .sub-home, .next-logo').removeClass('hide');
        next();
    })
    .delay(800)
    .queue(function(next){
        $('header').removeClass('hide');
        next();
    });
    setTimeout(function(){
        animateNumber($('#paper-counter'), 5);
        animateNumber($('#manu-counter'), 5);
        animateNumber($('#conf-counter'), 8);
    }, 500);
    scrollAnimations();
})

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

$(document).ready(function(){
    $('.circle.to').css({
        'opacity': 1,
        'bottom': 0
    });

    $('.element').each(function(){
        circlesToAnimated.push(false);
    });
    // device detection
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // toggle Menu
        $('.circle.to').each(function(){
            $(this).on('touchstart', function(){
                addToCircle($(this), 700, 1.4);
            });
        });
    } else {
        $('.circle.to').each(function(){
            $(this).mouseenter(function(){
                addToCircle($(this), 700, 1.4);
            });
        });
    }
});

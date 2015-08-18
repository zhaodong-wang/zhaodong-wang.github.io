/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

var circlesToAnimated = [];

function scrollAnimations() {
    commonScrollAnimations(this);
    ratio = this.y / $('#proj-home').height();
    if ($('#proj-home').next().offset().top > 0) {
        $('#proj-home').css({'background-position-y': - 0.5 * this.y});
    };

    $('.pano').each(function(){
        var offset = $(this).offset().top - $('#proj-home').height();
        $(this).css({'background-position-y': 0.3 * offset - 0.3 * $(this).height()});
    });
}

function scrollEndAnimations() {
    commonScrollAnimations(this);
    $('.element').each(function(i){
        if ($(this).offset().top < $('#proj-home').height() &&
            $(this).offset().top > - $(this).outerHeight(true)) {
            if (!circlesToAnimated[i]) {
                circlesToAnimated[i] = true;
                animateCircleTo($(this).find('.circle.to'));
                $(this).find('.temp div').each(function(i){
                    var height = $(this).height();
                    var width = parseInt($(this).width(), 10);
                    var obj = $(this);
                    $({ val: 0 }).delay(i * 25).animate({ val: width }, {
                        duration: 600,
                        easing: 'swing',
                        step: function (now) {
                            obj.css({
                                clip: 'rect(0, ' + now + 'px, ' + height + 'px, 0)'
                            })
                        }
                    });
                })
            };
        } else {
            if (circlesToAnimated[i]) {
                circlesToAnimated[i] = false;
                recoverCircleTo($(this).find('.circle.to'));
                $(this).find('.temp div').each(function(i){
                    $(this).css({clip: 'rect(0, 0px, ' + $(this).height() + 'px, 0)'});
                });
            };
        };
    });
}

var scrollContentProj;

$(window).resize(function(){
   updateSizes();
   if (!scrollContentProj) scrollContentProj.refresh();
   $('.temp').remove();
   copyTexts($('.element .content').children().not('.temp'));
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
    scrollContentProj.on('scrollEnd', scrollEndAnimations);
    startY = scrollContentProj.y;

    copyTexts($('.element .content').children().not('.temp'));
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
    scrollAnimations();
})

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

$(document).ready(function(){

    $('.element').each(function(){
        circlesToAnimated.push(false);
    });
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

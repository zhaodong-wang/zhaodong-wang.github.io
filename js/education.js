/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

var circlesToAnimated = [];

function scrollAnimations() {
    commonScrollAnimations(this);
    ratio = this.y / $('#edu-home').height();

    $('.element img.bg-logo').each(function(){
        var offset = $(this).offset().top + 0.5 * $(this).height() - 0.6 * $('#edu-home').height();
        $(this).css({
            '-webkit-transform': 'translateY(' + offset * 0.3 + 'px)',
            '-moz-transform': 'translateY(' + offset * 0.3 + 'px)',
            'transform': 'translateY(' + offset * 0.3 + 'px)'
        });
    });
    if ($('#edu-home').next().offset().top > 0) {
        $('#edu-home').css({'background-position-y': -0.5 * this.y});
    };
    $('.pano').each(function(){
        var offset = $(this).offset().top - $('#edu-home').height();
        $(this).css({'background-position-y': 0.3 * offset - 0.8 * $(this).height()});
    });
}

function scrollEndAnimations() {
    commonScrollAnimations(this);
    $('.element').each(function(i){
        if ($(this).offset().top < $('#edu-home').height() &&
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

    scrollContentEdu.on('scroll', scrollAnimations);
    scrollContentEdu.on('scrollEnd', scrollEndAnimations);
    startY = scrollContentEdu.y;

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

    // $('.content h1').click(function(){
    //     copyTexts($(this).parent().children().not('.temp'));
    // })
    // copyTexts($('#tsinghua .content').children().not('.temp'));

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

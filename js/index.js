/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

/*-----------------------------------------------------------------------------------*/
/*  SCROLL AND MOVE
/*-----------------------------------------------------------------------------------*/

var aboutMove;
function scrollAnimations() {
    // scrollContent.maxScrollY = scrollContent.y - $('footer').offset().top - $('footer').outerHeight(true) + winHeight;
    // var maxscroll = scrollContent.maxScrollY;

    commonScrollAnimations(this);

    var aboutOffset = $("#about").offset().top;
    ratio = this.y / $('#home').height();
    // var ratio = this.y / winHeight;
    // cover home page
    if (aboutOffset >= 0) {
        $('#home .cover').css({'opacity': - ratio});
        $('#about .pic').css({
            '-webkit-transform': 'translateX(' + Math.round( - (1 + ratio) * aboutMove) + '%)',
            '-moz-transform': 'translateX(' + Math.round( - (1 + ratio) * aboutMove) + '%)',
            'transform': 'translateX(' + Math.round( - (1 + ratio) * aboutMove) + '%)',
            'opacity': - ratio
        });
        $('#about .profile').css({
            '-webkit-transform': 'translateX(' + Math.round((1 + ratio) * aboutMove) + '%)',
            '-moz-transform': 'translateX(' + Math.round((1 + ratio) * aboutMove) + '%)',
            'transform': 'translateX(' + Math.round((1 + ratio) * aboutMove) + '%)',
            'opacity': - ratio
        });
    };
    $('.mosaic').each(function(){
        var offset = $(this).offset().top - 0.2 * $('#home').height();
        $(this).children('.title').css({
            '-webkit-transform': 'translateY(' + offset * 0.5 + 'px)',
            '-moz-transform': 'translateY(' + offset * 0.5 + 'px)',
            'transform': 'translateY(' + offset * 0.5 + 'px)'
        });
    });
}

var scrollContentIndex;

$(window).resize(function(){
   updateSizes();
   if (!scrollContentIndex) scrollContentIndex.refresh();
});

$(window).load(function(){

    // add iScroll object
    scrollContentIndex = new IScroll('#scroll-content', {
        probeType: 3,
        mouseWheel: true,
        click: true,
        useTransition: false,
        bindToWrapper: true
    });

    updateSizes();
    scrollContentIndex.refresh();

    scrollAnimations();
    scrollContentIndex.on('scroll', scrollAnimations);
    scrollContentIndex.on('scrollEnd', scrollAnimations);
    startY = scrollContentIndex.y;
    // fadeout preloader and show the main page
    $('body')
    .delay(2000)
    .queue(function(next){
        $('.pre-loader-container').clearQueue();
        $('.pre-loader-container').stop(true, true);
        next();
    })
    .delay(500)
    .queue(function(next){
        transformLoader($('.pre-loader-container').not('.forks'));
        next();
    })
    .delay(1500)
    .queue(function(next){
        $('.pre-loader').css({
            'opacity': 0
        })
        $('.pre-loader-container').not('.forks').animate({scale: '0.7' }, 500, 'easeInOutQuart');
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
        $('header').removeClass('hide');
        next();
    });
})

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

$(document).ready(function(){
    // get the number of slide show items
    $('.scroll-words p').each(function(){
        numSlideItem += 1;
    });
    $('.scroll-words p').css({'top': '-'+ numSlideItem + '00%'});

    // device detection
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        aboutMove = 50;
        // toggle Menu
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
        $('#skills').click(function(){
            $(this).queue(function(next){
                $(this).toggleClass('active');
                next();
            })
            .delay(700)
            .queue(function(next){
                pageTransition($(this), 'skills.html');
                next();
            })
        });
        $('.contact-wrapper').each(function(){
            $(this).on('touchstart', function(){
                $(this).toggleClass('active');
            });
        });
    } else {
        aboutMove = 200;
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
        $('#skills').click(function(){
            pageTransition($(this), 'skills.html');
        });
        $('.contact-wrapper').each(function(){
            $(this).hover(function(){
                $(this).toggleClass('active');
            });
        });
    }

    $('.pre-loader-container').not('.forks')
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
        spinLoader($('.pre-loader-container').not('.forks'));
        next();
    });

});

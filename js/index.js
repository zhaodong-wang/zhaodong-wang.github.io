/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

/*-----------------------------------------------------------------------------------*/
/*  SCROLL AND MOVE
/*-----------------------------------------------------------------------------------*/

var startY;

function scrollAnimations() {
    var about_offset = $("#about").offset().top;
    // scrollContent.maxScrollY = scrollContent.y - $('footer').offset().top - $('footer').outerHeight(true) + winHeight;
    // var maxscroll = scrollContent.maxScrollY;

    // automatically hide menu
    if (this.y < startY) $('header').addClass('hide');
    if (this.y > startY) $('header').removeClass('hide');
    startY = this.y;

    // cover home page
    if (about_offset >= 0) {
        $('#home .cover').css({'opacity': - this.y / winHeight});
        $('#about .pic').css({
            '-webkit-transform': 'translateX(' + Math.round( - 200 - this.y / winHeight * 200) + '%)',
            '-moz-transform': 'translateX(' + Math.round( - 200 - this.y / winHeight * 200) + '%)',
            'transform': 'translateX(' + Math.round( - 200 - this.y / winHeight * 200) + '%)',
            'opacity': - this.y / winHeight
        });
        $('#about .profile').css({
            '-webkit-transform': 'translateX(' + Math.round( 200 + this.y / winHeight * 200) + '%)',
            '-moz-transform': 'translateX(' + Math.round( 200 + this.y / winHeight * 200) + '%)',
            'transform': 'translateX(' + Math.round( 200 + this.y / winHeight * 200) + '%)',
            'opacity': - this.y / winHeight
        });
    };
    $('.mosaic').each(function(){
        var offset = $(this).offset().top - 0.2 * winHeight;
        $(this).children('.title').css({
            '-webkit-transform': 'translateY(' + offset * 0.5 + 'px)',
            '-moz-transform': 'translateY(' + offset * 0.5 + 'px)',
            'transform': 'translateY(' + offset * 0.5 + 'px)'
        });
    });
}

function scrollEndAnimations() {
    var about_offset = $("#about").offset().top;
    // scrollContent.maxScrollY = scrollContent.y - $('footer').offset().top - $('footer').outerHeight(true) + winHeight;
    // var maxscroll = scrollContent.maxScrollY;

    // automatically hide menu
    if (this.y < startY) $('header').addClass('hide');
    if (this.y > startY) $('header').removeClass('hide');
    startY = this.y;

    // cover home page
    if (about_offset >= 0) {
        // move about page
        $('#about .pic').css({
            '-webkit-transform': 'translateX(' + Math.round( - 200 - this.y / winHeight * 200) + '%)',
            '-moz-transform': 'translateX(' + Math.round( - 200 - this.y / winHeight * 200) + '%)',
            'transform': 'translateX(' + Math.round( - 200 - this.y / winHeight * 200) + '%)',
            'opacity': - this.y / winHeight
        });
        $('#about .profile').css({
            '-webkit-transform': 'translateX(' + Math.round( 200 + this.y / winHeight * 200) + '%)',
            '-moz-transform': 'translateX(' + Math.round( 200 + this.y / winHeight * 200) + '%)',
            'transform': 'translateX(' + Math.round( 200 + this.y / winHeight * 200) + '%)',
            'opacity': - this.y / winHeight
        });
    };
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
        click: true
    });

    updateSizes();
    scrollContentIndex.refresh();

    scrollAnimations();
    scrollContentIndex.on('scroll', scrollAnimations);
    scrollContentIndex.on('scrollEnd', scrollEndAnimations);
    startY = scrollContentIndex.y;
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
    // get the number of slide show items
    $('.scroll-words p').each(function(){
        numSlideItem += 1;
    });
    $('.scroll-words p').css({'top': '-'+ numSlideItem + '00%'});

    // device detection
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
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

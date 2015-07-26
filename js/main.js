/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/
/*-----------------------------------------------------------------------------------*/
/*  DYNAMIC EFFECTS
/*-----------------------------------------------------------------------------------*/

function flipDiv(obj) {
    if (typeof obj.attr('data-transform') == 'undefined') {
        obj.animate({ rotateX: '-150deg' }, 0);
        obj.animate({ rotateX: '0deg' }, 1500, 'easeOutBounce');
    }
}

/*-----------------------------------------------------------------------------------*/
/*  SCROLL AND MOVE
/*-----------------------------------------------------------------------------------*/
function move(element, duration, easing, callback) {
    duration = duration || 1000;
    easing = easing || IScroll.utils.ease.elastic;
    scrollContent.scrollToElement(element, duration);
    scrollAnimations();
}

function scrollAnimations() {
    var about_offset = $("#about").offset().top;
    var edu_offset = $("#edu").offset().top;
    var project_offset = $("#project").offset().top;
    var pubs_offset = $("#pubs").offset().top;
    var skill_offset = $("#skill").offset().top;
    var contact_offset = $("#contact").offset().top;
    var footer_offset = $("footer").offset().top;
    // var doc_offset = $(window).scrollTop() || $("body").scrollTop();
    // var doc_offset = (scrollContent.y) * (scrollContent.directionY);
    // var doc_offset = - (this.y>>0);
    var maxscroll = this.maxScrollY;
    var doc_offset = 0;
    if (doc_offset >= about_offset) {
        if (!$('header').hasClass('fixed')) {
            $('header').addClass('fixed');
        };
    }
    else {
        if ($('header').hasClass('fixed')) {
            $('header').removeClass('fixed');
        };
        if (winWidth <= 850) hideMenu();
    };

    $('.circle .half.light').each(function(){
        var contentOffSet = $(this).parent().parent().next().offset().top - doc_offset
        if (contentOffSet < upperRatio * winHeight &&
            contentOffSet > lowerRatio * winHeight) {
            flipDiv($(this));
        }
    });

    $('#about .pic').each(function(){
        var contentOffSet = $(this).next().offset().top - doc_offset
        if (contentOffSet < upperRatio * winHeight &&
            contentOffSet > lowerRatio * winHeight) {
            $(this).removeClass('move-left');
        }
    });

    $('#about .pic, #about .profile, #edu .content, #project .content, #pubs .profile').each(function(){
        if ($(this).offset().top - doc_offset < upperRatio * winHeight &&
            $(this).offset().top - doc_offset > lowerRatio * winHeight) {
            $(this).removeClass('move-right');
        }
    });

    var speed = 50;
    if (contact_offset - doc_offset < (1 - lowerRatio) * winHeight) {
        $('#contact .element').each(function(index){
            var that = $(this);
            setTimeout(function(){
                if (that.hasClass('move-right')) {
                    that.removeClass('move-right');
                };
            }, index * speed);
        });
    }


    if (pubs_offset - $(window).scrollTop() < 0.1 * winHeight) {
        var minDistance = Number.POSITIVE_INFINITY;

        // get the index of closest item
        $('.pub_group .pic').each(function(i){
            var distTemp = Math.abs($(this).offset().top - doc_offset - 0.5 * winHeight);
            if (distTemp <= minDistance) {
                minDistance = distTemp;
                indexToLightUp = i;
            }
        });
        // light up the item that is nearest to the center of the window
        $('.pub_group .pic').each(function(i){
            var matches = $(this).css('webkitTransform').match(matrixRegex);
            var scaleX = matches[1];
            if (i == indexToLightUp) {
                $(this).css({'background-color': '#eb6e1e'});
                if ((typeof indexToLightUpTemp == 'undefined') ||
                    (indexToLightUpTemp != indexToLightUp)) {
                    if (scaleX == 1) {
                        $(this).css({
                            'transform': 'scale(1.02)',
                            'mozTransform': 'scale(1.02)',
                            'webkitTransform': 'scale(1.02)',
                            'oTransform': 'scale(1.02)'
                        });
                    };
                    indexToLightUpTemp = indexToLightUp;
                }
            } else {
                $(this).css({'background-color': '#333'});
                if (scaleX >= 1 && scaleX <= 1.02) {
                    $(this).css({
                        'transform': 'scale(1)',
                        'mozTransform': 'scale(1)',
                        'webkitTransform': 'scale(1)',
                        'oTransform': 'scale(1)'
                    });
                }
            }
        });
    }


    if ((skill_offset - doc_offset < 0.2 * winHeight &&
            skill_offset - doc_offset > - 0.2 * winHeight) ||
            (footer_offset - doc_offset + $('footer').outerHeight(true) == winHeight )) {
        for (var i = 0; i < 6; i++) {
            $("#skill" + i).addClass(" stroke" + i);
        }
    }
}

/*-----------------------------------------------------------------------------------*/
/*  MENU EFFECTS
/*-----------------------------------------------------------------------------------*/

function hideMenu() {
    if ($('.bg-ultrawhite').css('webkitFilter') == 'blur(2px)') {
        $('nav ul, nav:active ul').css({'display': 'none', 'opacity': 0});
        $('header').css({'overflow': 'hidden'});
        $('.bg-ultrawhite, .bg-mesh, .bg-white, footer').css({'webkitFilter': 'blur(0)'});
    }
}

function toggleMenu() {
    var speed = 50;
    var animDuration = 300;
    var totalDelay;
    if ($('.bg-ultrawhite').css('webkitFilter') != 'blur(2px)') {

        $('nav ul, nav:active ul')
            .queue(function(next){
                $('header').css({'overflow': 'initial'});
                $(this).css({'display': 'block'});
                next();
            })
            .animate({'opacity': 1}, 200, 'easeOutCubic')
            .queue(function(next){
                $('nav li').each(function(index){
                    var that = $(this);
                    setTimeout(function(){
                        if (that.hasClass('move-right')) {
                            that.removeClass('move-right');
                        };
                    }, index * speed);
                });
                next();
            });
        $('.bg-ultrawhite, .bg-mesh, .bg-white, footer').css({'webkitFilter': 'blur(2px)'});
    }
    else {
        $('nav ul, nav:active ul')
            .queue(function(next){
                $('nav li').each(function(index){
                    var that = $(this);
                    setTimeout(function(){
                        if (!that.hasClass('move-right')) {
                            that.addClass('move-right');
                        };
                    }, index * speed);
                    totalDelay = index * speed + animDuration;
                });
                next();
            })
            .delay(totalDelay)
            .queue(function(next){
                $(this).animate({'opacity': 0}, 200, 'easeOutCubic');
                $('.bg-ultrawhite, .bg-mesh, .bg-white, footer').css({'webkitFilter': 'blur(0)'});
                next();
            })
            .queue(function(next){
                $(this).css({'display': 'none'});
                $('header').css({'overflow': 'hidden'});
                next();
            });

    }
}

/*-----------------------------------------------------------------------------------*/
/*  PREPROCESSING
/*-----------------------------------------------------------------------------------*/

var winHeight;
var winWidth;
var indexToLightUp;
var indexToLightUpTemp;
var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/; // get the scale of element
var upperRatio;
var lowerRatio;

function updateSizes(){
    winHeight = $(window).height();
    winWidth = $(window).width();
    // $('#home').css({'height': winHeight});
    if (winWidth <= 420) {
        upperRatio = 0.85;
        lowerRatio = 0.2;
    } else {
        upperRatio = 0.6;
        lowerRatio = 0.1;
    }

    // Responsively adjust the size of elements
    var menuHeight = winHeight - 60;
    if (winWidth < 850) {
        // $('nav ul, nav:active ul').css({'width': winWidth, 'height': menuHeight});
        if ($('nav ul').css('display') == 'none') {
            $('nav li').addClass('move-right');
            $('nav ul, nav:active ul').css({'display': 'none', 'opacity': 0});
        }
        $('#menu-bg').css({'width': winWidth});
    } else {
        $('nav ul, nav:active ul').removeAttr('style');
        $('.bg-ultrawhite, .bg-mesh, .bg-white, footer').removeAttr('style');
        $('nav li').each(function(){
            if ($(this).hasClass('move-right')) {
                $(this).removeClass('move-right');
            };
        })
    }

    var widthInfo = Number.NEGATIVE_INFINITY; // the maximum width among all info
    $('#contact .element').each(function(){
        var tempWidth = $(this).children('.icon').outerWidth(true);
        tempWidth += $(this).children('.info').outerWidth(true);
        if (tempWidth > widthInfo) {
            widthInfo = tempWidth;
        };
    })
    $('#contact .element').css({'width': Math.ceil(widthInfo)});
}



$(window).resize(function(){
   updateSizes();
});

var scrollContent;

$(window).load(function(){
    updateSizes();
    // initialize styles
    $('#about .pic').addClass('move-left');
    $('#about .profile, #edu .content, #project .content, #pubs .profile, #contact .element').addClass('move-right');
    $('#about .pic, #about .profile, #edu .content, #project .content, #pubs .profile, #contact .element').parent().css({
        'overflow-x':'hidden',
        'webkitTransform': 'translateZ(0px)'
    });

    scrollContent = new IScroll('#wrapper', {
        probeType: 3,
        mouseWheel: true,
        click: true
    });

    scrollAnimations();
    scrollContent.on('scroll', scrollAnimations);
    scrollContent.on('scrollEnd', scrollAnimations);
})

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


$(document).ready(function(){

    // the menu bar for short format
    $('#menu-icon').click(toggleMenu);
    // next icon in #home
    $('#nextInHome').click(function(){
        move('#about',0);
    });

    // device detection
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('#menu-icon').mouseover(toggleMenu);
        $('#nextInHome').mouseover(function(){
            move('#about',0);
        });
    }
});


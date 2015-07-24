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
    easing = easing || "easeInOutCubic";
    $('html, body').animate({
            scrollTop: $(element).offset().top
        }, duration, easing, callback);
}

function scrollAnimations() {
    var about_offset = $("#about").offset().top;
    var edu_offset = $("#edu").offset().top;
    var project_offset = $("#project").offset().top;
    var pubs_offset = $("#pubs").offset().top;
    var skill_offset = $("#skill").offset().top;
    var contact_offset = $("#contact").offset().top;
    var doc_offset = $(window).scrollTop() || $("body").scrollTop();
    var aaa = $('header').height();
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

    $('#about .pic, #about .profile, #edu .content, #project .content, #pubs .profile, #contact .element').each(function(){
        if ($(this).offset().top - doc_offset < upperRatio * winHeight &&
            $(this).offset().top - doc_offset > lowerRatio * winHeight) {
            $(this).removeClass('move-right');
        }
    });

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


    if (skill_offset - doc_offset < 0.2 * winHeight &&
        skill_offset - doc_offset > - 0.2 * winHeight) {
        for (var i = 0; i < 6; i++) {
            $("#skill" + i).addClass(" stroke" + i);
        }
    }
}


var isScrollable = true;

// document.addEventListener('touchstart', function(e) {
//     isScrollable = false;
// }, false);

// document.addEventListener('touchend', function(e) {
//     isScrollable = true;
// }, false);

// document.addEventListener('touchcancel', function(e) {
//     isScrollable = true;
// }, false);

// document.addEventListener('touchmove', function(e) {
//     if (!isScrollable) {
//          scrollAnimations();
//     }
// }, false);

// window.onscroll = function()
// {
//     if (isScrollable) {
//         scrollAnimations();
//     };
// };

document.addEventListener("touchmove", scrollAnimations, false);
document.addEventListener("scroll", scrollAnimations, false);

/*-----------------------------------------------------------------------------------*/
/*  MENU EFFECTS
/*-----------------------------------------------------------------------------------*/

function hideMenu() {
    if ($('.bg-ultrawhite').css('webkitFilter') == 'blur(2px)') {
        $('nav ul, nav:active ul').css({'display': 'none', 'opacity': 0});
        $('.bg-ultrawhite, .bg-mesh, .bg-white, #footer').css({'webkitFilter': 'blur(0)'});
    }
}

function toggleMenu() {
    var speed = 50;
    var animDuration = 300;
    var totalDelay;
    if ($('.bg-ultrawhite').css('webkitFilter') != 'blur(2px)') {
        $('nav ul, nav:active ul')
            .queue(function(next){
                $(this).css({'display': 'block'});
                next();
            })
            .animate({'opacity': 1}, 100, 'easeOutCubic')
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
        $('.bg-ultrawhite, .bg-mesh, .bg-white, #footer').css({'webkitFilter': 'blur(2px)'});
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
                $(this).animate({'opacity': 0}, 100, 'easeOutCubic');
                $('.bg-ultrawhite, .bg-mesh, .bg-white, #footer').css({'webkitFilter': 'blur(0)'});
                next();
            })
            .queue(function(next){
                $(this).css({'display': 'none'});
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

    if (winWidth <= 420) {
        upperRatio = 0.8;
        lowerRatio = 0.2;
    } else {
        upperRatio = 0.6;
        lowerRatio = 0.1;
    }

    // Responsively adjust the size of elements
    var menuHeight = winHeight - 60;
    if (winWidth < 850) {
        $('nav ul, nav:active ul').css({'width': winWidth, 'height': menuHeight, 'display': 'none', 'opacity': 0});
        $('#menu-bg').css({'width': winWidth});
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

$(window).load(function(){
    updateSizes();
    // initialize styles
    $('#about .pic').addClass('move-left');
    $('#about .profile, #edu .content, #project .content, #pubs .profile, #contact .element, nav li').addClass('move-right');
    $('#about .pic, #about .profile, #edu .content, #project .content, #pubs .profile, #contact .element, nav li').parent().css({'overflow-x':'hidden'});
    scrollAnimations();
})



$(document).ready(function(){

    // the menu bar for short format
    $('#menu-icon').click(function(){
        var doc_offset = $(window).scrollTop() || $("body").scrollTop();
        var about_offset = $('#about').offset().top;
        if (doc_offset < about_offset) {
            $('html').animate({
                    scrollTop: $("#about").offset().top
                }, 500);
            $('body').animate({
                    scrollTop: $("#about").offset().top
                }, 500, toggleMenu);
        }
        else toggleMenu();
    });

    // next icon in #home
    $('#nextInHome').click(function(){
        move('#about',0);
    });
});


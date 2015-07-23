/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/
/*-----------------------------------------------------------------------------------*/
/*  SCROLL AND MOVE
/*-----------------------------------------------------------------------------------*/
var move = function() {
    var event_func = null;
    return function(target_elem, move_dist, aux_dist, callback) {
        if (event_func) {
            clearTimeout(event_func);
            event_func = null
        }
        if (target_elem) {
            var scroll_len = document.getElementById(target_elem).offsetTop - move_dist;
            var e = document.documentElement.scrollTop || document.body.scrollTop;
            if (document.body.scrollHeight - e <= document.body.clientHeight) return;
            aux_dist = aux_dist || 200;
            if (aux_dist < 10) aux_dist = 10;
            scroll_len = (scroll_len - e) / aux_dist;
            if (scroll_len > 0) scroll_len = Math.ceil(scroll_len);
            else scroll_len = Math.floor(scroll_len);
            if (scroll_len) {
                scrollBy(0, scroll_len);
                aux_dist -= 15;
                event_func = setTimeout("move('" + target_elem + "'," + move_dist + "," + aux_dist + ")", 10)
            }
        }
        (callback && typeof(callback) === "function") && callback();
    }
}();

function flipDiv(obj) {
    if (typeof obj.attr('data-transform') == 'undefined') {
        obj.animate({ rotateX: '-150deg' }, 0);
        obj.animate({ rotateX: '0deg' }, 1500, 'easeOutBounce');
    }
}

var winHeight = $(window).height();
var winWidth = $(window).width();

var indexToLightUp;
var indexToLightUpTemp;
var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/; // get the scale of element

$(function(){
    $(window).scroll(function(){
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
            if ($(window).width() <= 850) hideMenu();
        };

        $('.circle .half.light').each(function(){
            var contentOffSet = $(this).parent().parent().next().offset().top - doc_offset
            if (contentOffSet < 0.75 * winHeight &&
                contentOffSet > 0.2 * winHeight) {
                flipDiv($(this));
            }
        });

        $('#about .pic').each(function(){
            var contentOffSet = $(this).next().offset().top - doc_offset
            if (contentOffSet < 0.75 * winHeight &&
                contentOffSet > 0.2 * winHeight) {
                $(this).removeClass('move-left');
            }
        });

        $('#about .pic, #about .profile, #edu .content, #project .content, #pubs .profile').each(function(){
            if ($(this).offset().top - doc_offset < 0.75 * winHeight &&
                $(this).offset().top - doc_offset > 0.2 * winHeight) {
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
        var xxx = $('header').width();
    });
});

// onscroll = function() {

// };

/*-----------------------------------------------------------------------------------*/
/*  Menu effects
/*-----------------------------------------------------------------------------------*/

function hideMenu() {
    if ($('.bg-ultrawhite').css('webkitFilter') == 'blur(2px)') {
        $('nav ul, nav:active ul').css({'display': 'none', 'opacity': 0});
        $('.bg-ultrawhite, .bg-mesh, .bg-white, #footer').css({'webkitFilter': 'blur(0)'});
    }
}

function toggleMenu() {
    if ($('.bg-ultrawhite').css('webkitFilter') != 'blur(2px)') {
        $('nav ul, nav:active ul')
            .queue(function(){
                $(this).css({'display': 'block'}).dequeue();
            })
            .queue(function(){
                $(this).animate({'opacity': 1}, 300, 'easeOutCubic').dequeue();
            });
        $('.bg-ultrawhite, .bg-mesh, .bg-white, #footer').css({'webkitFilter': 'blur(2px)'});
    }
    else {
        $('nav ul, nav:active ul')
            .queue(function(){
                $(this).animate({'opacity': 0}, 300, 'easeOutCubic').dequeue();
            })
            .queue(function(){
                $(this).css({'display': 'none'}).dequeue();
            });
        $('.bg-ultrawhite, .bg-mesh, .bg-white, #footer').css({'webkitFilter': 'blur(0)'});
    }
}

$(document).ready(function(){
    var menuHeight = winHeight - 60;
    if (winWidth < 850) {
        $('nav ul, nav:active ul').css({'width': winWidth, 'height': menuHeight, 'display': 'none', 'opacity': 0});
        $('#menu-bg').css({'width': winWidth});
    }

    $('#about .pic').addClass('move-left');
    $('#about .profile, #edu .content, #project .content, #pubs .profile').addClass('move-right');
    $('#menu-icon').click(function(){
        var doc_offset = $(window).scrollTop() || $("body").scrollTop();
        var about_offset = $('#about').offset().top;
        if (doc_offset <= about_offset) {
            $('html body').animate({
                    scrollTop: $("#about").offset().top
                }, 500, function(){
                    setTimeout(toggleMenu, 500);
                });
        }
        else toggleMenu();
    });
    $('#nextInHome').click(function(){
        move('about',0);
    });
});


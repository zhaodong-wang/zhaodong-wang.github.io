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

// redefine easing functions

$.extend($.easing,
{
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    }
})

function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}



function flipDiv(obj) {
    if (typeof obj.attr('data-transform') == 'undefined') {
        obj.animate({ rotateX: '-150deg' }, 0);
        obj.animate({ rotateX: '0deg' }, 1500, 'easeOutBounce').delay(500);
    }
}

var winHeight = $(window).height();

onscroll = function() {
    var about_offset = $("#about").offset().top;
    var edu_offset = $("#edu").offset().top;
    var project_offset = $("#project").offset().top;
    var pubs_offset = $("#pubs").offset().top;
    var skill_offset = $("#skill").offset().top;
    var contact_offset = $("#contact").offset().top;
    var doc_offset = $(window).scrollTop() || $("body").scrollTop();
    if (doc_offset >= about_offset) $('header').addClass('fixed');
    else {
        $('header').removeClass('fixed');
        if ($(window).width() <= 850) hideMenu();
    };
    $('.circle .half.light').each(function(){
        var offsetTemp = $(this).offset().top - about_offset;
        if ($(this).offset().top - $(window).scrollTop() < 0.38 * winHeight) {
            flipDiv($(this));
        }
    });

    if (doc_offset >= skill_offset - 0.3 * about_offset) {
        for (var i = 0; i < 6; i++) {
            $("#skill" + i).addClass(" stroke" + i);
        }
    }
};

/*-----------------------------------------------------------------------------------*/
/*  Menu effects
/*-----------------------------------------------------------------------------------*/

function hideMenu() {
    $('nav ul, nav:active ul').css({'height': winHeight, 'display': 'none'});
    $('.bg-ultrawhite, .bg-mesh, .bg-white, #footer').css({'webkitFilter': 'blur(0)'});
}

function toggleMenu() {
    if ($('nav ul').css('display') == 'block') {
        $('nav ul, nav:active ul').css({'height': winHeight, 'display': 'none'});
        $('.bg-ultrawhite, .bg-mesh, .bg-white, #footer').css({'webkitFilter': 'blur(0)'});
    }
    else {
        $('nav ul, nav:active ul').css({'height': winHeight, 'display': 'block'});
        $('.bg-ultrawhite, .bg-mesh, .bg-white, #footer').css({'webkitFilter': 'blur(2px)'});
    }
}

$(document).ready(function(){
    $('#menu-icon').click(function(){
        var yPos = $(window).scrollTop();
        var about_offset = $('#about').offset().top;
        if (yPos < about_offset) {
            $('html, body').animate({
                    scrollTop: $("#about").offset().top
                }, 500, toggleMenu);
        }
        else toggleMenu();
    });
});


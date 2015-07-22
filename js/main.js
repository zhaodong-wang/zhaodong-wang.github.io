/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/
var move = function() {
    var f = null;
    return function(a, b, c, callback) {
        if (f) {
            clearTimeout(f);
            f = null
        }
        if (a) {
            var d = document.getElementById(a).offsetTop - b;
            var e = document.documentElement.scrollTop || document.body.scrollTop;
            if (document.body.scrollHeight - e <= document.body.clientHeight) return;
            c = c || 200;
            if (c < 10) c = 10;
            d = (d - e) / c;
            if (d > 0) d = Math.ceil(d);
            else d = Math.floor(d);
            if (d) {
                scrollBy(0, d);
                c -= 15;
                f = setTimeout("move('" + a + "'," + b + "," + c + ")", 10)
            }
        }
        (callback && typeof(callback) === "function") && callback();
    }
}();

onscroll = function() {
    var a = document.getElementById("about").offsetTop;
    var b = document.documentElement.scrollTop || document.body.scrollTop;
    var c = document.getElementsByTagName("header");
    if (b >= a) c[0].className = "fixed";
    else {
        c[0].className = null;
        if ($(window).width() <= 850) hideMenu();
    };
    var d = document.getElementById("skill");
    if (b >= d.offsetTop - 0.3 * a) {
        for (var i = 0; i < 6; i++) {
            document.getElementById("skill" + i).className += (" stroke" + i)
        }
    }
};

var winHeight = $(window).height();

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


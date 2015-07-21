/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2014 DreamCoder. All rights reserved. */
/*********************************************************/
var move = function() {
    var f = null;
    return function(a, b, c) {
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
    }
}();

onscroll = function() {
    var a = document.getElementById("about").offsetTop;
    var b = document.documentElement.scrollTop || document.body.scrollTop;
    var c = document.getElementById("nav");
    if (b >= a) c.className = "fixed";
    else c.className = null;
    var d = document.getElementById("skill");
    if (b >= d.offsetTop - 0.3 * a) {
        for (var i = 0; i < 6; i++) {
            document.getElementById("skill" + i).className += (" stroke" + i)
        }
    }
};

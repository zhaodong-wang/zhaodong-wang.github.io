/*
 * 	adjust sizes
 *
 */

var win_height=$(window).height();
var win_width=$(window).width();
var header_height=0.10*win_height;
var footer_height=0.04*win_height;
var wrap_height=win_height-header_height-footer_height;

// adjust body
$("body").css({"width": win_width+"px","height":win_height+"px"});
$("#wrap").css({"height": wrap_height+"px"});
$("#impress").css({"height": wrap_height+"px","top":"0","left":"0","position":"absolute"});

// adjust and hide header / footer
$("header").css({"height":header_height+"px","top":"-"+header_height+"px"});
$("footer").css({"height":footer_height+"px"});
$(".info_left, .info_right").css({"height":footer_height+"px"});
$(".info_left,.info_right").css({"bottom":"-"+footer_height+"px"});

//adjust navigation bar
var menu_li_height=header_height-40;
$(".top_menu ul li").css({"height":menu_li_height+"px"})
$(".top_menu ul li ul").css({"top":header_height+"px"})
$(".top_menu ul li ul li").css({"height":0.6*menu_li_height+"px"})

//adjust slides
$(".slide, .step").css({"width":win_width+"px","height":wrap_height+"px","top":"0","left":"0","position":"absolute"})
$("#cover").css({"width":win_width+"px","height":win_height+"px"})
$(".sec_cover_title_hrule, .background_hrule").css({"top":0.75*wrap_height+"px"})
$("h2.sec_cover_title").css({"padding-top":0.6*wrap_height+"px"})

//adjust module line height
var line_height_lin=$("#lin_module").height();
$("#lin_module").css({"line-height":0.5*line_height_lin+"px"})
var line_height_std=$("#std_module").height();
$("#std_module").css({"line-height":line_height_std+"px"})
// $("body").css({"width": "100%","height":"100%"});
// $("#wrap").css({"height": "85%"});
// $("#impress").css({"height": "100%","top":"0","left":"0","position":"absolute"});

// // adjust and hide header / footer
// $("header").css({"height":"10%","top":"-10%"});
// $("footer").css({"height":"4%"});
// $(".info_left, .info_right").css({"height":"4%"});
// $(".info_left,.info_right").css({"bottom":"-4%"});

// //adjust navigation bar
// var menu_li_height=header_height-40;
// $(".top_menu ul li").css({"height":menu_li_height+"px"})
// $(".top_menu ul li ul").css({"top":header_height+"px"})
// $(".top_menu ul li ul li").css({"height":0.6*menu_li_height+"px"})

// //adjust slides
// $(".slide, .step").css({"width":win_width+"px","height":wrap_height+"px","top":"0","left":"0","position":"absolute"})
// $("#cover").css({"width":win_width+"px","height":wrap_height+"px"})
// $(".sec_cover_title_hrule, .background_hrule").css({"top":0.7*wrap_height+"px"})
// $("h2.sec_cover_title").css({"padding-top":0.6*wrap_height+"px"})


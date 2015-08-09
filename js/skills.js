/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

var scrollContentSkill;

$(window).resize(function(){
   updateSizes();
   if (!scrollContentSkill) scrollContentSkill.refresh();
});

$(window).load(function(){
    // add iScroll object

    scrollContentSkill = new IScroll('#scroll-content', {
        probeType: 3,
        mouseWheel: true,
        click: true
    });

    updateSizes();
    scrollContentSkill.refresh();
    // scrollContentSkill.on('scroll', scrollAnimations);
    // scrollContentSkill.on('scrollEnd', scrollAnimations);


    // fadeout cover and show the main page
    $('.title-container, .sub-home, .next-logo').removeClass('hide');
})

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

var skillPercents = ['75%', '65%', '65%', '50%', '80%', '50%'];

$(document).ready(function(){
	// get the number of menu items
    $('nav li').each(function(){
        numNavItem += 1;
    });
    // get the number of slide show items
    $('.scroll-words p').each(function(){
        numSlideItem += 1;
    });
    $('.scroll-words p').css({'top': '-'+ numSlideItem + '00%'});

    // device detection
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // toggle Menu
        $('.nav-link-menu').on('touchstart',toggleMenu);
        $('.next-logo').each(function(){
            $(this).on('touchstart', function(){
                addNextCircle($(this));
            });
        });
        $('#skill-main .title').on('touchstart', function(){
            $('.line').each(function(index){
                animateStroke($(this), skillPercents[index]);
            });
        });
    } else {
        $('.nav-link-menu').click(toggleMenu);
        $('.next-logo').each(function(){
            $(this).mouseenter(function(){
                addNextCircle($(this));
            });
        });
        $('#skill-main .title').click(function(){
            $('.line').each(function(index){
                animateStroke($(this), skillPercents[index]);
            });
        });
    }
});

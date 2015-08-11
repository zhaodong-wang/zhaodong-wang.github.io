/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

var strokeAnimated = false;
function scrollAnimations() {
    commonScrollAnimations(this);
    ratio = this.y / $('#skill-home').height();
    if ($('#skill-main').offset().top < 100 || ifBottom) {
        if (!strokeAnimated) {
            $('.line').each(function(index){
                animateStroke($(this), skillPercents[index]);
            });
            strokeAnimated = true;
        };
    }
}

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

    scrollAnimations();
    scrollContentSkill.on('scroll', scrollAnimations);
    scrollContentSkill.on('scrollEnd', scrollAnimations);
    startY = scrollContentSkill.y;

    // fadeout cover and show the main page
    $('.title-container, .sub-home, .next-logo').removeClass('hide');
})

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

var skillPercents = ['75%', '65%', '65%', '50%', '80%', '50%'];

$(document).ready(function(){

    // // device detection
    // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    //     // toggle Menu
    //     $('#skill-main .title').on('touchstart', function(){
    //         $('.line').each(function(index){
    //             animateStroke($(this), skillPercents[index]);
    //         });
    //     });
    // } else {
    //     $('#skill-main .title').click(function(){
    //         $('.line').each(function(index){
    //             animateStroke($(this), skillPercents[index]);
    //         });
    //     });
    // }
});

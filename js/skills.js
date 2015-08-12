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
    if ($('#skill-home').next().offset().top > 0) {
        $('#skill-home').css({'background-position-y': -0.5 * this.y});
    };
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

    scrollContentSkill.on('scroll', scrollAnimations);
    scrollContentSkill.on('scrollEnd', scrollAnimations);
    startY = scrollContentSkill.y;

    // fadeout cover and show the main page
    $('body')
    .queue(function(next){
        $('.title-container, .sub-home, .next-logo').removeClass('hide');
        next();
    })
    .delay(800)
    .queue(function(next){
        $('header').removeClass('hide');
        next();
    });
    scrollAnimations();
})

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

var skillPercents = ['75%', '65%', '65%', '50%', '80%', '50%'];

$(document).ready(function(){

});

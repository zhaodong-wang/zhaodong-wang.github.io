/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

var strokeSoftwareAnimated = false;
var strokeDataToolsAnimated = false;
function scrollAnimations() {
    commonScrollAnimations(this);
    ratio = this.y / $('#skill-home').height();
    if ($('#skill-software').offset().top < 100 || ifBottom) {
        if (!strokeSoftwareAnimated) {
            strokeSoftwareAnimated = true;
            $('#skill-software').find('.line').each(function(index){
                animateStroke($(this), skillSoftwarePct[index]);
            });
        };
    }

    if ($('#skill-tools').offset().top < 100 || ifBottom) {
        if (!strokeDataToolsAnimated) {
            strokeDataToolsAnimated = true;
            $('#skill-tools').find('.line').each(function(index){
                animateStroke($(this), skillDataToolsPct[index]);
            });
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

var skillSoftwarePct = ['75%', '75%', '65%', '65%', '50%'];

var skillDataToolsPct = ['75%', '60%', '65%', '55%', '50%'];

$(document).ready(function(){

});

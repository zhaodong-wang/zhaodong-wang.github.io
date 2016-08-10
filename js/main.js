/*********************************************************/
/* Created by Zhaodong Wang */
/* Copyright (c) 2015. All rights reserved. */
/*********************************************************/

/*-----------------------------------------------------------------------------------*/
/*  DYNAMIC EFFECTS
/*-----------------------------------------------------------------------------------*/


function spinLoader(obj) {
    obj
    .queue(function(next){
        $(this).animate({ rotate: '360deg' }, 500, 'easeInOutQuart');
        next();
    })
    .delay(510)
    .queue(function(next){
        $(this).animate({ rotate: '0deg' }, 0);
        next();
    })
    .queue(function(next){
        spinLoader(obj);
        next();
    });
}

function transformLoader(obj) {
    obj.animate({ rotate: '30deg', translateY: '5px'}, 600, 'easeInOutQuart');
    obj.addClass('active');
}

function recoverLoader(obj) {
    obj.animate({ rotate: '0deg', translateY: '0px'}, 600, 'easeInOutQuart');
    obj.removeClass('active');
}

function flipDiv(obj) {
    if (typeof obj.attr('data-transform') == 'undefined') {
        obj.animate({ rotateX: '-150deg' }, 0);
        obj.animate({ rotateX: '0deg' }, 1500, 'easeOutBounce');
    }
}

function slideShowIterative(obj, numChild, duration, easing) {
    duration = duration || 1000;
    easing = easing || 'easeInOutCirc';
    var tempNumChild = numChild - 1;
    obj
    .animate({translateY: '100%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '200%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '300%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '400%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '500%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '600%'}, duration, easing)
    .delay(1500)
    .animate({translateY: '700%'}, duration, easing)
    .animate({translateY: '0'}, 0, 'linear')
    .delay(500)
    .queue(function(next){
        slideShowIterative(obj, numChild);
        next();
    });
}

function pageTransition(obj, targetPage) {
    obj
    .queue(function(next){
        $('.cover-transition').css({
            'display': 'block'
        });
        next();
    })
    .queue(function(next){
        $('.cover-transition').animate({
            'opacity': 1
        }, 400);
        next();
    })
    .delay(400)
    .queue(function(next){
        window.location.href = targetPage;
        next();
    });
}

function addNextCircle(obj, duration, scale) {
    var duration = duration || 500;
    var scale = scale || 1.4;
    var $circle = $('<div class="next-logo pulse"></div>');
    obj.before($circle);
    var oldWidth = parseInt(obj.css('width'), 10);
    var oldHeight = parseInt(obj.css('height'), 10);
    var width = scale * oldWidth;
    var height = scale * oldHeight;
    var right = parseInt(obj.css('right'), 10) - (width - oldWidth)/2;
    var bottom = parseInt(obj.css('bottom'), 10) - (height - oldHeight)/2;
    $circle.animate({
        'opacity': 0,
        'width': width + 'px',
        'height': height + 'px',
        'right': right + 'px',
        'bottom': bottom + 'px'
    }, duration, 'easeOutCirc');

    setTimeout(function __remove() {
        $circle.remove();
    }, duration);
}

function addFromCircle(obj, duration, scale) {
    var duration = duration || 500;
    var scale = scale || 1.4;
    var $circle = $('<div class="circle from pulse"></div>');
    obj.before($circle);
    var oldWidth = parseInt(obj.css('width'), 10);
    var oldHeight = parseInt(obj.css('height'), 10);
    var width = scale * oldWidth;
    var height = scale * oldHeight;
    var top = - (height - oldHeight)/2;
    var left = - (width - oldWidth)/2;
    $circle.animate({
        'opacity': 0,
        'width': width + 'px',
        'height': height + 'px',
        'top': top + 'px',
        'left': left + 'px'
    }, duration, 'easeOutCirc');

    setTimeout(function __remove() {
        $circle.remove();
    }, duration);
}

function addToCircle(obj, duration, scale) {
    var duration = duration || 500;
    var scale = scale || 1.4;
    var $circle = $('<div class="circle to pulse"></div>');
    $circle.attr('style', obj.attr('style'));
    obj.before($circle);
    var oldWidth = parseInt(obj.css('width'), 10);
    var oldHeight = parseInt(obj.css('height'), 10);
    var width = scale * oldWidth;
    var height = scale * oldHeight;
    var bottom = - (height - oldHeight)/2;
    var left = - (width - oldWidth)/2;
    $circle.animate({
        'opacity': 0,
        'width': width + 'px',
        'height': height + 'px',
        'bottom': bottom + 'px',
        'left': left + 'px'
    }, duration, 'easeOutCirc');

    setTimeout(function __remove() {
        $circle.remove();
    }, duration);
}

function animateNumber(obj, endVal) {
    var startVal = obj.text();
    var currentVal = startVal;
    var iterval = setInterval(function ()
    {
        if (currentVal === endVal)
        {
            clearInterval(iterval);
        }
        else
        {
            currentVal++;
            obj.text(currentVal);
        }
    }, 100);
}

function animateStroke(obj, endPercent) {
    var startVal = parseInt(obj.css('width'), 10);
    if (startVal == 0) {
        var startPercent = Math.round(startVal / parseInt(obj.parent().css('width'), 10) * 2 * 100);
        var currentPercent = startPercent;
        if (currentPercent < parseInt(endPercent, 10)) {
            var endWidth = parseInt(endPercent, 10) / 2;
            obj.animate({width: endWidth + '%'}, {
                duration: 1000,
                easing: 'swing',
                progress: function(promiseAnim, progressNum, remainMs) {
                    var currentPercent = Math.round(parseInt(endPercent, 10) * progressNum);
                    obj.next().text(currentPercent + '%');
                }
            });
        };
    };
}

function animateCircleTo(obj) {
    if (obj.css('opacity') == 0) {
        obj.queue(function(next){
            addFromCircle(obj.prev().prev());
            next();
        })
        .delay(600)
        .queue(function(next){
            obj.animate({
                'opacity': 1,
                'bottom': 0
            }, {
                duration: 500,
                queue: false
            });
            obj.prev().animate({
                'height': '38px'
            }, {
                duration: 500,
                queue: false
            });
            next();
        })
        .delay(600)
        .queue(function(next){
            addToCircle(obj);
            next();
        })
    };
}

function recoverCircleTo(obj) {
    if (obj.css('opacity') == 1) {
        obj.removeAttr('style');
        obj.prev().removeAttr('style');
    }
}


function copyTexts(obj, align) {
    var align = align || "left";
    obj.each(function(){
        var element = $(this);
        var clone = element.clone();

        clone.attr('style', element.attr('style'));
        clone.addClass('temp');
        clone.css({
            opacity: 1,
            position: 'absolute',
            width: element.width(),
            height: element.height(),
        });
        var elmText = clone.html();
        clone.html(function(ind, htm){
            // returns all spaces or tags with their content
            var $repText = '<span>' + elmText.replace(/(<\s*.*?[^>]*>(.*?)<\s*\s*.*?>)|(\s+)/ig, '$1 </span><span>');
            $repText = $repText + '</span>';
            return $repText;
        });
        element.before(clone);
    });

    obj.parent().children('.temp').each(function(){
        var clone = $(this);
        var lineHeight = clone.css('line-height');
        if (lineHeight == "normal") {
            lineHeight = clone.height() + 'px';
        };
        var line;
        var lines = [];
        var words = clone.children('span');
        var lastTop;
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if ($(word).offset().top != lastTop) {
              lastTop = $(word).offset().top;
              line = [];
              lines.push(line);
            }
            line.push(word.outerHTML);
        };
        clone.empty();
        for (var i = 0; i < lines.length; i++) {
            clone.append("<div class='line" + (i + 1) + "'>" + lines[i].join(' ') + "</div>");
        };
        clone.children('div').each(function(i){
            $(this).css({
                display: 'block',
                opacity: 0.9,
                position: 'absolute',
                width: '100%',
                top: i * parseInt(lineHeight, 10) + 'px'
            });
        })
        if (align == "left") {
            clone.children('div').each(function(i){
                $(this).css({
                    clip: 'rect(0, 0,' + lineHeight + ', 0)'
                });
            })
        } else if (align == "center") {
            clone.children('div').each(function(i){
                var sss = 'rect(0, ' + $(this).width()/2 + 'px, ' + lineHeight + ', ' + $(this).width()/2 + 'px)';
                $(this).css({
                    clip: 'rect(0, ' + $(this).width()/2 + 'px, ' + lineHeight + ', ' + $(this).width()/2 + 'px)'
                });
            })
        } else {
            clone.children('div').each(function(i){
                $(this).css({
                    clip: 'rect(0, ' + $(this).width() + 'px, ' + lineHeight + ', ' + $(this).width() + 'px)'
                });
            })
        };
        if (clone.css('text-align') == 'left') {
            clone.children('div').each(function(i){
                $(this).css({
                    'text-align': 'left',
                    left: 0,
                });
                $(this).addClass('text-left');
            })
        } else if (clone.css('text-align') == 'right') {
            clone.children('div').each(function(i){
                $(this).css({
                    'text-align': 'right',
                    right: 0,
                });
                $(this).addClass('text-right');
            })
        } else {
            clone.children('div').each(function(i){
                $(this).css({
                    'text-align': 'center',
                    right: 0,
                    left: 0
                });
                $(this).addClass('text-center');
            })
        };
    })
}

/*-----------------------------------------------------------------------------------*/
/*  SCROLL AND MOVE
/*-----------------------------------------------------------------------------------*/
function move(scrollContent, element, duration, easing, callback) {
    duration = duration || 1000;
    easing = easing || IScroll.utils.ease.elastic;
    scrollContent.scrollToElement(element, duration);
    // scrollAnimations();
}

var startY;
var ratio;
var ifBottom;
var directionY; // 0: still; 1: down; -1: up;

function commonScrollAnimations(obj) {
    ifBottom = obj.y <= obj.maxScrollY;
    // scrollContent.maxScrollY = scrollContent.y - $('footer').offset().top - $('footer').outerHeight(true) + winHeight;
    // var maxscroll = scrollContent.maxScrollY;

    // automatically hide menu
    if (obj.y < startY) directionY = 1;
    if (obj.y == startY) directionY = 0;
    if (obj.y > startY) directionY = -1;
    if (directionY == 1) $('header').addClass('hide');
    if (directionY == -1) $('header').removeClass('hide');
    startY = obj.y;
}


/*-----------------------------------------------------------------------------------*/
/*  MENU EFFECTS
/*-----------------------------------------------------------------------------------*/

function toggleMenu() {
    var speed = 70;
    var animDuration = 500;
    var totalDelay;
    if ($('.nav-link-menu').hasClass('active')) {
    	$('nav ul')
    	    .queue(function(next){
    	        $('nav li, nav hr').each(function(index){
    	            var that = $(this);
    	            setTimeout(function(){
    	                that.toggleClass('move-right');
    	            }, (numNavItem - index) * speed);
    	            totalDelay = index * speed + animDuration;
    	        });
                $('.nav-link-menu').removeClass('active');
                $('.nav-link-menu-inner').animate({'opacity': 1}, 800, 'easeOutCirc');
    	        next();
    	    })
    	    .delay(totalDelay)
    	    .queue(function(next){
    	        $(this).css({'display': 'none'});
    	        $('.fill').removeClass('active');
                $('.nav-link-menu-inner, .nav-link-menu-outer-before, .nav-link-menu-outer-after').animate({'background-color': '#7f7f7f'}, 800, 'easeOutCirc');
    	        next();
    	    })
    	    .delay(500)
    	    .queue(function(next){
    	        $('nav').removeClass('active');
                $('.nav-link-home').toggleClass('hide');
    	        next();
    	    });
    }
    else {
    	$('nav ul')
            .queue(function(next){
                $('.nav-link-home').toggleClass('hide');
                $('.nav-link-menu-inner').animate({'opacity': 0}, { duration: 300, queue: false }, 'easeOutCirc');
                $('.nav-link-menu-inner, .nav-link-menu-outer-before, .nav-link-menu-outer-after').animate({'background-color': '#ccc'}, { duration: 800, queue: false }, 'easeOutCirc');
    	        $('.nav-link-menu, .fill, nav').addClass('active');
    	        next();
    	    })
    	    .queue(function(next){
    	        $(this).css({'display': 'block'});
    	        next();
    	    })
    	    .delay(500)
    	    .queue(function(next){
    	        $('nav li, nav hr').each(function(index){
    	            var that = $(this);
    	            setTimeout(function(){
    	                that.toggleClass('move-right');
    	            }, index * speed);
    	        });
    	        next();
    	    });
    }
}

var numNavItem = 0;
var numSlideItem = 0;
var winHeight;
var winWidth;

function updateSizes(){
    winHeight = $(window).height();
    winWidth = $(window).width();
	var itemHeight = $('.scroll-words p').outerHeight(true);
	$('.scroll-words').css({'height': itemHeight});
	if ($('nav ul').css('display') == 'none') {
            $('nav li, nav hr').addClass('move-right');
        }

    if (winWidth < 600) {
        $('.meta').css({'height': '200px'});
        $('.element').not('#skill-main').each(function(){
            var totalHeight = 0;
            totalHeight += $(this).children('.meta').outerHeight(true);
            totalHeight += $(this).children('.content').outerHeight(true);
            $(this).css({'height': totalHeight});
        })
    } else {
        $('.meta').each(function(){
            var tempHeight = $(this).next().outerHeight(true);
            $(this).css({'height': tempHeight});
            $(this).parent().css({'height': tempHeight});
        });
    }
}

$(document).ready(function(){
    // get the number of menu items
    $('nav li').each(function(){
        numNavItem += 1;
    });

    $('.pre-loader-container.forks').animate({scale: '0.7' }, 0);

    transformLoader($('.pre-loader-container.forks'));
    // device detection
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // toggle Menu
        $('.nav-link-home').on('touchstart', function(){
            if ($(this).parent().parent().attr('id') == 'main-home') {
                $(this).queue(function(next){
                    recoverLoader($('.pre-loader-container.forks'));
                    move(scrollContentIndex, '#home', 0);
                    next();
                })
                .delay(1000)
                .queue(function(next){
                    transformLoader($('.pre-loader-container.forks'));
                    next();
                });
            } else {
                $(this).queue(function(next){
                    recoverLoader($('.pre-loader-container.forks'));
                    next();
                })
                .delay(700)
                .queue(function(next){
                    pageTransition($(this), 'index.html');
                    next();
                });
            }
        });
        $('.nav-link-menu').on('touchstart', toggleMenu);
        $('.next-logo').each(function(){
            $(this).on('touchstart', function(){
                addNextCircle($(this));
            });
        });
        $('.nav-home').each(function(){
            $(this).click(function(){
                $(this).queue(function(next){
                    $(this).toggleClass('active');
                    next();
                })
                .delay(700)
                .queue(function(next){
                    pageTransition($(this), 'index.html');
                    next();
                })
            });
        });
        $('.nav-education').each(function(){
            $(this).click(function(){
                $(this).queue(function(next){
                    $(this).toggleClass('active');
                    next();
                })
                .delay(700)
                .queue(function(next){
                    pageTransition($(this), 'education.html');
                    next();
                })
            });
        });
        $('.nav-projects').each(function(){
            $(this).click(function(){
                $(this).queue(function(next){
                    $(this).toggleClass('active');
                    next();
                })
                .delay(700)
                .queue(function(next){
                    pageTransition($(this), 'projects.html');
                    next();
                })
            });
        });
        $('.nav-publications').each(function(){
            $(this).click(function(){
                $(this).queue(function(next){
                    $(this).toggleClass('active');
                    next();
                })
                .delay(700)
                .queue(function(next){
                    pageTransition($(this), 'publications.html');
                    next();
                })
            });
        });
        $('.nav-skills').each(function(){
            $(this).click(function(){
                $(this).queue(function(next){
                    $(this).toggleClass('active');
                    next();
                })
                .delay(700)
                .queue(function(next){
                    pageTransition($(this), 'skills.html');
                    next();
                })
            });
        });
    } else {
        $('.nav-link-home').click(function(){
            if ($(this).parent().parent().attr('id') == 'main-home') {
                move(scrollContentIndex, '#home', 0);
            } else pageTransition($(this), 'index.html');
        });
        $('.nav-link-home').hover(function(){
            recoverLoader($('.pre-loader-container.forks'));
        }, function(){
            transformLoader($('.pre-loader-container.forks'));
        });
        $('.nav-link-menu').click(toggleMenu);
        $('.next-logo').each(function(){
            $(this).mouseenter(function(){
                addNextCircle($(this));
            });
        });
        $('.navigator .left, .navigator .right').hover(function(){
            $(this).toggleClass('active');
        });
        $('.nav-home').each(function(){
            $(this).click(function(){
                pageTransition($(this), 'index.html');
            });
        });
        $('.nav-education').each(function(){
            $(this).click(function(){
                pageTransition($(this), 'education.html');
            });
        });
        $('.nav-projects').each(function(){
            $(this).click(function(){
                pageTransition($(this), 'projects.html');
            });
        });
        $('.nav-publications').each(function(){
            $(this).click(function(){
                pageTransition($(this), 'publications.html');
            });
        });
        $('.nav-skills').each(function(){
            $(this).click(function(){
                pageTransition($(this), 'skills.html');
            });
        });
    }
});

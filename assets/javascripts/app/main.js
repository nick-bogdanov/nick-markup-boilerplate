"use strict";

$(document).ready(function() {
    // images paths
    var $menu = $("#show-menu");

    // init scroll bar plugin
    $('main').perfectScrollbar();

    //show menu
    $("#menu-show-link").click(function(e) {
        e.preventDefault();
        $menu.addClass('menu-open');
    });

    // hide menu
    $("#menu-close").click(function(e) {
        e.preventDefault();
        $menu.removeClass('menu-open');
    });

    //We will calculate right side height, for correct display images
    responsiveSides();

    // Calculate content height for correct scroll area
    scrollContentHeight();
    scrollBar();

    sliderSwitch();

    //dynamicSVG();

    $(window).resize(function() {
        scrollBar();
        sliderSwitch();
        // on resize we need to recalculate all values

        responsiveSides();
        scrollContentHeight();

    });

});

$(window).load(function() {

    sliderInit();

    //set our correct viewport height for slider
    bxSliderViewport();

    //Calculate width of control buttons for horizontal align pager
    bxControls();

});

function sliderInit() {

    $("#bxSlider").bxSlider({
        mode: 'fade',
        captions: true,
        responsive: false,
        controls: false
    });

}

function sliderSwitch() {
    var $slider = $("#bxSlider");

    if (checkResponsive()) {
        if ($('main').data('slider')) {
            $('body').addClass('has-slider');
        }else{
            $slider.hide();
        }
    }else{
        $slider.show();
    }


}

function scrollBar() {

    try {
        if (!checkResponsive()) {
            $('main').perfectScrollbar();
        }else{
            $('main').perfectScrollbar('destroy');
        }
    }catch(e) {

    }

}

function responsiveSides() {

    var leftSideWidth = $('header').width(), // left block width
        $windowWidth = $(window).width(),
        $windowHeight = $(window).height(),
        $rightSide = $("#slider-content"),
        widthLeft = ( 100 - (  leftSideWidth / $windowWidth ) * 100 ) + "%";

    if (parseInt(widthLeft) == 0) {
        widthLeft = $windowWidth;
    }

    $rightSide.width(widthLeft).height($windowHeight);
    $rightSide.find('li').height($windowHeight);

    // if resize event was triggered we need recalculate slider viewport height
    bxSliderViewport();
}

function bxSliderViewport() {
    $(".bx-viewport").height($(window).height());
}

function bxControls() {
    var width = 0,
        $bxControl = $('.bx-controls');

    $bxControl.find('.bx-pager').children().each(function() {
        width += $(this).outerWidth(true);
    });

    $bxControl.width(width);
}

function scrollContentHeight() {
    var margin = 50, // the top margin of the footer
        $main = $('main'),
        mainContentOffsetTop = $main.offset().top,
        footerOffsetTop = $("#copyright").offset().top,
        height  = (footerOffsetTop - mainContentOffsetTop) - margin;

    $main.css('height', height );

}

function checkResponsive(numb) {

    var result = null,
        size = typeof numb === 'undefined' ? 580 : numb;

    if ($(window).width() <= size) {
        result = true;
    }else{
        result = false;
    }

    return result;
}

function dynamicSVG() {
    $('svg').each(function() {
        var parent = $(this).parent();
        $(this).find('.top').attr('x2', parent.width());
        $(this).find('.left').attr('y2', parent.height());
    });
}
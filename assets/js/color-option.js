/* ==================================================
# Function JS
===============================================*/
(function($) {
    "use strict";

    $(document).on('ready', function() {
		
		// Color Option
		Filaous_bgColor_Options();
		
    }); // end document ready function
})(jQuery); // End jQuery
		
/* ==================================================
# Background Color Option
===============================================*/

function Filaous_bgColor_Options(){
    "use-strict";

    var toggleLinkTag = $('#theme-color-toggle');
    var colorOptionsSidebarToggle = $('#colorChange,.colorChange');
    var rtlSidebar = $('#rtlSidebar');
    var rtlToggle = $('#rtlToggle');
    var colorOptions = $('.color-options-list');
    var colorOptionsWrap = $('.color-options-wrap');
    var optionsItem = colorOptions.find('span');

    optionsItem.first().addClass("active");

    colorOptionsSidebarToggle.on("click",function(){
        colorOptionsWrap.toggleClass("active");
    });

    optionsItem.each(function(){
        var itemBgData = $(this).attr("data-bg-color");
        $(this).css('background-color', itemBgData);
        $(this).css('color', itemBgData);
    });

    optionsItem.on('click',function(){
        var bgActiveColor = $(this).css("background-color");
        var itemSrcData = $(this).attr("data-skins-css-path");
        optionsItem.removeClass("active");
        $(this).addClass("active");
        colorOptionsSidebarToggle.css("background-color",bgActiveColor);
        rtlToggle.css("background-color",bgActiveColor);
        toggleLinkTag.attr("href", itemSrcData);
    });

    var activeBgColor = optionsItem.first().css("background-color");

    rtlToggle.css("background-color", activeBgColor);

    // Rtl Toggle
    rtlToggle.on("click",function() {

        if ( colorOptionsWrap.hasClass("active")){
            colorOptionsWrap.toggleClass("active");
        }
        if($(this).text() == "RTL"){
            $(this).text("LTR").removeClass('rtl-mode').addClass("rtl-mode");
            $('body').removeClass("rtl-mode").addClass("rtl-mode");
        }else {
            rtlSidebar.removeClass("rtl-mode").addClass("ltr-mode");
            $(this).text("RTL").removeClass('rtl-mode').addClass("ltr-mode");
            $('body').removeClass("rtl-mode");
        }
    });
}// JavaScript Document


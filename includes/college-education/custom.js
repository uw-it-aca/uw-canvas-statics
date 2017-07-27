/*jslint browser: true */
/*global jQuery */
(function ($) {
    "use strict";

    // If Early EDU home page, then remove the right sidebar and expand the page
    $(".early-edu").whenExists(function () {
        $(".ic-app-main-content")
            .css({"flex": "", "-webkit-flex": "", "display": "block"});
        $(".ic-Layout-contentWrapper")
            .css({"flex": "", "-webkit-flex": "", "display": "block"});
        $("body:not(.full-width):not(.outcomes) .ic-Layout-wrapper")
            .css({"max-width": "none"});
    });
    $(".early-edu-discussion").whenExists(function () {
        $(".discussion-reply-box").addClass("early-edu-discussion-button")
            .children("span:first").text("Contribute to the Discussion");
    });
    $("#early-edu-accordion").whenExists(function () {
        $("#early-edu-accordion").accordion({
            collapsible: true,
            heightStyle: "content"
        });
    });
}(jQuery));

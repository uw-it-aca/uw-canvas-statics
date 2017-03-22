/*jslint browser: true */
/*global jQuery */
(function ($) {
    "use strict";

    // If Early EDU home page, then remove the right sidebar and expand the page
    $(".early-edu").whenExists(function () {
        $(".with-right-side #right-side-wrapper").hide();
        $("body:not(.full-width):not(.outcomes) .ic-Layout-wrapper")
            .css({"max-width": "none"});
    });
}(jQuery));

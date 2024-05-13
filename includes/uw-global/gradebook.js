/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    // Remove the "Treat Ungraded as 0" menu item
    $(window).load(function () {
        //$('#ungraded').whenExists(function () {
        $('#ungraded').closest('div').css('display', 'none');
        //});
    });

}(jQuery));

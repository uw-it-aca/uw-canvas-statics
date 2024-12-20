/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    // Remove the "Treat Ungraded as 0" menu item
    $(window).on('load', function () {
        $('#ungraded').closest('div').css('display', 'none');
    });

}(jQuery));

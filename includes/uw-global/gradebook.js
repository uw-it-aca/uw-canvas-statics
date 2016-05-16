/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    // Remove the "Treat Ungraded as 0" menu item
    $('#include_ungraded_assignments').whenExists(function () {
        $(this).closest('li').remove();
    });

    // Remove the option on the Individual view, too
    $('#ungraded').whenExists(function () {
        $(this).closest('div').remove();
    });
}(jQuery));

/*jslint browser: true */
/*global jQuery */
(function ($) {
    'use strict';

    $(document).ready(function () {
        $('.element_toggler').on('click', function(ev) {
            $(this).classList.toggle('active');
            if ($(this).next().is(':visible')) {
                $(this).next().hide();
            } else {
                $(this).next().show();
            }
        });
    });
}(jQuery));

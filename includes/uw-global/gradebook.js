/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    // Remove the "Treat Ungraded as 0" menu item
    function hide_view_ungraded_as_0() {
        $('span:contains("View Ungraded as 0")').closest('li').css('display', 'none');
    }

    hide_view_ungraded_as_0();

    var MenuObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            hide_view_ungraded_as_0();
        });
    });

    MenuObserver.observe(document.getElementById('gradebook-toolbar'), {
        attributes: true, subtree: true
    });

}(jQuery));

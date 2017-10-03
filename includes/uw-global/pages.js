/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    function deselect_front_page() {

    }

    function add_deselect_front_page_option () {
        /*jshint validthis: true */
        console.log("GOT A FRONT PAGE");
        var previous_item = $(this).closest('tr').find('ul.al-options:eq(0) li:eq(1)'),
            new_item = $('li').addClass('ui-menu-item').attr('role', 'presentation');

        $('a', {
            text: 'Deselect as Front Page',
            title: 'Deselect as Front Page',
            href: '#',
            role: 'menuitem',
            click: deselect_front_page
        }).addClass('icon-home ui-corner-all').appendTo(new_item);

        new_item.insertAfter(previous_item);
    }

    // Remove front page option
    $('span.front-page').whenExists(add_deselect_front_page_option);
}(jQuery));

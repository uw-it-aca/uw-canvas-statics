/*jslint browser: true, plusplus: true, esversion: 6 */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    function add_back_button_users() {
        var m = window.location.pathname.match(/^\/courses\/(\d+)\//);
        if (m) {
            UWCanvas.add_right_nav_button('icon-arrow-left',
                                          'Back to People',
                                          '/courses/' + m[1] + '/users');
        }
    }

    function add_breadcrumbs_users($tool_link) {
        var $ul = $('#breadcrumbs ul'),
            $li,
            $a;

        if ($ul.length) {
            $li = $('<li>');
            $a = $('<a>').attr('href', $('a.people').attr('href'));
            $a.append($('<span>').addClass('ellipsible').text('People'));
            $li.append($a);
            $ul.append($li);
            $li = $('<li>');
            $li.text($tool_link.text());
            $ul.append($li);
        }
    }

    function add_page_cues() {
        var external_link_prefix = 'body.context_external_tool_',
            external_link_ids,
            $external_links;

        if (typeof UWCanvas.uw_groups_external_ids === 'undefined') {
            external_link_ids = [UWCanvas.uw_groups_external_id,
                                 UWCanvas.course_photos_external_id];
        } else {
            external_link_ids = [UWCanvas.uw_groups_external_ids[0],
                                 UWCanvas.course_photos_external_ids[0]];
        }

        $external_links = $(external_link_ids.map(id => external_link_prefix + id).join(','));
        if ($external_links.length == 1) {
            add_back_button_users();
            add_breadcrumbs_users($external_links.first());
        }
    }

    $(document).ready(add_page_cues);
}(jQuery));

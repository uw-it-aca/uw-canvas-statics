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

    function add_breadcrumbs_users(tool_id) {
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
            $li.text($('a.context_external_tool_' + tool_id).text());
            $ul.append($li);
        }
    }

    function add_page_cues() {
        var external_link_ids;

        if (typeof UWCanvas.uw_groups_external_ids === 'undefined') {
            external_link_ids = [UWCanvas.uw_groups_external_id,
                                 UWCanvas.course_photos_external_id];
        } else {
            external_link_ids = [UWCanvas.uw_groups_external_ids[0],
                                 UWCanvas.course_photos_external_ids[0]];
        }

        $.each(external_link_ids, function () {
            if ($('body.context_external_tool_' + this).length === 1) {
                add_back_button_users();
                add_breadcrumbs_users(this);
                return false;
            }
        });
    }

    $(document).ready(add_page_cues);
}(jQuery));

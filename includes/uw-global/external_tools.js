/*jslint browser: true, plusplus: true */
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

    $.each([UWCanvas.uw_groups_external_ids[0],
            UWCanvas.course_photos_external_ids[0]], function () {
        if ($('body.context_external_tool_' + this).length === 1) {
            add_back_button_users();
            add_breadcrumbs_users(this);
            return false;
        }
    });
}(jQuery));

/*jslint browser: true, plusplus: true */
/*global jQuery */
var UWCanvas = (function ($) {
    'use strict';

    var add_users_external_id = '31483',
        uw_groups_external_id = '31485',
        course_photos_external_id = '31493';

    $.fn.whenExists = function (handler) {
        var selector = this.selector,
            n = 0,
            $nodes,
            iid = window.setInterval(function () {
                $nodes = $(selector);
                $nodes.each(handler);
                if ($nodes.length > 0 || ++n > 200) {
                    window.clearInterval(iid);
                }
            }, 50);

        return $(selector);
    };

    function load_script(path) {
        var hostname = (window.location.hostname === 'canvas.uw.edu')
            ? 'apps.canvas.uw.edu' : 'canvas-test.s.uw.edu';
        $('<script>').attr('type', 'text/javascript')
                     .attr('src', 'https://' + hostname + path)
                     .appendTo('head');
    }

    function update_report_problem_form(ev, xhr, obj) {
        if (obj.url === '/help_links') {
            $("label[for='error-comments'] small").remove();
            $(document).off('ajaxComplete', update_report_problem_form);
        }
    }

    function add_right_nav_button(icon, label, href, position) {
        var $right = $('#not_right_side #right-side-wrapper'),
            $node,
            $a;

        $node = $('<i>').addClass(icon);
        $a = $('<a>').attr('href', href)
                     .addClass('btn button-sidebar-wide')
                     .append($node)
                     .append(document.createTextNode(' ' + label));
        if ($right.length === 0) {
            $right = $('<div>').attr('id', 'right-side-wrapper');
            $('#not_right_side').append($right);
        }

        if ($right.find('> aside').length === 0) {
            $node = $('<aside>').addClass('right-side')
                                .attr('role', 'complementary');
            $right.append($node);
        }

        if ($right.find('> aside > div').length === 0) {
            $node = $('<div>').addClass('rs-margin-lr rs-margin-top');
            $right.find('> aside').append($node);
        }

        if (position && position === 1) {
            $right.find('> aside > div a:first-child').before($a);
        } else if (position && position === 2) {
            $right.find('> aside > div a:first-child').after($a);
        } else {
            $right.find('> aside > div').append($a);
        }
        $('body').addClass('with-right-side');
    }

    $(document).ready(function () {
        var href = window.location.href;

        if (href.match(/\/(settings|details)$/)) {
            load_script('/includes/uw-global/settings.js');
        } else if (href.match(/\/courses\/\d+\/assignments/)) {
            load_script('/includes/uw-global/assignments.js');
        } else if (href.match(/\/courses\/\d+\/users(\/(#.*)?)?$/)) {
            load_script('/includes/uw-global/users.js');
        } else if (href.match(/\/courses\/\d+\/gradebook/)) {
            load_script('/includes/uw-global/gradebook.js');
        } else if (href.match(/\/courses\/\d+\/external_tools/)) {
            load_script('/includes/uw-global/external_tools.js');
        }
    });

    $(document).on('ajaxComplete', update_report_problem_form);

    return {
        load_script: load_script,
        add_right_nav_button: add_right_nav_button,
        add_users_external_id: add_users_external_id,
        uw_groups_external_id: uw_groups_external_id,
        course_photos_external_id: course_photos_external_id
    };
}(jQuery));

/*jslint browser: true, plusplus: true */
/*global jQuery */
var ALLY_CFG = {
    'loadScript': false,  // Set to true to enable ally
    'baseUrl': 'https://prod.ally.ac',
    'clientId': 5
};
var UWCanvas = (function ($) {
    'use strict';

    var add_users_external_id = '31483',
        uw_groups_external_id = '31485',
        course_photos_external_id = '37913',
        unauthorized_title = "You don't have access to this content",
        unauthorized_message = '<div id="uw_unauthorized_message"><span role="alert"><h3 class="unauth-alert-head">You don\'t have access to this content.</h3><p class="unauth-alert unauth-alert-bold">Please contact the course instructor.</span><p class="unauth-alert">Describe the resource that you are trying to access and provide your UW NetID.</p></span><hr style="width:675px;"><div class="unauth-extra"><p>Common reasons content is unavailable include:</p><ul class="unauth-extra-list"><li>Content has not yet been published</li><li>You are not enrolled in the course</li><li>Link provided is incorrect</li><li>Content has been deleted</li></ul></div></div>';

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
        var base_url = (window.location.hostname === 'canvas.uw.edu') ?
            'https://apps.canvas.uw.edu' : 'https://canvas-test.s.uw.edu';
        $.getScript(base_url + path);
    }

    function update_report_problem_form(ev, xhr, obj) {
        if (obj.url === '/help_links') {
            $("label[for='error-comments'] small").remove();
            $(document).off('ajaxComplete', update_report_problem_form);
        }
    }

    function show_unauthorized() {
        if ($('#unauthorized_holder').length) {
            $(document).prop('title', unauthorized_title);
            $('#unauthorized_message').replaceWith(unauthorized_message);
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

        if (href.match(/\/(accounts|courses)\/\d+\/(settings|details)$/)) {
            load_script('/includes/uw-global/settings.js');
        } else if (href.match(/\/courses\/\d+\/assignments/)) {
            load_script('/includes/uw-global/assignments.js');
        } else if (href.match(/\/courses\/\d+\/users(\/(#.*)?)?$/)) {
            load_script('/includes/vendor/handlebars-1.3.0.min.js');
            load_script('/includes/uw-global/users.js');
        } else if (href.match(/\/courses\/\d+\/gradebook/)) {
            load_script('/includes/uw-global/gradebook.js');
        } else if (href.match(/\/courses\/\d+\/external_tools/)) {
            load_script('/includes/uw-global/external_tools.js');
        } else if (href.match(/\/courses\/\d+\/pages/)) {
            load_script('/includes/uw-global/pages.js');
        } else if (href.match(/\/profile\/settings$/)) {
            load_script('/includes/uw-global/profile.js');
        }

        if (href.match(/\/courses\/\d+(\/.*)?$/)) {
            $('#unauthorized_holder').whenExists(show_unauthorized);
            if (ALLY_CFG.loadScript) {
                $.getScript(ALLY_CFG.baseUrl + '/integration/canvas/ally.js');
            }
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

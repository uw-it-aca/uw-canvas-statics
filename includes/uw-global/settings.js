/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var nav_link_text_shown = '<span class="uw_enabled_message" style="display: none;">Never shown in course navigation. Hiding reduces functionality.</span>',
        nav_link_text_hidden = 'Never shown, but must appear above to provide functionality.',
        public_syllabus_label = ' (students will be able<br/>to read the syllabus description text when registering for courses<br/><a href="http://www.washington.edu/itconnect/learn/tools/canvas/use-canvas-to-publicize-your-individual-course-description/" target="_blank">Learn more</a>)',
        app_center_info = '<p>Apps are an easy way to add new features to Canvas. They can be added to individual courses, or to all courses in an account. Once configured, you can link to them through course modules and create assignments for assessment tools.</p><p>UW-IT has reviewed the third-party apps listed below, and found they meet our established minimum criteria. <a href="http://www.washington.edu/itconnect/learn/tools/canvas/canvas-help-for-instructors/canvas-app-center/" target="_blank">Find more information</a> or get help with the App Center.</p>';

    function add_navigation_warnings() {
        var $add = $('#nav_edit_tab_id_context_external_tool_' +
                UWCanvas.add_users_external_id),
            $groups = $('#nav_edit_tab_id_context_external_tool_' +
                UWCanvas.uw_groups_external_id),
            $photos = $('#nav_edit_tab_id_context_external_tool_' +
                UWCanvas.course_photos_external_id);

        $add.append(nav_link_text_shown);
        $add.find('.disabled_message')
            .text(nav_link_text_hidden)
            .addClass('uw_disabled_message');

        $groups.append(nav_link_text_shown);
        $groups.find('.disabled_message')
               .text(nav_link_text_hidden)
               .addClass('uw_disabled_message');

        $photos.append(nav_link_text_shown);
        $photos.find('.disabled_message')
               .text(nav_link_text_hidden)
               .addClass('uw_disabled_message');
    }

    function update_app_info() {
        var el = $('span.externalApps_label_text').closest('h2').next();
        el.children('p').css('display', 'none');
        el.append(app_center_info);
    }

    // Custom text for App Center
    $('#tab-tools-link').whenExists(function () {
        $(this).on('click', update_app_info);
        update_app_info();
    });

    // Custom text for "public syllabus" option
    $('label[for="course_syllabus_visibility_option"]').whenExists(function () {
        $(this).closest('div').append(public_syllabus_label);
    });

    add_navigation_warnings();

}(jQuery));

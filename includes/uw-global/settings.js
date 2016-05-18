/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var nav_link_text_shown = '<span class="uw_enabled_message" style="display: none;">Never shown in course navigation. Hiding reduces functionality.</span>',
        nav_link_text_hidden = 'Never shown, but must appear above to provide functionality.',
        public_syllabus_label = ' (students will be able<br/>to read the syllabus description text when registering for courses<br/><a href="http://www.washington.edu/itconnect/learn/tools/canvas/use-canvas-to-publicize-your-individual-course-description/" target="_blank">Learn more</a>)',
        app_center_info = 'Apps are an easy way to add new features to Canvas. They can be added to individual courses, or to all courses in an account. Once configured, you can link to them through course modules and create assignments for assessment tools.<br/><br/>UW-IT has reviewed the third-party apps listed below, and found they meet our established minimum criteria. <a href="http://www.washington.edu/itconnect/learn/tools/canvas/canvas-help-for-instructors/canvas-app-center/" target="_blank">Find more information</a> or get help with the App Center.';

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

    // Custom text for App Center
    $('p[data-reactid=".2.0.0.1.0"]').whenExists(function () {
        if ($(this).closest('#external_tools')) {
            $(this).html(app_center_info);
        }
    });

    // Custom text for "public syllabus" option
    $('label[for="course_public_syllabus"]').whenExists(function () {
        $('#course_public_syllabus').css('vertical-align', 'top');
        $(this).append(public_syllabus_label);
    });

    add_navigation_warnings();

}(jQuery));

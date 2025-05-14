/*jslint browser: true, plusplus: true, esversion: 6 */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var nav_link_text_shown = '<span class="uw_enabled_message" style="display: none;">Never shown in course navigation. Hiding reduces functionality.</span>',
        nav_link_text_hidden = 'Never shown, but must appear above to provide functionality.',
        public_syllabus_label = 'When set to &quot;Public&quot;, students will be able to read the syllabus description text when registering for courses.  Files linked from the description are also public.  <a href="https://itconnect.uw.edu/learn/tools/canvas/canvas-help-for-instructors/use-canvas-to-publicize-your-individual-course-description/" target="_blank">Learn more</a>',
        app_center_info = '<p>Apps are an easy way to add new features to Canvas. They can be added to individual courses, or to all courses in an account. Once configured, you can link to them through course modules and create assignments for assessment tools.</p><p>UW-IT has reviewed the third-party apps listed below, and found they meet our established minimum criteria. <a href="https://itconnect.uw.edu/learn/tools/canvas/canvas-help-for-instructors/canvas-app-center/" target="_blank">Find more information</a> or get help with the App Center.</p>';

    function add_navigation_warnings() {
        var tool_id_prefix = '#nav_edit_tab_id_context_external_tool_',
            add_users_external_ids = (UWCanvas.add_users_external_ids === undefined ) ? [UWCanvas.add_users_external_id] : UWCanvas.add_users_external_ids,
            uw_groups_external_ids = (UWCanvas.uw_groups_external_ids === undefined ) ? [UWCanvas.uw_groups_external_id] : UWCanvas.uw_groups_external_ids,
            course_photos_external_ids = (UWCanvas.course_photos_external_ids === undefined ) ? [UWCanvas.course_photos_external_id] : UWCanvas.course_photos_external_ids;

        $(add_users_external_ids.concat(
            uw_groups_external_ids).concat(
                course_photos_external_ids).map(
                    id => tool_id_prefix + id).join(',')).append(
                        nav_link_text_shown).find(
                            '.disabled_message').text(
                                nav_link_text_hidden).addClass(
                                    'uw_disabled_message');
    }

    function update_app_info() {
        var el = $('div.AppList').children('header').first();
        el.find('p').css('display', 'none');
        el.append(app_center_info);
    }

    // Custom text for App Center
    $(window).on('load', function () {
        $('#tab-tools-link').whenExists(function () {
            $('#tab-tools-link').on('click', update_app_info);
            update_app_info();
        });

        // Custom text for "public syllabus" option
        $('label[for="course_syllabus_visibility_option"]').whenExists(function () {
            $('label[for="course_syllabus_visibility_option"]').closest(
                'div').append(public_syllabus_label);
        });

        add_navigation_warnings();
    });

}(jQuery));

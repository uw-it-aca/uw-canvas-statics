/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var public_syllabus_label = '<span class="aside checklabelfix"> (When publicly visible, students will be able to read the syllabus description text when registering for courses. <a href="http://www.washington.edu/itconnect/learn/tools/canvas/use-canvas-to-publicize-your-individual-course-description/" target="_blank">Learn more</a>.)</span>',
        app_center_info = 'Apps are an easy way to add new features to Canvas. They can be added to individual courses, or to all courses in an account. Once configured, you can link to them through course modules and create assignments for assessment tools.<br/><br/>UW-IT has reviewed the third-party apps listed below, and found they meet our established minimum criteria. <a href="http://www.washington.edu/itconnect/learn/tools/canvas/canvas-help-for-instructors/canvas-app-center/" target="_blank">Find more information</a> or get help with the App Center.';

    // Custom text for App Center
    $("#external_tools").whenExists(function () {
        $(this).find("p:first").html(app_center_info);
    });

    // Custom text for "public syllabus" option
    $("label[for='course_public_syllabus']").whenExists(function () {
        $(this).after(public_syllabus_label);
    });
}(jQuery));

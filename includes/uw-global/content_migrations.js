/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var zoom_info = '<p><strong>Zoom meeting access:</strong> When copying all content from a Canvas course, calendar events for Zoom meetings scheduled using the Zoom app in Canvas are also copied. To prevent students from accessing previous Zoom meeting links you can:<ul><li>Delete individual calendar events containing previous Zoom meeting links, or</li><li>Select <a href="https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-select-specific-content-as-part-of-a-course-import/ta-p/1091" target="_blank">specific content to copy</a>, and exclude all calendar events from being copied</li></ul></p>',
        panopto_info = '<p><strong>Access to Panopto recordings:</strong> When copying any Canvas content from one course to another, students in the new course will be granted access to the Panopto recordings in the original course. <a href="https://itconnect.uw.edu/learn/tools/panopto/remove-access-recordings/" target="_blank">You may remove access to recordings.</a></p>';

    // Custom text for migrating course content
    $('#content').whenExists(function () {
        $(this).prepend(panopto_info);
        $(this).prepend(zoom_info);
    });
}(jQuery));

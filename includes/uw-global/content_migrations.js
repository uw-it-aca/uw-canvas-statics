/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';
    var zoom_info = '<strong>Zoom meeting access:</strong> When copying all content from a Canvas course, calendar events for Zoom meetings scheduled using the Zoom app in Canvas are also copied. To prevent students from accessing previous Zoom meeting links you can:<ul style="margin: 0 0 6px 60px"><li>Delete individual calendar events containing previous Zoom meeting links, or</li><li>Select <a href="https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-select-specific-content-as-part-of-a-course-import/ta-p/1091" target="_blank">specific content to copy</a>, and exclude all calendar events from being copied</li></ul>',
        panopto_info = '<p><strong>Panopto archived recordings:</strong> Before copying your course in Canvas and Panopto, <a href="https://itconnect.uw.edu/tools-services-support/teaching-learning/panopto/copy-recordings/" target="_blank">make sure that you do not have any archived recordings</a> associated with that course in Panopto.  Archived Recordings will NOT copy.</p>';
    // Custom text for migrating course content
    $('#content').whenExists(function () {
        $(this).prepend(panopto_info);
        $(this).prepend(zoom_info);
    });
}(jQuery));

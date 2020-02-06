/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var simcheck_info = '<p><strong>Try SimCheck, the new plagiarism detection tool.</strong>  Did the course you&apos;re copying use VeriCite for plagiarism detection? Starting June 15th, 2020, all new and copied assignments must use SimCheck instead. After copying the course, you&apos;ll need to change each assignment to <a href="https://itconnect.uw.edu/learn/tools/canvas/canvas-help-for-instructors/assignments-grading/simcheck-faqs/#assignment" target="_blank">use SimCheck.</a></p>',
        panopto_info = '<p><strong>Access to Panopto recordings:</strong> When copying any Canvas content from one course to another, students in the new course will be granted access to the Panopto recordings in the original course. <a href="https://itconnect.uw.edu/learn/tools/panopto/remove-access-recordings/" target="_blank">You may remove access to recordings.</a></p>';

    // Custom text for simcheck
    $('#content').whenExists(function () {
        $(this).prepend(panopto_info);
        //$(this).prepend(simcheck_info);
    });
}(jQuery));

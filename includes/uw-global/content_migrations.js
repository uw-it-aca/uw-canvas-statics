/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var simcheck_info = '<p>Did the course you\'re copying use VeriCite plagiarism detection?  Starting June 15, 2020, all new and copied assignments must use SimCheck.  After copying the course, you’ll need to change each assignment to use SimCheck.</p>',
        panopto_info = '<p>When copying a course, students in the new course will be granted access to any Panopto recordings in the original course. If you do not want your new class to have access to recordings from your old class, learn how to <a href="https://itconnect.uw.edu" target="_blank">remove access to recordings</a>.</p>';

    // Custom text for simcheck
    $('#content').whenExists(function () {
        $(this).prepend(panopto_info);
        $(this).prepend(simcheck_info);
    });
}(jQuery));

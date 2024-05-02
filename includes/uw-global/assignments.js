/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var gpa_scale_info = 'Use GPA Scale Grading to create a UW 4.0 grading scale. To create your scale, in the left-hand course navigation, go to &quot;UW 4.0 Grade Scale&quot;. Once you create a scale, it will be added to this course and ready for you to apply to assignments. To learn more, see <a href="https://itconnect.uw.edu/learn/tools/canvas/canvas-help-for-instructors/assignments-grading/manage-grade-scale/" target="_blank">Use a 4.0 Grade Scale for Canvas Assignments.</a>';

    // Custom text for grading scale modal
    $('#gpa-scale-dialog').whenExists(function () {
        this.html(gpa_scale_info);
    });

    // Hide external tool option
    /*
    $(document).ajaxComplete(function (ev, xhr, data) {
        if (data.url.match(/launch_definitions/)) {
            $('a:contains("Google Assignments (LTI 1.3)")').whenExists(function () {
                $(this).closest('li').hide();
            });
        }
    });
    */
}(jQuery));

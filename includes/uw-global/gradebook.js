/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var late_policy_warning = '<p><strong>Note: Setting a Late Submission policy affects all assignments in a course, including assignments with due dates in the past.</strong></p>';

    // Remove the "Treat Ungraded as 0" menu item
    $(window).on('load', function () {
        $('#ungraded').closest('div').css('display', 'none');
    });

    $(document).ajaxComplete(function (ev, xhr, data) {
        if (data.url.match(/late_policy/)) {
            $('#LatePoliciesTabPanel__Container').whenExists(function () {
                $('#LatePoliciesTabPanel__Container').prepend(late_policy_warning);
            });
        }
    });

}(jQuery));

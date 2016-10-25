/*jslint browser: true */
/*global jQuery, navigator, alert */
(function ($) {
    "use strict";

    $(document).ready(function () {
        $("#quiz-instructions:contains('[SEB]')").whenExists(function () {
            if (navigator.userAgent.match(/SEB/) === null) {
                $("#submit_quiz_form").hide();
                alert('You must use the Safe Exam Browser to take this quiz');
            }
        });
    });
}(jQuery));

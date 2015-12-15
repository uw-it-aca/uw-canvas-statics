/*jslint browser: true, plusplus: true */
/*global jQuery */
(function ($) {
    "use strict";

    // Replace the Canvas favicon with the UW homepage version
    $("head").append('<link rel="shortcut icon" type="image/x-icon" href="https://apps.canvas.uw.edu/branding/uw-global/favicon.ico"></link>');

    var catalog = {
        add_people_label: 'Provide a list of valid (student, faculty, or staff) UW NetIDs:<br/>',
        add_people_extra: '<div class="add_people_uwnetids">Note: Canvas recognizes only current student, faculty, and staff NetIDs by default.  To add other NetIDs or Gmail addresses, please read the <a href="http://www.washington.edu/itconnect/learn/tools/canvas/canvas-help-for-instructors/communicating/give-course-access-to-people-without-a-uw-netid/" target="_blank">UW course access guide</a> or contact <a href="mailto:help@uw.edu">help@uw.edu</a>.</div>',
        add_people_error: '<div>Please enter a list of valid UW NetIDs or Gmail addresses</div>',
        add_people_placeholder: 'uwnetid, uwnetid, uwnetid',
        public_syllabus_label: '<span class="aside checklabelfix"> (When publicly visible, students will be able to read the syllabus description text when registering for courses. <a href="http://www.washington.edu/itconnect/learn/tools/canvas/use-canvas-to-publicize-your-individual-course-description/" target="_blank">Learn more</a>.)</span>',
        app_center_info: 'Apps are an easy way to add new features to Canvas. They can be added to individual courses, or to all courses in an account. Once configured, you can link to them through course modules and create assignments for assessment tools.<br/><br/>UW-IT has reviewed the third-party apps listed below, and found they meet our established minimum criteria. <a href="http://www.washington.edu/itconnect/learn/tools/canvas/canvas-help-for-instructors/canvas-app-center/" target="_blank">Find more information</a> or get help with the App Center.',
        gpa_scale_info: 'Use GPA Scale Grading to create a UW 4.0 grading scale. To create your scale, in the left-hand course navigation, go to &quot;UW 4.0 Grade Scale&quot;. Once you create a scale, it will be added to this course and ready for you to apply to assignments. To learn more, see <a href="http://www.washington.edu/itconnect/learn/tools/canvas/canvas-help-for-instructors/assignments-grading/grading/4-0-grade-scale/" target="_blank">Use a 4.0 Grade Scale for Canvas Assignments</a>.'
    },
        app_center_attempts = 0;

    function gettext(key) {
        return (catalog.hasOwnProperty(key)) ? catalog[key] : "";
    }

    function customizeAddPeopleButtons() {
        $("button.createUsersStartOver, button.createUsersStartOverFrd")
            .off("click", customizeAddPeopleDialog)
            .on("click", customizeAddPeopleDialog);

        // In case of input errors, hide the example text
        $("div.alert-error").find("small:first").hide();
    }

    // Set up the custom "Add People" dialog
    function customizeAddPeopleDialog() {
        setTimeout(function () {
            $("#create-users-step-1").children("p")
                                     .html(gettext("add_people_label"));
            $("#user_list_textarea").attr("placeholder", gettext("add_people_placeholder"));
            if ($("div.add_people_uwnetids").length === 0) {
                $("#user_list_textarea").after(gettext("add_people_extra"));
            }
            $("#next-step").click(function () {
                setTimeout(function () {
                    $("div.error_box[id='']").find("div.error_text")
                                             .html(gettext("add_people_error"));
                }, 50);
            });
        }, 50);

        $(document).off("ajaxComplete", customizeAddPeopleButtons)
                   .on("ajaxComplete", customizeAddPeopleButtons);
    }

    // Custom text for App Center
    function customizeAppCenterInfo() {
        if ($("#external_tools").find("p:first").length) {
            $("#external_tools").find("p:first").html(gettext("app_center_info"));
        } else {
            if (app_center_attempts < 50) { // Try for 5 secs
                app_center_attempts++;
                setTimeout(customizeAppCenterInfo, 100);
            }
        }
    }

    // Custom text for "public syllabus" option
    function customizePublicSyllabusLabel() {
        var text = gettext("public_syllabus_label");
        $("label[for='course_public_syllabus']").after(text);
    }

    // Custom text for grading scale modal
    function customizeGPAScaleDialog() {
        setTimeout(function () {
            $("#gpa-scale-dialog").html(gettext("gpa_scale_info"));
        }, 50);
    }

    // Custom text for "Report a Problem" form
    function customizeReportProblemForm(ev, xhr, obj) {
        if (obj.url === "/help_links") {
            $("label[for='error-comments'] small").remove();
            $(document).off("ajaxComplete", customizeReportProblemForm);
        }
    }

    function customizeGradebookMenu() {
        // Remove the "Treat Ungraded as 0" menu item
        $("#include_ungraded_assignments").closest("li").remove();
        // Remove the option on the Individual view, too
        $("#ungraded").closest("div").remove();
    }

    $(document).ready(function () {
        setTimeout(function () {
            var href = window.location.href;
            if (href.match(/\/settings$/)) {
                // Course or account settings page
                customizePublicSyllabusLabel();
                customizeAppCenterInfo();

            } else if (href.match(/\/courses\/\d+\/assignments/)) {
                // Course assignments page
                $("#gpa-scale-question").on("click", customizeGPAScaleDialog);

            } else if (href.match(/\/courses\/\d+\/users$/)) {
                // Course people page
                $("#addUsers").on("click", customizeAddPeopleDialog);

            } else if (href.match(/\/courses\/\d+\/gradebook/)) {
                // Course gradebook page
                customizeGradebookMenu();

            }
            $(document).on("ajaxComplete", customizeReportProblemForm);
        }, 1000);
    });
}(jQuery));

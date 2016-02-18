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
        app_center_attempts = 0,
        add_users_external_id = "31483",
        uw_groups_external_id = "31485",
        course_photos_external_id = "31484",
        window_message;

    function gettext(key) {
        return (catalog.hasOwnProperty(key)) ? catalog[key] : "";
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

    function hijackAddUsersButton() {
      var $tool = $('.context_external_tool_' + add_users_external_id);
        if ($tool.length !== 1) {
          return;
      }

        $("#addUsers")
            .off("click")
            .on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($('#uw-add-people-slightofhand').length === 1) {
                    $('#uw-add-people-slightofhand').find('.ReactModalPortal').show();
                } else {
                    $(e.target).attr('disabled', true);
                    $('<div id="uw-add-people-slightofhand"><iframe style="height:1px;width:1px;" '
                      + 'src="' + $tool.attr('href') + '"'
                      + '></iframe><div id="uw_add_users"></div></div>').appendTo('body');
                }
            });
    }

    function addCoursePhotosButton(tool_id) {
        moveNavToRightButton(tool_id, 'icon-student-view');
    }

    function addUWGroupsButton(tool_id) {
        moveNavToRightButton(tool_id, 'uw-groups-button-image');
    }

    function moveNavToRightButton(nav_id, icon, position) {
        var nav = $('a.context_external_tool_' + nav_id);
        if (nav.length === 1) {
            addRightButtonTool(icon, nav.text(), nav.attr('href'), position);
        }
    }

    function addBackToPeopleButton() {
        var m = window.location.pathname.match(/^\/courses\/(\d+)\//);
        if (m) {
            addRightButtonTool('icon-arrow-left',
                               'Back to People',
                               '/courses/' + m[1] + '/users');
        }
    }

    function addRightButtonTool(icon, label, href, position) {
        var $right = $('#not_right_side #right-side-wrapper'),
            $node,
            $a;

        $node = $('<i></i>').addClass(icon);
        $a = $('<a></a>')
            .attr('href', href)
            .addClass('btn button-sidebar-wide')
            .append($node)
            .append(document.createTextNode(' ' + label));
        if ($right.length === 0) {
            $right = $('<div></div>').attr('id', 'right-side-wrapper');
            $('#not_right_side').append($right);
        }

        if ($right.find('> aside').length === 0) {
            $node = $('<aside></aside>')
                .addClass('right-side')
                .attr('role', 'complementary');

            $right.append($node);
        }

        if ($right.find('> aside > div').length === 0) {
            $node = $('<div></div>')
                .addClass('rs-margin-lr rs-margin-top');

            $right.find('> aside').append($node);
        }

        if (position && position == 1) {
            $right.find('> aside > div a:first-child').before($a);
        } else if (position && position == 2) {
            $right.find('> aside > div a:first-child').after($a);
        } else {
            $right.find('> aside > div').append($a);
        }

        $('body').addClass('with-right-side');
    }

    function addPeopleBreadCrumbs(tool_id) {
        var $ul = $('#breadcrumbs ul'),
            $li,
            $a,
            text;

        if ($ul.length) {
            $li = $('<li></li>');
            $a = $('<a></a>').attr('href', $('a.people').attr('href'));
            $a.append($('<span></span>').addClass('ellipsible').text('People'));
            $li.append($a);
            $ul.append($li);
            $li = $('<li></li>');
            $li.text($('a.context_external_tool_' + tool_id).text());
            $ul.append($li);
        }
    }

    function isSpecialToolPage(ids) {
        var tool_id = 0;

        $.each(ids, function () {
            if ($('body.context_external_tool_' + this).length === 1) {
                tool_id = this;
                return false;
            }
        });

        return tool_id;
    }

    $(document).ready(function () {
        setTimeout(function () {
            var href = window.location.href,
                tool_id;

            if (href.match(/\/settings$/)) {
                // Course or account settings page
                customizePublicSyllabusLabel();
                customizeAppCenterInfo();
            } else if (href.match(/\/courses\/\d+\/assignments/)) {
                // Course assignments page
                $("#gpa-scale-question").on("click", customizeGPAScaleDialog);
            } else if (href.match(/\/courses\/\d+\/users(\/(#.*)?)?$/)) {
                // Course people page
                addCoursePhotosButton(course_photos_external_id);
                addUWGroupsButton(uw_groups_external_id);
                hijackAddUsersButton();
            } else if (href.match(/\/courses\/\d+\/gradebook/)) {
                // Course gradebook page
                customizeGradebookMenu();
            } else {
                tool_id = isSpecialToolPage([uw_groups_external_id,
                                             course_photos_external_id]);
                if (tool_id !== 0) {
                    // UW Groups LTI or Course Photos LTI
                    addPeopleBreadCrumbs(tool_id);
                    addBackToPeopleButton();
                }
            }

            $(document).on("ajaxComplete", customizeReportProblemForm);
        }, 1000);

        $(window).on('message', function (e) {
            var msg = JSON.parse(e.originalEvent.data);
            if (msg.hasOwnProperty('subject')) {
                switch (msg.subject) {
                case 'lti.uw.addUserUrl':
                    if (window.top !== window) { // bubble up
                        window.parent.postMessage(e.originalEvent.data,
                                                  'https://uw.test.instructure.com');
                    } else {
                        $.ajax({
                            type: 'GET',
                            url: msg.message.url,
                            contentType: 'text/plain',
                            beforeSend: function (xhr, settings) {
                                xhr.setRequestHeader("X-SessionId", msg.message.session_id);
                            }
                        }).done(function (data) {
                            $('#uw_add_users').html(data);
                        });
                    }

                    break;
                }
            }
        });
    });
}(jQuery));

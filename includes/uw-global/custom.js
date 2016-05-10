/*jslint browser: true, plusplus: true */
/*global jQuery */
(function ($) {
    "use strict";

    // Replace the Canvas favicon with the UW homepage version
    $("head").append('<link rel="shortcut icon" type="image/x-icon" href="https://apps.canvas.uw.edu/branding/uw-global/favicon.ico"></link>');

    var catalog = {
        public_syllabus_label: '<span class="aside checklabelfix"> (When publicly visible, students will be able to read the syllabus description text when registering for courses. <a href="http://www.washington.edu/itconnect/learn/tools/canvas/use-canvas-to-publicize-your-individual-course-description/" target="_blank">Learn more</a>.)</span>',
        app_center_info: 'Apps are an easy way to add new features to Canvas. They can be added to individual courses, or to all courses in an account. Once configured, you can link to them through course modules and create assignments for assessment tools.<br/><br/>UW-IT has reviewed the third-party apps listed below, and found they meet our established minimum criteria. <a href="http://www.washington.edu/itconnect/learn/tools/canvas/canvas-help-for-instructors/canvas-app-center/" target="_blank">Find more information</a> or get help with the App Center.',
        gpa_scale_info: 'Use GPA Scale Grading to create a UW 4.0 grading scale. To create your scale, in the left-hand course navigation, go to &quot;UW 4.0 Grade Scale&quot;. Once you create a scale, it will be added to this course and ready for you to apply to assignments. To learn more, see <a href="http://www.washington.edu/itconnect/learn/tools/canvas/canvas-help-for-instructors/assignments-grading/grading/4-0-grade-scale/" target="_blank">Use a 4.0 Grade Scale for Canvas Assignments</a>.'
    },
	missing_add_people_label = 'Add People Unavailable',
	missing_add_people_text = '<p>People cannot be added to your course right now because “Add UW People” has been hidden.</p></p>To restore Add People functionality, go to <a href="settings">Settings</a>, click the Navigation tab, scroll down to find Add UW People in the hidden list.  Click and drag back up into the course navigation link. Click Save to save your changes.</p></p>Even when Add People is enabled, it will never appear in the course navigation (so it doesn&apos;t need to be hidden).</p>',
	missing_groups_label = 'Add UW Groups Unavailable',
        missing_groups_text = '<p>UW Groups cannot be added to your course right now because “Add &amp; Manage UW Groups” has been hidden.</p><p>To restore Add UW Groups functionality, go to <a href="settings">Settings</a>, click the Navigation tab, scroll down to find &quot;Add &amp; Manage UW Groups&quot; in the hidden list. Click and drag back up into the course navigation link. Click Save to save your changes.</p><p>Even when Add &amp; Manage UW Groups is enabled, it will never appear in the course navigation (so it doesn&apos;t need to be hidden).</p>',
        missing_photos_label = 'View Student Photos Unavailable',
        missing_photos_text = '<p>Student Photos cannot be viewed because &quot;View Student Photos&quot; has been hidden.</p><p>To restore Student Photos, go to <a href="settings">Settings</a>, click the Navigation tab, scroll down to find &quot;View Student Photos&quot; in the hidden list.  Click and drag back up into the course navigation link. Click Save to save your changes.</p><p>Even when View Student Photos is enabled, it will never appear in the course navigation (so it doesn&apos;t need to be hidden).</p><p style="font-size: smaller;">Note: If you are teaching a non-academic course, View Student Photos is unavailable.</p>',
        missing_photos_and_groups_label = 'Add UW Groups &amp; View Student Photos Unavailable',
        missing_photos_and_groups_text = '<p>UW Groups and View Student Photos are unavailable because they have been hidden.</p><p>To restore this functionality, go to <a href="settings">Settings</a>, click the Navigation tab, scroll down to find &quot;Add &amp; Manage UW Groups&quot; and &quot;View Student Photos&quot; in the hidden list. Click and drag back up into the course navigation link. Click Save to save your changes.</p><p>Even when Add &amp; Manage UW Groups and View Student Photos are enabled, they will never appear in the course navigation (so they don&apos;t need to be hidden).</p><p style="font-size: smaller;">Note: If you are teaching a non-academic course, View Student Photos is unavailable.</p>',
        custom_nav_link_text_shown = '<span class="uw_enabled_message" style="display: none;">Never shown in course navigation. Hiding reduces functionality.</span>',
        custom_nav_link_text_hidden = "Never shown, but must appear above to provide functionality.",
        app_center_attempts = 0,
        add_users_external_id = "31483",
        uw_groups_external_id = "31485",
	course_photos_external_id = "31493";

    $.fn.whenExists = function (handler) {
        var selector = this.selector,
            n = 0,
            $nodes,
            iid = window.setInterval(function () {
                $nodes = $(selector);
                $nodes.each(handler);
                if ($nodes.length > 0 || ++n > 200) {
                  window.clearInterval(iid);
                }
            }, 50);

        return $(selector);
    };

    function gettext(key) {
        return (catalog.hasOwnProperty(key)) ? catalog[key] : "";
    }

    // Custom text for App Center
    function customizeAppCenterInfo() {
        // Custom text for App Center
        $("#external_tools").whenExists(function () {
            $(this).find("p:first").html(gettext("app_center_info"));
        });
    }

    function customizeNavigation() {
	var $add = $('#nav_edit_tab_id_context_external_tool_'
		     + add_users_external_id ),
	    $groups = $('#nav_edit_tab_id_context_external_tool_'
			+ uw_groups_external_id ),
	    $photos = $('#nav_edit_tab_id_context_external_tool_'
			+ course_photos_external_id);

	$add.append(custom_nav_link_text_shown);
	$add.find('.disabled_message').text(custom_nav_link_text_hidden).addClass('uw_disabled_message');
	$groups.append(custom_nav_link_text_shown);
	$groups.find('.disabled_message').text(custom_nav_link_text_hidden).addClass('uw_disabled_message');
	$photos.append(custom_nav_link_text_shown);
	$photos.find('.disabled_message').text(custom_nav_link_text_hidden).addClass('uw_disabled_message');
    }

    // Custom text for "public syllabus" option
    function customizePublicSyllabusLabel() {
        // Custom text for "public syllabus" option
        $("label[for='course_public_syllabus']").whenExists(function () {
            $(this).after(gettext("public_syllabus_label"));
        });
    }

    // Custom text for grading scale modal
    function customizeGPAScaleDialog() {
        // Custom text for grading scale modal
        $("#gpa-scale-dialog").whenExists(function () {
            $(this).html(gettext("gpa_scale_info"));
        });
    }

    function customizeGradebookMenu() {
        // Remove the "Treat Ungraded as 0" menu item
        $("#include_ungraded_assignments").whenExists(function () {
            $(this).closest("li").remove();
        });

        // Remove the option on the Individual view, too
        $("#ungraded").whenExists(function () {
            $(this).closest("div").remove();
        });
    }

    // Custom text for "Report a Problem" form
    function customizeReportProblemForm(ev, xhr, obj) {
        if (obj.url === "/help_links") {
            $("label[for='error-comments'] small").remove();
            $(document).off("ajaxComplete", customizeReportProblemForm);
        }
    }

    function uwModalDialog(title, text) {
	var $dialog = $('<div id="uw-modal-dialog" class="ReactModalPortal">'
			+ '<div class="ReactModal__Overlay ReactModal__Overlay--after-open ReactModal__Overlay--canvas" style="background-color: rgba(0, 0, 0, 0.498039);">'
			+ '<div style="position:static;top:0px;left:0px;right:auto;bottom:auto;border-radius:0px;border:none;padding:0px;" class="ReactModal__Content ReactModal__Content--after-open ReactModal__Content--canvas" tabindex="-1">'
			+ '<div class="ReactModal__Layout"><div class="ReactModal__Header"><div class="ReactModal__Header-Title"><h4>'
			+ title
			+ '</h4></div><div class="ReactModal__Header-Actions"><button class="Button Button--icon-action uw-modal-close" type="button">'
			+ '<i class="icon-x"></i><span class="screenreader-only">Close</span></button></div></div><div class="ReactModal__Body">'
			+ text
			+ '</div><div class="ReactModal__Footer"><div class="ReactModal__Footer-Actions">'
			+ '<button type="button" class="Button Button--primary uw-modal-close" data-dismiss="modal">OK, got it!</button>'
			+ '</div></div></div></div></div></div>');
	if ($('#uw-modal-dialog').length) {
	    $('#uw-modal-dialog').replaceWith($dialog);
	} else {
	    $('body').append($dialog);
	    $('body').on('click', '#uw-modal-dialog .uw-modal-close', function () {
		$(this).closest('.ReactModalPortal').hide();
	    });
	}
    }

    function hijackAddUsersButton() {
	var $tool = $('.context_external_tool_' + add_users_external_id),
	    missing_tools = '',
	    missing_tools_label;

        $("#addUsers")
            .off("click")
            .on('click', function (e) {

		e.preventDefault();
		e.stopPropagation();
		if ($tool.length !== 1) {
		    uwModalDialog(missing_add_people_label, missing_add_people_text);
		} else {
		    if ($('#uw-add-people-slightofhand').length === 1) {
			$('#uw-add-people-slightofhand').find('.ReactModalPortal').show();
		    } else {
			$(e.target).attr('disabled', true);
			$('<div id="uw-add-people-slightofhand"><iframe style="height:1px;width:1px;" '
			  + 'src="' + $tool.attr('href') + '"'
			  + '></iframe><div id="uw_add_users"></div></div>').appendTo('body');
		    }
		}
	    });

        if ($('a.context_external_tool_' + uw_groups_external_id).length == 0) {
	    missing_tools_label = missing_groups_label;
	    missing_tools = missing_groups_text;
	}

        if ($('a.context_external_tool_' + course_photos_external_id).length == 0) {
	    if (missing_tools.length) {
		missing_tools_label = missing_photos_and_groups_label;
		missing_tools = missing_photos_and_groups_text;
	    } else {
		missing_tools_label = missing_photos_label;
		missing_tools = missing_photos_text;
	    }
	}

	if (missing_tools.length) {
	    uwModalDialog(missing_tools_label, missing_tools);
	}
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
        var href = window.location.href,
        tool_id;

        if (href.match(/\/(settings|details)$/)) {
            // Course or account settings page
            customizePublicSyllabusLabel();
            customizeAppCenterInfo();
	    customizeNavigation();
        } else if (href.match(/\/courses\/\d+\/assignments/)) {
            // Course assignments page
            $("#gpa-scale-question").whenExists(function () {
                $(this).on("click", customizeGPAScaleDialog);
            });
        } else if (href.match(/\/courses\/\d+\/users(\/(#.*)?)?$/)) {
            // Course people page
            addCoursePhotosButton(course_photos_external_id);
            addUWGroupsButton(uw_groups_external_id);
            $('#addUsers').whenExists(hijackAddUsersButton);
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

        $(window).on('message', function (e) {
            var msg = JSON.parse(e.originalEvent.data);
            if (msg.hasOwnProperty('subject')) {
                switch (msg.subject) {
                case 'lti.uw.addUserUrl':
                    if (window.top !== window) { // bubble up
                        window.parent.postMessage(e.originalEvent.data,
                                                  window.location.origin);
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

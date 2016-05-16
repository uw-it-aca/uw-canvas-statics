/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    function moveNavToRightButton(nav_id, icon, position) {
        var nav = $('a.context_external_tool_' + nav_id);
        if (nav.length === 1) {
            UWCanvas.add_right_nav_button(icon, nav.text(), nav.attr('href'), position);
        }
    }

    function addCoursePhotosButton(tool_id) {
        moveNavToRightButton(tool_id, 'icon-student-view');
    }

    function addUWGroupsButton(tool_id) {
        moveNavToRightButton(tool_id, 'uw-groups-button-image');
    }

    function hijackAddUsersButton() {
        var $tool = $('.context_external_tool_' + UWCanvas.add_users_external_id);
        if ($tool.length !== 1) {
            return;
        }

        $('#addUsers').off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if ($('#uw-add-people-slightofhand').length === 1) {
                $('#uw-add-people-slightofhand').find('.ReactModalPortal').show();
            } else {
                $(e.target).attr('disabled', true);
                $('<div id="uw-add-people-slightofhand">' +
                    '<iframe style="height:1px;width:1px;" src="' +
                    $tool.attr('href') + '"></iframe>' +
                    '<div id="uw_add_users"></div></div>').appendTo('body');
            }
        });
    }

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
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-SessionId', msg.message.session_id);
                        }
                    }).done(function (data) {
                        $('#uw_add_users').html(data);
                    });
                }
                break;
            }
        }
    });

    addCoursePhotosButton(UWCanvas.course_photos_external_id);
    addUWGroupsButton(UWCanvas.uw_groups_external_id);
    $('#addUsers').whenExists(hijackAddUsersButton);
}(jQuery));

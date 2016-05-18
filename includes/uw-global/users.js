/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var missing_add_people_title = 'Add People Unavailable',
        missing_add_people_text = '<p>People cannot be added to your course right now because “Add UW People” has been hidden.</p></p>To restore Add People functionality, go to <a href="settings">Settings</a>, click the Navigation tab, scroll down to find Add UW People in the hidden list.  Click and drag back up into the course navigation link. Click Save to save your changes.</p></p>Even when Add People is enabled, it will never appear in the course navigation (so it doesn&apos;t need to be hidden).</p>',
        missing_groups_title = 'Add UW Groups Unavailable',
        missing_groups_text = '<p>UW Groups cannot be added to your course right now because “Add &amp; Manage UW Groups” has been hidden.</p><p>To restore Add UW Groups functionality, go to <a href="settings">Settings</a>, click the Navigation tab, scroll down to find &quot;Add &amp; Manage UW Groups&quot; in the hidden list. Click and drag back up into the course navigation link. Click Save to save your changes.</p><p>Even when Add &amp; Manage UW Groups is enabled, it will never appear in the course navigation (so it doesn&apos;t need to be hidden).</p>',
        missing_photos_title = 'View Student Photos Unavailable',
        missing_photos_text = '<p>Student Photos cannot be viewed because &quot;View Student Photos&quot; has been hidden.</p><p>To restore Student Photos, go to <a href="settings">Settings</a>, click the Navigation tab, scroll down to find &quot;View Student Photos&quot; in the hidden list.  Click and drag back up into the course navigation link. Click Save to save your changes.</p><p>Even when View Student Photos is enabled, it will never appear in the course navigation (so it doesn&apos;t need to be hidden).</p><p style="font-size: smaller;">Note: If you are teaching a non-academic course, View Student Photos is unavailable.</p>',
        missing_photos_and_groups_title = 'Add UW Groups &amp; View Student Photos Unavailable',
        missing_photos_and_groups_text = '<p>UW Groups and View Student Photos are unavailable because they have been hidden.</p><p>To restore this functionality, go to <a href="settings">Settings</a>, click the Navigation tab, scroll down to find &quot;Add &amp; Manage UW Groups&quot; and &quot;View Student Photos&quot; in the hidden list. Click and drag back up into the course navigation link. Click Save to save your changes.</p><p>Even when Add &amp; Manage UW Groups and View Student Photos are enabled, they will never appear in the course navigation (so they don&apos;t need to be hidden).</p><p style="font-size: smaller;">Note: If you are teaching a non-academic course, View Student Photos is unavailable.</p>';

    function openWarningModal(title, text) {
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

    function openAddUsersModal(e) {
        var $users = $('a.context_external_tool_' + UWCanvas.add_users_external_id);

        e.preventDefault();
        e.stopPropagation();
        if (!$users.length) {
            openWarningModal(missing_add_people_title, missing_add_people_text);
        } else {
            if ($('#uw-add-people-slightofhand').length === 1) {
                $('#uw-add-people-slightofhand').find('.ReactModalPortal').show();
            } else {
                $(e.target).attr('disabled', true);
                $('<div id="uw-add-people-slightofhand">' +
                    '<iframe style="height:1px;width:1px;" src="' +
                    $users.attr('href') + '"></iframe>' +
                    '<div id="uw_add_users"></div></div>').appendTo('body');
            }
        }
    }

    function addExternalToolButtons() {
        var $groups = $('a.context_external_tool_' + UWCanvas.uw_groups_external_id),
            $photos = $('a.context_external_tool_' + UWCanvas.course_photos_external_id);

        if ($photos.length) {
            UWCanvas.add_right_nav_button('icon-student-view',
                                          $photos.text(),
                                          $photos.attr('href'));
        }

        if ($groups.length) {
            UWCanvas.add_right_nav_button('uw-groups-button-image',
                                          $groups.text(),
                                          $groups.attr('href'));
        }

        if (!$groups.length && !$photos.length) {
            openWarningModal(missing_photos_and_groups_title,
                             missing_photos_and_groups_text);
        } else if (!$groups.length) {
            openWarningModal(missing_groups_title, missing_groups_text);
        } else if (!$photos.length) {
            openWarningModal(missing_photos_title, missing_photos_text);
        }
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

    addExternalToolButtons();
    $('#addUsers').whenExists(function () {
        $(this).off('click').on('click', openAddUsersModal);
    });
}(jQuery));

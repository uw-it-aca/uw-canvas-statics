/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var add_access_token_info = '<p>Access tokens allow third-party applications to access Canvas resources on your behalf. You can generate a token to use in programmatically accessing the Canvas API.  These tokens provide the ability to interact with the API with the same permissions you have through the Canvas UI.  Because many instructors or Canvas admins have broad access to confidential student data in Canvas, these access tokens should be handled securely.  When using an API access token:</p><p><ul><li>Record the token in a secure manner.</li><li>Do not send the token through email.</li><li>Do not provide your API access token to any other individual or a vendor.</li><li>Do not use your personal access token to configure an account-level integration.</li><li>Review your access tokens annually, and expire or delete unused tokens.</li></ul></p>Learn more about <a href="https://itconnect.uw.edu/learn/tools/canvas/integration-development-data-access/" target="_blank">appropriate methods for integrating with Canvas</a>. If you are working with a vendor, contact <a href="mailto:help@uw.edu">help@uw.edu</a> for assistance.',
        settings_hint_html = '<div class="data_description" style="padding-left: 4em; margin: -0.8em 0 0.8em 0;">Name fields are not editable in Canvas. Visit <a href="https://identity.uw.edu/profile" target="_blank">Identity.UW</a> to change your Preferred Name.</div>',
        full_name_hint_html = '<br>Used for the Gradebook and Grades pages, Chat, People, and SIS imports.',
        display_name_hint_html = '<br>How other users will see your name in Announcements, Conferences, Conversations, and Discussions.',
        sortable_name_hint_html = '<br>Appears in sorted lists.';

    function add_settings_hint() {
        var $settings_title = $('div#content.ic-Layout-contentMain > h1');

        $settings_title.after(settings_hint_html);
    }

    function replace_full_name_hint() {
        var $full_name_hint = $('span#hints_name');

        $full_name_hint.html(full_name_hint_html);
    }

    function replace_display_name_hint() {
        var $display_name_hint = $('span#hints_short_name');

        $display_name_hint.html(display_name_hint_html);
    }

    function replace_sortable_name_hint() {
        var $sortable_name_hint = $('span#hints_sortable_name');

        $sortable_name_hint.html(sortable_name_hint_html);
    }

    // Custom text for "Generate an Access Token" modal
    $(window).on('load', function () {
        $('#add_access_token_dialog').whenExists(function () {
            var h2 = $('#add_access_token_dialog').children('h2').first(),
                form = $('#add_access_token_dialog').children('form').first(),
                contents = $('#add_access_token_dialog').contents();

            contents.slice(contents.index(h2) + 1, contents.index(form)).remove();

            h2.after(add_access_token_info);
        });

        add_settings_hint();
        replace_full_name_hint();
        replace_display_name_hint();
        replace_sortable_name_hint();
    });

}(jQuery));

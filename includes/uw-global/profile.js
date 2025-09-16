/*jslint browser: true, plusplus: true */
/*jshint esversion: 6 */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var add_access_token_info = '<p>Access tokens allow third-party applications to access Canvas resources on your behalf. You can generate a token to use in programmatically accessing the Canvas API.  These tokens provide the ability to interact with the API with the same permissions you have through the Canvas UI.  Because many instructors or Canvas admins have broad access to confidential student data in Canvas, these access tokens should be handled securely.  When using an API access token:</p><p><ul><li>Record the token in a secure manner.</li><li>Do not send the token through email.</li><li>Do not provide your API access token to any other individual or a vendor.</li><li>Do not use your personal access token to configure an account-level integration.</li><li>Review your access tokens annually, and expire or delete unused tokens.</li></ul></p>Learn more about <a href="https://itconnect.uw.edu/learn/tools/canvas/integration-development-data-access/" target="_blank">appropriate methods for integrating with Canvas</a>. If you are working with a vendor, contact <a href="mailto:help@uw.edu">help@uw.edu</a> for assistance.',
        identity_url = 'https://identity.uw.edu/profile';

    // Custom text for "Generate an Access Token" modal
    $(window).on('load', function () {
        $('#add_access_token_dialog').whenExists(function () {
            var h2 = $('#add_access_token_dialog').children('h2').first(),
                form = $('#add_access_token_dialog').children('form').first(),
                contents = $('#add_access_token_dialog').contents();

            contents.slice(contents.index(h2) + 1, contents.index(form)).remove();

            h2.after(add_access_token_info);
        });

        // if full name editing is disabled, add identity.uw pointer and hints to name fields
        if ($('table.profile_table tr td span.full_name + input.edit_data').length === 0) {
            $.each(['name', 'short_name', 'sortable_name'], function(i, label_for) {
                var profile_label = $(`tr th label[for=user_${label_for}]`).text().replace(/:$/, ''),
                    preferred_name_hint = `<br>${profile_label} cannot be edited in UW Canvas. ` +
                        `Visit <a href="${identity_url}" target="_blank">Identity.UW</a> ` +
                        'to change your Preferred Name.',
                    hint_span = `span#hints_${label_for}`;

                $(hint_span).html(preferred_name_hint);
            });
        }
    });

}(jQuery));

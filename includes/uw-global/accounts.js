/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    function check_simcheck_admin_link() {
        if (window.ENV.current_user_roles.includes('root_admin')) {
            $('a[href*="lti/basic_lti_launch_request/50?"]').css(
                'cssText', 'display: block !important');
        }
    }

    $(document).ready(check_simcheck_admin_link);

}(jQuery));

/*jslint browser: true, plusplus: true */
/*global jQuery */
(function ($) {
    "use strict";

    function customizeExternalToolsURL(ev, xhr, settings) {
        if (settings.url.match(/\/lti_apps\/launch_definitions/)) {
            settings.url = settings.url.replace("per_page=50", "per_page=150");
        }
    }

    $(document).ready(function () {
        setTimeout(function () {
            if ($("button.add_module_link").length) {
                $(document).on("ajaxSend", customizeExternalToolsURL);
            }
        }, 1000);
    });
}(jQuery));

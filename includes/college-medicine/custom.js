/*jslint browser: true, plusplus: true */
/*global jQuery */
(function ($) {
    "use strict";

    function customizeExternalToolsURL(ev, xhr, settings) {
        if (settings.url.match(/\/lti_apps\/launch_definitions/)) {
            settings.url = settings.url.replace("per_page=50", "per_page=150");
        }
    }

    function loadEvaluationKit() {
        /*EvaluationKIT START*/
        var evalkit_jshosted = document.createElement('script');
        evalkit_jshosted.setAttribute('type', 'text/javascript');
        evalkit_jshosted.setAttribute('src', 'https://uwsom.evaluationkit.com/CanvasScripts/uwsom.js?v=6');
        document.getElementsByTagName('head')[0].appendChild(evalkit_jshosted);
        /*EvaluationKIT END*/
    }

    $(document).ready(function () {
        setTimeout(function () {
            if ($("button.add_module_link").length) {
                $(document).on("ajaxSend", customizeExternalToolsURL);
            }
        }, 1000);

        loadEvaluationKit();
    });
}(jQuery));

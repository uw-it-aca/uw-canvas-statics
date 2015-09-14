/*jslint browser: true, regexp:true */
/*global jQuery */
(function ($) {
    "use strict";

    function hideLastEditedBy(ev, xhr, settings) {
        if (settings.url.match(/\/api\/v1\/courses\/[\d]+\/pages/)) {
            $("tbody.collectionViewItems tr").find("td:eq(2)").each(function () {
                $(this).text($(this).text().replace(/ by .*$/, ""));
            });
        }
    }

    $(document).ready(function () {
        if (window.location.href.match(/\/courses\/[\d]+\/pages$/)) {
            $(document).on("ajaxComplete", hideLastEditedBy);
        }
    });

}(jQuery));

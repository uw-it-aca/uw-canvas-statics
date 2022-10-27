/*jslint browser: true */
/*global jQuery */
(function ($) {
    "use strict";

    function update_library_links() {
        var library_url = "https://liblawuw.libguides.com/lawlibrarycanvas",
            link_text = "Law Library";

        if (window.location.href.match(/\/courses\/\d+/)) {
            $("a.context_external_tool_12299").attr("target", "_blank").attr(
                "href", library_url).text(link_text);

            if (window.location.href.match(/\/courses\/\d+\/settings/)) {
                $("#nav_edit_tab_id_context_external_tool_12299").html(function() {
                    return $(this).html().replace("UW Libraries", link_text);
                });
            }
        }
    }

    $(document).ready(update_library_links);
}(jQuery));

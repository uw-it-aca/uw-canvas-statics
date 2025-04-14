/*jslint browser: true */
/*global jQuery */
(function ($) {
    "use strict";

    function update_library_links() {
        var library_external_ids = ["208227", "12299"],
            library_url = "https://lib.law.uw.edu/lawlibrarycanvas",
            link_text = "Law Library",
            link_id_prefix;

        if (window.location.href.match(/\/courses\/\d+/)) {
            link_id_prefix = "a.context_external_tool_";
            $(library_external_ids.map(id => link_id_prefix + id).join(',')).attr(
                "target", "_blank").attr("href", library_url).text(link_text);

            if (window.location.href.match(/\/courses\/\d+\/settings/)) {
                link_id_prefix =  "#nav_edit_tab_id_context_external_tool_";
                $(library_external_ids.map(id => link_id_prefix + id).join(',')).html(
                    function() {
                        return $(this).html().replace("UW Libraries", link_text);
                    });
            }
        }
    }

    $(document).ready(update_library_links);
}(jQuery));

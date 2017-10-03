/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    function deselect_front_page(ev) {
        var page_url = ev.data.url,
            url_regex = new RegExp('/courses/'),
            csrf_regex = new RegExp('^_csrf_token=(.*)$'),
            url = page_url.replace(url_regex, '/api/v1/courses/'),
            cookies = document.cookie.split(';'),
            cookie,
            match,
            csrf,
            i;

        for (i = 0; i < cookies.length; i++) {
            cookie = cookies[i].trim();
            match = csrf_regex.exec(cookie);
            if (match) {
                csrf = decodeURIComponent(match[1]);
                break;
            }
        }

        if (url && csrf) {
            $.ajax({
                type: 'PUT',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrf
                },
                data: JSON.stringify({'wiki_page': {'front_page': false}}),
                dataType: 'json',
            }).done(function () {
                var reload_url = window.location.href;
                window.location.href = reload_url;
            });
        }
        return false;
    }

    function add_deselect_front_page_option() {
        /*jshint validthis: true */
        // This is the table of contents view
        var item = $(this).closest('tr').find('a.delete-menu-item').first(),
            url = $(this).closest('tr').find('a.wiki-page-link').first().attr('href'),
            label = 'Deselect as Front Page';

        if (item.length === 0) {
            // This is the page edit view
            item = $(this).closest('div').find('a.delete_page').first();
            url = window.location.href;
        }

        item.replaceWith(
            $('<a>', {
                'text': label,
                'title': label,
                'href': '#',
                'role': 'menuitem',
                'class': 'icon-document ui-corner-all',
            }).on('click', {'url': url}, deselect_front_page)
        );
    }

    // Add the remove front page option
    $('span.front-page').whenExists(add_deselect_front_page_option);

    // ..and on the ajax request
    $(document).ajaxComplete(function (ev, xhr, data) {
        if (data.type === 'PUT' && data.url.match(/courses/)) {
            $('span.front-page').whenExists(add_deselect_front_page_option);
        }
    });
}(jQuery));

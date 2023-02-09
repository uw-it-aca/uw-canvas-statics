/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var canvas_api_server = 'https://apps.canvas.uw.edu',
        moment_js = canvas_api_server + '/static/vendor/js/moment.min.js',
        course_roles = ['teacher', 'admin', 'root_admin'],
        help_title = 'About UW Course Expiration',
        help_markup = '<p>Courses are removed from UW Canvas five years after they are created.</p><p>As the instructor, you will received notification emails one year, six months and one month prior to expiration.</p><p>Live long and prosper.</p>',
        header_markup = '<th scope="col" class="course-list-expiration-column course-list-no-left-border"><!-- <a class="uw_course_expiration_sort_link" title="Sort by Expiration Date" href="#"> -->Expires<!-- </a> --> <button class="Button Button--icon-action uw_course_expiration_help" type="button"><i class="icon-question"></i><span class="screenreader-only">About course expiration</span></button></th>',
//<a class="uw_course_expiration_help no-hover" title="Help with expiration date" href="#"><i class="icon-question" aria-hidden="true"></i></a></th>';
        expire_markup_outer = '<td class="course-list-no-left-border course-list-expiration-column" data-expiration-date="0"></td>',
        expire_markup_inner = '<span title="This course will be removed $DATE."$STYLE>$DATE</span><span class="screenreader-only">This course will be removed $DATE.</span>';

    function add_course_expiration_date($row) {
        $row.append(expire_markup_outer);

        if ($('td.course-list-enrolled-as-column:contains("Teacher")', $row).length) {
            fetch_course_expiration_date($row);
        }
    }

    function fetch_course_expiration_date($row) {
        var star_cell = $('td.course-list-star-column', $row),
            span = (star_cell.length) ? $('span[data-course-id]', $(star_cell.get(0))) : null,
            course_id = (span.length) ? $(span).attr('data-course-id'): null;

        if (course_id) {
            $.ajax({
                type: 'GET',
                url: canvas_api_server + '/api/v1/course/' + course_id + '/expiration',
                contentType: 'text/plain',
                dataType: 'json'
            }).done(function (data) {
                update_course_expiration_date(data);
            });
        }
    }

    function get_expiration_cell(course_id) {
        var $star_cell,
            $row,
            $expire_cell;

        $star_cell = $('table tbody tr td.course-list-star-column ' +
                       'span[data-course-id="' + course_id + '"]');
        if ($star_cell.length === 1) {
            $row = $($star_cell.closest('tr'));
            if ($row.length === 1) {
                $expire_cell = $('td.course-list-expiration-column', $row);
                if ($expire_cell.length === 1) {
                    return $expire_cell;
                }
            }
        }

        return null;
    }

    function update_course_expiration_date(data) {
        var $expiration_cell = get_expiration_cell(data.course_id),
            expiration_date,
            now = moment(),
            expires,
            markup;

        if (!$expiration_cell) {
            return;
        }

        expiration_date = moment(data.expiration_date);
        expires = (expiration_date.diff(now, 'months') > 6) ?
            expiration_date.fromNow() : expiration_date.format('MMM D, YYYY');
        markup = expire_markup_inner.
            replace(/\$DATE/g, expires).
            replace(/\$STYLE/g, (now.isSame(expiration_date, 'year')) ?
                    ' style="color: red;"': '');

        $expiration_cell.html(markup);
        $expiration_cell.closest('td').attr('data-expiration-date', expiration_date.valueOf());
    }

    function add_course_expiration() {
        var $courses = $('table#my_courses_table'),
            $past_enrollments = $('table#past_enrollments_table'),
            $future_enrollments = $('table#future_enrollments_table');

        $('thead tr', $courses).append(header_markup);
        $('tbody tr.course-list-table-row', $courses).each(function() {
            add_course_expiration_date($(this));
        });

        $('thead tr', $past_enrollments).append(header_markup);
        $('tbody tr.course-list-table-row', $past_enrollments).each(function() {
            add_course_expiration_date($(this));
        });

        $('thead tr', $future_enrollments).append(header_markup);
        $('tbody tr.course-list-table-row', $future_enrollments).each(function() {
            add_course_expiration_date($(this));
        });

        /* star is width: 3% */
        $(".course-list-table .course-list-course-title-column,.course-list-table .course-list-not-favoritable,.course-list-table .course-list-group-column").css("width","35%");
        $(".course-list-table .course-list-nickname-column").css("width", "20%");
        $(".course-list-table .course-list-term-column").css("width", "12%");
        $(".course-list-table .course-list-enrolled-as-column").css("width", "10%");
        $(".course-list-table .course-list-published-column").css("width", "10%");
        $(".course-list-table .course-list-expiration-column").css("width", "10%");

        $("a.uw_course_expiration_sort_link").on('click', function (e) {
            alert("sort the courses by expiration date");
            e.preventDefault();
            e.stopPropagation();
        });

        $("button.uw_course_expiration_help").on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            window.UWCanvas.uw_modal_dialog(help_title, help_markup);
        });
    }

    if (course_roles.some(r=> window.ENV.current_user_roles.indexOf(r) >= 0)) {
        var n = 0,
            iid = window.setInterval(function () {
                if (window.moment !== undefined || ++n > 200) {
                    window.clearInterval(iid);
                    if (window.moment) {
                        add_course_expiration();
                    }
                }
            }, 50);

        if (window.moment === undefined) {
            $.getScript(moment_js);
        }
    }
}(jQuery));

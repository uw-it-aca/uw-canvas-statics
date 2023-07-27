/*jslint browser: true, plusplus: true */
/*jshint esversion: 6 */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var course_api_server = (window.ENV.hasOwnProperty('DEEP_LINKING_POST_MESSAGE_ORIGIN')) ?
            'https://apps.canvas.uw.edu' : '',
        x_course_api_server = (window.ENV.DEEP_LINKING_POST_MESSAGE_ORIGIN == 'https://uw.test.instructure.com') ? 'https://test-apps.canvas.uw.edu' : (window.ENV.DEEP_LINKING_POST_MESSAGE_ORIGIN == 'https://canvas.uw.edu') ? 'https://apps.canvas.uw.edu' : '',
        moment_js = course_api_server + '/static/vendor/js/moment.min.js',
        course_roles = ['teacher', 'admin', 'root_admin'],
        course_enrollments = ['Teacher', 'Designer', 'Program Staff'],
        help_title = 'About UW Course Expiration',
        help_markup = '<p>An expiration date is displayed for each course in which ' +
            'you have a Teacher role.</p>' +
            '<p>Courses are removed from UW Canvas five years after the end of the ' +
            'academic year in which they are taught, in accordance with the ' +
            '<a href="https://itconnect.uw.edu/tools-services-support/teaching-learning' +
            '/canvas/canvas-policies/data-retention/" target="_blank">UW Canvas Course ' +
            'Data Retention Policy</a>.</p>' +
            '<p>As expiration for each academic year approaches, reminders will be sent ' +
            'via email and posted in Canvas.</p>' +
            '<ul><li><a href="https://itconnect.uw.edu/tools-services-support/teaching-learning' +
            '/canvas/canvas-help-for-instructors/designing-your-course/what-do-i-need-to-do-at-the' +
            '-end-of-the-quarter/archive-content/" target="_blank">Learn how to archive ' +
            'your course</a></li></ul>',
        header_markup = '<th scope="col" class="course-list-expiration-column ' +
            'course-list-no-left-border">' +
            '<a class="uw_course_expiration_sort_link" title="Sort by Expiration Date" href="#">' +
            'Expires</a>' +
            ' <button class="Button Button--icon-action uw_course_expiration_help"' +
            ' type="button"><i class="icon-question"></i><span' +
            ' class="screenreader-only">About course expiration</span></button></th>',
        header_course_markup = '<a class="uw_course_name_sort_link" ' +
        'title="Sort by Course Name" href="#">Course</a>',
        expire_markup_outer = '<td class="course-list-no-left-border' +
            ' course-list-expiration-column" data-expiration-date="3153600000000"></td>',
        expire_markup_inner = '<span title="This course will be removed ' +
            '$DATE."$STYLE>$DATE</span><span class="screenreader-only">' +
            'This course will be removed $DATE.</span>',
        teacher_regex = new RegExp('^\\s*(' + course_enrollments.join('|') + ')\\s*$');

    function add_course_expiration_date($row, i) {
        var enrolled_as = $('td.course-list-enrolled-as-column', $row).text().trim();

        $row.append(expire_markup_outer);
        $row.attr('data-original-index', i);
        if (course_enrollments.indexOf(enrolled_as) >= 0) {
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
                url: course_api_server + '/api/v1/course/' + course_id + '/expiration',
                contentType: 'text/plain',
                dataType: 'json'
            }).done(function (data) {
                update_course_expiration_date(data);
            });
        }
    }

    function get_expiration_cell(course_id) {
        var $expire_cell = $('table tbody tr td.course-list-star-column span[data-course-id="' + course_id + '"]').
            closest('tr').
            find('td.course-list-enrolled-as-column').
            filter(function () {
                return teacher_regex.test($(this).text());
            }).
            closest('tr').find('td.course-list-expiration-column');

        return ($expire_cell.length === 1) ? $expire_cell : null;
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
            expiration_date.fromNow(true) : expiration_date.format('MMM D, YYYY');
        markup = expire_markup_inner.
            replace(/\$DATE/g, expires).
            replace(/\$STYLE/g, (now.isSame(expiration_date, 'year')) ?
                    ' style="color: red;"': '');

        $expiration_cell.html(markup);
        $expiration_cell.closest('td').attr('data-expiration-date', expiration_date.valueOf());
    }

    function sort_table($button, row_compare) {
        var $table = $button.closest('table'),
            rows = $('tr.course-list-table-row', $table).toArray().sort(row_compare()),
            ascending = $button.data('ascending');

        ascending = !ascending;
        if (!ascending) {
            rows = rows.reverse();
        }

        $button.data('ascending', ascending);
        $table.children('tbody').empty().html(rows);
    }

    function add_course_expiration_to_table($table) {
        var $thead_row = $('thead tr', $table);

        $thead_row.append(header_markup);
        $thead_row.find('th.course-list-course-title-column').html(header_course_markup);
        $('tbody tr.course-list-table-row', $table).each(function(i) {
            add_course_expiration_date($(this), i);
        });
    }

    function add_course_expiration() {
        moment.relativeTimeThreshold('M', 23);

        $('table#my_courses_table, ' +
          'table#past_enrollments_table, ' +
          'table#future_enrollments_table').each(function () {
            add_course_expiration_to_table($(this));
        });

        /* star is width: 3% */
        $(".course-list-table .course-list-course-title-column,.course-list-table .course-list-not-favoritable,.course-list-table .course-list-group-column").css("width","35%");
        $(".course-list-table .course-list-nickname-column").css("width", "20%");
        $(".course-list-table .course-list-term-column").css("width", "12%");
        $(".course-list-table .course-list-enrolled-as-column").css("width", "10%");
        $(".course-list-table .course-list-published-column").css("width", "10%");
        $(".course-list-table .course-list-expiration-column").css("width", "10%");

        $("a.uw_course_expiration_sort_link").on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            sort_table($(this), function () {
                var expires = function (row) {
                    return parseInt($(row).find('td[data-expiration-date]').attr('data-expiration-date'));
                };

                return function(a, b) {
                    return expires(a) - expires(b);
                };
            });
        });

        $("button.uw_course_expiration_help").on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            window.UWCanvas.uw_modal_dialog(help_title, help_markup);
        });

        $("a.uw_course_name_sort_link").on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            sort_table($(this), function () {
                var original_index = function (row) {
                    return parseInt($(row).attr('data-original-index'));
                };

                return function(a, b) {
                    return original_index(a) - original_index(b);
                };
            });
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

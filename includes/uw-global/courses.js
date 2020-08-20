/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */
(function ($) {
    'use strict';

    var course_roles = ['teacher', 'admin', 'root_admin'];
    var help_title = 'About UW Course Expiration';
    var help_markup = '<p>Courses are removed from UW Canvas five years after they are created.</p><p>As the instructor, you will received notification emails one year, six months and one month prior to expiration.</p><p>Live long and prosper.</p>';
    var header_markup = '<th scope="col" class="course-list-expiration-column course-list-no-left-border"><a class="uw_course_expiration_sort_link" title="Sort by Expiration Date" href="#">Expires</a> <button class="Button Button--icon-action uw_course_expiration_help" type="button"><i class="icon-question"></i><span class="screenreader-only">About course expiration</span></button></th>';
//<a class="uw_course_expiration_help no-hover" title="Help with expiration date" href="#"><i class="icon-question" aria-hidden="true"></i></a></th>';
    var row_markup = '<td class="course-list-no-left-border course-list-expire-column"><span title="This course will be removed Jan 1, 1970.">Jan 1, 1970</span><span class="screenreader-only">This course will be removed Jan 1, 1970.</span></td>';
    
    function add_course_expiration() {
	var $courses = $('table#my_courses_table'),
	    $past_enrollments = $('table#past_enrollments_table'),
	    $future_enrollments = $('table#future_enrollments_table');

	$('thead tr', $courses).append(header_markup);
	$('tbody tr.course-list-table-row', $courses).each(function() {
	    $(this).append(row_markup);
	});

	$('thead tr', $past_enrollments).append(header_markup);
    	$('tbody tr.course-list-table-row', $past_enrollments).each(function() {
	    $(this).append(row_markup);
	});

	$('thead tr', $future_enrollments).append(header_markup);
    	$('tbody tr.course-list-table-row', $future_enrollments).each(function() {
	    $(this).append(row_markup);
	});

	/* star is width: 3% */
	$(".course-list-table .course-list-course-title-column,.course-list-table .course-list-not-favoritable,.course-list-table .course-list-group-column").css("width","35%");
	$(".course-list-table .course-list-nickname-column").css("width", "20%");
	$(".course-list-table .course-list-term-column").css("width", "12%");
	$(".course-list-table .course-list-enrolled-as-column").css("width", "10%");
	$(".course-list-table .course-list-published-column").css("width", "10%");
	$(".course-list-table .course-list-expire-column").css("width", "10%");

    	$("a.uw_course_expiration_sort_link").on('click', function (e) {
            alert("sort the courses by expiration date");
	    e.preventDefault();
	    e.stopPropagation();
	});

    	$("button.uw_course_expiration_help").on('click', function (e) {
	    e.preventDefault();
	    e.stopPropagation();
	    window.UWCanvas.uw_modal_dialog(help_title, help_markup)
	});
    };

    if (course_roles.some(r=> window.ENV.current_user_roles.indexOf(r) >= 0)) {
	add_course_expiration();
    }
}(jQuery));

/*jslint browser: true, plusplus: true */
/*global jQuery */
(function ($) {
    'use strict';

    $(document).ready(function () {
        $('<script>').attr('type', 'text/javascript')
                     .attr('src', 'https://uwsom.evaluationkit.com/CanvasScripts/uwsom.js?v=6')
                     .appendTo('head');
    });
}(jQuery));

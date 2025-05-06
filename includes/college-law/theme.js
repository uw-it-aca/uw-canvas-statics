/*jslint browser: true */
/*global jQuery */

(function() {
    var base_url = 'https://storage.googleapis.com/',
        base_path = (window.location.hostname === 'canvas.uw.edu') ? 'canvas-static' : 'canvas-static-test',
        path = '/college-law/custom.js';

    $.getScript(base_url + base_path + path);
})();

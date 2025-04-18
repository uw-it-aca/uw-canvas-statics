/*jslint browser: true */
/*global jQuery */

(function() {
    var base_url = 'https://storage.googleapis.com/',
        base_path = (window.location.hostname === 'canvas.uw.edu') ? 'canvas-static' : 'canvas-static-test',
        path = '/uw-global/default.js';

    if (!window.jQuery) {
        var script = document.createElement('script');
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    $.getScript(base_url + base_path + path);
})();

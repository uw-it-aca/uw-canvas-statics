/*jslint browser: true */
// Load APP JS File
(function () {
    "use strict";
    function loadScript(url, scriptID, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.id = scriptID;
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" ||
                        script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    var today = new Date(),
        appScript = document.getElementById("dt_app_script"),
        url = "https://designtools.ciditools.com/js/tools_liveView_app.js?";
    if (appScript === null && window.jQuery === undefined) {
        loadScript(url + today.getDate(), 'dt_app_script', function () {
            console.log("Global App Stylesheet Ran");
        });
    }
})();

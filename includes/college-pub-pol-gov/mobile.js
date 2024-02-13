////////////////////////////////////////////////////
// DESIGNPLUS MOBILE APP                          //
////////////////////////////////////////////////////
// Legacy
(function () {
    function loadScript(url, scriptID, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.id = scriptID;
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
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
        appScript = document.getElementById('dt_app_script');
    if (appScript === null && window.jQuery === undefined) {
        loadScript("https://designtools.ciditools.com/js/tools_liveView_app.js?" + today.getDate(), 'dt_app_script', function () {
             console.log('DP Live View JS Ran');
        });
    }
})();

// New
DpConfig = {};
var script = document.createElement("script");
let id = Date.now();
script.src = `https://designplus.ciditools.com/js/mobile.js?${id}`;
document.body.appendChild(script);
////////////////////////////////////////////////////
// END DESIGNPLUS MOBILE APP                      //
////////////////////////////////////////////////////


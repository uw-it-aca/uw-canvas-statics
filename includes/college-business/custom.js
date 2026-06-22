/*jshint esversion: 11 */
/*jslint browser: true */
/*global jQuery */
(function ($) {
    "use strict";

    $(document).ready(function () {
        if (window.location.href.match(/\/courses\/[\d]+$/)) {
            // School of Business marketing exclusion pixels
            // Course home pages only
            $("body").append('<img height="1" width="1" style="border-style:none;" alt="" src="//insight.adsrvr.org/track/conv/?adv=fzhovas&ct=0:5iosb4mt&fmt=3"/>');

            var a = Math.random() * 10000000000000;
            $("body").append('<iframe src="https://3865133.fls.doubleclick.net/activityi;src=3865133;type=foste330;cat=ip123475;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
        }
    });

}(jQuery));

////////////////////////////////////////////////////
// DESIGNPLUS CONFIG                            //
////////////////////////////////////////////////////
DpPrimary = {
    lms: 'canvas',
    templateCourse: '1736861',
    hideButton: true,
    hideLti: false,
    extendedCourse: '', // added in sub-account theme
    sharedCourse: '', // added from localStorage
    courseFormats: [],
    canvasRoles: [],
    canvasUsers: [],
    canvasCourseIds: [],
    plugins: [],
    excludedModules: [],
    includedModules: [],
    lang: 'en',
};

// merge with extended/shared customizations config
DpConfig = { ...DpPrimary, ...(window.DpConfig ?? {}) };

$(function () {
    const uriPrefix = (location.href.includes('.beta.')) ? 'beta.' : '';
    const toolsUri = (DpConfig.toolsUri) ? DpConfig.toolsUri : `https://${uriPrefix}designplus.ciditools.com/`;
    $.getScript(`${toolsUri}js/controller.js`);
});

////////////////////////////////////////////////////
// END DESIGNPLUS CONFIG                        //
////////////////////////////////////////////////////

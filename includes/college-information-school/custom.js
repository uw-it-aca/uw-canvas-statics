/*jslint browser: true, plusplus: true */
/*global jQuery, UWCanvas */

// DESIGN TOOLS CONFIG
// Copyright (C) 2016  Utah State University

////////////////////////////////////////////////////
// DESIGNPLUS CONFIG                            //
////////////////////////////////////////////////////
// Legacy
var DT_variables = {
    iframeID: '',
    // Path to the hosted USU Design Tools
    path: 'https://designtools.ciditools.com/',
    templateCourse: '1705122',
    // OPTIONAL: Button will be hidden from view until launched using shortcut keys
    hideButton: true,
    // OPTIONAL: Limit tools loading by users role
    limitByRole: false, // set to true to limit to roles in the roleArray
    // adjust roles as needed: 'student', 'teacher', ...
    roleArray: [],
    // OPTIONAL: Limit tools to an array of Canvas user IDs
    limitByUser: false, // Change to true to limit by user
    // add users to array (Canvas user ID not SIS user ID)
    userArray: []
};

// New
DpPrimary = {
    lms: 'canvas',
    templateCourse: '1737169',
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
    defaultToLegacy: false,
    enableVersionSwitching: true,
    hideSwitching: false,
}

// merge with extended/shared customizations config
DpConfig = { ...DpPrimary, ...(window.DpConfig ?? {}) }

$(function () {
    const uriPrefix = (location.href.includes('.beta.')) ? 'beta.' : '';
    const toolsUri = (DpConfig.toolsUri) ? DpConfig.toolsUri : `https://${uriPrefix}designplus.ciditools.com/`;
    $.getScript(`${toolsUri}js/controller.js`);
});
////////////////////////////////////////////////////
// END DESIGNPLUS CONFIG                        //
////////////////////////////////////////////////////

if (window.location.hostname === 'canvas.uw.edu') {
    window.eesyLaunchConfig = {
        host: 'uw.eesysoft.com',
        key: 'yrLJv5Hs',
        supportTab: true
    };
} else {
    window.eesyLaunchConfig = {
        host: 'uwstaging.eesysoft.com',
        key: '5M2g7rk9',
        supportTab: true
    };
}

(function ($) {
    'use strict';

    var now = new Date().getTime();

    // EesySoft
    $.getScript('//' + window.eesyLaunchConfig.host + '/resources/js/canvas/launch.js?stmp=' + now);

    $(document).ready(function () {
        // Design Tools JS
        $.getScript(DT_variables.path + 'js/master_controls.js');

        // Design Tools Mobile JS
        //$.getScript(DT_variables.path + 'js/tools_liveView_app.js?' + now);

        // Atomic Search JS
        $.getScript('https://d2u53n8918fnto.cloudfront.net/atomic_search_widget.js?ts=' + now);
    });
}(jQuery));

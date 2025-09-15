/*jslint browser: true, plusplus: true */
/*jshint esversion: 11 */
/*global jQuery, UWCanvas */

// DESIGN TOOLS CONFIG
// Copyright (C) 2016  Utah State University

////////////////////////////////////////////////////
// DESIGNPLUS CONFIG                            //
////////////////////////////////////////////////////

/* Duplicated from top level default.js due to 'a timing issue. DesignPLUS
looks for the window.ALLY_CFG variable before doing anything. Canvas isn't
reliable in the order in which it loads the files in the sub-account, and
so the sub-account JS may be loading before or after the root account JS,
resulting in none of the Ally Relocate code running.
 */
/* Ally config/script required for indicators on course sub pages */
window.ALLY_CFG = {
  'baseUrl': 'https://prod.ally.ac',
  'clientId': 5,
  'lti13Id': '100000000000546'
};

// Legacy
var DT_variables = {
    iframeID: '',
    // Path to the hosted USU Design Tools
    path: 'https://designtools.ciditools.com/',
    templateCourse: '1705122',
    // OPTIONAL: Relocate Ally alternative formats dropdown and hide heading
    overrideAllyHeadings: true,
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
        // Atomic Search JS
        $.getScript('https://d2u53n8918fnto.cloudfront.net/atomic_search_widget.js?ts=' + now);
    });
}(jQuery));

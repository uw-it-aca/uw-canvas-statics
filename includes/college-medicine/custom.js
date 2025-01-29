/*jslint browser: true, plusplus: true */
/*jshint esversion: 11 */
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
    beforeUpgrade: function($content) {
        function cleanupStyleAttribute(element) {
            let style = $(element).attr('style');
            if (!style) {
                return; // No style attribute to clean up
            }
            let styles = style.split(';');
            let cleanedStyles = {};
            for (let i = 0; i < styles.length; i++) {
                let styleItem = styles[i].trim();
                if (styleItem === "") {
                   continue;
                }
                let parts = styleItem.split(':');
                let property = parts[0].trim();
                let value = parts[1].trim();
                // Keep only the last occurrence of each property
                cleanedStyles[property] = value;
            }
            // Reconstruct the style attribute
            let cleanedStyleString = Object.keys(cleanedStyles)
                .map(key => `${key}: ${cleanedStyles[key]}`)
                .join('; ');
            $(element).attr('style', cleanedStyleString).attr('data-mce-style', cleanedStyleString);
        }
        // Move accordion heading children styles to heading and unwrap children
        $content.find('.kl_panels_wrapper.kl_panels_accordion .kl_panel_heading').each(function(index, heading) {
            let headingStyle = ($(heading).attr('style')) ? $(heading).attr('style') : '';
            if ($(this).find('*').length > 0) {
                $(this).find('*').each(function(ind, child) {
                    let childStyle = ($(child).attr('style'));
                    if (childStyle) {
                        headingStyle += childStyle;
                    }
                    if ($(this).prop('tagName') === 'STRONG') {
                        $(this).attr('style', '').attr('data-mce-style', '');
                    } else {
                        $(this).contents().unwrap();
                    }
                })
            }
            if (headingStyle) {
               $(heading).attr('style', headingStyle).attr('data-mce-style', headingStyle);
               cleanupStyleAttribute(heading);
            }
        });
    },
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
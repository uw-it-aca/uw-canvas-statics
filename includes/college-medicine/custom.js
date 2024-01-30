/*jslint browser: true, plusplus: true */
/*jshint esversion: 11 */
/*global jQuery */

/*EvaluationKIT START*/
var evalkit_jshosted = document.createElement('script');
evalkit_jshosted.setAttribute('type', 'text/javascript');
evalkit_jshosted.setAttribute('src', 'https://uwsom.evaluationkit.com/CanvasScripts/uwsom.js?v=7');
document.getElementsByTagName('head')[0].appendChild(evalkit_jshosted);
/*EvaluationKIT END*/

////////////////////////////////////////////////////
// DESIGNPLUS CONFIG                            //
////////////////////////////////////////////////////
// Legacy
var DT_variables = {
        iframeID: '',
        // Path to the hosted USU Design Tools
        path: 'https://designtools.ciditools.com/',
        templateCourse: '1313636',
        // OPTIONAL: Button will be hidden from view until launched using shortcut keys
        hideButton: true,
    	 // OPTIONAL: Limit by course format
	     limitByFormat: false, // Change to true to limit by format
	     // adjust the formats as needed. Format must be set for the course and in this array for tools to load
	     formatArray: [
            'online',
            'on-campus',
            'blended'
        ],
        // OPTIONAL: Limit tools loading by users role
        limitByRole: false, // set to true to limit to roles in the roleArray
        // adjust roles as needed
        roleArray: [
            'student',
            'teacher',
            'admin'
        ],
        // OPTIONAL: Limit tools to an array of Canvas user IDs
        limitByUser: false, // Change to true to limit by user
        // add users to array (Canvas user ID not SIS user ID)
        userArray: [
            '1234',
            '987654'
        ]
};

// New
DpPrimary = {
    lms: 'canvas',
    templateCourse: '1737171',
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
    defaultToLegacy: true, 
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

(function ($) {
    'use strict';

    var now = new Date().getTime();

    $(document).ready(function () {
        // Design Tools JS
        $.getScript(DT_variables.path + 'js/master_controls.js');

        // Atomic Search JS
        $.getScript('https://d2u53n8918fnto.cloudfront.net/atomic_search_widget.js?ts=' + now);
    });
}(jQuery));

/*jslint browser: true, plusplus: true */
/*jshint esversion: 11 */
/*global jQuery */

/*EvaluationKIT START*/
var evalkit_jshosted = document.createElement('script');
evalkit_jshosted.setAttribute('defer', 'defer');
evalkit_jshosted.setAttribute('type', 'text/javascript');
evalkit_jshosted.setAttribute('src', 'https://uwsom.evaluationkit.com/canvas/js');
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
        templateCourse: '1792776',
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

(function ($) {
    'use strict';

    var now = new Date().getTime();

    $(document).ready(function () {
        // Atomic Search JS
        $.getScript('https://d2u53n8918fnto.cloudfront.net/atomic_search_widget.js?ts=' + now);
    });
}(jQuery));

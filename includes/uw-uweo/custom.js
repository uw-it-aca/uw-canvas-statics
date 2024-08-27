/*jslint browser: true, regexp:true, esversion: 11 */

////////////////////////////////////////////////////
// DESIGNPLUS CONFIG                            //
////////////////////////////////////////////////////
DpPrimary = {
    lms: 'canvas',
    templateCourse: '1780951',
    hideButton: true,
    hideLti: true,
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

/*global jQuery */
(function ($) {
    'use strict';

    function hideLastEditedBy(ev, xhr, settings) {
        if (settings.url.match(/\/api\/v1\/courses\/[\d]+\/pages/)) {
            $('tbody.collectionViewItems tr').find('td:eq(2)').each(function () {
                $(this).text($(this).text().replace(/ by .*$/, ''));
            });
        }
    }

    $(document).ready(function () {
        if (window.location.href.match(/\/courses\/[\d]+\/pages$/)) {
            $(document).on('ajaxComplete', hideLastEditedBy);
        }
    });
}(jQuery));

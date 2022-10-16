// ==UserScript==
// @name          	youtube-title
// @description     Fixes titles on youtube
//
// @author			zumwani
// @namespace       http://github.com/zumwani
// @downloadURL		https://raw.github.com/zumwani/firefox-tweaks/main/userscript/youtube-title.js
// @match           https://*.youtube.com/*
//
// @version         1.0
// @updateURL		https://raw.github.com/zumwani/firefox-tweaks/userscript/youtube-title.json
//
// @run-at			document-start|document-end
// @unwrap
// ==/UserScript==

setInterval(() => {
    document.title = document.title.replace(" - YouTube", "");
}, 1000);

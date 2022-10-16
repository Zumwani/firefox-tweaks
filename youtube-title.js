// ==UserScript==
// @name          	youtube-title
// @description     Fixes titles on youtube
//
// @author			zumwani
// @namespace       http://github.com/zumwani
// @downloadURL		https://raw.github.com/zumwani/firefox-tweaks/main/youtube-title.js
// @include         http://*.youtube.com/*
//
// @version         1.0
// @updateURL		https://raw.github.com/zumwani/firefox-tweaks/youtube-title.json
//
// @run-at			document-start|document-end
// @resource		resourceName	http://www.example.com/example.png
// @unwrap
// ==/UserScript==

document.title = document.title.replace(" - YouTube", "");
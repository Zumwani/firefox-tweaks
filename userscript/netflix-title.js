// ==UserScript==
// @name          	netflix-title
// @description     Fixes titles on netflix
//
// @author			zumwani
// @namespace       http://github.com/zumwani
// @downloadURL		https://raw.github.com/zumwani/firefox-tweaks/main/userscript/netflix-title.js
// @match           https://*.netflix.com/*
//
// @version         1.0
// @updateURL		https://raw.github.com/zumwani/firefox-tweaks/userscript/netflix-title.json
//
// @run-at			document-start
// @unwrap
// ==/UserScript==

const elements = [ "h2.ltr-1mdnz4d", "h2.ltr-1gtjs2y", ".medium.ltr-er76rf", "h2.ltr-2cum3e" ];
const ignore = [];

setInterval(() => {

    let list = elements.map(e => document.querySelector(e)).filter(e => e != null);
    let element = list[0];
    if (element == null)
        return;

    document.title = element.innerText;

}, 1000);

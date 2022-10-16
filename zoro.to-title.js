// ==UserScript==
// @name          	zoro-title
// @description     Fixes titles on zoro.to
//
// @author			zumwani
// @namespace       http://github.com/zumwani
// @downloadURL		https://raw.github.com/zumwani/firefox-tweaks/main/zoro-title.js
// @match           https://*.zoro.to/watch/*
//
// @version         1.0
// @updateURL		https://raw.github.com/zumwani/firefox-tweaks/zoro-title.json
//
// @run-at			document-start
// @unwrap
// ==/UserScript==

setInterval(() => {

    const title = document.querySelector(".film-name").innerText;
    const currentEpisode = document.querySelector(".ssl-item.ep-item.active")?.getAttribute("data-number");
    const maxEpisode = document.querySelector(".ssl-item.ep-item:last-child")?.getAttribute("data-number");

    document.title = `${title} [${currentEpisode ?? "?"}/${maxEpisode ?? "?"}]`;

}, 1000);

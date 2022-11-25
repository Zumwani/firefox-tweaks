// ==UserScript==
// @name          	zoro-title
// @description     Fixes titles on zoro.to
// @author			zumwani
// @namespace       http://github.com/zumwani
// @downloadURL		https://raw.github.com/zumwani/firefox-tweaks/main/userscript/zoro-title.js
// @match           https://*.zoro.to/*
// @version         1.0
// @updateURL		https://raw.github.com/zumwani/firefox-tweaks/userscript/zoro-title.json
// @run-at			document-start
// @unwrap
// ==/UserScript==

setTitle();
setInterval(setTitle, 1000);

async function setTitle() {

    if (document.URL.includes("/watch/")) {
        document.title = watchPageTitle();
    }
    else {
        document.title = await seriesPageTitle();
    }

}

function watchPageTitle() {

    const title = document.querySelector(".film-name").innerText;
    const currentEpisode = document.querySelector(".ssl-item.ep-item.active")?.getAttribute("data-number");
    const maxEpisode = document.querySelector(".ssl-item.ep-item:last-child")?.getAttribute("data-number");

    setCurrentEpisode(title, currentEpisode);

    return `${title} [${currentEpisode ?? "?"}/${maxEpisode ?? "?"}]`;

}

async function seriesPageTitle() {

    let title = document.querySelector(".film-name").innerText;
    let item = Array.from(document.querySelectorAll('.item')).find(item => item.textContent.startsWith('Ep'));
    let latestEpisode = item?.textContent?.slice(0, item?.textContent?.indexOf(" / ") ?? 0)?.slice(3);

    if (isNaN(latestEpisode)) {
        return "Zoro";
    }

    let currentEpisode = await getCurrentEpisode(title);
    let isCurrent = (parseInt(currentEpisode) >= parseInt(latestEpisode));

    title = (isCurrent ? "⏸" : "⏵") + " " + title;
    setLatestEpisode(title, latestEpisode);

    console.log("latestEpsidode: " + latestEpisode + ", currentEpisode: " + currentEpisode);
    return title;

}

function getCurrentEpisode(title) {
    return localStorage.getItem(title + ".CurrentEpisode", 0);
}

function setCurrentEpisode(title, currentEpisode) {
    localStorage.setItem(title + ".CurrentEpisode", currentEpisode);
}

function getLatestEpisode(title) {
    return localStorage.getItem(title + ".LatestEpisode", null);
}

function setLatestEpisode(title, latestEpisode) {
    localStorage.setItem(title + ".LatestEpisode", latestEpisode);
}

let discordIconUrl = "";
let discordTabId = null;
let discordWindowId = null;
let targetTabId = null;
let targetWindowId = null;
let targetUrl = "https://blank.page/";  // Replace with the URL you want to toggle to

// Function to find the first open Discord tab
function findDiscordTab() {
  browser.tabs.query({}, (tabs) => {
    for (let tab of tabs) {
      if (tab.url.includes("discord.com")) {
        discordIconUrl = tab.favIconUrl;
        discordTabId = tab.id;
        discordWindowId = tab.windowId;
        findTargetTab(tab.windowId);  // Find the target tab in the same window
        notifyIconUpdate();
        break;
      }
    }
  });
}

// Function to find the target tab in the same window as the Discord tab
function findTargetTab(windowId) {
  browser.tabs.query({ windowId }, (tabs) => {
    for (let tab of tabs) {
      if (tab.url === targetUrl) {
        targetTabId = tab.id;
        targetWindowId = tab.windowId;
        break;
      }
    }
  });
}

// Function to notify content scripts of icon update
function notifyIconUpdate() {
  browser.tabs.query({}, (tabs) => {
    for (let tab of tabs) {
      browser.tabs.sendMessage(tab.id, { command: "updateIcon", iconUrl: discordIconUrl }).catch(error => {
        console.error(`Could not send message to tab ${tab.id}:`, error);
      });
    }
  });
}

// Function to toggle between Discord tab and the target tab
function toggleTabs() {
  if (discordTabId && targetTabId) {
    browser.tabs.query({ active: true }, (tabs) => {
      let currentTab = tabs.find(tab => tab.windowId === discordWindowId || tab.windowId === targetWindowId);
      if (currentTab) {
        let newTabId = currentTab.id === discordTabId ? targetTabId : discordTabId;
        let newWindowId = currentTab.id === discordTabId ? targetWindowId : discordWindowId;
        browser.tabs.update(newTabId, { active: true });
        browser.windows.update(newWindowId, { focused: true });
      }
    });
  }
}

// Listen for tab updates to track the Discord tab
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.includes("discord.com")) {
    discordIconUrl = tab.favIconUrl;
    discordTabId = tab.id;
    discordWindowId = tab.windowId;
    findTargetTab(tab.windowId);
    notifyIconUpdate();
  }
});

// Listen for messages from content scripts
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "getDiscordIcon") {
    sendResponse({ iconUrl: discordIconUrl });
  } else if (message.command === "toggleTabs") {
    toggleTabs();
  }
});

// Initial call to find Discord tab when the extension is loaded
findDiscordTab();

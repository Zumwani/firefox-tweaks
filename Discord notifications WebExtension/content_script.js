// Function to inject the Discord icon into the webpage
function injectDiscordIcon(iconUrl) {
    let img = document.getElementById("icon-discord");
    if (img) {
      img.src = iconUrl;
      img.alt = "Discord Icon";
      img.style.width = "32px";
      img.style.height = "32px";
      img.style.cursor = "pointer";
      img.onclick = () => {
        browser.runtime.sendMessage({ command: "toggleTabs" });
      };
    }
  }
  
  // Request the Discord icon from the background script and inject it
  function requestDiscordIcon() {
    browser.runtime.sendMessage({ command: "getDiscordIcon" }, (response) => {
      if (response && response.iconUrl) {
        injectDiscordIcon(response.iconUrl);
      }
    });
  }
  
  // Listen for messages from the background script to update the icon
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "updateIcon" && message.iconUrl) {
      injectDiscordIcon(message.iconUrl);
    }
  });
  
  // Request the Discord icon on initial load
  requestDiscordIcon();
  
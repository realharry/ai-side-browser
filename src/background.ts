// Background script for AI Side Browser extension

chrome.runtime.onInstalled.addListener(() => {
  console.log('AI Side Browser extension installed');
});

// Handle extension icon click to open side panel
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    try {
      await chrome.sidePanel.open({ tabId: tab.id });
    } catch (error) {
      console.error('Failed to open side panel:', error);
    }
  }
});

// Set up default settings on installation
chrome.runtime.onInstalled.addListener(async () => {
  const defaultSettings = {
    sidePanelWidth: 400,
    defaultUrl: 'https://duckduckgo.com',
    theme: 'light'
  };

  try {
    const result = await chrome.storage.sync.get(['sidePanelWidth', 'defaultUrl', 'theme']);
    
    // Only set defaults if not already configured
    const updates: Record<string, unknown> = {};
    
    if (!result.sidePanelWidth) {
      updates.sidePanelWidth = defaultSettings.sidePanelWidth;
    }
    if (!result.defaultUrl) {
      updates.defaultUrl = defaultSettings.defaultUrl;
    }
    if (!result.theme) {
      updates.theme = defaultSettings.theme;
    }

    if (Object.keys(updates).length > 0) {
      await chrome.storage.sync.set(updates);
    }
  } catch (error) {
    console.error('Failed to set default settings:', error);
  }
});
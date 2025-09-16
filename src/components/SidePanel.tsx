import { useState, useRef, useEffect } from 'react';
import { AddressBar } from './AddressBar';
import { ContentPane, ContentPaneRef } from './ContentPane';

const DEFAULT_URL = 'https://www.google.com';

export function SidePanel() {
  const [currentUrl, setCurrentUrl] = useState(DEFAULT_URL);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [defaultUrl, setDefaultUrl] = useState(DEFAULT_URL);
  const contentPaneRef = useRef<ContentPaneRef>(null);

  // Load settings from Chrome storage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const result = await chrome.storage.sync.get(['defaultUrl', 'sidePanelWidth']);
        if (result.defaultUrl) {
          setDefaultUrl(result.defaultUrl);
          setCurrentUrl(result.defaultUrl);
        }
        
        // Apply side panel width if configured
        if (result.sidePanelWidth && typeof result.sidePanelWidth === 'number') {
          document.documentElement.style.setProperty('--side-panel-width', `${result.sidePanelWidth}px`);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };

    loadSettings();
  }, []);

  const handleNavigate = (url: string) => {
    setCurrentUrl(url);
  };

  const handleBack = () => {
    contentPaneRef.current?.goBack();
  };

  const handleForward = () => {
    contentPaneRef.current?.goForward();
  };

  const handleRefresh = () => {
    contentPaneRef.current?.refresh();
  };

  const handleHome = () => {
    setCurrentUrl(defaultUrl);
  };

  const handleUrlChange = (newUrl: string) => {
    setCurrentUrl(newUrl);
  };

  // Update navigation state (simplified implementation)
  useEffect(() => {
    const updateNavigationState = () => {
      if (contentPaneRef.current) {
        setCanGoBack(contentPaneRef.current.canGoBack());
        setCanGoForward(contentPaneRef.current.canGoForward());
      }
    };

    const interval = setInterval(updateNavigationState, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      <AddressBar
        currentUrl={currentUrl}
        onNavigate={handleNavigate}
        onBack={handleBack}
        onForward={handleForward}
        onRefresh={handleRefresh}
        onHome={handleHome}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      />
      <ContentPane
        ref={contentPaneRef}
        url={currentUrl}
        onUrlChange={handleUrlChange}
        className="flex-1"
      />
    </div>
  );
}
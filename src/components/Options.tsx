import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Settings as SettingsIcon, Save, RotateCcw } from 'lucide-react';

interface SettingsType {
  sidePanelWidth: number;
  defaultUrl: string;
  theme: 'light' | 'dark';
}

const DEFAULT_SETTINGS: SettingsType = {
  sidePanelWidth: 400,
  defaultUrl: 'https://duckduckgo.com',
  theme: 'light'
};

export function Options() {
  const [settings, setSettings] = useState<SettingsType>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  // Load settings from Chrome storage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const result = await chrome.storage.sync.get(['sidePanelWidth', 'defaultUrl', 'theme']);
        setSettings({
          sidePanelWidth: result.sidePanelWidth || DEFAULT_SETTINGS.sidePanelWidth,
          defaultUrl: result.defaultUrl || DEFAULT_SETTINGS.defaultUrl,
          theme: result.theme || DEFAULT_SETTINGS.theme
        });
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSavedMessage('');
    
    try {
      await chrome.storage.sync.set(settings);
      setSavedMessage('Settings saved successfully!');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSavedMessage('Failed to save settings. Please try again.');
      setTimeout(() => setSavedMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 300 && value <= 800) {
      setSettings(prev => ({ ...prev, sidePanelWidth: value }));
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, defaultUrl: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">AI Side Browser Settings</h1>
        </div>

        <div className="space-y-6 bg-card border rounded-lg p-6">
          <div className="space-y-2">
            <label htmlFor="width" className="text-sm font-medium text-foreground">
              Side Panel Width (pixels)
            </label>
            <Input
              id="width"
              type="number"
              min="300"
              max="800"
              value={settings.sidePanelWidth}
              onChange={handleWidthChange}
              className="max-w-xs"
            />
            <p className="text-xs text-muted-foreground">
              Recommended width: 300-800 pixels. Changes take effect after reopening the side panel.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="defaultUrl" className="text-sm font-medium text-foreground">
              Default Home URL
            </label>
            <Input
              id="defaultUrl"
              type="url"
              value={settings.defaultUrl}
              onChange={handleUrlChange}
              placeholder="https://example.com"
            />
            <p className="text-xs text-muted-foreground">
              The URL that loads when you click the Home button or open the side panel.
              <br />
              <strong>Note:</strong> Some sites (like Google) may not load in iframes due to security restrictions. 
              Try iframe-friendly alternatives like DuckDuckGo, Bing, or direct AI service URLs.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="theme" className="text-sm font-medium text-foreground">
              Theme
            </label>
            <select
              id="theme"
              value={settings.theme}
              onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value as 'light' | 'dark' }))}
              className="flex h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
            
            <Button onClick={handleReset} variant="outline" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>

          {savedMessage && (
            <div className={`text-sm p-3 rounded-md ${
              savedMessage.includes('success') 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {savedMessage}
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4 bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground">About AI Side Browser</h2>
          <p className="text-muted-foreground">
            AI Side Browser provides easy access to AI services and web content in a convenient side panel.
            Perfect for research, content creation, and staying productive while browsing.
          </p>
          <div className="text-sm text-muted-foreground">
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>Features:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Minimalistic browser interface</li>
              <li>Configurable panel width</li>
              <li>Custom home page</li>
              <li>Navigation history</li>
              <li>Search integration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
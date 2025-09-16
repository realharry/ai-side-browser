import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, ArrowRight, RotateCcw, Home, Search } from 'lucide-react';
import { cn, isValidUrl, formatUrl } from '@/lib/utils';

interface AddressBarProps {
  currentUrl: string;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onRefresh: () => void;
  onHome: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  className?: string;
}

export function AddressBar({
  currentUrl,
  onNavigate,
  onBack,
  onForward,
  onRefresh,
  onHome,
  canGoBack,
  canGoForward,
  className
}: AddressBarProps) {
  const [urlInput, setUrlInput] = useState(currentUrl);

  useEffect(() => {
    setUrlInput(currentUrl);
  }, [currentUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = urlInput.trim();
    
    if (!url) return;

    // If it looks like a search query, use Google search
    if (!url.includes('.') && !url.includes(':')) {
      url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    } else if (!isValidUrl(url)) {
      url = formatUrl(url);
    }

    onNavigate(url);
  };

  return (
    <div className={cn("flex items-center gap-1 p-2 border-b bg-background", className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        disabled={!canGoBack}
        className="h-8 w-8"
        title="Go back"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onForward}
        disabled={!canGoForward}
        className="h-8 w-8"
        title="Go forward"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onRefresh}
        className="h-8 w-8"
        title="Refresh"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onHome}
        className="h-8 w-8"
        title="Home"
      >
        <Home className="h-4 w-4" />
      </Button>

      <form onSubmit={handleSubmit} className="flex-1 flex gap-1">
        <Input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Enter URL or search..."
          className="flex-1 h-8 text-sm"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          title="Navigate"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
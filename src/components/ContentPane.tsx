import { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ContentPaneProps {
  url: string;
  onUrlChange?: (url: string) => void;
  className?: string;
}

export interface ContentPaneRef {
  goBack: () => void;
  goForward: () => void;
  refresh: () => void;
  canGoBack: () => boolean;
  canGoForward: () => boolean;
  getCurrentUrl: () => string;
}

export const ContentPane = forwardRef<ContentPaneRef, ContentPaneProps>(
  ({ url, onUrlChange, className }, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useImperativeHandle(ref, () => ({
      goBack: () => {
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.history.back();
        }
      },
      goForward: () => {
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.history.forward();
        }
      },
      refresh: () => {
        if (iframeRef.current) {
          setHasError(false);
          setIsLoading(true);
          const currentSrc = iframeRef.current.src;
          iframeRef.current.src = '';
          iframeRef.current.src = currentSrc;
        }
      },
      canGoBack: () => {
        // This is a simplified check - actual implementation would require
        // more complex history tracking due to iframe limitations
        return true;
      },
      canGoForward: () => {
        // This is a simplified check - actual implementation would require
        // more complex history tracking due to iframe limitations
        return true;
      },
      getCurrentUrl: () => {
        try {
          return iframeRef.current?.contentWindow?.location.href || url;
        } catch (error) {
          // Cross-origin restrictions prevent access to iframe URL
          return url;
        }
      }
    }));

    const handleLoad = () => {
      setIsLoading(false);
      setHasError(false);
      
      if (onUrlChange && iframeRef.current) {
        try {
          const currentUrl = iframeRef.current.contentWindow?.location.href;
          if (currentUrl && currentUrl !== url) {
            onUrlChange(currentUrl);
          }
        } catch (error) {
          // Cross-origin restrictions - this is expected for external sites
          console.log('Cannot access iframe URL due to cross-origin restrictions');
        }
      }
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    // Reset states when URL changes
    useEffect(() => {
      setHasError(false);
      setIsLoading(true);
    }, [url]);

    const openInNewTab = () => {
      window.open(url, '_blank');
    };

    return (
      <div className={cn("flex-1 relative", className)}>
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
            <div className="text-center p-6 max-w-md">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold mb-2">Cannot Load Website</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This website cannot be displayed in the side panel due to security restrictions. 
                Many sites (like Google) prevent loading in frames to protect against clickjacking attacks.
              </p>
              <div className="space-y-2">
                <button
                  onClick={openInNewTab}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Open in New Tab
                </button>
                <p className="text-xs text-muted-foreground">
                  Try using DuckDuckGo, Bing, or other iframe-friendly sites instead.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-full border-0"
          title="Side Browser Content"
          onLoad={handleLoad}
          onError={handleError}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
        />
      </div>
    );
  }
);
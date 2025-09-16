import { useRef, useImperativeHandle, forwardRef } from 'react';
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

    return (
      <div className={cn("flex-1 relative", className)}>
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-full border-0"
          title="Side Browser Content"
          onLoad={handleLoad}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
        />
      </div>
    );
  }
);
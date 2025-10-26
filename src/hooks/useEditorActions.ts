'use client';

import { useEffect, useCallback } from 'react';
import type { ConfigManager } from '../core/ConfigManager';

interface NotificationHandler {
  success: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
}

/**
 * Default notification handler (console-based)
 */
const defaultNotificationHandler: NotificationHandler = {
  success: (message: string) => console.log(`✓ ${message}`),
  warning: (message: string) => console.warn(`⚠ ${message}`),
  error: (message: string) => console.error(`✗ ${message}`),
};

/**
 * Editor Actions Hook
 * Handles copy and prettify actions
 */
export const useEditorActions = (
  value: string,
  onPrettify: () => void,
  configManager: ConfigManager,
  notificationHandler?: NotificationHandler,
  disableStyleInjection?: boolean,
  styleElementId: string = 'rcse-dynamic-styles'
) => {
  const notify = notificationHandler || defaultNotificationHandler;

  // Inject dynamic styles and update when config changes
  useEffect(() => {
    if (disableStyleInjection) return;

    let styleEl = document.getElementById(styleElementId);
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleElementId;
      document.head.appendChild(styleEl);
    }
    
    // Update the content with the current config's CSS
    styleEl.textContent = configManager.generateCSS();
  }, [configManager, disableStyleInjection, styleElementId]);

  const handleCopy = useCallback(() => {
    if (!value) {
      notify.warning('Nothing to copy');
      return;
    }

    navigator.clipboard
      .writeText(value)
      .then(() => {
        notify.success('Copied to clipboard!');
      })
      .catch(() => {
        notify.error('Failed to copy');
      });
  }, [value, notify]);

  return {
    handleCopy,
    handlePrettify: onPrettify,
  };
};


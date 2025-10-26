'use client';

import { useCallback, useMemo } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { ConfigManager } from './core/ConfigManager';
import { Prettifier } from './core/Prettifier';
import { SyntaxHighlighter } from './core/SyntaxHighlighter';
import type { CustomSyntaxEditorProps } from './types';

/**
 * Custom Syntax Editor
 * Main component for syntax editing with highlighting, prettification, and customization
 */
export const CustomSyntaxEditor = ({
  value,
  onChange,
  disabled = false,
  configManager,
  prettifierInstance,
  highlighterInstance,
  showHeader = true,
  headerLabel = 'Syntax Editor',
  headerLinks = [],
  showCopyButton = true,
  showPrettifyButton = true,
  copyButtonLabel = 'Copy',
  prettifyButtonLabel = 'Prettify',
  placeholder = 'Enter your query here...',
  className,
  style,
  classNames = {},
  styles: customStyles = {},
  onCopy,
  onPrettify,
  notificationHandler,
  disableStyleInjection = false,
  styleElementId = 'rcse-dynamic-styles',
}: CustomSyntaxEditorProps) => {
  // Create default config manager if not provided - use empty config instead of OData default
  const config = useMemo(() => {
    if (!configManager) {
      return new ConfigManager({
        version: '1.0.0',
        highlightingRules: [],
        types: []
      });
    }
    return configManager;
  }, [configManager]);

  // Create prettifier instance
  const prettifier = useMemo(() => {
    return prettifierInstance || new Prettifier(config);
  }, [config, prettifierInstance]);

  // Create highlighter instance
  const highlighter = useMemo(() => {
    return highlighterInstance || new SyntaxHighlighter(config);
  }, [config, highlighterInstance]);

  const handleChange = useCallback(
    (newValue: string) => {
      onChange({
        target: {
          value: newValue,
        },
      });
    },
    [onChange]
  );

  const handlePrettify = useCallback(() => {
    const prettified = prettifier.prettify(value);
    if (onPrettify) {
      onPrettify(prettified);
    }
    handleChange(prettified);
  }, [value, handleChange, prettifier, onPrettify]);

  const handleCopyCallback = useCallback(() => {
    if (onCopy) {
      onCopy(value);
    }
  }, [value, onCopy]);

  if (disabled) {
    return (
      <div
        className={className || 'rcse-container'}
        style={style}
      >
        {showHeader && (
          <div className={classNames.header || 'rcse-header'} style={customStyles.header}>
            <div className={classNames.headerLeft || 'rcse-headerLeft'}>
              <span className={classNames.headerLabel || 'rcse-headerLabel'}>
                {headerLabel} (Read-only)
              </span>
            </div>
          </div>
        )}
        <div
          className={classNames.editor || 'rcse-editor'}
          style={{ ...customStyles.editor, opacity: 0.6 }}
        >
          {value || 'No query specified'}
        </div>
      </div>
    );
  }

  return (
    <div
      className={className || 'rcse-container'}
      style={style}
    >
      <CodeEditor
        value={value}
        onChange={handleChange}
        onPrettify={handlePrettify}
        configManager={config}
        highlighter={highlighter}
        showHeader={showHeader}
        headerLabel={headerLabel}
        headerLinks={headerLinks}
        showCopyButton={showCopyButton}
        showPrettifyButton={showPrettifyButton}
        copyButtonLabel={copyButtonLabel}
        prettifyButtonLabel={prettifyButtonLabel}
        placeholder={placeholder}
        classNames={classNames}
        styles={customStyles}
        onCopy={onCopy ? handleCopyCallback : undefined}
        notificationHandler={notificationHandler}
        disableStyleInjection={disableStyleInjection}
        styleElementId={styleElementId}
      />
    </div>
  );
};

export default CustomSyntaxEditor;


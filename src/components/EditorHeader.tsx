'use client';

import type { EditorHeaderProps } from '../types';

/**
 * Editor Header Component
 * Displays title, documentation links, and action buttons
 */
export const EditorHeader = ({
  onCopy,
  onPrettify,
  headerLabel = 'Syntax Editor',
  headerLinks = [],
  showCopyButton = true,
  showPrettifyButton = true,
  copyButtonLabel = 'Copy',
  prettifyButtonLabel = 'Prettify',
  classNames = {},
  styles: customStyles = {},
}: EditorHeaderProps) => {
  return (
    <div
      className={classNames.header || 'rcse-header'}
      style={customStyles.header}
    >
      <div className={classNames.headerLeft || 'rcse-headerLeft'}>
        <span className={classNames.headerLabel || 'rcse-headerLabel'}>
          {headerLabel}
        </span>
        {headerLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames.headerLink || 'rcse-headerLink'}
            title={link.title || link.label}
          >
            {link.label} {link.icon}
          </a>
        ))}
      </div>
      <div className={classNames.headerButtons || 'rcse-headerButtons'}>
        {showCopyButton && (
          <button
            type="button"
            className={classNames.headerButton || 'rcse-headerButton'}
            onClick={onCopy}
            title="Copy to Clipboard"
          >
            {copyButtonLabel}
          </button>
        )}
        {showPrettifyButton && (
          <button
            type="button"
            className={classNames.headerButton || 'rcse-headerButton'}
            onClick={onPrettify}
            title="Prettify Query"
          >
            {prettifyButtonLabel}
          </button>
        )}
      </div>
    </div>
  );
};


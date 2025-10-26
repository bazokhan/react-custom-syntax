'use client';

import { EditorHeader } from './EditorHeader';
import { EditorContent } from './EditorContent';
import { useEditorActions } from '../hooks/useEditorActions';
import type { CodeEditorProps } from '../types';

/**
 * Code Editor Component
 * Orchestrates header, content, and actions
 */
export const CodeEditor = ({
  value,
  onChange,
  onPrettify,
  configManager,
  highlighter,
  showHeader = true,
  headerLabel,
  headerLinks,
  showCopyButton,
  showPrettifyButton,
  copyButtonLabel,
  prettifyButtonLabel,
  placeholder,
  classNames,
  styles,
  onCopy,
  notificationHandler,
  disableStyleInjection,
  styleElementId,
}: CodeEditorProps) => {
  const { handleCopy, handlePrettify } = useEditorActions(
    value,
    onPrettify,
    configManager,
    notificationHandler,
    disableStyleInjection,
    styleElementId
  );

  const copyHandler = onCopy || handleCopy;

  return (
    <>
      {showHeader && (
        <EditorHeader
          onCopy={copyHandler}
          onPrettify={handlePrettify}
          headerLabel={headerLabel}
          headerLinks={headerLinks}
          showCopyButton={showCopyButton}
          showPrettifyButton={showPrettifyButton}
          copyButtonLabel={copyButtonLabel}
          prettifyButtonLabel={prettifyButtonLabel}
          classNames={classNames}
          styles={styles}
        />
      )}
      <EditorContent
        value={value}
        onChange={onChange}
        highlighter={highlighter}
        placeholder={placeholder}
        className={classNames?.editor || 'rcse-editor'}
        style={styles?.editor}
      />
    </>
  );
};


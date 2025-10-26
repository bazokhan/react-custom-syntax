'use client';

import { useRef, useEffect } from 'react';
import type { EditorContentProps } from '../types';

/**
 * Editor Content Component
 * ContentEditable div with syntax highlighting
 */
export const EditorContent = ({
  value,
  onChange,
  highlighter,
  placeholder = 'Enter your query here...',
  className,
  style,
}: EditorContentProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastRawValueRef = useRef<string>('');

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.textContent || '';
    lastRawValueRef.current = newValue;
    onChange(newValue);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
      range.collapse(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode('  '));
        range.collapse(false);
      }
    }
  };

  // Update editor content when value changes
  useEffect(() => {
    if (!editorRef.current) return;

    const newValue = value ?? '';
    
    // Only update if the value actually changed from the last raw value
    if (newValue !== lastRawValueRef.current) {
      const selection = window.getSelection();
      const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
      const startOffset = range?.startOffset || 0;

      editorRef.current.innerHTML = highlighter.highlight(newValue);
      
      // Update the last raw value ref
      lastRawValueRef.current = newValue;

      // Restore cursor position if possible
      if (range && editorRef.current.firstChild) {
        try {
          const newRange = document.createRange();
          const textNode = editorRef.current.firstChild;
          const offset = Math.min(
            startOffset,
            (textNode as Text).textContent?.length || 0
          );
          newRange.setStart(textNode, offset);
          newRange.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(newRange);
        } catch (e) {
          // Cursor positioning failed, ignore
        }
      }
    }
  }, [value, highlighter]);

  return (
    <div
      ref={editorRef}
      contentEditable
      className={className || 'rcse-editor'}
      style={style}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      spellCheck={false}
      data-gramm="false"
      suppressContentEditableWarning
      data-placeholder={placeholder}
    />
  );
};


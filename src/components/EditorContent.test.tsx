import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { EditorContent } from './EditorContent';
import { SyntaxHighlighter } from '../core/SyntaxHighlighter';
import { ConfigManager } from '../core/ConfigManager';
import { odataConfig } from '../configs';

describe('EditorContent', () => {
  const mockOnChange = vi.fn();

  it('should render contentEditable div', () => {
    const configManager = new ConfigManager(odataConfig);
    const highlighter = new SyntaxHighlighter(configManager);

    const { container } = render(
      <EditorContent value="" onChange={mockOnChange} highlighter={highlighter} />
    );

    const editableDiv = container.querySelector('[contenteditable]');
    expect(editableDiv).toBeInTheDocument();
  });

  it('should apply placeholder attribute', () => {
    const configManager = new ConfigManager(odataConfig);
    const highlighter = new SyntaxHighlighter(configManager);

    const { container } = render(
      <EditorContent
        value=""
        onChange={mockOnChange}
        highlighter={highlighter}
        placeholder="Custom placeholder"
      />
    );

    const editableDiv = container.querySelector('[data-placeholder]');
    expect(editableDiv).toHaveAttribute('data-placeholder', 'Custom placeholder');
  });

  it('should disable spellcheck', () => {
    const configManager = new ConfigManager(odataConfig);
    const highlighter = new SyntaxHighlighter(configManager);

    const { container } = render(
      <EditorContent value="" onChange={mockOnChange} highlighter={highlighter} />
    );

    const editableDiv = container.querySelector('[contenteditable]');
    expect(editableDiv).toHaveAttribute('spellcheck', 'false');
  });

  it('should apply custom className', () => {
    const configManager = new ConfigManager(odataConfig);
    const highlighter = new SyntaxHighlighter(configManager);

    const { container } = render(
      <EditorContent
        value=""
        onChange={mockOnChange}
        highlighter={highlighter}
        className="custom-editor"
      />
    );

    expect(container.querySelector('.custom-editor')).toBeInTheDocument();
  });

  it('should highlight content on mount', () => {
    const configManager = new ConfigManager(odataConfig);
    const highlighter = new SyntaxHighlighter(configManager);

    const { container } = render(
      <EditorContent
        value="status eq true"
        onChange={mockOnChange}
        highlighter={highlighter}
      />
    );

    const editableDiv = container.querySelector('[contenteditable]');
    expect(editableDiv?.innerHTML).toContain('status');
  });
});


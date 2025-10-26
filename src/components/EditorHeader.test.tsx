import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditorHeader } from './EditorHeader';

describe('EditorHeader', () => {
  const mockOnCopy = vi.fn();
  const mockOnPrettify = vi.fn();

  it('should render with default props', () => {
    render(<EditorHeader onCopy={mockOnCopy} onPrettify={mockOnPrettify} />);

    expect(screen.getByText('Syntax Editor')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('Prettify')).toBeInTheDocument();
  });

  it('should render with custom header label', () => {
    render(
      <EditorHeader
        onCopy={mockOnCopy}
        onPrettify={mockOnPrettify}
        headerLabel="Custom Editor"
      />
    );

    expect(screen.getByText('Custom Editor')).toBeInTheDocument();
  });

  it('should call onCopy when copy button is clicked', () => {
    render(<EditorHeader onCopy={mockOnCopy} onPrettify={mockOnPrettify} />);

    const copyButton = screen.getByText('Copy');
    fireEvent.click(copyButton);

    expect(mockOnCopy).toHaveBeenCalledTimes(1);
  });

  it('should call onPrettify when prettify button is clicked', () => {
    render(<EditorHeader onCopy={mockOnCopy} onPrettify={mockOnPrettify} />);

    const prettifyButton = screen.getByText('Prettify');
    fireEvent.click(prettifyButton);

    expect(mockOnPrettify).toHaveBeenCalledTimes(1);
  });

  it('should hide copy button when showCopyButton is false', () => {
    render(
      <EditorHeader
        onCopy={mockOnCopy}
        onPrettify={mockOnPrettify}
        showCopyButton={false}
      />
    );

    expect(screen.queryByText('Copy')).not.toBeInTheDocument();
    expect(screen.getByText('Prettify')).toBeInTheDocument();
  });

  it('should hide prettify button when showPrettifyButton is false', () => {
    render(
      <EditorHeader
        onCopy={mockOnCopy}
        onPrettify={mockOnPrettify}
        showPrettifyButton={false}
      />
    );

    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.queryByText('Prettify')).not.toBeInTheDocument();
  });

  it('should render with custom button labels', () => {
    render(
      <EditorHeader
        onCopy={mockOnCopy}
        onPrettify={mockOnPrettify}
        copyButtonLabel="Copy Code"
        prettifyButtonLabel="Format Code"
      />
    );

    expect(screen.getByText('Copy Code')).toBeInTheDocument();
    expect(screen.getByText('Format Code')).toBeInTheDocument();
  });

  it('should render header links', () => {
    const links = [
      { href: 'https://example.com', label: 'Documentation', title: 'View docs' },
      { href: 'https://github.com', label: 'GitHub' },
    ];

    render(
      <EditorHeader
        onCopy={mockOnCopy}
        onPrettify={mockOnPrettify}
        headerLinks={links}
      />
    );

    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });
});


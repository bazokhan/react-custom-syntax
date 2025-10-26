import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomSyntaxEditor } from './CustomSyntaxEditor';
import { ConfigManager } from './core/ConfigManager';
import { odataConfig } from './configs';

describe('CustomSyntaxEditor', () => {
  const mockOnChange = vi.fn();

  it('should render the editor', () => {
    const configManager = new ConfigManager(odataConfig);
    render(
      <CustomSyntaxEditor
        value="test query"
        onChange={mockOnChange}
        configManager={configManager}
      />
    );

    expect(screen.getByText(/syntax editor/i)).toBeInTheDocument();
  });

  it('should render disabled state', () => {
    const configManager = new ConfigManager(odataConfig);
    render(
      <CustomSyntaxEditor
        value="test query"
        onChange={mockOnChange}
        disabled={true}
        configManager={configManager}
      />
    );

    expect(screen.getByText(/read-only/i)).toBeInTheDocument();
    expect(screen.getByText('test query')).toBeInTheDocument();
  });

  it('should render with custom header label', () => {
    const configManager = new ConfigManager(odataConfig);
    render(
      <CustomSyntaxEditor
        value=""
        onChange={mockOnChange}
        headerLabel="Custom Label"
        configManager={configManager}
      />
    );

    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('should hide header when showHeader is false', () => {
    const configManager = new ConfigManager(odataConfig);
    render(
      <CustomSyntaxEditor
        value=""
        onChange={mockOnChange}
        showHeader={false}
        configManager={configManager}
      />
    );

    expect(screen.queryByText(/syntax editor/i)).not.toBeInTheDocument();
  });

  it('should render with custom class name', () => {
    const configManager = new ConfigManager(odataConfig);
    const { container } = render(
      <CustomSyntaxEditor
        value=""
        onChange={mockOnChange}
        className="custom-class"
        configManager={configManager}
      />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should create default config manager if not provided', () => {
    render(<CustomSyntaxEditor value="" onChange={mockOnChange} />);

    // Should not crash
    expect(screen.getByText(/syntax editor/i)).toBeInTheDocument();
  });

  it('should render empty state message when disabled and no value', () => {
    const configManager = new ConfigManager(odataConfig);
    render(
      <CustomSyntaxEditor
        value=""
        onChange={mockOnChange}
        disabled={true}
        configManager={configManager}
      />
    );

    expect(screen.getByText('No query specified')).toBeInTheDocument();
  });
});


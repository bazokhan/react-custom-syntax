import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEditorActions } from './useEditorActions';
import { ConfigManager } from '../core/ConfigManager';
import { odataConfig } from '../configs';

describe('useEditorActions', () => {
  let configManager: ConfigManager;

  beforeEach(() => {
    configManager = new ConfigManager(odataConfig);
    // Clear any existing style elements
    const existingStyle = document.getElementById('rcse-dynamic-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
  });

  it('should inject styles on mount', () => {
    const mockOnPrettify = vi.fn();

    renderHook(() => useEditorActions('test', mockOnPrettify, configManager));

    const styleEl = document.getElementById('rcse-dynamic-styles');
    expect(styleEl).toBeInTheDocument();
    expect(styleEl?.textContent).toContain('.rcse-');
  });

  it('should not inject styles if disableStyleInjection is true', () => {
    const mockOnPrettify = vi.fn();

    renderHook(() =>
      useEditorActions('test', mockOnPrettify, configManager, undefined, true)
    );

    const styleEl = document.getElementById('rcse-dynamic-styles');
    expect(styleEl).not.toBeInTheDocument();
  });

  it('should return handleCopy function', () => {
    const mockOnPrettify = vi.fn();

    const { result } = renderHook(() =>
      useEditorActions('test', mockOnPrettify, configManager)
    );

    expect(result.current.handleCopy).toBeInstanceOf(Function);
  });

  it('should return handlePrettify function', () => {
    const mockOnPrettify = vi.fn();

    const { result } = renderHook(() =>
      useEditorActions('test', mockOnPrettify, configManager)
    );

    expect(result.current.handlePrettify).toBe(mockOnPrettify);
  });

  it('should handle copy with navigator.clipboard', async () => {
    const mockOnPrettify = vi.fn();
    const mockNotificationHandler = {
      success: vi.fn(),
      warning: vi.fn(),
      error: vi.fn(),
    };

    const { result } = renderHook(() =>
      useEditorActions(
        'test value',
        mockOnPrettify,
        configManager,
        mockNotificationHandler
      )
    );

    result.current.handleCopy();

    // Wait for promise to resolve
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test value');
    expect(mockNotificationHandler.success).toHaveBeenCalledWith(
      'Copied to clipboard!'
    );
  });

  it('should show warning when copying empty value', () => {
    const mockOnPrettify = vi.fn();
    const mockNotificationHandler = {
      success: vi.fn(),
      warning: vi.fn(),
      error: vi.fn(),
    };

    const { result } = renderHook(() =>
      useEditorActions('', mockOnPrettify, configManager, mockNotificationHandler)
    );

    result.current.handleCopy();

    expect(mockNotificationHandler.warning).toHaveBeenCalledWith('Nothing to copy');
  });

  it('should use custom style element ID', () => {
    const mockOnPrettify = vi.fn();

    renderHook(() =>
      useEditorActions(
        'test',
        mockOnPrettify,
        configManager,
        undefined,
        false,
        'custom-id'
      )
    );

    const styleEl = document.getElementById('custom-id');
    expect(styleEl).toBeInTheDocument();
  });
});


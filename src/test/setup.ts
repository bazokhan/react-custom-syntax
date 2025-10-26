/**
 * Vitest setup file
 */

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
    readText: vi.fn(() => Promise.resolve('')),
  },
});

// Mock window.getSelection
const mockSelection = {
  rangeCount: 0,
  getRangeAt: vi.fn(),
  removeAllRanges: vi.fn(),
  addRange: vi.fn(),
};

Object.defineProperty(window, 'getSelection', {
  value: () => mockSelection,
  writable: true,
});

// Mock document.createRange
document.createRange = vi.fn(() => ({
  setStart: vi.fn(),
  setEnd: vi.fn(),
  collapse: vi.fn(),
  commonAncestorContainer: document.createElement('div'),
  cloneContents: vi.fn(),
  cloneRange: vi.fn(),
  compareBoundaryPoints: vi.fn(),
  comparePoint: vi.fn(),
  createContextualFragment: vi.fn(),
  deleteContents: vi.fn(),
  detach: vi.fn(),
  extractContents: vi.fn(),
  getBoundingClientRect: vi.fn(),
  getClientRects: vi.fn(),
  insertNode: vi.fn(),
  intersectsNode: vi.fn(),
  isPointInRange: vi.fn(),
  selectNode: vi.fn(),
  selectNodeContents: vi.fn(),
  setEndAfter: vi.fn(),
  setEndBefore: vi.fn(),
  setStartAfter: vi.fn(),
  setStartBefore: vi.fn(),
  surroundContents: vi.fn(),
  toString: vi.fn(),
  collapsed: false,
  endContainer: document.createElement('div'),
  endOffset: 0,
  startContainer: document.createElement('div'),
  startOffset: 0,
})) as any;


/**
 * Query Prettifier
 * Formats queries with proper spacing around operators
 */

import type { ConfigManager } from './ConfigManager';

export class Prettifier {
  private configManager: ConfigManager;
  private maxLineLength: number; // Kept for API compatibility

  constructor(configManager: ConfigManager, maxLineLength: number = 80) {
    this.configManager = configManager;
    this.maxLineLength = maxLineLength;
  }

  /**
   * Prettify query - simple and reliable
   * Only adds proper spacing around operators
   */
  prettify(code: string): string {
    if (!code) return '';

    // Keep maxLineLength for API compatibility (currently unused)
    void this.maxLineLength;

    let formatted = code;

    // Get all operators from config
    const operators = this.configManager.getOperatorKeywords();

    // Add spaces around operators
    operators.forEach((op) => {
      // Use word boundaries to avoid matching operators inside identifiers
      const regex = new RegExp(`\\s*\\b${op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b\\s*`, 'gi');
      formatted = formatted.replace(regex, ` ${op} `);
    });

    // Process line by line to preserve line breaks
    const lines = formatted.split(/\r\n|\n|\r/);
    const normalizedLines = lines.map(line => {
      // Normalize whitespace within each line (but preserve the line itself)
      // Replace multiple spaces with single space, but keep newlines separate
      return line.replace(/[ \t]+/g, ' ');
    });
    
    // Join lines back and trim edges
    formatted = normalizedLines.join('\n').trim();

    return formatted;
  }

  /**
   * Set maximum line length (kept for API compatibility)
   */
  setMaxLineLength(length: number): this {
    this.maxLineLength = length;
    return this;
  }
}


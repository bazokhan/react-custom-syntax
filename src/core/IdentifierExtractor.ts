/**
 * Identifier Extractor
 * Extracts field identifiers from expressions
 */

import type { ConfigManager } from './ConfigManager';

export class IdentifierExtractor {
  private configManager: ConfigManager;

  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
  }

  /**
   * Extract field identifiers from expression
   */
  extract(expression: string): string[] {
    if (!expression) return [];

    try {
      const identifiers = new Set<string>();

      // Remove string literals
      let cleaned = expression.replace(/'[^']*'/g, '');

      // Remove date literals
      cleaned = cleaned.replace(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/g,
        ''
      );

      // Remove numbers
      cleaned = cleaned.replace(/\b\d+\.?\d*\b/g, '');

      // Remove all known keywords from config
      cleaned = this._removeKeywords(cleaned);

      // Remove special characters and split
      const tokens = cleaned.split(/[\s()]+/);

      tokens.forEach((token) => {
        const trimmed = token.trim();
        if (this._isValidIdentifier(trimmed)) {
          identifiers.add(trimmed);
        }
      });

      return Array.from(identifiers);
    } catch (error) {
      console.error('Error extracting identifiers:', error);
      return [];
    }
  }

  /**
   * Remove all known keywords from text
   */
  private _removeKeywords(text: string): string {
    let cleaned = text;

    // Get all keywords from config
    const operators = this.configManager.getOperatorKeywords();
    const functions = this.configManager.getFunctionKeywords();
    const booleans = this.configManager.getBooleanLiteralKeywords();
    const custom = this.configManager.getCustomTokenKeywords();

    const allKeywords = [...operators, ...functions, ...booleans, ...custom];

    allKeywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      cleaned = cleaned.replace(regex, '');
    });

    return cleaned;
  }

  /**
   * Check if a token is a valid identifier
   */
  private _isValidIdentifier(token: string): boolean {
    if (!token) return false;
    // Valid identifier: starts with letter, contains letters/numbers/underscores
    return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(token);
  }
}


/**
 * Syntax Highlighter
 * Generic rule-based highlighter driven entirely by configuration
 */

import type { ConfigManager } from "./ConfigManager";
import type { HighlightingRule } from "../types";

export class SyntaxHighlighter {
  private configManager: ConfigManager;
  private highlighted: string;

  constructor(configManager: ConfigManager) {
    if (!configManager) {
      throw new Error("SyntaxHighlighter requires a configManager instance");
    }
    this.configManager = configManager;
    this.highlighted = "";
  }

  /**
   * Main highlighting method - applies all rules from config
   */
  highlight(text: string): string {
    if (!text) return "";

    this.highlighted = text;

    // Escape HTML first
    this._escapeHtml();

    // Convert HTML entities for quotes
    this._convertHtmlEntities();

    // Apply all highlighting rules from config in order
    const rules = this.configManager.getHighlightingRules();
    rules.forEach((rule) => {
      this._applyRule(rule);
    });

    return this.highlighted;
  }

  /**
   * Apply a single highlighting rule
   */
  private _applyRule(rule: HighlightingRule): void {
    if (rule.matchType === "keyword") {
      this._applyKeywordRule(rule);
    } else if (rule.matchType === "regex") {
      this._applyRegexRule(rule);
    }
  }

  /**
   * Split text into segments (HTML tags and plain text)
   */
  private _splitIntoSegments(text: string): string[] {
    return text.split(/(<[^>]+>)/);
  }

  /**
   * Check if a segment is an opening comment span
   */
  private _isCommentOpening(segment: string): boolean {
    return segment.startsWith("<span class='rcse-comment'");
  }

  /**
   * Check if a segment is a closing span tag
   */
  private _isClosingSpan(segment: string): boolean {
    return segment === "</span>";
  }

  /**
   * Apply keyword-based highlighting rule
   */
  private _applyKeywordRule(rule: HighlightingRule): void {
    if (!rule.tokens) return;

    // Split text into segments: HTML tags and plain text
    const segments = this._splitIntoSegments(this.highlighted);
    let result = "";

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];

      // If this is an HTML tag, add it as-is
      if (segment.startsWith("<")) {
        result += segment;
        continue;
      }

      // Check if we're inside a comment
      let insideComment = false;
      for (let j = i - 1; j >= 0; j--) {
        if (segments[j].startsWith("<")) {
          if (this._isClosingSpan(segments[j])) {
            // Found closing span, stop looking
            break;
          }
          if (this._isCommentOpening(segments[j])) {
            // We're inside a comment
            insideComment = true;
            break;
          }
        }
      }

      // Skip comments - don't apply any rules to them
      if (insideComment) {
        result += segment;
        continue;
      }

      // Process plain text segments
      let processedSegment = segment;

      rule.tokens.forEach((token) => {
        const className = this._getClassNameForType(token.type);
        const escapedKeyword = this._escapeRegex(token.keyword);

        // Determine if keyword starts with special characters like @
        const isSpecialToken = /^[@$%]/.test(token.keyword);

        // Build regex for this token
        const flags = rule.caseSensitive ? "g" : "gi";
        const pattern =
          rule.addWordBoundaries && !isSpecialToken
            ? `\\b(${escapedKeyword})\\b`
            : `(${escapedKeyword})`;

        const regex = new RegExp(pattern, flags);

        processedSegment = processedSegment.replace(
          regex,
          `<span class='${className}' title='${token.description}'>$1</span>`
        );
      });

      result += processedSegment;
    }

    this.highlighted = result;
  }

  /**
   * Apply regex-based highlighting rule
   */
  private _applyRegexRule(rule: HighlightingRule): void {
    if (!rule.pattern) return;

    // Generate replacement dynamically from type, or use provided replacement
    let replacement: string;
    if (rule.replacement) {
      // Use provided replacement (for backward compatibility)
      replacement = rule.replacement;
    } else if (rule.type) {
      // Generate from type
      const className = this._getClassNameForType(rule.type);
      replacement = `<span class='${className}'>$&</span>`;
    } else {
      // Fallback
      replacement = `<span class='rcse-unknown'>$&</span>`;
    }

    const regex = new RegExp(rule.pattern, "g");

    // Split into segments and only process plain text (skip HTML tags)
    const segments = this._splitIntoSegments(this.highlighted);
    let result = "";

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];

      // If this is an HTML tag, add it as-is
      if (segment.startsWith("<")) {
        result += segment;
        continue;
      }

      // Check if we're inside a comment
      let insideComment = false;
      for (let j = i - 1; j >= 0; j--) {
        if (segments[j].startsWith("<")) {
          if (this._isClosingSpan(segments[j])) {
            // Found closing span, stop looking
            break;
          }
          if (this._isCommentOpening(segments[j])) {
            // We're inside a comment
            insideComment = true;
            break;
          }
        }
      }

      // Skip comments - don't apply any rules to them
      if (insideComment) {
        result += segment;
        continue;
      }

      // Process plain text segments
      result += segment.replace(regex, replacement);
    }

    this.highlighted = result;
  }

  /**
   * Escape HTML special characters
   */
  private _escapeHtml(): void {
    this.highlighted = this.highlighted.replace(
      /[&<>'"]/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        }[char] || char)
    );
  }

  /**
   * Convert HTML entities back to regular quotes for processing
   */
  private _convertHtmlEntities(): void {
    this.highlighted = this.highlighted.replace(/&#39;/g, "'");
  }

  /**
   * Get CSS class name for a type from config
   */
  private _getClassNameForType(typeName: string): string {
    const typeStyle = this.configManager.getTypeStyle(typeName);
    if (!typeStyle) return "rcse-unknown";

    return `rcse-${this._camelToKebab(typeStyle.className)}`;
  }

  /**
   * Convert camelCase to kebab-case
   */
  private _camelToKebab(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  }

  /**
   * Escape special regex characters
   */
  private _escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /**
   * Log the highlighted text (for debugging)
   */
  log(): this {
    console.log(this.highlighted);
    return this;
  }
}

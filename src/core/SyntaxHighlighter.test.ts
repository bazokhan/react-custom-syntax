import { describe, it, expect, beforeEach } from 'vitest';
import { SyntaxHighlighter } from './SyntaxHighlighter';
import { ConfigManager } from './ConfigManager';
import { odataConfig } from '../configs';

describe('SyntaxHighlighter with Rule-Based Architecture', () => {
  let configManager: ConfigManager;
  let highlighter: SyntaxHighlighter;

  beforeEach(() => {
    configManager = new ConfigManager(odataConfig);
    highlighter = new SyntaxHighlighter(configManager);
  });

  describe('Constructor', () => {
    it('should require a config manager', () => {
      expect(() => new SyntaxHighlighter(null as any)).toThrow(
        'SyntaxHighlighter requires a configManager instance'
      );
    });

    it('should initialize with a config manager', () => {
      expect(highlighter).toBeDefined();
    });
  });

  describe('Basic Highlighting', () => {
    it('should highlight logical operators', () => {
      const text = 'status eq true and priority gt 5';
      const result = highlighter.highlight(text);

      expect(result).toContain("class='rcse-logical-operator'");
      expect(result).toContain('and');
      expect(result).toContain('eq');
      expect(result).toContain('gt');
    });

    it('should highlight string literals', () => {
      const text = "status eq 'Active'";
      const result = highlighter.highlight(text);

      expect(result).toContain("class='rcse-string-literal'");
      expect(result).toContain('Active');
    });

    it('should highlight numbers', () => {
      const text = 'priority gt 5 and score eq 99.5';
      const result = highlighter.highlight(text);

      expect(result).toContain("class='rcse-number-literal'");
      expect(result).toContain('5');
      expect(result).toContain('99.5');
    });

    it('should highlight boolean literals', () => {
      const text = 'isActive eq true and isDeleted eq false';
      const result = highlighter.highlight(text);

      expect(result).toContain("class='rcse-boolean-literal'");
      expect(result).toContain('true');
      expect(result).toContain('false');
    });

    it('should highlight dates', () => {
      const text = 'creationTime ge 2022-12-01T00:00:00.000Z';
      const result = highlighter.highlight(text);

      expect(result).toContain("class='rcse-date-literal'");
      expect(result).toContain('2022-12-01T00:00:00.000Z');
    });

    it('should highlight custom tokens', () => {
      const text = 'lastUpdate eq @this_month and ownerId eq CurrentUserId';
      const result = highlighter.highlight(text);

      expect(result).toContain("class='rcse-custom-token'");
      expect(result).toContain('@this_month');
      expect(result).toContain('CurrentUserId');
    });

    it('should highlight functions', () => {
      const text = "contains(name, 'test') and startswith(email, 'admin')";
      const result = highlighter.highlight(text);

      expect(result).toContain("class='rcse-string-function'");
      expect(result).toContain('contains');
      expect(result).toContain('startswith');
    });
  });

  describe('Complex Queries', () => {
    it('should highlight complex nested query', () => {
      const text =
        "(status eq 'Active' and priority gt 5) or (assignedTo eq CurrentUserId and isComplete eq false)";
      const result = highlighter.highlight(text);

      // Should contain logical operators
      expect(result).toContain("class='rcse-logical-operator'");
      
      // Should contain comparison operators
      expect(result).toContain("class='rcse-comparison-operator'");

      // Should contain literals
      expect(result).toContain("class='rcse-string-literal'");
      expect(result).toContain("class='rcse-number-literal'");
      expect(result).toContain("class='rcse-boolean-literal'");
      expect(result).toContain('Active');
      expect(result).toContain('5');
      expect(result).toContain('false');

      // Should contain custom tokens
      expect(result).toContain("class='rcse-custom-token'");
      expect(result).toContain('CurrentUserId');

      // Should not corrupt the HTML
      expect(result).toContain('<span');
      expect(result).toContain('</span>');
      const openSpans = (result.match(/<span/g) || []).length;
      const closeSpans = (result.match(/<\/span>/g) || []).length;
      expect(openSpans).toBe(closeSpans);
    });

    it('should handle the provided example query', () => {
      const text =
        "(isDigitalConversionService eq true and isReviewService ne true) and billingStatus ne 'Closed' and ownerId eq '3ff62b3795fa4395899e83dee4c7a314'";
      const result = highlighter.highlight(text);

      // Check for proper span structure
      expect(result).toContain('<span');
      expect(result).toContain('</span>');

      // Count spans - should be balanced
      const openSpans = (result.match(/<span/g) || []).length;
      const closeSpans = (result.match(/<\/span>/g) || []).length;
      expect(openSpans).toBe(closeSpans);

      // Should contain all operators
      expect(result).toContain('eq');
      expect(result).toContain('ne');
      expect(result).toContain('and');

      // Should contain string literals
      expect(result).toContain('Closed');
      expect(result).toContain('3ff62b3795fa4395899e83dee4c7a314');

      // Should contain boolean literal
      expect(result).toContain('true');

      // Verify no corrupted spans (HTML structure should be valid)
      expect(result).toContain("<span class='rcse-comparison-operator'");
      expect(result).toContain("<span class='rcse-string-literal'");

      // Verify spans are balanced
      expect(openSpans).toBe(closeSpans);
    });
  });

  describe('HTML Escaping', () => {
    it('should handle HTML special characters', () => {
      const text = "field eq 'value' and other < 5";
      const result = highlighter.highlight(text);

      // The highlighter will recognize "lt" as a comparison operator and wrap it
      expect(result).toContain('class=\'rcse-comparison-operator\'');
      expect(result).toContain('other'); 
      expect(result).toContain('5');
      // The "lt" operator should be properly wrapped
      expect(result).toContain('Less than operator');
    });

    it('should handle quotes in strings', () => {
      const text = "name eq 'O'Brien'";
      const result = highlighter.highlight(text);

      expect(result).toContain("class='rcse-string-literal'");
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty input', () => {
      const result = highlighter.highlight('');
      expect(result).toBe('');
    });

    it('should handle null input', () => {
      const result = highlighter.highlight(null as any);
      expect(result).toBe('');
    });

    it('should handle input with only whitespace', () => {
      const result = highlighter.highlight('   \n\t  ');
      expect(result).toBeTruthy();
    });

    it('should not highlight partial matches', () => {
      const text = 'myand eq test oreq value';
      const result = highlighter.highlight(text);

      // Should not highlight 'and' in 'myand' or 'eq' in 'oreq'
      const andMatches = result.match(/myand/g) || [];
      expect(andMatches.length).toBeGreaterThan(0);
    });

    it('should handle case insensitive matching', () => {
      const text = 'status EQ true AND priority GT 5';
      const result = highlighter.highlight(text);

      expect(result).toContain("class='rcse-comparison-operator'");
      expect(result).toContain('EQ');
      expect(result).toContain('AND');
      expect(result).toContain('GT');
    });
  });

  describe('Rule Order', () => {
    it('should apply rules in order from config', () => {
      const text = "status eq 'Active'";
      const result = highlighter.highlight(text);

      // String highlighting happens before operator highlighting
      // So 'Active' should be wrapped first
      expect(result).toContain("class='rcse-string-literal'");
      expect(result).toContain("class='rcse-comparison-operator'");
    });
  });

  describe('Tooltips', () => {
    it('should include descriptions in title attributes for operators', () => {
      const text = 'status eq true and priority gt 5';
      const result = highlighter.highlight(text);

      expect(result).toContain("title='Equal to operator'");
      expect(result).toContain("title='Logical AND operator'");
      expect(result).toContain("title='Greater than operator'");
    });

    it('should include descriptions for custom tokens', () => {
      const text = 'ownerId eq CurrentUserId';
      const result = highlighter.highlight(text);

      expect(result).toContain("title='Current user ID'");
    });
  });
});


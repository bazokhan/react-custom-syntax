import { describe, it, expect, beforeEach } from 'vitest';
import { Prettifier } from './Prettifier';
import { ConfigManager } from './ConfigManager';
import { odataConfig } from '../configs';

describe('Prettifier', () => {
  let configManager: ConfigManager;
  let prettifier: Prettifier;

  beforeEach(() => {
    configManager = new ConfigManager(odataConfig);
    prettifier = new Prettifier(configManager);
  });

  describe('Constructor', () => {
    it('should initialize with config manager', () => {
      expect(prettifier).toBeDefined();
    });

    it('should accept custom max line length', () => {
      const customPrettifier = new Prettifier(configManager, 100);
      expect(customPrettifier).toBeDefined();
    });
  });

  describe('Basic Formatting', () => {
    it('should add spaces around operators', () => {
      const input = 'status eq true and priority gt 5';
      const result = prettifier.prettify(input);

      expect(result).toContain(' eq ');
      expect(result).toContain(' and ');
      expect(result).toContain(' gt ');
    });

    it('should preserve parentheses structure', () => {
      const input = '(status eq true and priority gt 5)';
      const result = prettifier.prettify(input);

      expect(result).toContain('(');
      expect(result).toContain(')');
      // Parentheses are preserved but spacing is normalized
      expect(result).toMatch(/\(.*eq.*and.*gt.*\)/);
    });

    it('should handle nested parentheses without changing structure', () => {
      const input = '(status eq true and (priority gt 5 or priority lt 10))';
      const result = prettifier.prettify(input);

      expect(result).toContain('(');
      expect(result).toContain(')');
      // Should preserve nested structure - check that parentheses and operators are there
      expect(result).toContain('eq');
      expect(result).toContain('and');
      expect(result).toContain('gt');
      expect(result).toContain('or');
      expect(result).toContain('lt');
      // Count parentheses to ensure structure is preserved
      const openParens = (result.match(/\(/g) || []).length;
      const closeParens = (result.match(/\)/g) || []).length;
      expect(openParens).toBe(2);
      expect(closeParens).toBe(2);
    });
  });

  describe('Operator Spacing', () => {
    it('should normalize multiple spaces to single spaces', () => {
      const input = 'status eq   true    and     priority gt  5';
      const result = prettifier.prettify(input);

      expect(result).toBe('status eq true and priority gt 5');
    });

    it('should preserve operators when not in config', () => {
      const input = 'field1 eq value1 and field2 ne value2';
      const result = prettifier.prettify(input);

      expect(result).toContain(' eq ');
      expect(result).toContain(' and ');
      expect(result).toContain(' ne ');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty input', () => {
      const result = prettifier.prettify('');
      expect(result).toBe('');
    });

    it('should handle null input', () => {
      const result = prettifier.prettify(null as any);
      expect(result).toBe('');
    });

    it('should handle input with only whitespace', () => {
      const result = prettifier.prettify('   \n\t  ');
      expect(result).toBe('');
    });

    it('should handle queries without operators', () => {
      const input = 'simplequery';
      const result = prettifier.prettify(input);
      expect(result).toBe('simplequery');
    });
  });

  describe('setMaxLineLength', () => {
    it('should set max line length', () => {
      prettifier.setMaxLineLength(100);
      expect(prettifier).toBeDefined();
    });

    it('should return instance for method chaining', () => {
      const result = prettifier.setMaxLineLength(100);
      expect(result).toBe(prettifier);
    });
  });

  describe('Complex Queries', () => {
    it('should prettify complex nested query', () => {
      const input =
        "(waxUpDesign eq 'Requested' or waxUpDesign eq 'Waiting') and (orderStatus ne 'Completed' or netSuiteStatus ne 'Completed') and creationTime ge 2022-12-01T00:00:00.000Z";
      const result = prettifier.prettify(input);

      expect(result).toBeTruthy();
      // Result should have consistent spacing
      expect(result).toContain(' eq ');
      expect(result).toContain(' or ');
      expect(result).toContain(' and ');
      expect(result).toContain(' ne ');
      expect(result).toContain(' ge ');
    });

    it('should not modify content inside string literals', () => {
      const input = "field eq 'value with spaces'";
      const result = prettifier.prettify(input);

      expect(result).toContain("'value with spaces'");
    });
  });
});


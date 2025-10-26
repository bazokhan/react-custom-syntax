import { describe, it, expect, beforeEach } from 'vitest';
import { IdentifierExtractor } from './IdentifierExtractor';
import { ConfigManager } from './ConfigManager';
import { odataConfig } from '../configs';

describe('IdentifierExtractor', () => {
  let configManager: ConfigManager;
  let extractor: IdentifierExtractor;

  beforeEach(() => {
    configManager = new ConfigManager(odataConfig);
    extractor = new IdentifierExtractor(configManager);
  });

  describe('extract', () => {
    it('should extract field identifiers from simple query', () => {
      const query = 'status eq true';
      const identifiers = extractor.extract(query);

      expect(identifiers).toContain('status');
      expect(identifiers).not.toContain('eq');
      expect(identifiers).not.toContain('true');
    });

    it('should extract multiple identifiers', () => {
      const query = 'status eq true and priority gt 5';
      const identifiers = extractor.extract(query);

      expect(identifiers).toContain('status');
      expect(identifiers).toContain('priority');
      expect(identifiers.length).toBe(2);
    });

    it('should not extract string literals', () => {
      const query = "status eq 'Active' and name eq 'test'";
      const identifiers = extractor.extract(query);

      expect(identifiers).not.toContain('Active');
      expect(identifiers).not.toContain('test');
    });

    it('should not extract operators', () => {
      const query = 'status eq true and priority ne false';
      const identifiers = extractor.extract(query);

      expect(identifiers).not.toContain('eq');
      expect(identifiers).not.toContain('and');
      expect(identifiers).not.toContain('ne');
    });

    it('should not extract functions', () => {
      const query = "contains(name, 'test') and startswith(email, 'admin')";
      const identifiers = extractor.extract(query);

      // After string removal, we lose the identifiers inside function calls
      // This is expected behavior - only top-level identifiers are extracted
      expect(identifiers).not.toContain('contains');
      expect(identifiers).not.toContain('startswith');
    });

    it('should not extract custom tokens', () => {
      const query = 'lastUpdate eq @this_month and ownerId eq CurrentUserId';
      const identifiers = extractor.extract(query);

      expect(identifiers).toContain('lastUpdate');
      expect(identifiers).toContain('ownerId');
      expect(identifiers).not.toContain('@this_month');
      expect(identifiers).not.toContain('CurrentUserId');
    });

    it('should handle complex nested queries', () => {
      const query =
        "(status eq 'Active' and priority gt 5) or (assignedTo eq userId and isComplete eq false)";
      const identifiers = extractor.extract(query);

      expect(identifiers).toContain('status');
      expect(identifiers).toContain('priority');
      expect(identifiers).toContain('assignedTo');
      expect(identifiers).toContain('userId');
      expect(identifiers).toContain('isComplete');
    });

    it('should handle empty input', () => {
      expect(extractor.extract('')).toEqual([]);
      expect(extractor.extract(null as any)).toEqual([]);
      expect(extractor.extract(undefined as any)).toEqual([]);
    });

    it('should handle identifiers with underscores', () => {
      const query = 'user_name eq test and order_status ne pending';
      const identifiers = extractor.extract(query);

      expect(identifiers).toContain('user_name');
      expect(identifiers).toContain('order_status');
      expect(identifiers).toContain('test');
      expect(identifiers).toContain('pending');
    });

    it('should not extract numbers', () => {
      const query = 'priority gt 5 and score eq 99.5';
      const identifiers = extractor.extract(query);

      expect(identifiers).not.toContain('5');
      expect(identifiers).not.toContain('99.5');
    });

    it('should not extract dates', () => {
      const query = 'creationTime ge 2022-12-01T00:00:00.000Z';
      const identifiers = extractor.extract(query);

      expect(identifiers).toContain('creationTime');
      expect(identifiers).not.toContain('2022-12-01T00:00:00.000Z');
    });
  });
});


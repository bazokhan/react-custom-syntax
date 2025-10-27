import { describe, it, expect, beforeEach } from 'vitest'
import { ConfigManager } from './ConfigManager'
import type { SyntaxConfig } from '../types'

describe('ConfigManager', () => {
  let configManager: ConfigManager

  beforeEach(() => {
    // Create minimal valid config
    const minimalConfig: SyntaxConfig = {
      version: '1.0.0',
      highlightingRules: [
        {
          name: 'TestOperators',
          matchType: 'keyword',
          caseSensitive: false,
          addWordBoundaries: true,
          tokens: [
            { keyword: 'and', type: 'LogicalOperator', description: 'Logical AND' },
            { keyword: 'or', type: 'LogicalOperator', description: 'Logical OR' },
            { keyword: 'eq', type: 'ComparisonOperator', description: 'Equal to' }
          ]
        },
        {
          name: 'TestFunctions',
          matchType: 'keyword',
          caseSensitive: false,
          addWordBoundaries: true,
          tokens: [
            { keyword: 'contains', type: 'StringFunction', description: 'Contains function' },
            { keyword: 'startswith', type: 'StringFunction', description: 'Starts with function' }
          ]
        },
        {
          name: 'TestCustom',
          matchType: 'keyword',
          caseSensitive: false,
          addWordBoundaries: true,
          tokens: [
            { keyword: '@this_month', type: 'CustomToken', description: 'This month' },
            { keyword: 'CurrentUserId', type: 'CustomToken', description: 'Current user' }
          ]
        },
        {
          name: 'TestBooleans',
          matchType: 'keyword',
          caseSensitive: false,
          addWordBoundaries: true,
          tokens: [
            { keyword: 'true', type: 'BooleanLiteral', description: 'True' },
            { keyword: 'false', type: 'BooleanLiteral', description: 'False' }
          ]
        }
      ],
      types: [
        { className: 'LogicalOperator', highlightColor: '#569cd6', parentType: 'Operator', fontWeight: '600' },
        { className: 'ComparisonOperator', highlightColor: '#569cd6', parentType: 'Operator', fontWeight: '600' },
        { className: 'StringFunction', highlightColor: '#dcdcaa', parentType: 'Function', fontWeight: '500' },
        { className: 'CustomToken', highlightColor: '#c586c0', parentType: 'Custom', fontWeight: '600' },
        { className: 'BooleanLiteral', highlightColor: '#569cd6', parentType: 'Literal', fontWeight: '600' }
      ]
    }
    configManager = new ConfigManager(minimalConfig)
  })

  describe('Constructor', () => {
    it('should initialize with provided config', () => {
      expect(configManager).toBeDefined()
      const config = configManager.getRawConfig()
      expect(config).toBeDefined()
      expect(config.highlightingRules).toBeInstanceOf(Array)
      expect(config.types).toBeInstanceOf(Array)
    })

    it('should initialize with custom config', () => {
      const customConfig: SyntaxConfig = {
        version: '2.0.0',
        highlightingRules: [
          {
            name: 'TestRule',
            matchType: 'keyword',
            caseSensitive: false,
            addWordBoundaries: true,
            tokens: [{ keyword: 'test', type: 'TestType', description: 'Test token' }]
          }
        ],
        types: [{ className: 'TestType', highlightColor: '#ff0000', parentType: 'Test', fontWeight: 'bold' }]
      }

      const customManager = new ConfigManager(customConfig)
      expect(customManager.getRawConfig().version).toBe('2.0.0')
      expect(customManager.getRawConfig().highlightingRules.length).toBe(1)
    })
  })

  describe('getOperatorKeywords', () => {
    it('should return all operator keywords', () => {
      const operators = configManager.getOperatorKeywords()
      expect(operators).toBeInstanceOf(Array)
      expect(operators.length).toBeGreaterThan(0)
      expect(operators).toContain('and')
      expect(operators).toContain('or')
      expect(operators).toContain('eq')
    })

    it('should only return keywords with Operator parent type', () => {
      const operators = configManager.getOperatorKeywords()
      operators.forEach(keyword => {
        const token = configManager.getTokenInfo(keyword)
        expect(token).toBeDefined()
        const type = configManager.getTypeStyle(token!.type)
        expect(type?.parentType).toBe('Operator')
      })
    })
  })

  describe('getFunctionKeywords', () => {
    it('should return all function keywords', () => {
      const functions = configManager.getFunctionKeywords()
      expect(functions).toBeInstanceOf(Array)
      expect(functions.length).toBeGreaterThan(0)
      expect(functions).toContain('contains')
      expect(functions).toContain('startswith')
    })

    it('should only return keywords with Function parent type', () => {
      const functions = configManager.getFunctionKeywords()
      functions.forEach(keyword => {
        const token = configManager.getTokenInfo(keyword)
        expect(token).toBeDefined()
        const type = configManager.getTypeStyle(token!.type)
        expect(type?.parentType).toBe('Function')
      })
    })
  })

  describe('getCustomTokenKeywords', () => {
    it('should return all custom token keywords', () => {
      const customTokens = configManager.getCustomTokenKeywords()
      expect(customTokens).toBeInstanceOf(Array)
      expect(customTokens).toContain('@this_month')
      expect(customTokens).toContain('CurrentUserId')
    })
  })

  describe('getBooleanLiteralKeywords', () => {
    it('should return all boolean literal keywords', () => {
      const booleans = configManager.getBooleanLiteralKeywords()
      expect(booleans).toBeInstanceOf(Array)
      expect(booleans).toContain('true')
      expect(booleans).toContain('false')
    })
  })

  describe('getTokenInfo', () => {
    it('should return token info for valid keyword', () => {
      const token = configManager.getTokenInfo('and')
      expect(token).toBeDefined()
      expect(token?.keyword).toBe('and')
      expect(token?.type).toBe('LogicalOperator')
    })

    it('should be case insensitive', () => {
      const token = configManager.getTokenInfo('AND')
      expect(token).toBeDefined()
      expect(token?.keyword).toBe('and')
    })

    it('should return undefined for unknown keyword', () => {
      const token = configManager.getTokenInfo('unknown')
      expect(token).toBeUndefined()
    })
  })

  describe('hasKeyword', () => {
    it('should return true for known keywords', () => {
      expect(configManager.hasKeyword('and')).toBe(true)
      expect(configManager.hasKeyword('contains')).toBe(true)
    })

    it('should return false for unknown keywords', () => {
      expect(configManager.hasKeyword('unknown')).toBe(false)
    })

    it('should be case insensitive', () => {
      expect(configManager.hasKeyword('AND')).toBe(true)
      expect(configManager.hasKeyword('Contains')).toBe(true)
    })
  })

  describe('generateCSS', () => {
    it('should generate CSS from configuration', () => {
      const css = configManager.generateCSS()
      expect(css).toBeTruthy()
      expect(css).toContain('.rcse-')
      expect(css).toContain('color:')
      expect(css).toContain('font-weight:')
    })

    it('should not duplicate classes for same parent type', () => {
      const css = configManager.generateCSS()
      const operatorMatches = css.match(/\.rcse-operator/g)
      // Should only appear once despite having multiple operator types
      expect(operatorMatches?.length).toBe(1)
    })
  })

  describe('validateConfig', () => {
    it('should validate correct config', () => {
      const validConfig: SyntaxConfig = {
        version: '1.0.0',
        highlightingRules: [
          {
            name: 'Test',
            matchType: 'keyword',
            tokens: [{ keyword: 'test', type: 'TestType', description: 'Test' }]
          }
        ],
        types: [{ className: 'TestType', highlightColor: '#fff', parentType: 'Test', fontWeight: 'normal' }]
      }

      expect(() => ConfigManager.validateConfig(validConfig)).not.toThrow()
    })

    it('should throw for missing required keys', () => {
      const invalidConfig = {
        version: '1.0.0'
      } as SyntaxConfig

      expect(() => ConfigManager.validateConfig(invalidConfig)).toThrow('Missing required key')
    })

    it('should throw for invalid highlightingRules', () => {
      const invalidConfig = {
        version: '1.0.0',
        highlightingRules: 'not an array',
        types: []
      } as unknown as SyntaxConfig

      expect(() => ConfigManager.validateConfig(invalidConfig)).toThrow('must be an array')
    })
  })

  describe('fromJSON', () => {
    it('should create ConfigManager from JSON string', () => {
      const jsonConfig = JSON.stringify({
        version: '1.0.0',
        highlightingRules: [
          {
            name: 'Test',
            matchType: 'keyword',
            tokens: [{ keyword: 'test', type: 'TestType', description: 'Test' }]
          }
        ],
        types: [{ className: 'TestType', highlightColor: '#fff', parentType: 'Test', fontWeight: 'normal' }]
      })

      const manager = ConfigManager.fromJSON(jsonConfig)
      expect(manager).toBeInstanceOf(ConfigManager)
      expect(manager.getRawConfig().version).toBe('1.0.0')
    })
  })
})

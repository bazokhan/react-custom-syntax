/**
 * Configuration Manager
 * Manages syntax token configuration and provides a clean interface for the syntax highlighter
 * Can be extended to load configurations from different sources (JSON file, API, etc.)
 */

import type { SyntaxConfig, TokenDefinition, TypeStyle, HighlightingRule } from '../types'

export class ConfigManager {
  private config: SyntaxConfig
  private tokensByKeyword: Map<string, TokenDefinition>
  private tokensByType: Map<string, TokenDefinition[]>
  private typesByClassName: Map<string, TypeStyle>

  constructor(config?: SyntaxConfig) {
    if (config) {
      this.config = config
    } else {
      // Default: empty config (must be provided by user)
      this.config = {
        version: '1.0.0',
        highlightingRules: [],
        types: []
      }
    }

    this.tokensByKeyword = new Map()
    this.tokensByType = new Map()
    this.typesByClassName = new Map()

    this._buildLookupMaps()
  }

  /**
   * Build efficient lookup maps from the configuration
   */
  private _buildLookupMaps(): void {
    this.tokensByKeyword.clear()
    this.tokensByType.clear()
    this.typesByClassName.clear()

    // Build token maps from all highlighting rules
    if (this.config.highlightingRules) {
      this.config.highlightingRules.forEach(rule => {
        if (rule.tokens) {
          rule.tokens.forEach(token => {
            this.tokensByKeyword.set(token.keyword.toLowerCase(), token)

            if (!this.tokensByType.has(token.type)) {
              this.tokensByType.set(token.type, [])
            }
            this.tokensByType.get(token.type)!.push(token)
          })
        }
      })
    }

    // Build type maps
    this.config.types.forEach(type => {
      this.typesByClassName.set(type.className, type)
    })
  }

  /**
   * Get all operator keywords
   */
  getOperatorKeywords(): string[] {
    const operators: string[] = []
    this.tokensByKeyword.forEach(token => {
      const typeInfo = this.typesByClassName.get(token.type)
      if (typeInfo && typeInfo.parentType === 'Operator') {
        operators.push(token.keyword)
      }
    })
    return operators
  }

  /**
   * Get all function keywords
   */
  getFunctionKeywords(): string[] {
    const functions: string[] = []
    this.tokensByKeyword.forEach(token => {
      const typeInfo = this.typesByClassName.get(token.type)
      if (typeInfo && typeInfo.parentType === 'Function') {
        functions.push(token.keyword)
      }
    })
    return functions
  }

  /**
   * Get all custom token keywords
   */
  getCustomTokenKeywords(): string[] {
    const tokens = this.tokensByType.get('CustomToken') || []
    return tokens.map(t => t.keyword)
  }

  /**
   * Get all boolean literal keywords
   */
  getBooleanLiteralKeywords(): string[] {
    const literals = this.tokensByType.get('BooleanLiteral') || []
    return literals.map(t => t.keyword)
  }

  /**
   * Get token information by keyword
   */
  getTokenInfo(keyword: string): TokenDefinition | undefined {
    return this.tokensByKeyword.get(keyword.toLowerCase())
  }

  /**
   * Get type styling information by className
   */
  getTypeStyle(className: string): TypeStyle | undefined {
    return this.typesByClassName.get(className)
  }

  /**
   * Get all tokens of a specific type
   */
  getTokensByType(type: string): TokenDefinition[] {
    return this.tokensByType.get(type) || []
  }

  /**
   * Get all types of a specific parent type
   */
  getTypesByParent(parentType: string): TypeStyle[] {
    return this.config.types.filter(type => type.parentType === parentType)
  }

  /**
   * Check if a keyword exists in the configuration
   */
  hasKeyword(keyword: string): boolean {
    return this.tokensByKeyword.has(keyword.toLowerCase())
  }

  /**
   * Get the CSS class name for a token
   */
  getTokenClassName(keyword: string): string | null {
    const token = this.getTokenInfo(keyword)
    if (!token) return null

    const type = this.getTypeStyle(token.type)
    return type ? `rcse-${this._camelToKebab(type.className)}` : null
  }

  /**
   * Get the description/tooltip for a token
   */
  getTokenDescription(keyword: string): string | null {
    const token = this.getTokenInfo(keyword)
    return token ? token.description : null
  }

  /**
   * Generate CSS styles from the configuration
   */
  generateCSS(): string {
    let css = '/* Auto-generated from syntax configuration */\n\n'
    const generatedClasses = new Set<string>()

    // First pass: generate specific classes based on className
    this.config.types.forEach(type => {
      const specificClassName = `rcse-${this._camelToKebab(type.className)}`

      if (!generatedClasses.has(specificClassName)) {
        css += `.${specificClassName} {\n`
        css += `  color: ${type.highlightColor};\n`
        if (type.fontWeight) css += `  font-weight: ${type.fontWeight};\n`
        if (type.fontStyle) css += `  font-style: ${type.fontStyle};\n`
        css += `}\n\n`
        generatedClasses.add(specificClassName)
      }
    })

    // Second pass: generate parent type classes
    // Group by parentType and use the first color encountered
    const parentTypeStyles = new Map<string, { color: string; fontWeight?: string | number; fontStyle?: string }>()

    this.config.types.forEach(type => {
      if (!parentTypeStyles.has(type.parentType)) {
        parentTypeStyles.set(type.parentType, {
          color: type.highlightColor,
          fontWeight: type.fontWeight,
          fontStyle: type.fontStyle
        })
      }
    })

    parentTypeStyles.forEach((style, parentType) => {
      const parentClassName = `rcse-${this._camelToKebab(parentType.toLowerCase())}`

      if (!generatedClasses.has(parentClassName)) {
        css += `.${parentClassName} {\n`
        css += `  color: ${style.color};\n`
        if (style.fontWeight !== undefined) css += `  font-weight: ${style.fontWeight};\n`
        if (style.fontStyle) css += `  font-style: ${style.fontStyle};\n`
        css += `}\n\n`
        generatedClasses.add(parentClassName)
      }
    })

    return css
  }

  /**
   * Get all keyword groups organized by parent type
   */
  getKeywordGroups(): Record<string, { keywords: string[]; style: { color: string; fontWeight: string | number } }> {
    const groups: Record<string, { keywords: string[]; style: { color: string; fontWeight: string | number } }> = {}

    this.config.types.forEach(type => {
      if (!groups[type.parentType]) {
        groups[type.parentType] = {
          keywords: [],
          style: {
            color: type.highlightColor,
            fontWeight: type.fontWeight || 'normal'
          }
        }
      }

      const tokens = this.getTokensByType(type.className)
      groups[type.parentType].keywords.push(...tokens.map(t => t.keyword))
    })

    return groups
  }

  /**
   * Get configuration metadata
   */
  getMetadata(): Record<string, unknown> {
    return this.config.metadata || {}
  }

  /**
   * Get the raw configuration object
   */
  getRawConfig(): SyntaxConfig {
    return this.config
  }

  /**
   * Get all highlighting rules from configuration
   */
  getHighlightingRules(): HighlightingRule[] {
    return this.config.highlightingRules || []
  }

  /**
   * Helper: Convert camelCase to kebab-case
   */
  private _camelToKebab(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  }

  /**
   * Validate configuration structure
   */
  static validateConfig(config: SyntaxConfig): boolean {
    const requiredKeys = ['version', 'highlightingRules', 'types']

    // Check top-level structure
    for (const key of requiredKeys) {
      if (!(key in config)) {
        throw new Error(`Missing required key: ${key}`)
      }
    }

    // Validate highlighting rules array
    if (!Array.isArray(config.highlightingRules)) {
      throw new Error('highlightingRules must be an array')
    }

    for (const rule of config.highlightingRules) {
      if (!rule.name || !rule.matchType) {
        throw new Error('Each rule must have name and matchType')
      }

      if (rule.matchType === 'keyword') {
        if (!Array.isArray(rule.tokens)) {
          throw new Error('Keyword rules must have a tokens array')
        }
        for (const token of rule.tokens) {
          if (!token.keyword || !token.type) {
            throw new Error('Each token must have keyword and type')
          }
        }
      } else if (rule.matchType === 'regex') {
        if (!rule.pattern) {
          throw new Error('Regex rules must have a pattern')
        }
      }
    }

    // Validate types array
    if (!Array.isArray(config.types)) {
      throw new Error('Types must be an array')
    }

    for (const type of config.types) {
      if (!type.className || !type.highlightColor || !type.parentType) {
        throw new Error('Each type must have className, highlightColor, and parentType')
      }
    }

    return true
  }

  /**
   * Create a configuration manager from a JSON string
   */
  static fromJSON(jsonString: string): ConfigManager {
    const config = JSON.parse(jsonString) as SyntaxConfig
    ConfigManager.validateConfig(config)
    return new ConfigManager(config)
  }

  /**
   * Create a configuration manager from a URL
   */
  static async fromURL(url: string): Promise<ConfigManager> {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch configuration from ${url}`)
    }
    const config = (await response.json()) as SyntaxConfig
    ConfigManager.validateConfig(config)
    return new ConfigManager(config)
  }
}

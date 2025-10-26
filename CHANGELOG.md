# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-XX-XX

### Added
- Initial release of react-custom-syntax
- Core components:
  - `CustomSyntaxEditor` - Main editor component
  - `ConfigManager` - Configuration management
  - `SyntaxHighlighter` - Rule-based syntax highlighting
  - `Prettifier` - Query prettification and formatting
  - `IdentifierExtractor` - Extract field identifiers from queries
- Plugin system:
  - `ValidatorPlugin` - Example validation plugin
- Built-in OData syntax configuration
- Full TypeScript support with type definitions
- Comprehensive test suite with >90% coverage
- CSS modules for styling with CSS variables for theming
- Customization options:
  - Custom class names and styles
  - Configurable header, buttons, and links
  - Custom notification handlers
  - Disable style injection option
- Documentation:
  - Comprehensive README with examples
  - API reference
  - Configuration schema documentation

### Features
- Rule-based syntax highlighting driven by JSON configuration
- Support for both keyword and regex-based matching
- Prettification with configurable line length
- Copy to clipboard functionality
- Read-only/disabled mode
- Accessible and keyboard-friendly
- Zero runtime dependencies (React as peer dependency)
- Support for React 18 and React 19
- Small bundle size (<50KB)

### Developer Experience
- TypeScript-first development
- Vitest for fast unit testing
- Vite for modern build tooling
- ESM and CommonJS output formats
- Source maps for debugging
- Full IDE autocomplete support


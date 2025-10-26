<!-- f7276ec8-a8ab-4327-8934-1cc01add4c73 6a34e04e-7774-46f1-a736-63031301bae2 -->
# Create react-custom-syntax npm library

## Phase 1: Project Setup & Configuration

### 1.1 Initialize npm package structure

- Create `package.json` with proper metadata (react-custom-syntax, version 1.0.0)
- Set up TypeScript configuration (`tsconfig.json`) for library builds
- Configure Vite for library mode with proper entry points and externals
- Add test configuration (Vitest for unit tests)
- Create `.gitignore`, `.npmignore` for clean publishing

### 1.2 Dependencies

- **Peer dependencies**: `react` (^18.0.0 || ^19.0.0), `react-dom` (^18.0.0 || ^19.0.0) - supports both React 18 and 19 for maximum compatibility
- **Dev dependencies**: `typescript`, `vite`, `vitest`, `@types/react`, `@types/react-dom`, `@testing-library/react`, `@testing-library/jest-dom`
- **NO runtime dependencies** - keep it lightweight

## Phase 2: Core Library Migration (TypeScript)

### 2.1 Create type definitions

- `src/types/index.ts` - Core interfaces:
  - `HighlightingRule` (keyword/regex rules)
  - `TokenDefinition` (keyword, type, description)
  - `TypeStyle` (className, color, fontWeight, parentType)
  - `SyntaxConfig` (version, rules, types, metadata)
  - `ConfigManagerOptions`, `HighlighterOptions`, `PrettifierOptions`
  - `CustomSyntaxEditorProps` (value, onChange, config, styles, classNames, refs, etc.)

### 2.2 Rename & convert core classes

- `ODataConfigManager.js` → `src/core/ConfigManager.ts`
- `ODataSyntaxHighlighter.js` → `src/core/SyntaxHighlighter.ts`
- `ODataPrettifier.js` → `src/core/Prettifier.ts`
- `ODataIdentifierExtractor.js` → `src/core/IdentifierExtractor.ts`
- Replace all `odata-` CSS classes with `rcse-`
- Add proper TypeScript types to all methods and properties
- Keep all existing logic intact, just genericize naming

### 2.3 Component migration

- `index.jsx` → `src/CustomSyntaxEditor.tsx` (main component)
- `CodeEditor.jsx` → `src/components/CodeEditor.tsx`
- `EditorHeader.jsx` → `src/components/EditorHeader.tsx`
- `EditorContent.jsx` → `src/components/EditorContent.tsx`
- `useEditorActions.js` → `src/hooks/useEditorActions.ts`
- Add props for customization: `className`, `style`, `headerLabel`, `headerLinks`, `showHeader`, `showButtons`, `placeholder`, etc.
- Make header optional/configurable
- Remove hardcoded "OData" references

### 2.4 Styling approach

- Convert `CodeEditor.module.scss` → `src/styles/CustomSyntaxEditor.module.css`
- Use CSS modules with `rcse-` prefix
- Export default styles but allow full override via props
- Support: `className`, `style`, `containerClassName`, `editorClassName`, etc.
- Make all colors/sizes CSS variables for easy theming

## Phase 3: Plugin System (TypeScript)

### 3.1 Create plugin interface

- `src/plugins/types.ts` - Define `Plugin` interface
- `src/plugins/index.ts` - Export plugin utilities
- Convert `QueueColumnValidatorPlugin.js` → `src/plugins/ValidatorPlugin.ts` (as example)

## Phase 4: Configuration & Presets

### 4.1 Config files

- `src/configs/odata.json` - OData syntax config (migrated from odataTokens.json)
- `src/configs/types.ts` - Type-safe config builders
- Document JSON schema for custom language configs

## Phase 5: Test Suite (TypeScript + Vitest)

### 5.1 Migrate existing tests

- `ConfigManager.test.ts` (from ODataConfigManager.test.js)
- `SyntaxHighlighter.test.ts` (from ODataSyntaxHighlighter.test.js)
- `Prettifier.test.ts` (from ODataPrettifier.test.js)
- `IdentifierExtractor.test.ts` (from ODataIdentifierExtractor.test.js)
- `ValidatorPlugin.test.ts` (from QueueColumnValidatorPlugin.test.js)

### 5.2 Add new component tests

- `CustomSyntaxEditor.test.tsx` - Full component integration tests
- `EditorHeader.test.tsx` - Header interactions
- `EditorContent.test.tsx` - Content editing, highlighting
- `useEditorActions.test.ts` - Hook behavior

### 5.3 Add integration tests

- Test with custom configs
- Test styling customization
- Test accessibility
- Test keyboard interactions
- Aim for >90% coverage

## Phase 6: Build Configuration

### 6.1 Vite library mode setup

- Entry: `src/index.ts` (exports all public APIs)
- Formats: ESM and CommonJS
- External: react, react-dom
- Generate TypeScript declarations
- Minification enabled
- Source maps for debugging

### 6.2 Export structure

```typescript
// Main exports
export { CustomSyntaxEditor } from './CustomSyntaxEditor'
export { ConfigManager } from './core/ConfigManager'
export { SyntaxHighlighter } from './core/SyntaxHighlighter'
export { Prettifier } from './core/Prettifier'
export { IdentifierExtractor } from './core/IdentifierExtractor'

// Types
export type * from './types'

// Configs
export { odataConfig } from './configs/odata.json'
```

## Phase 7: Documentation

### 7.1 README.md

- Installation instructions
- Quick start example
- API reference
- Custom configuration guide
- Styling customization guide
- Creating custom language configs
- Plugin development guide
- Examples for common use cases

### 7.2 Additional docs

- `CHANGELOG.md` - Version history template
- `LICENSE` - MIT license
- `examples/` folder with demo apps:
  - OData query editor
  - Custom JSON syntax
  - SQL-like syntax

## Phase 8: Package Validation

### 8.1 Build and test

- Run `npm run build` - verify outputs
- Run `npm run test` - all tests pass
- Check bundle size (should be <50KB)
- Test exports work correctly
- Verify TypeScript types are exported

### 8.2 Local testing

- Use `npm link` to test in CourierWeb
- Ensure drop-in replacement works
- Verify no breaking changes to existing functionality

## Key Files to Create

- `ReactCustomSyntax/package.json`
- `ReactCustomSyntax/tsconfig.json`
- `ReactCustomSyntax/vite.config.ts`
- `ReactCustomSyntax/vitest.config.ts`
- `ReactCustomSyntax/src/index.ts`
- `ReactCustomSyntax/src/types/index.ts`
- `ReactCustomSyntax/src/CustomSyntaxEditor.tsx`
- `ReactCustomSyntax/README.md`
- All migrated source files in TypeScript
- All test files with full coverage

### To-dos

- [ ] Initialize npm package with package.json, tsconfig, vite config, and vitest config
- [ ] Define TypeScript interfaces and types for all core functionality
- [ ] Convert and rename core classes (ConfigManager, SyntaxHighlighter, Prettifier, IdentifierExtractor) to TypeScript with rcse prefix
- [ ] Convert React components to TypeScript with customization props (CustomSyntaxEditor, CodeEditor, EditorHeader, EditorContent, hooks)
- [ ] Convert SCSS to CSS modules with rcse prefix and CSS variables for theming
- [ ] Create plugin system types and convert example plugin to TypeScript
- [ ] Create config presets (odata.json) and type-safe config builders
- [ ] Convert all existing tests to TypeScript and Vitest
- [ ] Add component tests, integration tests, and achieve >90% coverage
- [ ] Configure Vite library mode with proper exports and type declarations
- [ ] Create comprehensive README with examples, API docs, and usage guides
- [ ] Build, test, verify bundle size, and ensure all exports work correctly
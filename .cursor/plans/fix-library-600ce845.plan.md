<!-- 600ce845-da4e-4c16-b0aa-259c23ac048d 3d798407-6f53-4d6b-96b5-9776fdbe28da -->
# Fix react-custom-syntax Library Issues

## 1. Redesign Plugin System (Generic & Extensible)

**Problem**: Current `ValidatorPlugin` contains business-specific logic (billingStatus, column validation) that doesn't belong in a generic library.

**Solution**: Create a proper plugin interface with lifecycle hooks:

### New Plugin Interface (`src/plugins/types.ts`):

```typescript
export interface Plugin {
  name: string;
  version?: string;
  
  // Lifecycle hooks
  beforeHighlight?: (text: string) => string;
  afterHighlight?: (highlightedHtml: string, originalText: string, tokens?: string[]) => string;
  beforePrettify?: (text: string) => string;
  afterPrettify?: (prettifiedText: string, originalText: string) => string;
  
  // Event emitter support
  on?: (event: string, callback: (...args: any[]) => void) => void;
  emit?: (event: string, ...args: any[]) => void;
}
```

### Remove Business Logic:

- Delete `ValidatorPlugin.ts` and its test completely
- Remove `ColumnDefinition` type from `src/types/index.ts`
- Update exports in `src/plugins/index.ts` and `src/index.ts`

### Update Core Classes to Support Plugins:

- `SyntaxHighlighter`: Add `beforeHighlight` and `afterHighlight` hooks
- `Prettifier`: Add `beforePrettify` and `afterPrettify` hooks
- `ConfigManager`: Add plugin registration methods

### Documentation Updates:

- Update README plugin section with generic examples
- Show how to create custom validation plugin in consuming app
- Add examples: logging plugin, metrics plugin, custom transformation plugin

## 2. Fix Type Errors

### CSS Module Types:

- Create `src/styles/CustomSyntaxEditor.module.css.d.ts` with type declarations
- Ensures TypeScript recognizes CSS module imports

### Unused Props in CustomSyntaxEditor:

- Pass `notificationHandler`, `disableStyleInjection`, `styleElementId` to `CodeEditor`
- `CodeEditor` should pass them to `useEditorActions` hook

### Test Setup Types:

- Import `vi` from 'vitest' in `src/test/setup.ts`
- Fix duplicate property names in mock objects

## 3. Fix Documentation - CSS Module Imports

**Current Issue**: README says `import 'react-custom-syntax/styles'` but uses CSS modules.

**Fix**:

- CSS modules are scoped to components, no global import needed
- Remove the import line from Quick Start example
- Add note: "Styles are automatically included via CSS modules. No separate import required."
- Keep the CSS variables section for theming customization

## 4. Remove OData Default

**Current Issue**: `CustomSyntaxEditor` creates empty `ConfigManager()` if none provided, which defaults to OData.

**Fix in `src/CustomSyntaxEditor.tsx`**:

```typescript
const config = useMemo(() => {
  if (!configManager) {
    // Return a minimal empty config manager
    return new ConfigManager({
      version: '1.0.0',
      highlightingRules: [],
      types: []
    });
  }
  return configManager;
}, [configManager]);
```

**Alternative**: Show warning message if no config provided:

```tsx
if (!configManager) {
  return <div>No configuration provided. Please pass a configManager prop.</div>;
}
```

**Question for user**: Which approach? Empty config (no highlighting) or warning message?

## 5. Change Author from Atomica to Mohamed Elbaz

Update all references:

- `package.json`: `"author": "Mohamed Elbaz"`
- `LICENSE`: Copyright holder to Mohamed Elbaz
- `README.md`: Remove "MIT © Atomica Team", change to "MIT © Mohamed Elbaz"
- `README.md`: Remove Acknowledgments section mentioning Atomica CourierWeb
- `CHANGELOG.md`: Remove any Atomica references

## 6. Replace Deprecated document.execCommand

**Current Usage** in `src/components/EditorContent.tsx`:

- Line 27: `document.execCommand('insertText', false, text)` for paste
- Line 33: `document.execCommand('insertText', false, '  ')` for tab

**Modern Replacement**:

```typescript
// For paste
const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
  e.preventDefault();
  const text = e.clipboardData.getData('text/plain');
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
    range.collapse(false);
  }
};

// For tab
const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode('  '));
      range.collapse(false);
    }
  }
};
```

**Update test mock** in `src/test/setup.ts`: Remove execCommand mock (no longer needed)

## 7. Add Client Component Markers for Next.js

Add `'use client'` directive to all component files:

- `src/CustomSyntaxEditor.tsx`
- `src/components/CodeEditor.tsx`
- `src/components/EditorHeader.tsx`
- `src/components/EditorContent.tsx`
- `src/hooks/useEditorActions.ts`

Add note in README:

```markdown
## Next.js Compatibility

This library uses client-side features (contentEditable, clipboard API). All components are marked with `'use client'` directive and will work seamlessly in Next.js App Router.
```

## 8. Fix Failing Test

**Issue**: `useEditorActions.test.ts` - "should handle copy with navigator.clipboard"

The test calls `await result.current.handleCopy()` but `handleCopy` doesn't return a promise.

**Fix in `src/hooks/useEditorActions.test.ts`**:

```typescript
it('should handle copy with navigator.clipboard', async () => {
  // ... setup ...
  
  result.current.handleCopy();
  
  // Wait for promise to resolve
  await vi.waitFor(() => {
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test value');
    expect(mockNotificationHandler.success).toHaveBeenCalledWith(
      'Copied to clipboard!'
    );
  });
});
```

Or make `handleCopy` async and return the promise for better testing.

## 9. Document Coverage Reporting

Add to README:

```markdown
## Development

### Running Tests
\`\`\`bash
npm run test          # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
\`\`\`

Coverage reports are generated in:
- Terminal: Text summary
- `coverage/index.html`: Interactive HTML report (open in browser)
- `coverage/coverage-final.json`: JSON data
```

## Files to Modify

1. `src/plugins/types.ts` - New plugin interface
2. `src/plugins/ValidatorPlugin.ts` - DELETE
3. `src/plugins/ValidatorPlugin.test.ts` - DELETE
4. `src/plugins/index.ts` - Update exports
5. `src/core/SyntaxHighlighter.ts` - Add plugin hooks
6. `src/core/Prettifier.ts` - Add plugin hooks
7. `src/core/ConfigManager.ts` - Add plugin registration
8. `src/types/index.ts` - Remove ColumnDefinition, update Plugin
9. `src/index.ts` - Remove ValidatorPlugin export
10. `src/CustomSyntaxEditor.tsx` - Fix default config, pass props, add 'use client'
11. `src/components/CodeEditor.tsx` - Add 'use client'
12. `src/components/EditorHeader.tsx` - Add 'use client'
13. `src/components/EditorContent.tsx` - Replace execCommand, add 'use client'
14. `src/hooks/useEditorActions.ts` - Add 'use client'
15. `src/hooks/useEditorActions.test.ts` - Fix async test
16. `src/test/setup.ts` - Import vi, remove execCommand mock
17. `src/styles/CustomSyntaxEditor.module.css.d.ts` - CREATE for types
18. `package.json` - Change author
19. `LICENSE` - Change copyright holder
20. `README.md` - Update plugin docs, CSS import, author, add Next.js note, add coverage docs
21. `CHANGELOG.md` - Remove Atomica references

### To-dos

- [ ] Redesign plugin system with generic lifecycle hooks (beforeHighlight, afterHighlight, beforePrettify, afterPrettify) and remove business-specific ValidatorPlugin
- [ ] Fix all TypeScript errors: CSS module types, unused props, test setup imports
- [ ] Update README to clarify CSS modules don't require global import
- [ ] Remove OData default when no config provided - use empty config or show warning
- [ ] Change author from Atomica to Mohamed Elbaz across all files
- [ ] Replace deprecated document.execCommand with modern Selection API
- [ ] Add 'use client' directive to all component files for Next.js compatibility
- [ ] Fix failing clipboard test in useEditorActions.test.ts
- [ ] Document how to run and view coverage reports in README
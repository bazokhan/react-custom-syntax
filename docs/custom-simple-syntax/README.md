# Custom Simple Syntax Example

This example demonstrates how to create a custom language configuration with minimal syntax rules.

## What This Example Shows

- ✅ Defining custom syntax on the fly
- ✅ Minimal syntax with just 2 keywords (IMPORTANT and ACTION)
- ✅ Custom highlighting colors
- ✅ How to create your own language configuration

## Running This Example

```bash
# From repository root
npm run build

# From examples directory
npm install
npm run dev
```

## Configuration

```tsx
const customConfig = {
  version: '1.0.0',
  highlightingRules: [
    {
      name: 'Keywords',
      matchType: 'keyword',
      caseSensitive: false,
      tokens: [
        { keyword: 'IMPORTANT', type: 'KeywordImportant' },
        { keyword: 'ACTION', type: 'KeywordAction' }
      ]
    }
  ],
  types: [
    { className: 'KeywordImportant', highlightColor: '#f48771' },
    { className: 'KeywordAction', highlightColor: '#4ec9b0' }
  ]
};

const configManager = new ConfigManager(customConfig);
```

## Try It

Type "IMPORTANT" or "ACTION" in the editor to see them highlighted in different colors!


# react-custom-syntax

[![npm version](https://img.shields.io/npm/v/react-custom-syntax.svg)](https://www.npmjs.com/package/react-custom-syntax)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/bazokhan/react-custom-syntax)](https://github.com/bazokhan/react-custom-syntax/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/bazokhan/react-custom-syntax)](https://github.com/bazokhan/react-custom-syntax/network)
[![GitHub issues](https://img.shields.io/github/issues/bazokhan/react-custom-syntax)](https://github.com/bazokhan/react-custom-syntax/issues)
[![GitHub Release Date](https://img.shields.io/github/release-date/bazokhan/react-custom-syntax)](https://github.com/bazokhan/react-custom-syntax/releases)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/bazokhan/react-custom-syntax)](https://github.com/bazokhan/react-custom-syntax)
[![Release Code Quality](https://github.com/bazokhan/react-custom-syntax/actions/workflows/release.yml/badge.svg)](https://github.com/bazokhan/react-custom-syntax/actions/workflows/release.yml)
[![Beta Code Quality](https://github.com/bazokhan/react-custom-syntax/actions/workflows/release.yml/badge.svg?branch=staging)](https://github.com/bazokhan/react-custom-syntax/actions/workflows/release.yml)

A lightweight, customizable React syntax editor with rule-based highlighting, prettification, and plugin support. Define
any custom language syntax using JSON configuration.

## Features

- 🎨 **Rule-Based Syntax Highlighting** - Define highlighting rules via JSON configuration
- 🔧 **Fully Customizable** - Control styles, colors, classNames, and behavior
- 📦 **Lightweight** - Zero runtime dependencies (React as peer dependency)
- 🔌 **Plugin System** - Extend functionality with custom plugins
- 💅 **Themeable** - CSS variables for easy theming
- 📝 **TypeScript Support** - Full type definitions included
- ✨ **Built-in Prettifier** - Format queries with proper indentation
- 🎯 **OData Config Included** - Ready-to-use OData syntax configuration

## Installation

```bash
npm install react-custom-syntax
# or
yarn add react-custom-syntax
# or
pnpm add react-custom-syntax
```

## Quick Start

```tsx
import { useState } from 'react'
import { CustomSyntaxEditor, ConfigManager, odataConfig } from 'react-custom-syntax'

function App() {
  const [value, setValue] = useState('')
  const configManager = new ConfigManager(odataConfig)

  const handleChange = e => {
    setValue(e.target.value)
  }

  return (
    <CustomSyntaxEditor
      value={value}
      onChange={handleChange}
      configManager={configManager}
      headerLabel="OData Query Editor"
    />
  )
}
```

> **Note**: Styles are automatically included via CSS modules. No separate import required. CSS variables are available
> for theming customization.

## Custom Language Configuration

Define your own syntax by creating a JSON configuration:

```json
{
  "version": "1.0.0",
  "description": "Custom SQL-like syntax",
  "highlightingRules": [
    {
      "name": "Keywords",
      "matchType": "keyword",
      "caseSensitive": false,
      "addWordBoundaries": true,
      "tokens": [
        {
          "keyword": "SELECT",
          "type": "SqlKeyword",
          "description": "Select statement"
        },
        {
          "keyword": "FROM",
          "type": "SqlKeyword",
          "description": "From clause"
        }
      ]
    },
    {
      "name": "Strings",
      "matchType": "regex",
      "pattern": "'([^']*)'",
      "replacement": "<span class='rcse-literal'>'$1'</span>",
      "type": "StringLiteral"
    }
  ],
  "types": [
    {
      "className": "SqlKeyword",
      "highlightColor": "#569cd6",
      "parentType": "Keyword",
      "fontWeight": "600"
    },
    {
      "className": "StringLiteral",
      "highlightColor": "#ce9178",
      "parentType": "Literal",
      "fontWeight": "normal"
    }
  ]
}
```

Then use it:

```tsx
import customConfig from './customSyntax.json'

const configManager = new ConfigManager(customConfig)

;<CustomSyntaxEditor value={value} onChange={handleChange} configManager={configManager} />
```

## API Reference

### CustomSyntaxEditor Props

| Prop                    | Type                  | Default                 | Description                  |
| ----------------------- | --------------------- | ----------------------- | ---------------------------- |
| `value`                 | `string`              | Required                | Current editor value         |
| `onChange`              | `(event) => void`     | Required                | Change handler               |
| `configManager`         | `ConfigManager`       | `undefined`             | Custom configuration manager |
| `disabled`              | `boolean`             | `false`                 | Disable the editor           |
| `showHeader`            | `boolean`             | `true`                  | Show/hide header             |
| `headerLabel`           | `string`              | `'Syntax Editor'`       | Header label text            |
| `headerLinks`           | `HeaderLink[]`        | `[]`                    | Documentation links          |
| `showCopyButton`        | `boolean`             | `true`                  | Show copy button             |
| `showPrettifyButton`    | `boolean`             | `true`                  | Show prettify button         |
| `copyButtonLabel`       | `string`              | `'Copy'`                | Copy button label            |
| `prettifyButtonLabel`   | `string`              | `'Prettify'`            | Prettify button label        |
| `placeholder`           | `string`              | `'Enter your query...'` | Placeholder text             |
| `className`             | `string`              | `undefined`             | Custom container class       |
| `style`                 | `CSSProperties`       | `undefined`             | Inline styles                |
| `classNames`            | `CustomClassNames`    | `{}`                    | Custom class names           |
| `styles`                | `CustomStyles`        | `{}`                    | Custom inline styles         |
| `onCopy`                | `(value) => void`     | `undefined`             | Custom copy handler          |
| `onPrettify`            | `(value) => void`     | `undefined`             | Custom prettify handler      |
| `notificationHandler`   | `NotificationHandler` | `undefined`             | Custom notifications         |
| `disableStyleInjection` | `boolean`             | `false`                 | Disable CSS injection        |

### Core Classes

#### ConfigManager

```tsx
import { ConfigManager } from 'react-custom-syntax'

const config = new ConfigManager(syntaxConfig)

// Get keywords by type
config.getOperatorKeywords()
config.getFunctionKeywords()
config.getCustomTokenKeywords()

// Token information
config.getTokenInfo('and')
config.hasKeyword('contains')

// Generate CSS
const css = config.generateCSS()

// Load from URL
const manager = await ConfigManager.fromURL('https://example.com/syntax.json')
```

#### SyntaxHighlighter

```tsx
import { SyntaxHighlighter } from 'react-custom-syntax'

const highlighter = new SyntaxHighlighter(configManager)
const highlighted = highlighter.highlight('status eq true')
```

#### Prettifier

```tsx
import { Prettifier } from 'react-custom-syntax'

const prettifier = new Prettifier(configManager)
const formatted = prettifier.prettify('status eq true and priority gt 5')

// Configure max line length
prettifier.setMaxLineLength(100)
```

#### IdentifierExtractor

```tsx
import { IdentifierExtractor } from 'react-custom-syntax'

const extractor = new IdentifierExtractor(configManager)
const identifiers = extractor.extract('status eq true and priority gt 5')
// Returns: ['status', 'priority']
```

### Plugins

Extend functionality with custom plugins using lifecycle hooks:

```tsx
import type { Plugin } from 'react-custom-syntax'

// Example: Logging plugin
const loggingPlugin: Plugin = {
  name: 'logging',
  beforeHighlight: text => {
    console.log('Highlighting text:', text)
    return text
  },
  afterHighlight: (highlightedHtml, originalText) => {
    console.log('Highlighted to:', highlightedHtml)
    return highlightedHtml
  },
  beforePrettify: text => {
    console.log('Prettifying text:', text)
    return text
  },
  afterPrettify: (prettifiedText, originalText) => {
    console.log('Prettified to:', prettifiedText)
    return prettifiedText
  }
}
```

See the [Plugins section](#plugins) for more details.

## Styling and Theming

### CSS Variables

Override these CSS variables to customize the theme:

```css
:root {
  --rcse-bg-primary: #1e1e1e;
  --rcse-bg-secondary: #2d2d2d;
  --rcse-border-color: #404040;
  --rcse-text-primary: #d4d4d4;
  --rcse-text-secondary: #666;
  --rcse-accent-primary: #1976d2;
  --rcse-accent-hover: #264f78;
  --rcse-font-mono: 'Consolas', 'Monaco', 'Courier New', monospace;
}
```

### Custom Class Names

```tsx
<CustomSyntaxEditor
  value={value}
  onChange={handleChange}
  classNames={{
    container: 'my-container',
    header: 'my-header',
    editor: 'my-editor'
  }}
/>
```

### Custom Inline Styles

```tsx
<CustomSyntaxEditor
  value={value}
  onChange={handleChange}
  styles={{
    container: { borderRadius: '12px' },
    editor: { fontSize: '16px' }
  }}
/>
```

## Advanced Usage

### Custom Notification Handler

```tsx
import { toast } from 'react-toastify'

const notificationHandler = {
  success: msg => toast.success(msg),
  warning: msg => toast.warning(msg),
  error: msg => toast.error(msg)
}

;<CustomSyntaxEditor value={value} onChange={handleChange} notificationHandler={notificationHandler} />
```

### Custom Copy/Prettify Handlers

```tsx
<CustomSyntaxEditor
  value={value}
  onChange={handleChange}
  onCopy={value => {
    navigator.clipboard.writeText(value)
    console.log('Copied:', value)
  }}
  onPrettify={prettified => {
    console.log('Prettified:', prettified)
  }}
/>
```

### Header Links

```tsx
<CustomSyntaxEditor
  value={value}
  onChange={handleChange}
  headerLinks={[
    {
      href: 'https://docs.example.com',
      label: 'Documentation',
      title: 'View documentation'
    }
  ]}
/>
```

## Configuration Schema

### Highlighting Rules

Two types of matching are supported:

#### 1. Keyword Matching

```json
{
  "name": "Operators",
  "matchType": "keyword",
  "caseSensitive": false,
  "addWordBoundaries": true,
  "tokens": [{ "keyword": "and", "type": "LogicalOperator", "description": "AND operator" }]
}
```

#### 2. Regex Matching

```json
{
  "name": "Strings",
  "matchType": "regex",
  "pattern": "'([^']*)'",
  "replacement": "<span class='rcse-literal'>'$1'</span>",
  "type": "StringLiteral"
}
```

### Type Styles

```json
{
  "className": "LogicalOperator",
  "highlightColor": "#569cd6",
  "parentType": "Operator",
  "fontWeight": "600"
}
```

## Examples

### Live Examples

Check out the [examples directory](./examples) for a showcase app with multiple examples:

```bash
# Build the main package
npm run build

# Navigate to examples
cd examples

# Install dependencies
npm install

# Run the showcase
npm run dev
```

The showcase includes:

- **[Basic OData Editor](./examples/basic-odata-editor/)** - Simple setup with default OData syntax
- **[Empty Config](./examples/empty-config/)** - Plain text editor without highlighting
- **[Custom Simple Syntax](./examples/custom-simple-syntax/)** - Custom language with 2 keywords

### OData Query Editor

```tsx
import { useState } from 'react'
import { CustomSyntaxEditor, ConfigManager, odataConfig } from 'react-custom-syntax'

function ODataEditor() {
  const [query, setQuery] = useState("status eq 'Active' and priority gt 5")
  const configManager = new ConfigManager(odataConfig)

  return (
    <CustomSyntaxEditor
      value={query}
      onChange={e => setQuery(e.target.value)}
      configManager={configManager}
      headerLabel="OData Query Editor"
      headerLinks={[
        {
          href: 'https://azuresearch.github.io/odata-syntax-diagram',
          label: 'OData Syntax Reference'
        }
      ]}
    />
  )
}
```

### Read-Only Display

```tsx
<CustomSyntaxEditor value={savedQuery} onChange={() => {}} disabled={true} configManager={configManager} />
```

### Minimal Editor (No Header)

```tsx
<CustomSyntaxEditor value={value} onChange={handleChange} showHeader={false} configManager={configManager} />
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Next.js Compatibility

This library uses client-side features (contentEditable, clipboard API). All components are marked with `'use client'`
directive and will work seamlessly in Next.js App Router.

```tsx
// In your Next.js app router component
'use client'

import { CustomSyntaxEditor, ConfigManager, odataConfig } from 'react-custom-syntax'

export default function Page() {
  const configManager = new ConfigManager(odataConfig)
  // ... rest of your code
}
```

## Development

### Running Tests

```bash
npm run test          # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

Coverage reports are generated in:

- Terminal: Text summary
- `coverage/index.html`: Interactive HTML report (open in browser)
- `coverage/coverage-final.json`: JSON data

## License

MIT © Mohamed Elbaz

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

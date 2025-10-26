# react-custom-syntax Examples

This directory contains a showcase app with multiple examples demonstrating how to use `react-custom-syntax` in different scenarios.

## Running the Examples

### 1. Build the Main Package

First, build the main `react-custom-syntax` package:

```bash
# From repository root
npm run build
```

### 2. Install Dependencies

```bash
# Navigate to examples directory
cd examples

# Install dependencies
npm install
```

### 3. Run the Examples

```bash
npm run dev
```

This will start a single Vite dev server at `http://localhost:5173` with all examples accessible via the sidebar navigation.

## Available Examples

### 1. Basic OData Editor ✅
**Location**: `basic-odata-editor/`

- Simple setup with OData configuration
- Syntax highlighting for OData queries
- Copy and prettify functionality
- Documentation links

### 2. Empty Config ✅
**Location**: `empty-config/`

- Plain text editor without any syntax configuration
- Demonstrates minimal setup
- Useful for general text input

### 3. Custom Simple Syntax ✅
**Location**: `custom-simple-syntax/`

- Custom language with just 2 keywords
- Define keywords on-the-fly
- Custom highlighting colors
- Minimal syntax configuration

## Project Structure

```
examples/
├── package.json              # Main site configuration
├── vite.config.ts            # Vite config for the showcase
├── index.html               # HTML entry point
├── tsconfig.json            # TypeScript config
├── src/
│   ├── App.tsx              # Main showcase app with navigation
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── basic-odata-editor/      # OData example
│   ├── component.tsx        # Example component
│   └── README.md            # Example-specific docs
├── empty-config/            # Empty config example
│   ├── component.tsx
│   └── README.md
└── custom-simple-syntax/     # Custom syntax example
    ├── component.tsx
    └── README.md
```

## Adding a New Example

1. Create a new folder in `examples/`
2. Create `component.tsx` with your example component
3. Create `README.md` with documentation
4. Update `src/App.tsx` to include your example in the `examples` array

Example:

```tsx
// src/App.tsx
import { MyNewExample } from '../my-new-example/component';

const examples: Example[] = [
  // ... existing examples
  {
    id: 'my-new-example',
    title: 'My New Example',
    description: 'What my example demonstrates',
    component: MyNewExample,
  },
];
```

## Development

All examples run in a single Vite dev server with:
- Hot module replacement
- Fast refresh
- TypeScript support
- Dark theme UI

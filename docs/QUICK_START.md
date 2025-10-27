# Quick Start: Running Examples Locally

## Step-by-Step Instructions

### 1. Build the Main Package

First, you need to build the main `react-custom-syntax` package to create the distribution files:

```bash
# From repository root
npm run build
```

This creates the `dist/` folder with the built library.

### 2. Navigate to an Example

```bash
cd docs/basic-odata-editor
```

### 3. Install Dependencies

```bash
npm install
```

This will install:
- React and React DOM
- Vite and build tools
- The local `react-custom-syntax` package (via `"file:../.."`)

### 4. Run the Example

```bash
npm run dev
```

This starts the Vite development server. Open the URL shown in the terminal (typically `http://localhost:5173`).

### 5. Build for Production (Optional)

```bash
npm run build
```

This creates optimized production files in the `dist/` folder.

### 6. Preview Production Build

```bash
npm run preview
```

## What You Should See

The basic OData editor example demonstrates:

- ✅ OData syntax highlighting (keywords like `eq`, `and`, `gt`)
- ✅ Copy to clipboard button
- ✅ Prettify query button
- ✅ Interactive editing with real-time highlighting
- ✅ Documentation links in header

Try typing queries like:
- `status eq 'Active'`
- `status eq 'Active' and priority gt 5`
- `contains(name, 'John')`

## Troubleshooting

### "Cannot find module 'react-custom-syntax'"

Make sure you've built the main package first:
```bash
cd ../..  # Go to repository root
npm run build
cd docs/basic-odata-editor
npm install
```

### "Module not found" errors

Try reinstalling dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Changes to main package not showing in example

Rebuild the main package after making changes:
```bash
cd ../..  # Go to repository root
npm run build
```

Then refresh the example in your browser.

## Running Multiple Examples

Each example is independent. You can run multiple examples in different terminals:

**Terminal 1:**
```bash
cd docs/basic-odata-editor
npm run dev
```

**Terminal 2:**
```bash
cd docs/minimal-editor  # When we create this
npm run dev
```

## Creating a New Example

1. Copy an existing example:
```bash
cd docs
cp -r basic-odata-editor my-new-example
cd my-new-example
```

2. Update `package.json` if needed

3. Modify the code in `src/App.tsx`

4. Install and run:
```bash
npm install
npm run dev
```

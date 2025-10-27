# Empty Config Editor Example

This example demonstrates what happens when no syntax configuration is provided.

## What This Example Shows

- ✅ Plain text editor without syntax highlighting
- ✅ Empty configuration setup
- ✅ Useful for general text input
- ✅ Clean editing experience without syntax rules

## Running This Example

```bash
# From repository root
npm run build

# From examples directory
npm install
npm run dev
```

## Use Cases

- General text input fields
- Rich text editors without syntax rules
- Custom text editing needs
- Placeholder for future syntax configuration

## Code

```tsx
import { CustomSyntaxEditor, ConfigManager } from 'react-custom-syntax';

function App() {
  const emptyConfig = {
    version: '1.0.0',
    highlightingRules: [],
    types: []
  };
  
  const configManager = new ConfigManager(emptyConfig);

  return (
    <CustomSyntaxEditor
      value={value}
      onChange={onChange}
      configManager={configManager}
      showPrettifyButton={false}
    />
  );
}
```


# Basic OData Editor Example

This example demonstrates the simplest use case of `react-custom-syntax` with the built-in OData configuration.

## What This Example Shows

- ✅ Basic setup with OData configuration
- ✅ Syntax highlighting for OData queries
- ✅ Copy to clipboard functionality
- ✅ Prettify query button
- ✅ Documentation links in header
- ✅ Default styling

## Running This Example

```bash
# From repository root
npm run build

# From examples directory
npm install
npm run dev
```

## Try These Queries

- Simple filter: `status eq 'Active'`
- Multiple conditions: `status eq 'Active' and priority gt 5`
- Functions: `contains(name, 'John') or startsWith(email, 'admin')`
- Comparison operators: `price lt 100 and stock gt 0`

## Code

```tsx
import { CustomSyntaxEditor, ConfigManager, odataConfig } from 'react-custom-syntax';

function App() {
  const [value, setValue] = useState("status eq 'Active'");
  const configManager = new ConfigManager(odataConfig);

  return (
    <CustomSyntaxEditor
      value={value}
      onChange={(e) => setValue(e.target.value)}
      configManager={configManager}
      headerLabel="OData Query Editor"
    />
  );
}
```

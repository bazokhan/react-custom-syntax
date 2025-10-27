import { useState, useMemo } from "react";
import {
  CustomSyntaxEditor,
  ConfigManager,
  odataConfig,
} from "react-custom-syntax";

/**
 * Basic OData Editor Example
 *
 * Demonstrates:
 * - Basic setup with OData configuration
 * - Using the default OData syntax highlighting
 * - Copy and prettify functionality
 * - Default styling
 */
export function BasicODataEditor() {
  const [value, setValue] = useState("status eq 'Active' and priority gt 5");

  // Initialize the config manager with OData syntax
  const configManager = useMemo(() => new ConfigManager(odataConfig), []);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div
      style={{
        padding: "2rem",
        background: "#1e1e1e",
        borderRadius: "8px",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <CustomSyntaxEditor
          value={value}
          onChange={handleChange}
          configManager={configManager}
          headerLabel="OData Query Editor"
          placeholder="Enter your OData query here (e.g., status eq 'Active')"
          headerLinks={[
            {
              href: "https://learn.microsoft.com/en-us/odata/client/query-options",
              label: "OData Documentation",
              title: "Learn more about OData query syntax",
            },
          ]}
        />
      </div>

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "#252526",
          borderRadius: "4px",
          border: "1px solid #404040",
        }}
      >
        <h3
          style={{
            margin: "0 0 0.5rem 0",
            color: "#4ec9b0",
            fontSize: "0.9rem",
          }}
        >
          Current Value:
        </h3>
        <pre
          style={{
            background: "#1e1e1e",
            padding: "0.75rem",
            borderRadius: "4px",
            overflow: "auto",
            fontSize: "0.85rem",
            margin: 0,
          }}
        >
          {value || "(empty)"}
        </pre>
      </div>

      <div style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#4ec9b0" }}>
          Try These Queries:
        </h3>
        <ul style={{ color: "#858585", paddingLeft: "1.5rem", margin: 0 }}>
          <li>
            Simple filter:{" "}
            <code
              style={{
                background: "#252526",
                padding: "0.2rem 0.4rem",
                borderRadius: "3px",
              }}
            >
              status eq 'Active'
            </code>
          </li>
          <li>
            Multiple conditions:{" "}
            <code
              style={{
                background: "#252526",
                padding: "0.2rem 0.4rem",
                borderRadius: "3px",
              }}
            >
              status eq 'Active' and priority gt 5
            </code>
          </li>
          <li>
            Functions:{" "}
            <code
              style={{
                background: "#252526",
                padding: "0.2rem 0.4rem",
                borderRadius: "3px",
              }}
            >
              contains(name, 'John') or startsWith(email, 'admin')
            </code>
          </li>
          <li>
            Comparisons:{" "}
            <code
              style={{
                background: "#252526",
                padding: "0.2rem 0.4rem",
                borderRadius: "3px",
              }}
            >
              price lt 100 and stock gt 0
            </code>
          </li>
        </ul>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#4ec9b0", fontSize: "0.9rem" }}>
          Raw Value (for form submission):
        </h3>
        <textarea
          readOnly
          value={value}
          style={{
            width: "100%",
            minHeight: "80px",
            padding: "0.75rem",
            background: "#252526",
            color: "#d4d4d4",
            border: "1px solid #404040",
            borderRadius: "4px",
            fontFamily: "Consolas, 'Monaco', 'Courier New', monospace",
            fontSize: "0.85rem",
            resize: "vertical",
          }}
          onFocus={(e) => {
            e.target.select();
          }}
        />
        <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.75rem", color: "#858585" }}>
          This is the plain text value you would use in forms or API calls.
        </p>
      </div>
    </div>
  );
}

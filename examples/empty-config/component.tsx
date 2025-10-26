import { useState, useMemo } from "react";
import { CustomSyntaxEditor, ConfigManager } from "react-custom-syntax";

/**
 * Empty Config Editor Example
 *
 * Demonstrates:
 * - No syntax highlighting (plain text)
 * - What happens when no config is provided
 * - Minimal configuration with empty rules
 */
export function EmptyConfigEditor() {
  const [value, setValue] = useState("");

  // Create an empty config - no syntax highlighting
  const emptyConfig = useMemo(() => ({
    version: "1.0.0",
    highlightingRules: [],
    types: [],
  }), []);

  const configManager = useMemo(() => new ConfigManager(emptyConfig), [emptyConfig]);

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
          headerLabel="Plain Text Editor (No Highlighting)"
          placeholder="Enter any text here - no syntax highlighting applied"
          showPrettifyButton={false}
        />
      </div>

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "#2d2d2d",
          borderRadius: "4px",
          borderLeft: "3px solid #f48771",
        }}
      >
        <p style={{ margin: 0, color: "#ce9178", fontSize: "0.9rem" }}>
          <strong>Note:</strong> This editor has no syntax configuration. It
          will display plain text without any highlighting. This is useful for
          general text input or when you want to provide a clean editing
          experience without syntax rules.
        </p>
      </div>

      <div style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#4ec9b0" }}>Use Cases:</h3>
        <ul style={{ color: "#858585", paddingLeft: "1.5rem", margin: 0 }}>
          <li>General text input fields</li>
          <li>Rich text editors without syntax rules</li>
          <li>Custom text editing needs</li>
          <li>Placeholder for future syntax configuration</li>
        </ul>
      </div>
    </div>
  );
}

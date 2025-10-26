export function Documentation() {
  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ color: "#4ec9b0", fontSize: "2.5rem", marginTop: 0 }}>
        📚 Documentation
      </h1>

      {/* Overview */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#4ec9b0", fontSize: "1.75rem", marginTop: 0 }}>
          Overview
        </h2>
        <p style={{ color: "#d4d4d4", fontSize: "1rem", lineHeight: "1.6" }}>
          react-custom-syntax is a lightweight, customizable React syntax editor with rule-based highlighting, 
          prettification, and plugin support. Define any custom language syntax using JSON configuration.
        </p>
        <div
          style={{
            background: "#252526",
            padding: "1rem",
            borderRadius: "4px",
            marginTop: "1rem",
          }}
        >
          <h3 style={{ color: "#4ec9b0", fontSize: "1rem", marginTop: 0 }}>
            Key Features:
          </h3>
          <ul style={{ color: "#858585", paddingLeft: "1.5rem" }}>
            <li>Rule-based syntax highlighting via JSON configuration</li>
            <li>Fully customizable styles, colors, and behavior</li>
            <li>Zero runtime dependencies (React as peer dependency)</li>
            <li>Built-in query prettifier with indentation support</li>
            <li>Plugin system for extensibility</li>
            <li>TypeScript support with full type definitions</li>
            <li>OData configuration included out of the box</li>
          </ul>
        </div>
      </section>

      {/* Installation */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#4ec9b0", fontSize: "1.75rem" }}>
          Installation
        </h2>
        <pre
          style={{
            background: "#1e1e1e",
            padding: "1rem",
            borderRadius: "4px",
            color: "#d4d4d4",
            overflow: "auto",
          }}
        >
          {`npm install react-custom-syntax
# or
yarn add react-custom-syntax
# or
pnpm add react-custom-syntax`}
        </pre>
      </section>

      {/* Quick Start */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#4ec9b0", fontSize: "1.75rem" }}>
          Quick Start
        </h2>
        <pre
          style={{
            background: "#1e1e1e",
            padding: "1rem",
            borderRadius: "4px",
            color: "#d4d4d4",
            overflow: "auto",
            fontSize: "0.9rem",
          }}
        >
          {`import { useState } from 'react';
import { CustomSyntaxEditor, ConfigManager, odataConfig } from 'react-custom-syntax';

function App() {
  const [value, setValue] = useState('');
  const configManager = new ConfigManager(odataConfig);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <CustomSyntaxEditor
      value={value}
      onChange={handleChange}
      configManager={configManager}
      headerLabel="OData Query Editor"
    />
  );
}`}
        </pre>
      </section>

      {/* API Reference */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#4ec9b0", fontSize: "1.75rem" }}>
          API Reference
        </h2>

        <h3 style={{ color: "#4ec9b0", fontSize: "1.25rem" }}>
          CustomSyntaxEditor Props
        </h3>
        <div
          style={{
            background: "#252526",
            padding: "1rem",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #404040" }}>
                <th
                  style={{
                    padding: "0.5rem",
                    textAlign: "left",
                    color: "#4ec9b0",
                  }}
                >
                  Prop
                </th>
                <th
                  style={{
                    padding: "0.5rem",
                    textAlign: "left",
                    color: "#4ec9b0",
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    padding: "0.5rem",
                    textAlign: "left",
                    color: "#4ec9b0",
                  }}
                >
                  Default
                </th>
                <th
                  style={{
                    padding: "0.5rem",
                    textAlign: "left",
                    color: "#4ec9b0",
                  }}
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #2d2d2d" }}>
                <td style={{ padding: "0.5rem", color: "#ce9178" }}>
                  value
                </td>
                <td style={{ padding: "0.5rem" }}>string</td>
                <td style={{ padding: "0.5rem" }}>Required</td>
                <td style={{ padding: "0.5rem" }}>Current editor value</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #2d2d2d" }}>
                <td style={{ padding: "0.5rem", color: "#ce9178" }}>
                  onChange
                </td>
                <td style={{ padding: "0.5rem" }}>(event) =&gt; void</td>
                <td style={{ padding: "0.5rem" }}>Required</td>
                <td style={{ padding: "0.5rem" }}>Change handler</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #2d2d2d" }}>
                <td style={{ padding: "0.5rem", color: "#ce9178" }}>
                  configManager
                </td>
                <td style={{ padding: "0.5rem" }}>ConfigManager</td>
                <td style={{ padding: "0.5rem" }}>undefined</td>
                <td style={{ padding: "0.5rem" }}>
                  Custom configuration manager
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #2d2d2d" }}>
                <td style={{ padding: "0.5rem", color: "#ce9178" }}>
                  showHeader
                </td>
                <td style={{ padding: "0.5rem" }}>boolean</td>
                <td style={{ padding: "0.5rem" }}>true</td>
                <td style={{ padding: "0.5rem" }}>Show/hide header</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #2d2d2d" }}>
                <td style={{ padding: "0.5rem", color: "#ce9178" }}>
                  headerLabel
                </td>
                <td style={{ padding: "0.5rem" }}>string</td>
                <td style={{ padding: "0.5rem" }}>&apos;Syntax Editor&apos;</td>
                <td style={{ padding: "0.5rem" }}>Header label text</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #2d2d2d" }}>
                <td style={{ padding: "0.5rem", color: "#ce9178" }}>
                  placeholder
                </td>
                <td style={{ padding: "0.5rem" }}>string</td>
                <td style={{ padding: "0.5rem" }}>&apos;Enter your query...&apos;</td>
                <td style={{ padding: "0.5rem" }}>Placeholder text</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Core Classes */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#4ec9b0", fontSize: "1.75rem" }}>
          Core Classes
        </h2>

        <h3 style={{ color: "#dcdcaa", fontSize: "1.25rem" }}>
          ConfigManager
        </h3>
        <pre
          style={{
            background: "#1e1e1e",
            padding: "1rem",
            borderRadius: "4px",
            color: "#d4d4d4",
            overflow: "auto",
            fontSize: "0.9rem",
          }}
        >
          {`import { ConfigManager, odataConfig } from 'react-custom-syntax';

const manager = new ConfigManager(odataConfig);

// Get keywords by type
const operators = manager.getOperatorKeywords();
const functions = manager.getFunctionKeywords();

// Token information
const tokenInfo = manager.getTokenInfo('and');
const hasKeyword = manager.hasKeyword('contains');

// Generate CSS styles
const css = manager.generateCSS();

// Load from URL
const manager = await ConfigManager.fromURL('https://example.com/syntax.json');`}
        </pre>

        <h3 style={{ color: "#dcdcaa", fontSize: "1.25rem" }}>
          SyntaxHighlighter
        </h3>
        <pre
          style={{
            background: "#1e1e1e",
            padding: "1rem",
            borderRadius: "4px",
            color: "#d4d4d4",
            overflow: "auto",
            fontSize: "0.9rem",
          }}
        >
          {`import { SyntaxHighlighter } from 'react-custom-syntax';

const highlighter = new SyntaxHighlighter(configManager);
const highlighted = highlighter.highlight('status eq true');`}
        </pre>

        <h3 style={{ color: "#dcdcaa", fontSize: "1.25rem" }}>
          Prettifier
        </h3>
        <pre
          style={{
            background: "#1e1e1e",
            padding: "1rem",
            borderRadius: "4px",
            color: "#d4d4d4",
            overflow: "auto",
            fontSize: "0.9rem",
          }}
        >
          {`import { Prettifier } from 'react-custom-syntax';

const prettifier = new Prettifier(configManager);
const formatted = prettifier.prettify('status eq true and priority gt 5');

// Configure max line length
prettifier.setMaxLineLength(100);`}
        </pre>
      </section>

      {/* Configuration */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#4ec9b0", fontSize: "1.75rem" }}>
          Configuration Schema
        </h2>

        <h3 style={{ color: "#dcdcaa", fontSize: "1.25rem" }}>
          Highlighting Rules
        </h3>
        <p style={{ color: "#858585", marginBottom: "1rem" }}>
          Two types of matching are supported:
        </p>

        <h4 style={{ color: "#dcdcaa", fontSize: "1.1rem" }}>
          1. Keyword Matching
        </h4>
        <pre
          style={{
            background: "#1e1e1e",
            padding: "1rem",
            borderRadius: "4px",
            color: "#d4d4d4",
            overflow: "auto",
            fontSize: "0.9rem",
          }}
        >
          {`{
  "name": "Operators",
  "matchType": "keyword",
  "caseSensitive": false,
  "addWordBoundaries": true,
  "tokens": [
    { 
      "keyword": "and", 
      "type": "LogicalOperator", 
      "description": "AND operator" 
    }
  ]
}`}
        </pre>

        <h4 style={{ color: "#dcdcaa", fontSize: "1.1rem" }}>
          2. Regex Matching
        </h4>
        <pre
          style={{
            background: "#1e1e1e",
            padding: "1rem",
            borderRadius: "4px",
            color: "#d4d4d4",
            overflow: "auto",
            fontSize: "0.9rem",
          }}
        >
          {`{
  "name": "Strings",
  "matchType": "regex",
  "pattern": "'([^']*)'",
  "type": "StringLiteral"
}`}
        </pre>

        <h3 style={{ color: "#dcdcaa", fontSize: "1.25rem" }}>
          Type Styles
        </h3>
        <pre
          style={{
            background: "#1e1e1e",
            padding: "1rem",
            borderRadius: "4px",
            color: "#d4d4d4",
            overflow: "auto",
            fontSize: "0.9rem",
          }}
        >
          {`{
  "className": "LogicalOperator",
  "highlightColor": "#569cd6",
  "parentType": "Operator",
  "fontWeight": "600",
  "fontStyle": "normal"
}`}
        </pre>
      </section>

      {/* Styling */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#4ec9b0", fontSize: "1.75rem" }}>
          Styling and Theming
        </h2>

        <h3 style={{ color: "#dcdcaa", fontSize: "1.25rem" }}>
          CSS Variables
        </h3>
        <pre
          style={{
            background: "#1e1e1e",
            padding: "1rem",
            borderRadius: "4px",
            color: "#d4d4d4",
            overflow: "auto",
            fontSize: "0.9rem",
          }}
        >
          {`:root {
  --rcse-bg-primary: #1e1e1e;
  --rcse-bg-secondary: #2d2d2d;
  --rcse-border-color: #404040;
  --rcse-text-primary: #d4d4d4;
  --rcse-text-secondary: #666;
  --rcse-accent-primary: #1976d2;
  --rcse-accent-hover: #264f78;
  --rcse-font-mono: 'Consolas', 'Monaco', 'Courier New', monospace;
}`}
        </pre>
      </section>

      {/* Supported Languages */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#4ec9b0", fontSize: "1.75rem" }}>
          Supported Languages
        </h2>
        <div
          style={{
            background: "#252526",
            padding: "1rem",
            borderRadius: "4px",
          }}
        >
          <h3 style={{ color: "#4ec9b0", fontSize: "1rem", marginTop: 0 }}>
            OData Query Syntax
          </h3>
          <p style={{ color: "#858585", fontSize: "0.9rem" }}>
            Full support for OData query syntax including:
          </p>
          <ul style={{ color: "#858585", paddingLeft: "1.5rem" }}>
            <li>Logical operators (and, or, not)</li>
            <li>Comparison operators (eq, ne, gt, ge, lt, le)</li>
            <li>Arithmetic operators (add, sub, mul, div, mod)</li>
            <li>Collection operators (any, all)</li>
            <li>String functions (contains, endswith, startswith, length, etc.)</li>
            <li>Date functions (year, month, day, hour, minute, second, now)</li>
            <li>Custom tokens (true, false, null, @today, @yesterday, etc.)</li>
          </ul>
          <p style={{ color: "#858585", fontSize: "0.85rem", marginTop: "1rem" }}>
            Reference:{" "}
            <a
              href="https://azuresearch.github.io/odata-syntax-diagram"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4ec9b0" }}
            >
              OData Syntax Diagram
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}


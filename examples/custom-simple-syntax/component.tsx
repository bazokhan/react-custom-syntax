import { useState, useMemo } from 'react';
import { CustomSyntaxEditor, ConfigManager } from 'react-custom-syntax';

/**
 * Custom Simple Syntax Editor Example
 * 
 * Demonstrates:
 * - Defining custom syntax on the fly
 * - Minimal syntax with just 2 keywords
 * - Custom highlighting colors
 * - How to create your own language configuration
 */
export function CustomSimpleSyntaxEditor() {
  const [value, setValue] = useState('Hello world! This is custom syntax with keywords: IMPORTANT and ACTION.');
  
  // Define a custom simple syntax with just 2 keywords
  const customConfig = useMemo(() => ({
    version: '1.0.0',
    description: 'Custom simple syntax with 2 keywords',
    highlightingRules: [
      {
        name: 'Keywords',
        matchType: 'keyword' as const,
        caseSensitive: false,
        addWordBoundaries: true,
        tokens: [
          {
            keyword: 'IMPORTANT',
            type: 'KeywordImportant',
            description: 'Important keyword'
          },
          {
            keyword: 'ACTION',
            type: 'KeywordAction',
            description: 'Action keyword'
          }
        ]
      }
    ],
    types: [
      {
        className: 'KeywordImportant',
        highlightColor: '#f48771',
        parentType: 'Keyword',
        fontWeight: 'bold'
      },
      {
        className: 'KeywordAction',
        highlightColor: '#4ec9b0',
        parentType: 'Keyword',
        fontWeight: 'bold'
      }
    ]
  }), []);

  const configManager = useMemo(() => new ConfigManager(customConfig), [customConfig]);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ 
      padding: '2rem',
      background: '#1e1e1e',
      borderRadius: '8px'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <CustomSyntaxEditor
          value={value}
          onChange={handleChange}
          configManager={configManager}
          headerLabel="Custom Simple Syntax"
          placeholder="Try typing IMPORTANT or ACTION to see them highlighted"
        />
      </div>

      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: '#252526',
        borderRadius: '4px',
        borderLeft: '3px solid #4ec9b0'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#4ec9b0', fontSize: '0.9rem' }}>
          Syntax Rules:
        </h3>
        <ul style={{ color: '#858585', paddingLeft: '1.5rem', margin: 0, fontSize: '0.85rem' }}>
          <li><code style={{ color: '#f48771' }}>IMPORTANT</code> - Highlighted in red/bold</li>
          <li><code style={{ color: '#4ec9b0' }}>ACTION</code> - Highlighted in teal/bold</li>
        </ul>
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#4ec9b0' }}>Configuration:</h3>
        <pre style={{ 
          background: '#1e1e1e', 
          padding: '0.75rem', 
          borderRadius: '4px', 
          overflow: 'auto',
          fontSize: '0.75rem',
          margin: 0,
          border: '1px solid #404040'
        }}>
{`{
  version: '1.0.0',
  highlightingRules: [
    {
      name: 'Keywords',
      matchType: 'keyword',
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
}`}
        </pre>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#4ec9b0", fontSize: "0.9rem" }}>
          Raw Value:
        </h3>
        <textarea
          readOnly
          value={value}
          style={{
            width: "100%",
            minHeight: "60px",
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


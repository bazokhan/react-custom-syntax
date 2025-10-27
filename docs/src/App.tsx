import { useState } from 'react';
import { BasicODataEditor } from '../basic-odata-editor/component';
import { ComprehensiveODataEditor } from '../comprehensive-odata-editor/component';
import { EmptyConfigEditor } from '../empty-config/component';
import { CustomSimpleSyntaxEditor } from '../custom-simple-syntax/component';
import { Documentation } from '../documentation/component';
import { Legal } from '../legal/component';
import 'react-custom-syntax/styles/style.css';

interface NavItem {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType;
  section: string;
}

const examples: NavItem[] = [
  {
    id: 'basic-odata',
    title: 'Basic OData Editor',
    description: 'Simple setup with default OData syntax highlighting',
    component: BasicODataEditor,
    section: 'Examples',
  },
  {
    id: 'comprehensive-odata',
    title: 'Comprehensive OData Reference',
    description: 'Complete OData reference showing all operators, functions, and syntax types',
    component: ComprehensiveODataEditor,
    section: 'Examples',
  },
  {
    id: 'custom-syntax',
    title: 'Custom Simple Syntax',
    description: 'Custom language with just 2 keywords defined on-the-fly',
    component: CustomSimpleSyntaxEditor,
    section: 'Examples',
  },
  {
    id: 'empty-config',
    title: 'Empty Config (No Highlighting)',
    description: 'Plain text editor without any syntax configuration',
    component: EmptyConfigEditor,
    section: 'Examples',
  },
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'Complete API reference, configuration guide, and usage examples',
    component: Documentation,
    section: 'Documentation',
  },
  {
    id: 'legal',
    title: 'Legal & Notices',
    description: 'License, disclaimers, and project information',
    component: Legal,
    section: 'Legal',
  },
];

function App() {
  const [selectedId, setSelectedId] = useState(examples[1].id);

  const selected = examples.find((ex) => ex.id === selectedId);
  const Component = selected?.component || BasicODataEditor;

  return (
    <div style={{ minHeight: '100vh', background: '#1e1e1e', color: '#d4d4d4' }}>
      <header
        style={{
          background: '#2d2d2d',
          borderBottom: '1px solid #404040',
          padding: '1rem 2rem',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#4ec9b0' }}>
          react-custom-syntax Examples
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', color: '#858585', fontSize: '0.9rem' }}>
          Interactive examples demonstrating various use cases
        </p>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 100px)' }}>
        {/* Sidebar Navigation */}
        <nav
          style={{
            width: '300px',
            background: '#252526',
            borderRight: '1px solid #404040',
            padding: '1rem',
            overflowY: 'auto',
          }}
        >
          {['Examples', 'Documentation', 'Legal'].map((section) => {
            const sectionItems = examples.filter((ex) => ex.section === section);
            return (
              <div key={section} style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '0.9rem', marginTop: 0, marginBottom: '0.5rem', color: '#4ec9b0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {section}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {sectionItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem',
                        background: selectedId === item.id ? '#37373d' : 'transparent',
                        border: 'none',
                        borderRadius: '4px',
                        color: selectedId === item.id ? '#4ec9b0' : '#ccc',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedId !== item.id) {
                          e.currentTarget.style.background = '#37373d';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedId !== item.id) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <div style={{ fontWeight: selectedId === item.id ? 600 : 400 }}>
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: '#858585',
                          marginTop: '0.25rem',
                        }}
                      >
                        {item.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Main Content */}
        <main style={{ 
          flex: 1, 
          padding: selected?.section === 'Examples' ? '2rem' : 0, 
          overflowY: 'auto',
          background: '#1e1e1e'
        }}>
          {selected && (
            <>
              {selected.section === 'Examples' && (
                <div style={{ marginBottom: '2rem' }}>
                  <h2 style={{ margin: '0 0 0.5rem 0', color: '#4ec9b0', fontSize: '1.75rem' }}>
                    {selected.title}
                  </h2>
                  <p style={{ margin: 0, color: '#858585', fontSize: '1rem' }}>
                    {selected.description}
                  </p>
                </div>
              )}
              
              <Component />
            </>
          )}
        </main>
      </div>

      <footer
        style={{
          background: '#252526',
          borderTop: '1px solid #404040',
          padding: '1rem 2rem',
          textAlign: 'center',
          color: '#858585',
          fontSize: '0.9rem',
        }}
      >
        <a
          href="https://github.com/bazokhan/react-custom-syntax"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#4ec9b0', textDecoration: 'none' }}
        >
          View on GitHub
        </a>
        {' • '}
        <a
          href="https://www.npmjs.com/package/react-custom-syntax"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#4ec9b0', textDecoration: 'none' }}
        >
          npm Package
        </a>
      </footer>
    </div>
  );
}

export default App;


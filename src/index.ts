/**
 * react-custom-syntax
 * A lightweight, customizable React syntax editor with rule-based highlighting
 */

// Import styles
import './styles/index.css';

// Main component
export { CustomSyntaxEditor } from './CustomSyntaxEditor';
export { default } from './CustomSyntaxEditor';

// Core classes
export { ConfigManager } from './core/ConfigManager';
export { SyntaxHighlighter } from './core/SyntaxHighlighter';
export { Prettifier } from './core/Prettifier';
export { IdentifierExtractor } from './core/IdentifierExtractor';

// Plugins
export type { Plugin, PluginRegistrationOptions } from './plugins/types';

// Configuration presets
export { odataConfig, odataConfigJson } from './configs';

// Types
export type {
  SyntaxConfig,
  HighlightingRule,
  TokenDefinition,
  TypeStyle,
  SyntaxConfigMetadata,
  ConfigManagerOptions,
  HighlighterOptions,
  PrettifierOptions,
  IdentifierExtractorOptions,
  HeaderLink,
  CustomClassNames,
  CustomStyles,
  CustomSyntaxEditorProps,
  CodeEditorProps,
  EditorHeaderProps,
  EditorContentProps,
} from './types';


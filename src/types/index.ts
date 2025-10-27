/**
 * Type definitions for react-custom-syntax
 */

import { CSSProperties, ReactNode } from 'react';
import type { ConfigManager } from '../core/ConfigManager';
import type { SyntaxHighlighter } from '../core/SyntaxHighlighter';
import type { Prettifier } from '../core/Prettifier';

/**
 * Token definition for keywords
 */
export interface TokenDefinition {
  keyword: string;
  type: string;
  description: string;
}

/**
 * Highlighting rule configuration
 */
export interface HighlightingRule {
  name: string;
  matchType: 'keyword' | 'regex';
  caseSensitive?: boolean;
  addWordBoundaries?: boolean;
  pattern?: string;
  replacement?: string;
  type?: string;
  tokens?: TokenDefinition[];
}

/**
 * Type styling configuration
 */
export interface TypeStyle {
  className: string;
  highlightColor: string;
  parentType: string;
  fontWeight?: string | number;
  fontStyle?: string;
}

/**
 * Metadata for syntax configuration
 */
export interface SyntaxConfigMetadata {
  lastUpdated?: string;
  maintainer?: string;
  extensible?: boolean;
  notes?: string[];
  [key: string]: unknown;
}

/**
 * Complete syntax configuration
 */
export interface SyntaxConfig {
  version: string;
  description?: string;
  reference?: string;
  highlightingRules: HighlightingRule[];
  types: TypeStyle[];
  metadata?: SyntaxConfigMetadata;
}

/**
 * Configuration manager options
 */
export interface ConfigManagerOptions {
  config?: SyntaxConfig;
}

/**
 * Syntax highlighter options
 */
export interface HighlighterOptions {
  configManager: ConfigManager;
}

/**
 * Prettifier options
 */
export interface PrettifierOptions {
  configManager: ConfigManager;
  maxLineLength?: number;
}

/**
 * Identifier extractor options
 */
export interface IdentifierExtractorOptions {
  configManager: ConfigManager;
}

/**
 * Header link configuration
 */
export interface HeaderLink {
  href: string;
  label: string;
  icon?: ReactNode;
  title?: string;
}

/**
 * Custom class names for styling
 */
export interface CustomClassNames {
  container?: string;
  header?: string;
  headerLeft?: string;
  headerLabel?: string;
  headerLink?: string;
  headerButtons?: string;
  headerButton?: string;
  editor?: string;
}

/**
 * Custom styles for components
 */
export interface CustomStyles {
  container?: CSSProperties;
  header?: CSSProperties;
  editor?: CSSProperties;
}

/**
 * Props for CustomSyntaxEditor component
 */
export interface CustomSyntaxEditorProps {
  /** Current editor value */
  value: string;
  
  /** Change handler */
  onChange: (event: { target: { value: string } }) => void;
  
  /** Disable the editor */
  disabled?: boolean;
  
  /** Custom configuration manager instance */
  configManager?: ConfigManager;
  
  /** Custom prettifier instance */
  prettifierInstance?: Prettifier;
  
  /** Custom syntax highlighter instance */
  highlighterInstance?: SyntaxHighlighter;
  
  /** Show header section */
  showHeader?: boolean;
  
  /** Header label text */
  headerLabel?: string;
  
  /** Header documentation links */
  headerLinks?: HeaderLink[];
  
  /** Show copy button */
  showCopyButton?: boolean;
  
  /** Show prettify button */
  showPrettifyButton?: boolean;
  
  /** Custom copy button label */
  copyButtonLabel?: string;
  
  /** Custom prettify button label */
  prettifyButtonLabel?: string;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Custom CSS class name for container */
  className?: string;
  
  /** Custom inline styles */
  style?: CSSProperties;
  
  /** Custom class names for internal elements */
  classNames?: CustomClassNames;
  
  /** Custom styles for internal elements */
  styles?: CustomStyles;
  
  /** Callback when copy action is triggered */
  onCopy?: (value: string) => void;
  
  /** Callback when prettify action is triggered */
  onPrettify?: (value: string) => void;
  
  /** Custom toast/notification handler */
  notificationHandler?: {
    success: (message: string) => void;
    warning: (message: string) => void;
    error: (message: string) => void;
  };
  
  /** Disable CSS injection (if you want to provide your own styles) */
  disableStyleInjection?: boolean;
  
  /** Custom style element ID for injected CSS */
  styleElementId?: string;
}

/**
 * Props for CodeEditor component
 */
export interface CodeEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  onPrettify: () => void;
  configManager: ConfigManager;
  highlighter: SyntaxHighlighter;
  showHeader?: boolean;
  headerLabel?: string;
  headerLinks?: HeaderLink[];
  showCopyButton?: boolean;
  showPrettifyButton?: boolean;
  copyButtonLabel?: string;
  prettifyButtonLabel?: string;
  placeholder?: string;
  classNames?: CustomClassNames;
  styles?: CustomStyles;
  onCopy?: () => void;
  notificationHandler?: {
    success: (message: string) => void;
    warning: (message: string) => void;
    error: (message: string) => void;
  };
  disableStyleInjection?: boolean;
  styleElementId?: string;
}

/**
 * Props for EditorHeader component
 */
export interface EditorHeaderProps {
  onCopy: () => void;
  onPrettify: () => void;
  headerLabel?: string;
  headerLinks?: HeaderLink[];
  showCopyButton?: boolean;
  showPrettifyButton?: boolean;
  copyButtonLabel?: string;
  prettifyButtonLabel?: string;
  classNames?: CustomClassNames;
  styles?: CustomStyles;
}

/**
 * Props for EditorContent component
 */
export interface EditorContentProps {
  value: string;
  onChange: (newValue: string) => void;
  highlighter: SyntaxHighlighter;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
}



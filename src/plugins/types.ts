/**
 * Plugin system type definitions
 */

/**
 * Base plugin interface with lifecycle hooks
 */
export interface Plugin {
  name: string;
  version?: string;
  
  /**
   * Called before highlighting - allows text transformation
   * @param text Original text before highlighting
   * @returns Modified text or original text
   */
  beforeHighlight?: (text: string) => string;
  
  /**
   * Called after highlighting - can modify the highlighted HTML
   * @param highlightedHtml The highlighted HTML string
   * @param originalText The original plain text
   * @param tokens Array of extracted token strings (if available)
   * @returns Modified highlighted HTML or original
   */
  afterHighlight?: (highlightedHtml: string, originalText: string, tokens?: string[]) => string;
  
  /**
   * Called before prettification - allows text transformation
   * @param text Original text before prettification
   * @returns Modified text or original text
   */
  beforePrettify?: (text: string) => string;
  
  /**
   * Called after prettification - can modify the prettified text
   * @param prettifiedText The prettified text string
   * @param originalText The original plain text
   * @returns Modified prettified text or original
   */
  afterPrettify?: (prettifiedText: string, originalText: string) => string;
  
  /**
   * Event listener registration (optional)
   * @param event Event name
   * @param callback Callback function
   */
  on?: (event: string, callback: (...args: unknown[]) => void) => void;
  
  /**
   * Event emitter (optional)
   * @param event Event name
   * @param args Event arguments
   */
  emit?: (event: string, ...args: unknown[]) => void;
}

/**
 * Plugin registration options
 */
export interface PluginRegistrationOptions {
  plugins?: Plugin[];
}


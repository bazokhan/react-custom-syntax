/**
 * Configuration presets
 */

import odataConfigJson from './odata.json';
import type { SyntaxConfig } from '../types';

// Export OData config as typed object
export const odataConfig: SyntaxConfig = odataConfigJson as SyntaxConfig;

// Re-export for convenience
export { odataConfigJson };


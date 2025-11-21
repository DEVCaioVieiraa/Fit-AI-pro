// Suprime avisos de HMR (Hot Module Replacement) no console
// Esses avisos são normais durante desenvolvimento e não afetam funcionalidade

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    
    // Ignora erros de HMR/fetch que são normais
    if (
      message.includes('Failed to fetch') ||
      message.includes('signal is aborted') ||
      message.includes('Network Failed') ||
      message.includes('lasy-bridge.js') ||
      message.includes('hmrRefreshReducerImpl')
    ) {
      return;
    }
    
    originalError.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    
    // Ignora avisos de HMR
    if (
      message.includes('Failed to fetch') ||
      message.includes('signal is aborted') ||
      message.includes('Network Failed')
    ) {
      return;
    }
    
    originalWarn.apply(console, args);
  };
}

export {};

// Suprime erros de HMR (Hot Module Replacement) do Next.js em desenvolvimento
// Esses erros não afetam a funcionalidade da aplicação

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Intercepta erros de fetch do HMR
  const originalFetch = window.fetch;
  
  window.fetch = function(...args) {
    const url = args[0];
    
    // Ignora fetches com URL indefinida (HMR interno)
    if (!url || url === 'undefined' || url === undefined) {
      return Promise.reject(new Error('HMR fetch ignored'));
    }
    
    return originalFetch.apply(this, args);
  };

  // Suprime logs de erro específicos do HMR
  const originalError = console.error;
  console.error = function(...args) {
    const message = args[0]?.toString() || '';
    
    // Ignora erros conhecidos do HMR
    if (
      message.includes('Failed to fetch') ||
      message.includes('signal is aborted without reason') ||
      message.includes('Network Failed: GET undefined')
    ) {
      return; // Não loga esses erros
    }
    
    originalError.apply(console, args);
  };
}

export {};

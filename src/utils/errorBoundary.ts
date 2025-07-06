// Global error handling for cross-origin and other runtime errors
export class CrossOriginErrorHandler {
  private static instance: CrossOriginErrorHandler;
  private errorCount = 0;
  private maxErrors = 10;

  private constructor() {
    this.setupGlobalErrorHandlers();
  }

  public static getInstance(): CrossOriginErrorHandler {
    if (!CrossOriginErrorHandler.instance) {
      CrossOriginErrorHandler.instance = new CrossOriginErrorHandler();
    }
    return CrossOriginErrorHandler.instance;
  }

  private setupGlobalErrorHandlers(): void {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      if (this.isCrossOriginError(event.reason)) {
        console.warn('Cross-origin error suppressed:', event.reason);
        event.preventDefault();
        return;
      }
    });

    // Handle general errors
    window.addEventListener('error', (event) => {
      if (this.isCrossOriginError(event.error)) {
        console.warn('Cross-origin error suppressed:', event.error);
        event.preventDefault();
        return;
      }
    });

    // Handle SecurityError specifically
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args.join(' ');
      if (this.isCrossOriginError(message)) {
        console.warn('Cross-origin security error suppressed:', message);
        return;
      }
      originalConsoleError.apply(console, args);
    };
  }

  private isCrossOriginError(error: any): boolean {
    if (!error) return false;
    
    const errorString = error.toString ? error.toString() : String(error);
    const crossOriginPatterns = [
      /Failed to read.*property.*from.*Location/i,
      /Blocked a frame with origin/i,
      /cross-origin frame/i,
      /SecurityError.*cross-origin/i,
      /Permission denied.*cross-origin/i
    ];

    return crossOriginPatterns.some(pattern => pattern.test(errorString));
  }

  public handleError(error: Error, context?: string): void {
    if (this.isCrossOriginError(error)) {
      console.warn(`Cross-origin error in ${context || 'unknown context'}:`, error.message);
      return;
    }

    this.errorCount++;
    if (this.errorCount > this.maxErrors) {
      console.warn('Too many errors, some may be suppressed');
      return;
    }

    console.error(`Error in ${context || 'unknown context'}:`, error);
  }
}

// Initialize the error handler
export const errorHandler = CrossOriginErrorHandler.getInstance();
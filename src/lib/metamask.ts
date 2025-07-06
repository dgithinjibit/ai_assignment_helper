// MetaMask integration with cross-origin error handling
export interface MetaMaskProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, handler: (...args: any[]) => void) => void;
  removeListener: (event: string, handler: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: MetaMaskProvider;
  }
}

// Safe origin check that handles cross-origin errors
function getSafeOrigin(): string {
  try {
    return window.location.origin;
  } catch (error) {
    // Handle cross-origin security errors in webcontainer environments
    console.warn('Cross-origin access blocked, using fallback origin');
    return 'https://localhost:5173';
  }
}

// Safe location access wrapper
function getSafeLocation() {
  try {
    return {
      origin: window.location.origin,
      href: window.location.href,
      hostname: window.location.hostname,
      protocol: window.location.protocol
    };
  } catch (error) {
    console.warn('Cross-origin location access blocked, using fallback');
    return {
      origin: 'https://localhost:5173',
      href: 'https://localhost:5173',
      hostname: 'localhost',
      protocol: 'https:'
    };
  }
}

export const connectWallet = async (): Promise<string[]> => {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    return accounts;
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('User rejected the connection request');
    }
    throw new Error(`Failed to connect wallet: ${error.message}`);
  }
};

export const getAccounts = async (): Promise<string[]> => {
  try {
    if (!window.ethereum) {
      return [];
    }

    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });

    return accounts;
  } catch (error) {
    console.error('Failed to get accounts:', error);
    return [];
  }
};

export const isMetaMaskInstalled = (): boolean => {
  try {
    return typeof window !== 'undefined' && 
           typeof window.ethereum !== 'undefined' && 
           window.ethereum.isMetaMask === true;
  } catch (error) {
    // Handle any cross-origin errors when checking for MetaMask
    console.warn('Error checking MetaMask installation:', error);
    return false;
  }
};

export const switchToNetwork = async (chainId: string): Promise<void> => {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  } catch (error: any) {
    if (error.code === 4902) {
      throw new Error('Network not added to MetaMask');
    }
    throw new Error(`Failed to switch network: ${error.message}`);
  }
};

// Export safe utilities
export { getSafeOrigin, getSafeLocation };
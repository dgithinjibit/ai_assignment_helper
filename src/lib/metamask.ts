// Mock MetaMask functionality for demo
export const isMetaMaskInstalled = (): boolean => {
  return false; // Disabled for demo
};

export const connectMetaMask = async (): Promise<string | null> => {
  throw new Error('MetaMask integration disabled in demo mode');
};

export const getMetaMaskAccount = async (): Promise<string | null> => {
  return null;
};

export const switchToEthereumMainnet = async (): Promise<void> => {
  throw new Error('MetaMask integration disabled in demo mode');
};

export const getWalletBalance = async (address: string): Promise<string> => {
  return '0';
};

export const signMessage = async (message: string, address: string): Promise<string> => {
  throw new Error('MetaMask integration disabled in demo mode');
};